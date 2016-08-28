# Solidity contracts (Beta)

This repository has a number of Solidity contracts in it. Some of these contracts will potentially make it into an official Solidity standard library.

Contract imports uses the github path, so can be imported into the online compiler, or the repo can be cloned and contract compiled locally using solc's path re-mapping features.

Short descriptions of contracts and methods can be found in this README, as well as some examples. More detailed documentation can be found in the contracts themselves.

**Warning: All the code in here is still in development, and should be considered unreliable. Do not deploy any of this code onto a public node and use it in production.**

**This is also a personal side project with no deadlines or dev plan.**

## Table of Content

- [Grading](#grading)
- [Tests and Validation](#tests-and-validation)
- [Bits](#bits)
  - [BitOps](#bitops)
- [Bytes](#bytes)
  - [ByteSlice](#byteslice)
- [Codec](#codec)
  - [RLP](#rlp)
  - [ECCConversion](#eccconversion)
- [Crypto](#crypto)
  - [Curve](#curve)
  - [ECCMath](#eccmath)
  - [Secp256k1](#secp256k1)
  - [Secp256k1curve](#secp256k1curve)

## Grading

There is a system of grades for contracts. Grades are found along with the version in contract descriptions. They are temporary and will be changed when the library is stable (new contracts will be developed on separate branches then).

Generally speaking, contracts with a grade less then `3` should not be used, and those less then `5` should only be used when testing.

#### Grades

1. (`Incomplete`) Contract is incomplete; code is still being added.

2. (`Draft`) First draft is complete, and contract is being tested.

3. (`Tested`) Unit-tests are written, and contract has been debugged.

4. (`Optimized`) Contract has been optimized.

5. (`Stable`) Contract is production ready.

## Tests and validation

The tests are done over RPC calls from Node.js, using `web3` - the official Ethereum JavaScript API. They require a running development node. Any Ethereum client should work in theory, but the tests has only been run against a `geth` node.

Latest compilation and testing was done using: `0.3.4-7dab8902/Release-Emscripten/clang/Interpreter`

### Running

To run tests, cd into the project root and type:

`npm install`

Start an ethereum development node, for example using the `-dev` flag with `geth` (not a testnet node). The tests assumes that an Ethereum node will answer to RPC calls on port `8545`. It will automatically use the first account in the accounts list (`accounts[0]`) as sender. Some test contracts require a lot of gas, so you may have to crank up the gas limit and make sure the active account has a lot of gas.

When all is set up, run: `mocha integration_tests`

#### Test data

Test-data is sometimes generated using [Sage 7.0](http://www.sagemath.org/). The generation scripts are normally included so that the process can be replicated.

#### Note on optimization, inline assembly

The contracts will not be fully optimized until it's clear how formal verification will work, since that is a requirement for many of these contracts. Assembly might be removed from some contracts and functions.

## Bits

Contracts for working with bits.

### BitOps

#### Version 1.0

#### Status: Optimized

`Bits` is a library with methods for reading, writing, and manipulating individual or groups of bits. The methods operates on `uint` variables.

#### Examples

```
uint u = 10;

/* Get the bit at the given index (0 to 255 inclusive) */
u.bit(0) // 0 (1)
u.bit(1) // 1 (2)
u.bit(2) // 0 (4)
u.bit(3) // 1 (8)

/* Check if a bit is set */
u.bitSet(0) // false
u.bitSet(3) // true

/* Set the bit at the given index */
u = u.setBit(2) // u = 14

/* bitsSet(i, len) checks if the bits i, i + 1, ... , i + len - 1 are all set */
u.bitsSet(2, 2) // true  (bits 2 and 3 are both set)
u.bitsSet(0, 3) // false (bit 0, 1 and 2 are not all set)

/* Toggle a bit */
u = u.bitToggle(0) // u = 15

/* Clear a bit */
u = u.bitClear(3) // u = 7
```

Assuming the indices and lengths are within bounds:

```
uint(~0).get(i) = 1;

uint u = uint(0).set(i); u == 2**i;

u.bit(i) == u.bits(i, 1); // Same for bitEqual, bitAnd, bitOr, and bitXor.

u.bitEqual(v, i) == (u.bit(i) == v.bit(i))
u.bitAnd(v, i) == u.bit(i) & v.bit(i) // etc.

u.bitsEqual(v, i, len) == (u.bits(i, len) == v.bits(i, len)) // Same as above.
```

## Bytes

Contracts used for working with bytes.

### ByteSlice

#### Version 1.0

#### Status: Optimized

A `ByteSlice` is created from memory variables of type `bytes`. It is possible to slice slices, access bytes by index, and to extract a `bytes` variable from the slice.

Since dynamic arrays and internal types are used in function input and output, this contract is meant to be `extended`. Later it will be possible to use as a library, when some (planned) upgrades has been made to libraries.

##### Usage with `string`

Strings are utf encoded, so it is not safe to just cast a string into bytes or vice versa, unless it is known in advance that it is an ASCII string. Then it is safe.

##### Internals

The `Slice` struct has two members of type `uint`:

`_unsafe_memPtr` - a pointer to the memory address where the bytes are stored.

`_unsafe_len` - the length (number of bytes).

Extracting the bytes out of a slice is done using the `toBytes` function, which creates a new `bytes memory` variable, sets its size to `len`, and copies all the bytes from memory address `memPtr` to `memPtr + len - 1` into the new variable.

#### examples

```
bytes memory bts = "abcdefg"; // Create a new 'bytes' variable in memory.


/* Slicing bytes */

var s = bts.slice(); // Create a slice on "abcdefg".

var sa = bts.slice(uint(2)); // Create a slice on "cdefg"

var sb = bts.slice(-3); // Create a slice on "efg"

var sc = bts.slice(uint(1), 2); // Create a slice on "b"

/* Slicing slices */

var sCopy = s.slice(); // slice on "abcdefg"

var s2 = s.slice(uint(5)); // slice on "fg"

var s3 = s.slice(uint(5), 6); // slice on "f"

var s4 = s.slice(-2); // slice on "fg"

var s5 = s.slice(-4, -1); // slice on "def"

var s6 = s5.slice(uint(1), 2); // slice on "e"

var sEmpt = s.slice(uint(7), 7); // The empty slice.

var sEmpt2 = (new bytes(0)).slice(); // The empty slice.

var sWillThrow = s.slice(uint(9));

var sWillThrowToo = s.slice(uint(0), 8);


/* length */

var len = s.len(); // 7

var len2 = s2.len(); // 2

var len3 = sEmpt.len(); // 0


/* Index access */

var b = s.at(uint(2)); // 'c'

var b2 = s.at(-2); // 'f'

var bWillThrow = s.at(uint(7)); // Index out of bounds.

s.set(uint(2), 'x'); // s.at(uint(2)) == 'x'

s.set(-2, 'y'); // s.at(-2) == s.at(uint(4)) == 'y'

s.set(uint(7), 'z'); // Will throw


/* Converting to 'bytes memory' */

var bts2 = s.toBytes(); // "abcdefg". Copies 7 bytes.

var bts3 = s.slice(-2).toBytes(); // "fg". Copies 2 bytes.

/* Equals */

var eq = s.equal(s); // true

s.equal(sEmpt); // false

delete s;

s.equal(sEmpt); // true
```

## Codec

Contracts used for various different types of encoding and decoding.

- [RLP](#rlp)
- [ECCConversion](#eccconversion)

### RLP

#### Version 2.0

#### Status: Tested

Used to parse and decode RLP encoded data. The encoded bytes is converted into an `RLPItem` which keeps track of the bytes in memory, and has methods for decoding and extracting new items from lists.

Working with items will never copy any of the raw RLP encoded bytes; only new `RLPItem`s and `Iterator`s. Those are both simple items that takes 2 and 3 words of memory space.

Decoding an item into a reference type (i.e. `bytes` or `string`) will copy the required bytes, so use with care.

Encoding is not (yet) supported.

#### Examples

```
bytes memory data; // input

/* data = "0x880102030405060708" */

var itm = data.toRLPItem(); // Create a new RLP Item

item.isData(); // true

item.isList(); // false

item.items(); // 0

item.toBytes(); // "0x880102030405060708" - the raw RLP-encoded bytes.

item.toData(); // "0x0102030405060708" - The data.

/* data = "0x11" */

var itm = data.toRLPItem();

uint u = itm.toUint(); // 17

address a = itm.toAddress(); // 0x0000000000000000000000000000000000000011

/* data = "0x80" */

var itm = data.toRLPItem();

itm.isEmpty(); // false

itm.isData(); // true

/* data = "0x01" */

var itm = data.toRLPItem();

itm.toBool(); // True

// This is the RLP encoding of [[1, 2], 1, [1, 2, 3]]
/* data = "0xC8C2010201C3010203" */

var itm = rlpList.toRLPItem();

itm.isList(); // true

itm.items(); // 3

itm.toList(); // RLPItem[] of length 3 (one for each list-item)

// Using iterators.

var subItm = itm.iterator().next(); // RLPItem for [1, 2]

var it2 = subItem.iterator();

while(it2.hasNext())
    it2.next().toUint() // 1, 2

it2.next(); // will throw

/* data = "0x" */

var itm = nullBts.toRLPItem();

itm.isNull(); // true

itm.isData(); // false

itm.isList(); // false

itm.isEmpty() // false

// Strict mode (costs more, but useful when RLP data may be malformed).

/* data = "0x81" */

var itm = data.toRLPItem(true); // will throw

/* data = "0x8101" */

var itm = data.toRLPItem(true); // will throw

/* data = "0xC211 */

var itm = data.toRLPItem(true); // will throw

```

### ECCConversion

#### Version 1.0

#### Status: Draft

Used to convert ECC data between different formats.

## Crypto

Contracts used for cryptographic operations.

Hashing primitives are not implemented, because Solidity already [provide some](http://solidity.readthedocs.io/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions).

**Warning: Crypto operations can be very expensive, so should not be done on the public chain. This includes the ECC math functions as well.**

- [Curve](#curve)
- [ECCMath](#eccmath)
- [Secp256k1](#secp256k1)
- [Secp256k1curve](#secp256k1curve)

### Curve

#### Version 1.0

#### Status: Stable

Curve is an interface for elliptic curves. The cryptographic properties (e.g. defined over finite fields) of these curves are implied.

The only functions that may be implemented are those that does not involve passing a private key to the contract, meaning functions like 'sign' and 'private-to-public' are not included. There is also no public key recovery function in the interface yet, because there is a built in function for secp256k1 (and for some other reasons).

The contracts use the mathematical representations of coordinates and points, and is thus key-format agnostic. Contracts that require keys to be encoded in a particular way would manage the encoding/decoding themselves; and delegate the actual curve operations to whatever implementation is used (only `secp256k1` is provided at this point).

Details can be found here:

[SEC 1: Elliptic Curve Cryptography, Version 2.0](http://www.secg.org/sec1-v2.pdf)

[SEC 2: Recommended Elliptic Curve Domain Parameters, Version 2.0](http://www.secg.org/sec2-v2.pdf)

[Lower-s signatures](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki#low-s-values-in-signatures) (requirement for homestead signatures).

#### onCurve

Check if a point `P` (given in affine coordinates) is on the curve.

#### isPubKey

Check if a point `P` (given in affine coordinates) is a valid public key.

#### compress

Get the compressed form of a point `Q = (Qx, Qy)`, `C(Q) = (Qx, Qy % 2)`.

#### decompress

For a given `Px` and a `yBit = Py % 2`, returns the point `P = (Px, Py)`.

#### validateSignature

Validate the signature `(r, s)` of a 32 byte hash `msg` against a public key `Q`. Returns `true` if the signature is valid. Will only validate signatures on lower-s form.

### ECCMath

#### Version 1.0

#### Status: Optimized

Math helper. Naming is trying to be consistent with similar solidity functions, e.g. 'invmod' and 'expmod' is like 'addmod', 'mulmod', etc.

#### invmod

`uint x = invmod(uint a, uint p)` is used to compute the modular inverse `ax = 1 (mod p)`.

Constraints: `a` and `p` must be coprime.

Uses the euclidean algorithm to find the modular inverse.

#### expmod

`uint x = expmod(b, e, m)` is used to compute the number `b**e % m`

The function is a Solidity adaptation of the exponentiation formula found in the [Serpent examples](https://github.com/ethereum/serpent/blob/develop/examples/ecc/modexp.se).

#### toZ1

Used internally to transform an arbitrary (Jacobian) point `P = (Px, Py, Pz)` to `P' = (Px', Py', 1)`. `(Px, Py)` is the affine coordinates. The second variety (with 4 parameters) is used in `mul` during the Montgomery inversion.

### Secp256k1

#### Version 1.0

#### Status: Optimized

Library functions for the `secp256k1` curve. Includes internal versions of the `Curve` functions but also a number of internal functions for doing point arithmetic.

The output of all function is in Jacobian coordinates.

NOTE: You may notice weird arrays and other types where it looks as if they shouldn't be needed. That's mainly to work around the stack item limitations and some optimizer issues. This is a problem, and I will replace the code gradually as it becomes possible.

#### add

Point-addition of two points `P` and `Q`. Both input points must be expressed in Jacobian coordinates.

#### addMixed

Same as `add` except the second point is expressed in affine coordinates.

#### addMixedM

Same as `addMixed` but mutates the first point rather then creating a new one.

#### double

Doubles a point `P`. The point must be expressed in Jacobian coordinates.

#### doubleM

Same as `double` but mutates the point.

#### mul

Multiplication of a scalar `d` and a point `P`. The point must be expressed in affine coordinates.

### Secp256k1Curve

#### Version 1.0

#### Status: Optimized

Implementation of `Curve` based on the `secp256k1` library.

### Tests

Keys generated using OpenSSL.

The ephemeral `k` values used for signatures are just random numbers between 1 and `n - 1` (inclusive), where `n` is the order of the generator point.

To generate the test signatures from `k`, the following Sagemath script was used:

```
# ('k', 'private key')
ks = [
    (0xb578a05106a1e1975d2082add46aad13d76e3ce3b9d2dcabc5f651c9a29fa822, 0x2569d5e120b10d696933074eecb9182719fb3a89b7714bc99037d8416b391436),
    (0x7a12fac8796af10ce7dbfc68271d87ca685950a27ab4222c8b720210fe2c21c5, 0xe370174cb9fea3b5c1ef39bcdf36d321cefb06e0e8a6cb856e1bb3e9be3c4385),
    (0x13018a36dc981d6ef697ebcb809dc8966773748284281f2338752d2a889fc798, 0xa5378a4c6db7a076af65cd728f6fe3cf59f416a3d8f74b31b0d76f666a868d09),
    (0x534813f6aded11b19e45ffc3cd77841783f2928ddd427d4e793808f476c305dd, 0x40a62a62984797e129b9f84fb0202a10c37b52ad83da2d4f3f11c6a8587999f6),
    (0xa2d19750e168a6faf9f6b406ed2484f990e90bca4c139d6a8a5d298a687286b2, 0x32e3506d0cf7c8e73c5692f67e6b4c2377a5c0728b4719ff948f420609a3bcdf),
    (0x4bb2d83327145d0fa4e5aa9a28dc3d4cdf87cf13cdf6505109d07b770be0559f, 0x1b3c26da0280b299ecfbdc8d9b6e69677094f1c034010a9a27ba482185355ec2),
    (0x1f7a57c5f5820236e274ec33802a8c9171f76e5a246bbc71c1dc8afcf51d0f33, 0x9a2e734e0057dc4cbbf8418f9e3d7b9a638e121f1e217884579284b802d0fab3),
    (0xb42ae0689c162dcd8de571a7e5caa2ea24d5336eaeae3e9fbcf6946613165878, 0xb79a54eb34d1a2f75d956f593dbd08fb75d307847838a64aec9adc0ae74c3bb0),
    (0xc908c6aad4690e029b66333fce8660ccb7b9953890ef566734a67be156f5a2fd, 0xb15b46827e551c12f8bfe066a634aacfd907be42186ec3e4b3d69baf8efa5bde),
    (0x22a2b8da7df2da2ced4b4b1ab59cd1f877147cad336ff0d2d01384ddac86c38f, 0xd83a52c3d1965d9ace37fde20da4eb4c98184c6cfc8b33b1b0c56be36f3fc5c0),
    (0x72407c35a1e2db22521847e9e78f5227bccef8243df1462affe4013e437a875b, 0x013263a84e05ca597f3c6cdeae5b33349c618308ac5ef844de0aa5b788d0a3a8),
    (0x17a332b7124cbf26c4ee6a49d7f68955b23735e4f10acdd27582a653518609b8, 0x6ac0b7ddefa89ca0f129cba3ddda3b4a6e126d43363b4509bd6c9334dd81e0fa),
    (0x5f87ee0a303eaf5b88c5b84c307194dc896e462fd0242f512ded874fce5a2b25, 0xba87e08dc57311d5518c7d46958f3e647baed528313952cc5cf34e14f3b523af),
    (0xa3622fc8d2f1dac4d29e0fddc90d2b99b8eb9d13acec78dfeead2e66452122af, 0xd8c21bd40cdd0603666fa5c6199d8058050872913fa0c68feb53fed3df35695e),
    (0x950a753f782bb0a103359b4d54101df4c06910a72338a5592f2a17f2e5868659, 0x839793d1f796da91096cd1641d06593b6f6c3dadc12e0ccd7eaaf1f10c752c25),
    (0xe6f0e82e0bed605dcba808164c809a50da65db8b39ef68658c62c32ba715c069, 0x5c745e065ad28124ca941b02abd0ebdb4502d0c70058ddd7dfa9b659165e76a4),
    (0xe9d62c056727ccca3946a11f8822df06c14e830d36340181de2075146501091e, 0x03eebcbd7958778591670c9d47c09fccd94a6dd05f13ee6b6f5f4d5a640f293c),
    (0xa4d0c416ee4a8bd8337455e00f9e9d888d644cf9b0db343f0de8521606c14eda, 0xa46f162d79d24ceaf81ef56d118d904067d1e78d9a17ef91f3542183dfb44665)
]

p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
msg = 0x590910812c6348ea5bb6a5d503200ffee73d337801843b857f74e3b5a6a2229d
lowSmax = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
ZZn = Integers(n)
secp256k1 = EllipticCurve(FiniteField(p), (0, 7))
G = secp256k1.point((
	0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
	0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
))

def sign(k, dQ):
    R = k*G
    r = ZZn(R[0])
    s = ZZn((msg + r*dQ)/k)
    if s > lowSmax:
        s = n - s
    return ("0x" + format(Integer(r), '064x'), "0x" + format(Integer(s), '064x'))

[sign(k, dQ) for (k, dQ) in ks]
```

Script for generating random curve-points.

```
tohex = lambda s: "0x" + format(Integer(s), '064x')
tohex3 = lambda (x, y, z): (tohex(x), tohex(y), tohex(z))
randpoints = [tohex3(secp256k1.random_point()) for i in range(0, 40)]
```

Script for calculating sums from randpoints (each element plus the next one).

```
sums = []
for i in range(1, 40):
    P = secp256k1.point((Integer(randpoints[i - 1][0]), Integer(randpoints[i - 1][1])));
    Q = secp256k1.point((Integer(randpoints[i][0]), Integer(randpoints[i][1])));
    sums.append(tohex2(P + Q))
```

Script for doubling each point.

```
dbls = []
for i in range(0, 40):
    P = secp256k1.point((Integer(randpoints[i][0]), Integer(randpoints[i][1])));
    dbls.append(tohex2(P + P))
```

Script for generating a series of random elements in Z/pZ.

```
ZZp = Integers(p)
randints = [tohex(ZZp.random_element()) for i in range(0, 40)]
```

Script for doing point multiplication of random integers and points.

```
prods = []
for i in range(0, 40):
    P = secp256k1.point((Integer(randpoints[i][0]), Integer(randpoints[i][1])));
    prods.append(tohex2(Integer(randints[i]) * P))
```

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
