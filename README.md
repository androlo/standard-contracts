# Solidity contracts (Alpha)

This repository has a number of Solidity contracts in it. Some of these contracts will potentially make it into an official Solidity standard library. In fact this repo is mostly just used as side-storage.

**Warning: This is a brand new library. All the code in here is still in development, and should be considered unreliable. Do not deploy any of this code onto a public node and use it in production.**

## Table of Content

- [Bytes](#bytes)
- [Math](#math)
- [Tests and Validation](#tests-and-validation)

## Bytes

Contracts used for working with bytes.

### ByteSlice

A `ByteSlice` is created from memory variables of type `bytes`. It is possible to create new slices out of slices using the `copy` methods, and to extract a `bytes` variable from the slice through the `toBytes` methods.

Since dynamic arrays and internal types are used in function input and output, this contract is meant to be `extended`. Later it will be possible to use as a library, when some (planned) upgrades has been made to libraries.

##### Usage with `string`

Strings are utf encoded, so it is not safe to just cast a string into bytes or vice versa, unless it is known in advance that it is an ASCII string. Then it is safe.

##### Internals

The `Slice` struct has two members of type `uint`:

`_unsafe_memPtr` - a pointer to the memory address where the bytes are stored.

`_unsafe_len` - the length (number of bytes).

Extracting the bytes out of a slice is done using the `toBytes` function, which creates a new `bytes memory` variable, sets its size to `len`, and copies all the bytes from memory address `memPtr` to `memPtr + len` to the new variable.

While the memory pointer in an empty slice is deleted (i.e. set to 0), the value stored at memory address 0 may not be 0. This doesn't matter during normal usage, because the empty slice can only be sliced into the empty slice, and the `bytes memory` produced when running `toBytes(emptySlice)` is always the same (i.e. `new bytes(0)`). There is also no way to de-allocate memory in Solidity. Just avoid messing with the pointer directly, and if you do, don't expect the value `_unsafe_memPtr` points to to be 0 - even when it (and perhaps also length) is 0.

#### fromBytes

Function for creating a new slice from a `bytes memory` variable.

##### examples

```
function f() {
    bytes memory bts = new bytes(56);
    var sFromBts = fromBytes(bts);
}
```

#### len

Returns the length of the provided slice.

##### examples

```
function f() {
    bytes memory bts = new bytes(56);
    var s = fromBytes(bts);
    var sLen = len(s); // 56
}
```

#### at

Returns the byte at the given position.

Using an index that exceeds `len(slice) - 1` will cause the function to throw.

Negative indices are allowed, with `at(s, -i) = at(s, len(s) - i), i <= len(s)`.

##### examples

```
function f() {
    bytes memory bts = new bytes(56);
    bts[5] = 2;
    var s = fromBytes(bts);
    var b = at(s, uint(5)); // 2
    var willThrow = at(s, uint(56));
}
```

#### newSlice

Functions for copying slices.

The no-argument version will simply copy the slice, i.e. `slice[:]`.

Providing a starting position will copy the slice starting from that index instead of 0, i.e. `slice[s:]`.

Providing a starting position and length will copy the slice starting from that index, and store the given length, i.e. `slice[s:t]`.

(There is no equivalence to `slice[:t]`, so `slice[0:t]` must be used)

Indices may be negative, i.e `slice[-1]`, `slice[-3:-2]`.

Optimized versions for unsigned integers are available.

If either the start or the end positions is out of bounds, the functions will throw.

##### examples

```
function f() {
    bytes memory bts = "abcdefg";
    var s = fromBytes(bts); // len(s) == 7

    var sCopy = newSlice(s); // Identical

    var s2 = newSlice(s, uint(5)); // slice on "fg"

    var s3 = newSlice(s, uint(5), 6); // slice on "f"

    var s4 = newSlice(s, -2); // slice on "fg"

    var s5 = newSlice(s, -4, -1); // slice on "def"
    var s6 = newSlice(s5, uint(1), 2); // slice on "e"

    var s7 = newSlice(s, uint(7), 7); // The empty slice.

    var willThrow = newSlice(s, uint(9));

    var willThrowToo = newSlice(s, uint(0), 8);
}
```

#### toBytes

Functions for creating a `bytes memory` from a slice. This will copy the bytes referenced by the slice.

##### examples

```
function f() {
    bytes memory bts = "abcdefg";
    var s = fromBytes(bts);
    var bts2 = toBytes(s); // Identical to 'bts'
    return toBytes(newSlice(s, uint(4))); // "efg"
}
```

## Math

Contracts used for doing math.

- [Integers](#integers)

### Integers

Functions that has to do with integers. Naming is trying to be consistent with similar solidity functions, e.g. 'invmod' and 'expmod' is like 'addmod', 'mulmod', etc.

#### invmod

`uint x = invmod(uint a, uint p)` is used to compute the modular inverse `ax = 1 (mod p)`.

Constraints: `a` and `p` must be coprime.

Uses the euclidian algorithm to find the modular inverse.

#### expmod

`uint x = expmod(b, e, m)` is used to compute the number `b**e % m`

The function is a Solidity adaptation of the exponentiation formula found in the [Serpent examples](https://github.com/ethereum/serpent/blob/develop/examples/ecc/modexp.se).

### Tests

Script used to generate some numbers for modular inverse:

```
testVals = [
    (0x56, 0x55),
    (0x2, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
    (0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
    (0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF),
    (0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F)

Output:
['0x0000000000000000000000000000000000000000000000000000000000000001',
 '0x8000000000000000000000000000000000000000000000000000000000000000',
 '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
 '0x41bce9245fc72552d8c1b4259d8130978376be5acb4a45d8f4d5b4da913e7eb6',
 '0xbe4316dba038daad273e4bda627ecf687c8941a534b5ba270b2a4b24b07e6798']
]

im = lambda a, p: "0x" + format(inverse_mod(a, p), '064x')
```


## Tests and validation

There are two main categories of tests, internal and external. Both are run over RPC to a development node, using web3 JavaScript.

External tests are just plain old calls made to the contract from web3.

Internal tests are done for contracts that are meant to be inherited, or called only from other contracts. Those type of contracts may not have a public interface, and making one could be hard because they use internal types. There are two ways to do internal tests:

1. Wrap the contract in another contract which exposes the internal functions, and do the tests against that contract.

2. Wrap the contract in another contract that does the actual tests in public functions that returns a boolean - true if the tests succeeded, otherwise false.

The first method works if the contract's input and output is on a format that can be used in RPC calls. The second method is used when that is not the case.

```
contract C {
    struct S {
        uint a;
        // ...
    }

    // 'f' can not be called from RPC
    function f() internal returns (S) {
        // ...
    }

    function g(S s) internal {
        // something
    }
}

contract TestC is C {

    // Return a part of S that we need for this test.
    function h(uint a) returns (uint) {
        var s = S(a);
        g(s);
        return s.a;
    }

}

contract AnotherTestC is C {

    // Return a part of S that we need for this test.
    function h(uint a) returns (bool ret) {
        var s = S(a);
        g(s);
        ret = s.a == 7;
        uint a2;

        // something to do with a2
        // ...

        var s2 = S(a2);
        g(s2);
        ret = ret && s2.a == 3; // Similar to doing multiple assertions in the same test-function.
    }

}
```

These tests are temporary solutions until a standard method for tests has been decided on. Solidity is [working on this](https://github.com/ethereum/solidity/issues/516).

The contracts and tests will also be updated when formal validation is fully supported (this is also a WIP).

#### Running tests

cd into the project root.

`npm install`

Start an ethereum development node, for example using the `-dev` flag with geth (not a testnet node). The tests assumes that an Ethereum node will answer to RPC calls on port `8545`. It will automatically use the first account in the accounts list (`accounts[0]`) as sender. Some test contracts may require a lot of gas, so you may have to crank up the gas limit.

When all is set up, run: `mocha integration_tests`

#### Test data

Test-data is sometimes generated using [Sage 7.0](http://www.sagemath.org/). The generation scripts are normally referenced so that the process can be replicated.

#### Note on optimization, inline assembly

The contracts will not be optimized until it's clear how formal verification will work, since that is a requirement for many of these contracts.