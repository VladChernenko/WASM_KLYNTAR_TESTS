# How to use AssemblyScript


```shell

//Globally
npm install assemblyscript -g

//In project dir
pnpm add @assemblyscript/loader

```

Then use my default flags set

```shell

asc add.ts -O -b esm -o add.wasm

```


To pass strings


```shell

asc concat.ts -b esm -o concat.wasm --exportRuntime

```


# Getting started with Rust and KLYNTAR VM

Create lib package

```shell

cargo init MY_RUST_CONTRACT --lib

cd MY_RUST_CONTRACT

```

Finally build

```shell

cargo build --target wasm32-unknown-unknown --release

```