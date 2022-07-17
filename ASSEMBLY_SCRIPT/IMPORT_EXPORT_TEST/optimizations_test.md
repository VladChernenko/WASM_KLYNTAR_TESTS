# Intro





# Test1


## Default

asc test2.ts -O -o test.wasm


```shell

Result: 67 bytes

```

## Maximum speed/size optimisation

asc test2.ts -O -o test.wasm -O3z


```shell

Result: 67 bytes

```

<br/><br/>

# Test2

## No flags

asc optimization.ts -o opt.wasm


```shell

Result: 5.22 KB

```

## Default

asc optimization.ts -O -o opt.wasm


```shell

Result: 750 bytes

```

## Maximum speed/size optimisations

asc optimization.ts -O3z -o opt.wasm


```shell

Result: 750 bytes

```