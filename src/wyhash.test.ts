import { describe, expect, it } from 'bun:test';
import { wyhash } from './wyhash';

describe('wyhash', () => {
	const testCases = [
		{ seed: 0, key: '', expected: '93228a4de0eec5a2' },
		{ seed: 1, key: 'a', expected: 'c5bac3db178713c4' },
		{ seed: 2, key: 'abc', expected: 'a97f2f7b1d9b3314' },
		{ seed: 3, key: '1234', expected: 'd3fa000fdb422cf' },
		{ seed: 4, key: '12345', expected: '160efc6277fcec80' },
		{ seed: 5, key: '123456', expected: 'b2205dc629f3ef52' },
		{ seed: 6, key: '1234567', expected: 'fcbd904b20d5022c' },
		{ seed: 7, key: '12345678', expected: 'b4d64b1fc5efc3f8' },
		{ seed: 8, key: '123456789', expected: '84c12a0bfe6d670b' },
		{ seed: 9, key: '123456789A', expected: '63f35c1f12d4c922' },
		{ seed: 10, key: '123456789AB', expected: '4a7b5d200a5860b2' },
		{ seed: 11, key: '123456789ABC', expected: '313b0ac37c8cc1ce' },
		{ seed: 12, key: '123456789ABCD', expected: '73a21fc7838e0aec' },
		{ seed: 13, key: '123456789ABCDE', expected: '4fd0b1e18c59f85d' },
		{ seed: 14, key: '123456789ABCDEF', expected: 'b3d88614f07f1708' },
		{ seed: 15, key: '123456789ABCDEFG', expected: 'd0f623b2f2c1015f' },
		{ seed: 16, key: 'message digest', expected: 'e580b70f3cb71bf0' },
		{
			seed: 17,
			key: 'abcdefghijklmnopqrstuvwxyz',
			expected: '425f943510e04fc3',
		},
		{
			seed: 18,
			key: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
			expected: '70c9a2236889e825',
		},
		{
			seed: 19,
			key: '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
			expected: 'b650386c8c24729e',
		},
	];

	for (const tc of testCases) {
		it(`should return '${tc.expected}' for '${tc.key}' with seed '${tc.seed}'`, () => {
			expect(wyhash(BigInt(tc.seed), tc.key)).toBe(tc.expected);
		});
	}
});
