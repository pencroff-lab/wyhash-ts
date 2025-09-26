import { run, bench, barplot, summary } from 'mitata';
import _ from 'lodash';
import { wyhash } from './wyhash';
import { wyhash_bun } from './wyhash_bun.ts';

const isBun = typeof globalThis.Bun !== 'undefined';

console.log("---\n\tUsed SEED = 1n (64-bit BigInt)\n---");

barplot(() => {
	summary(() => {
		// @ts-ignore
		bench('wyhash($size) v4.2', function* (state) {
			const size = state.get('size');
			const data = 'a'.repeat(size);
			yield () => wyhash(1n, data);
		})
			.args('size', [4, 8, 320, 512, 1024, 8192])
			.gc('inner');
		bench('wyhash($size) Bun', function* (state: { get: (arg0: string) => any; }) {
			const size = state.get('size');
			const data = 'a'.repeat(size);
			yield () => wyhash_bun(1n, data);
		})
			.args('size', [4, 8, 320, 512, 1024, 8192])
			.gc('inner');
		isBun &&
		bench('Bun.hash($size)', function* (state: { get: (arg0: string) => any; }) {
			const size = state.get('size');
			const data = 'a'.repeat(size);
			yield () => Bun.hash(data, 1n);
		})
			.args('size', [4, 8, 320, 512, 1024, 8192])
			.gc('inner');
	});
});

const out = await run();

_.chain(out)
	.get('benchmarks')
	.reduce((acc, b: unknown) => {
		const lst = _.get(b, 'runs') as unknown as unknown[];
		acc.push(...lst);
		return acc;
	}, [] as unknown[])
	.map((b: unknown): [string, number, number, number, number] => {
		// @ts-ignore
		const name = _.replace(b.name, '))', ')');
		const size = _.get(b, 'args.size') as unknown as number;
		const p25 = _.get(b, 'stats.p25') as unknown as number;
		const p50 = _.get(b, 'stats.p50') as unknown as number;
		const p75 = _.get(b, 'stats.p75') as unknown as number;
		return [name, size, p25, p50, p75];
	})
	.each(([name, size, p25, p50, p75]) => {
		const p25Ns = Math.round(p25 ?? 0);
		const p50Ns = Math.round(p50 ?? 0);
		const p75Ns = Math.round(p75 ?? 0);
		const bytesPerIter = size ?? 1;
		const mibP25 = toThroughput(bytesPerIter, p25Ns, false);
		const mibP50 = toThroughput(bytesPerIter, p50Ns, false);
		const mibP75 = toThroughput(bytesPerIter, p75Ns, false);
		const timeRow = _.map([p25Ns / 1e3, p50Ns/1e3, p75Ns/1e3], asRowEl).join('');
		const thrpRow = _.map([mibP25, mibP50, mibP75], asRowEl).join('');
		console.log(
			`${name}:\n` +
			`Quantile\tP_25\t\tP_50\t\tP_75\n` +
			`time, µs\t${timeRow}\n` +
			`thrp, MiB/s\t${thrpRow}`,
		);
	})
	.value();


/**
 * Compute throughput as either
 *   Mbps (megabits  per second) when isMb = true  → divisor 1 000 000
 * or
 *   MiB/s (mebibytes per second) when isMb = false → divisor 1 048 576
 *
 * @param {number} bytesPerIter – bytes processed per iteration
 * @param {number} medianNs     – median elapsed time in nanoseconds
 * @param {boolean} isMb         – true → Mbps, false → MiB/s
 * @param {number} decimals       – fixed decimal places (default 3)
 * @returns {number} throughput rounded to `decimals` places
 */
function toThroughput(
	bytesPerIter: number,
	medianNs: number,
	isMb: boolean,
	decimals = 3,
) {
	const scale = 10n ** BigInt(decimals);

	const bytes = BigInt(bytesPerIter);
	const ns = BigInt(medianNs);

	// Common factor: convert ns → s (×1e9) and bytes
	const num = bytes * 1_000_000_000n * scale; // bits·scale

	// Denominator: 1 000 000 for Mb, 1 048 576 for MiB
	const divisor = isMb ? 1_000_000n : 1_048_576n;

	const den = ns * divisor;
	const q = num / den; // integer division
	return Number(q) / Number(scale);
}

function asRowEl(v: number) {
	const vStr = v.toFixed(3);
	const tabs = vStr.length <= 7 ? '\t\t' : '\t';
	return `${vStr}${tabs}`;
}