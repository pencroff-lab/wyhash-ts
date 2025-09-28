const secret: [bigint, bigint, bigint, bigint] = [
	0xa0761d6478bd642fn,
	0xe7037ed1a0b428dbn,
	0x8ebc6af09c88c6e3n,
	0x589965cc75374cc3n,
];

/**
 * wyhash implementation in Bun
 * It's pure TypeScript and works in any environment that supports BigInt and TextEncoder.
 * It's much slower than native implementations.
 * @param seed 64-bit seed
 * @param key input string
 * @returns 64-bit hash as BigInt
 */
export function wyhash_bun(seed: bigint, key: string): bigint {
	const seedU64 = BigInt.asUintN(64, seed);
	const encoder = new TextEncoder();
	const input = encoder.encode(key);

	const result = sum64(seedU64, input);
	return result
}

function sum64(seed: bigint, input: Uint8Array): bigint {
	let a: bigint, b: bigint;
	let state0 = seed ^ mix(seed ^ secret[0], secret[1]);
	const len = input.length;

	if (len <= 16) {
		if (len >= 4) {
			const end = len - 4;
			const quarter = (len >> 3) << 2;
			a = (read(input, 0, 4) << 32n) | read(input, quarter, 4);
			b = (read(input, end, 4) << 32n) | read(input, end - quarter, 4);
		} else if (len > 0) {

			// @ts-ignore

			a = (BigInt(input[0]) << 16n) |
				// @ts-ignore
				(BigInt(input[len >> 1]) << 8n) |
				// @ts-ignore
				BigInt(input[len - 1]);
			b = 0n;
		} else {
			a = 0n;
			b = 0n;
		}
	} else {
		let state: [bigint, bigint, bigint] = [state0, state0, state0];
		let i = 0;

		if (len >= 48) {
			while (i + 48 < len) {
				for (let j = 0; j < 3; j++) {
					const aRound = read(input, i + 8 * (2 * j), 8);
					const bRound = read(input, i + 8 * (2 * j + 1), 8);
					// @ts-ignore
					state[j] = mix(aRound ^ secret[j + 1], bRound ^ state[j]);
				}
				i += 48;
			}
			state[0] ^= state[1] ^ state[2];
		}

		const remaining = input.subarray(i);
		let k = 0;
		while (k + 16 < remaining.length) {
			state[0] = mix(
				read(remaining, k, 8) ^ secret[1],
				read(remaining, k + 8, 8) ^ state[0],
			);
			k += 16;
		}

		a = read(input, len - 16, 8);
		b = read(input, len - 8, 8);
		state0 = state[0];
	}

	a ^= secret[1];
	b ^= state0;
	[a, b] = mum(a, b);
	return mix(a ^ secret[0] ^ BigInt(len), b ^ secret[1]);
}

function read(data: Uint8Array, offset: number, bytes: number): bigint {
	let result = 0n;
	for (let i = 0; i < bytes && offset + i < data.length; i++) {
		// @ts-ignore
		result |= BigInt(data[offset + i]) << (BigInt(i) * 8n);
	}
	return BigInt.asUintN(64, result);
}

function mum(a: bigint, b: bigint): [bigint, bigint] {
	const x = a * b;
	const aResult = BigInt.asUintN(64, x);
	const bResult = BigInt.asUintN(64, x >> 64n);
	return [aResult, bResult];
}

function mix(a: bigint, b: bigint): bigint {
	const [aMul, bMul] = mum(a, b);
	return aMul ^ bMul;
}