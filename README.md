# wyhash

This is latest v4.2 version of wyhash implemented in TypeScript.
It is a fast non-cryptographic hash function suitable for general hash-based lookup.

Original C implementation can be found [here](https://github.com/wangyi-fudan/wyhash)
Bun uses wyhash implementation from zig [here](https://github.com/ziglang/zig/blob/master/lib/std/hash/wyhash.zig)

## Benchmarks

Ξ bun run benchmark
...
---
        Used SEED = 1n (64-bit BigInt)
---
clk: ~3.27 GHz
cpu: Apple M2
runtime: bun 1.2.22 (arm64-darwin)

                             ┌                                            ┐
              wyhash(4) v4.2 ┤ 3.44 µs
              wyhash(8) v4.2 ┤ 728.13 ns
            wyhash(320) v4.2 ┤■ 20.81 µs
            wyhash(512) v4.2 ┤■■ 32.88 µs
           wyhash(1024) v4.2 ┤■■■■ 64.97 µs
           wyhash(8192) v4.2 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 522.88 µs
               wyhash(4) Bun ┤ 1.37 µs
               wyhash(8) Bun ┤ 1.36 µs
             wyhash(320) Bun ┤■ 20.87 µs
             wyhash(512) Bun ┤■■ 32.86 µs
            wyhash(1024) Bun ┤■■■■ 65.71 µs
            wyhash(8192) Bun ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 512.02 µs
                 Bun.hash(4) ┤ 381.83 ns
                 Bun.hash(8) ┤ 29.78 ns
               Bun.hash(320) ┤ 40.88 ns
               Bun.hash(512) ┤ 46.83 ns
              Bun.hash(1024) ┤ 67.31 ns
              Bun.hash(8192) ┤ 408.36 ns
                             └                                            ┘

wyhash(4) v4.2:
Quantile        P_25            P_50            P_75
time, µs        3.125           3.209           3.417           
thrp, MiB/s     1.220           1.188           1.116           
wyhash(8) v4.2:
Quantile        P_25            P_50            P_75
time, µs        0.715           0.720           0.729           
thrp, MiB/s     10.670          10.596          10.465          
wyhash(320) v4.2:
Quantile        P_25            P_50            P_75
time, µs        20.709          20.822          20.865          
thrp, MiB/s     14.736          14.656          14.626          
wyhash(512) v4.2:
Quantile        P_25            P_50            P_75
time, µs        32.749          32.822          32.934          
thrp, MiB/s     14.909          14.876          14.826          
wyhash(1024) v4.2:
Quantile        P_25            P_50            P_75
time, µs        64.125          64.500          65.000          
thrp, MiB/s     15.229          15.140          15.024          
wyhash(8192) v4.2:
Quantile        P_25            P_50            P_75
time, µs        510.625         515.750         530.416         
thrp, MiB/s     15.299          15.147          14.729          
wyhash(4) Bun:
Quantile        P_25            P_50            P_75
time, µs        1.357           1.361           1.368           
thrp, MiB/s     2.811           2.802           2.788           
wyhash(8) Bun:
Quantile        P_25            P_50            P_75
time, µs        1.348           1.354           1.364           
thrp, MiB/s     5.659           5.634           5.593           
wyhash(320) Bun:
Quantile        P_25            P_50            P_75
time, µs        20.741          20.892          20.958          
thrp, MiB/s     14.713          14.607          14.561          
wyhash(512) Bun:
Quantile        P_25            P_50            P_75
time, µs        32.672          32.721          32.881          
thrp, MiB/s     14.944          14.922          14.849          
wyhash(1024) Bun:
Quantile        P_25            P_50            P_75
time, µs        64.510          64.913          65.908          
thrp, MiB/s     15.138          15.044          14.817          
wyhash(8192) Bun:
Quantile        P_25            P_50            P_75
time, µs        499.542         504.041         518.625         
thrp, MiB/s     15.639          15.499          15.063          
Bun.hash(4):
Quantile        P_25            P_50            P_75
time, µs        0.333           0.375           0.375           
thrp, MiB/s     11.455          10.172          10.172          
Bun.hash(8):
Quantile        P_25            P_50            P_75
time, µs        0.029           0.029           0.030           
thrp, MiB/s     263.082         263.082         254.313         
Bun.hash(320):
Quantile        P_25            P_50            P_75
time, µs        0.040           0.040           0.041           
thrp, MiB/s     7629.394        7629.394        7443.311        
Bun.hash(512):
Quantile        P_25            P_50            P_75
time, µs        0.046           0.046           0.047           
thrp, MiB/s     10614.809       10614.809       10388.962       
Bun.hash(1024):
Quantile        P_25            P_50            P_75
time, µs        0.066           0.067           0.068           
thrp, MiB/s     14796.401       14575.559       14361.213       
Bun.hash(8192):
Quantile        P_25            P_50            P_75
time, µs        0.405           0.407           0.411           
thrp, MiB/s     19290.123       19195.331       19008.515

--------------------------------------------------------------------------

clk: ~3.19 GHz
cpu: Apple M2
runtime: node 22.19.0 (arm64-darwin)

                             ┌                                            ┐
              wyhash(4) v4.2 ┤ 607.97 ns
              wyhash(8) v4.2 ┤ 663.14 ns
            wyhash(320) v4.2 ┤ 7.44 µs
            wyhash(512) v4.2 ┤■ 11.48 µs
           wyhash(1024) v4.2 ┤■ 22.29 µs
           wyhash(8192) v4.2 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 687.19 µs
               wyhash(4) Bun ┤ 779.99 ns
               wyhash(8) Bun ┤ 790.23 ns
             wyhash(320) Bun ┤ 6.60 µs
             wyhash(512) Bun ┤ 9.91 µs
            wyhash(1024) Bun ┤■ 18.47 µs
            wyhash(8192) Bun ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 682.07 µs
                             └                                            ┘

wyhash(4) v4.2:
Quantile        P_25            P_50            P_75
time, µs        0.591           0.603           0.618           
thrp, MiB/s     6.454           6.326           6.172           
wyhash(8) v4.2:
Quantile        P_25            P_50            P_75
time, µs        0.647           0.658           0.669           
thrp, MiB/s     11.791          11.594          11.404          
wyhash(320) v4.2:
Quantile        P_25            P_50            P_75
time, µs        7.410           7.423           7.447           
thrp, MiB/s     41.184          41.112          40.979          
wyhash(512) v4.2:
Quantile        P_25            P_50            P_75
time, µs        11.447          11.474          11.498          
thrp, MiB/s     42.655          42.555          42.466          
wyhash(1024) v4.2:
Quantile        P_25            P_50            P_75
time, µs        22.166          22.233          22.298          
thrp, MiB/s     44.056          43.924          43.795          
wyhash(8192) v4.2:
Quantile        P_25            P_50            P_75
time, µs        559.333         659.500         798.459         
thrp, MiB/s     13.967          11.846          9.784           
wyhash(4) Bun:
Quantile        P_25            P_50            P_75
time, µs        0.765           0.775           0.786           
thrp, MiB/s     4.986           4.922           4.853           
wyhash(8) Bun:
Quantile        P_25            P_50            P_75
time, µs        0.778           0.788           0.797           
thrp, MiB/s     9.806           9.681           9.572           
wyhash(320) Bun:
Quantile        P_25            P_50            P_75
time, µs        6.504           6.520           6.560           
thrp, MiB/s     46.921          46.806          46.520          
wyhash(512) Bun:
Quantile        P_25            P_50            P_75
time, µs        9.840           9.859           9.915           
thrp, MiB/s     49.622          49.526          49.246          
wyhash(1024) Bun:
Quantile        P_25            P_50            P_75
time, µs        18.373          18.449          18.478          
thrp, MiB/s     53.152          52.933          52.850          
wyhash(8192) Bun:
Quantile        P_25            P_50            P_75
time, µs        535.708         683.125         811.292         
thrp, MiB/s     14.583          11.436          9.629


## Bun used for this project

To install dependencies:

```bash
bun install
```

To run tests:

```bash
bun test
```

To run benchmarks:

```bash 
bun run benchmark
```
To build JS:

```bash
bun run build
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
