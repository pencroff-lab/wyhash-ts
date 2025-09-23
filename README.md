# wyhash

This is latest v4.2 version of wyhash implemented in TypeScript.
It is a fast non-cryptographic hash function suitable for general hash-based lookup.

Original C implementation can be found [here](https://github.com/wangyi-fudan/wyhash)
Bun uses wyhash implementation from zig [here](https://github.com/ziglang/zig/blob/master/lib/std/hash/wyhash.zig)

## Benchmarks

clk: ~3.39 GHz
cpu: Apple M2
runtime: bun 1.2.22 (arm64-darwin)

                             ┌                                            ┐
                wyhash(1, 4) ┤■■■■■■ 3.39 µs
                wyhash(1, 8) ┤■ 730.68 ns
              wyhash(1, 320) ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 20.75 µs
            wyhash_bun(1, 4) ┤■■ 1.35 µs
            wyhash_bun(1, 8) ┤■■ 1.34 µs
          wyhash_bun(1, 320) ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 20.58 µs
              Bun.hash(4, 1) ┤■ 398.20 ns
              Bun.hash(8, 1) ┤ 36.40 ns
            Bun.hash(320, 1) ┤ 42.56 ns
                             └                                            ┘

wyhash(1, 4):
Quantile        P_25            P_50            P_75
time, µs        3.042           3.167           3.416           
thrp, MiB/s     1.254           1.204           1.116           
wyhash(1, 8):
Quantile        P_25            P_50            P_75
time, µs        0.717           0.723           0.733           
thrp, MiB/s     10.640          10.552          10.408          
wyhash(1, 320):
Quantile        P_25            P_50            P_75
time, µs        20.670          20.709          20.790          
thrp, MiB/s     14.764          14.736          14.678          
wyhash_bun(1, 4):
Quantile        P_25            P_50            P_75
time, µs        1.334           1.338           1.345           
thrp, MiB/s     2.859           2.851           2.836           
wyhash_bun(1, 8):
Quantile        P_25            P_50            P_75
time, µs        1.330           1.334           1.341           
thrp, MiB/s     5.736           5.719           5.689           
wyhash_bun(1, 320):
Quantile        P_25            P_50            P_75
time, µs        20.363          20.473          20.667          
thrp, MiB/s     14.986          14.906          14.766          
Bun.hash(4, 1):
Quantile        P_25            P_50            P_75
time, µs        0.334           0.375           0.417           
thrp, MiB/s     11.421          10.172          9.147           
Bun.hash(8, 1):
Quantile        P_25            P_50            P_75
time, µs        0.030           0.031           0.033           
thrp, MiB/s     254.313         246.109         231.193         
Bun.hash(320, 1):
Quantile        P_25            P_50            P_75
time, µs        0.041           0.041           0.043           
thrp, MiB/s     7443.311        7443.311        7097.111        

clk: ~3.19 GHz
cpu: Apple M2
runtime: node 22.19.0 (arm64-darwin)

                             ┌                                            ┐
                wyhash(1, 4) ┤ 764.73 ns
                wyhash(1, 8) ┤ 1.17 µs
              wyhash(1, 320) ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 156.74 µs
            wyhash_bun(1, 4) ┤ 813.42 ns
            wyhash_bun(1, 8) ┤ 793.95 ns
          wyhash_bun(1, 320) ┤■ 6.59 µs
                             └                                            ┘

summary
wyhash_bun(1, $size)
+23.78…-1.04x faster than wyhash(1, $size)
wyhash(1, 4):
Quantile        P_25            P_50            P_75
time, µs        0.627           0.667           0.766           
thrp, MiB/s     6.084           5.719           4.980           
wyhash(1, 8):
Quantile        P_25            P_50            P_75
time, µs        0.736           0.930           1.369           
thrp, MiB/s     10.366          8.203           5.572           
wyhash(1, 320):
Quantile        P_25            P_50            P_75
time, µs        117.333         131.917         152.959         
thrp, MiB/s     2.600           2.313           1.995           
wyhash_bun(1, 4):
Quantile        P_25            P_50            P_75
time, µs        0.777           0.790           0.807           
thrp, MiB/s     4.909           4.828           4.727           
wyhash_bun(1, 8):
Quantile        P_25            P_50            P_75
time, µs        0.779           0.790           0.801           
thrp, MiB/s     9.793           9.657           9.524           
wyhash_bun(1, 320):
Quantile        P_25            P_50            P_75
time, µs        6.574           6.582           6.595           
thrp, MiB/s     46.421          46.365          46.273


## Bun used for this project

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
