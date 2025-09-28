const wyp0 = 0x2d358dccaa6c78a5n;
const wyp1 = 0x8bb84b93962eacc9n;
const wyp2 = 0x4b33a62ed433d4a3n;
const wyp3 = 0x4d5a2da51de1aa47n;

/**
 * Returns the Wyhash of a key given a seed.
 * Converts the key (a string) to UTF-8 bytes and finally returns the hash as a hexadecimal string.
 * @param seed 64-bit seed
 * @param key input string
 * @returns 64-bit hash as BigInt
 */
export function wyhash(seed: bigint, key: string): bigint {
	const seedU64 = BigInt.asUintN(64, seed);
	const encoder = new TextEncoder();
	const input = encoder.encode(key);

	const result = sum64(seed, input);
	return result;
}

/**
 * Computes a 64-bit hash for the key and seed.
 *
 * This function follows the Go implementation strategy:
 * - For an empty key and keys with lengths less than 4, it applies a simple branch.
 * - For keys with length from 4 to 16, it selects the correct 4‑byte windows.
 * - For longer keys it processes 48‑byte blocks (if available), then 16‑byte blocks.
 */
function sum64(sd: bigint, input: Uint8Array): bigint {
	// Convert the string into a UTF‑8 encoded Uint8Array.
	const n = input.length;
	const u = BigInt(n);

	// Initial seed mixing: seed ^= wymix(seed^wyp0, wyp1)
	let seed = sd ^ wymix(sd ^ wyp0, wyp1);

	let a: bigint;
	let b: bigint;

	if (n === 0) {
		// For empty key.
		a = wyp1;
		b = seed;
		({ a, b } = wymum(a, b));
		return wymix(a ^ wyp0 ^ u, b ^ wyp1);
	}
	if (n < 4) {
		// For inputs 1 to 3 bytes.
		a = wyr3(input, n) ^ wyp1;
		b = seed;
		({ a, b } = wymum(a, b));
		return wymix(a ^ wyp0 ^ u, b ^ wyp1);
	}
	if (n <= 16) {
		// For inputs 4 to 16 bytes.
		const v0 = wyr4(input.subarray(0, 4));
		switch (n) {
			case 4:
				a = ((v0 << 32n) | v0) ^ wyp1;
				b = ((v0 << 32n) | v0) ^ seed;
				break;
			case 5: {
				const v1 = wyr4(input.subarray(1, 5));
				a = ((v0 << 32n) | v0) ^ wyp1;
				b = ((v1 << 32n) | v1) ^ seed;
				break;
			}
			case 6: {
				const v2 = wyr4(input.subarray(2, 6));
				a = ((v0 << 32n) | v0) ^ wyp1;
				b = ((v2 << 32n) | v2) ^ seed;
				break;
			}
			case 7: {
				const v3 = wyr4(input.subarray(3, 7));
				a = ((v0 << 32n) | v0) ^ wyp1;
				b = ((v3 << 32n) | v3) ^ seed;
				break;
			}
			case 8: {
				const v4 = wyr4(input.subarray(4, 8));
				a = ((v0 << 32n) | v4) ^ wyp1;
				b = ((v4 << 32n) | v0) ^ seed;
				break;
			}
			case 9: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(5, 9));
				const partC = wyr4(input.subarray(1, 5));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 10: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(6, 10));
				const partC = wyr4(input.subarray(2, 6));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 11: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(7, 11));
				const partC = wyr4(input.subarray(3, 7));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 12: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(8, 12));
				const partC = wyr4(input.subarray(4, 8));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 13: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(9, 13));
				const partC = wyr4(input.subarray(5, 9));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 14: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(10, 14));
				const partC = wyr4(input.subarray(6, 10));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 15: {
				const partA = wyr4(input.subarray(4, 8));
				const partB = wyr4(input.subarray(11, 15));
				const partC = wyr4(input.subarray(7, 11));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			case 16: {
				const partA = wyr4(input.subarray(8, 12));
				const partB = wyr4(input.subarray(12, 16));
				const partC = wyr4(input.subarray(4, 8));
				a = ((v0 << 32n) | partA) ^ wyp1;
				b = ((partB << 32n) | partC) ^ seed;
				break;
			}
			default:
				a = 0n;
				b = 0n;
		}
		({ a, b } = wymum(a, b));
		return wymix(a ^ wyp0 ^ u, b ^ wyp1);
	}
	// For inputs longer than 16 bytes.
	let i = n;
	let pos = 0;
	let p = input;
	if (i >= 48) {
		let see1 = seed;
		let see2 = seed;
		while (i >= 48) {
			const w0 = wyr8(p.subarray(pos, pos + 8));
			const w1 = wyr8(p.subarray(pos + 8, pos + 16));
			seed = wymix(w0 ^ wyp1, w1 ^ seed);

			const w2 = wyr8(p.subarray(pos + 16, pos + 24));
			const w3 = wyr8(p.subarray(pos + 24, pos + 32));
			see1 = wymix(w2 ^ wyp2, w3 ^ see1);

			const w4 = wyr8(p.subarray(pos + 32, pos + 40));
			const w5 = wyr8(p.subarray(pos + 40, pos + 48));
			see2 = wymix(w4 ^ wyp3, w5 ^ see2);

			pos += 48;
			i -= 48;
		}
		seed = seed ^ see1 ^ see2;
		p = p.subarray(pos); // update p to the remaining bytes
	}
	while (i > 16) {
		seed = wymix(wyr8(p.subarray(0, 8)) ^ wyp1, wyr8(p.subarray(8, 16)) ^ seed);
		p = p.subarray(16);
		i -= 16;
	}
	a = wyr8(input.subarray(n - 16, n - 8)) ^ wyp1;
	b = wyr8(input.subarray(n - 8, n)) ^ seed;
	({ a, b } = wymum(a, b));
	return wymix(a ^ wyp0 ^ u, b ^ wyp1);
}

/**
 * Reads 3 bytes from p (Uint8Array) to form a 64-bit bigint.
 * The bytes used are:
 *   - p[0] shifted left 16 bits,
 *   - p[k >> 1] shifted left 8 bits, and
 *   - p[k - 1] (least significant).
 */
function wyr3(p: Uint8Array, k: number): bigint {
	return (BigInt(p[0]!) << 16n) | (BigInt(p[k >> 1]!) << 8n) | BigInt(p[k - 1]!);
}

/**
 * Reads 4 bytes (little-endian) from a Uint8Array and returns a 64-bit bigint.
 */
function wyr4(p: Uint8Array): bigint {
	return (
		BigInt(p[0]!) |
		(BigInt(p[1]!) << 8n) |
		(BigInt(p[2]!) << 16n) |
		(BigInt(p[3]!) << 24n)
	);
}

/**
 * Reads 8 bytes (little-endian) from a Uint8Array and returns a 64-bit bigint.
 */
function wyr8(p: Uint8Array): bigint {
	let r = 0n;
	for (let i = 0; i < 8; i++) {
		r |= BigInt(p[i]!) << (8n * BigInt(i));
	}
	return r;
}

/**
 * Multiplies two 64-bit bigints and returns an object containing:
 *   - a: the low 64 bits, and
 *   - b: the high 64 bits.
 */
function wymum(a: bigint, b: bigint): { a: bigint; b: bigint } {
	const product = a * b;
	const lo = product & ((1n << 64n) - 1n);
	const hi = product >> 64n;
	return { a: lo, b: hi };
}

/**
 * Multiplies two 64-bit bigints and returns the XOR of the high and low 64 bits.
 */
function wymix(a: bigint, b: bigint): bigint {
	const product = a * b;
	const lo = product & ((1n << 64n) - 1n);
	const hi = product >> 64n;
	return hi ^ lo;
}
