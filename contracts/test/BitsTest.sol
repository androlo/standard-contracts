import {Bits} from "github.com/androlo/standard-contracts/contracts/src/bits/Bits.sol";

// TODO
contract BitsTest {

    using Bits for uint;

    function testGetBitSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * (i % 2);
            ret = ret && v.bit(i*20) == i % 2;
        }
    }

    function testGetBitsSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * (i*43 + 75);
            ret = ret && v.bits(i*20, 6) == (i*43 + 75) & 0x3F;
        }
    }

    function testSetBitSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = uint(0).setBit(i*20);
            ret = ret && v == 2**(i*20);
        }
    }

    function testClearBitSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = uint(~0).clearBit(i*20);
            ret = ret && v.setBit(i*20) == uint(~0);
        }
    }

    function testToggleBitSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = uint(0).toggleBit(i*20);
            ret = ret && v.setBit(i*20) == 2**(i*20);
            v = v.toggleBit(i*20);
            ret = ret && v == 0;
        }
    }

    function testBitSetSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20);
            ret = ret && v.bitSet(i*20);
        }
    }

    function testBitsSetSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * 31;
            ret = ret && v.bitsSet(i*20, 5);
        }
    }

    function testBitEqualSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20);
            var u = 2**(i*20);
            ret = ret && v.bitEqual(u, i*20);
        }
    }

    function testBitsEqualSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * 31;
            var u = 2**(i*20) * 31;
            ret = ret && v.bitsEqual(u, i*20, 5);
        }
    }

    function testBitAndSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20);
            var u = 2**(i*20);
            ret = ret && v.bitAnd(u, i*20) == 1;
        }
    }

    function testBitsAndSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * 31;
            var u = 2**(i*20) * 31;
            ret = ret && v.bitsAnd(u, i*20, 5) == 31;
        }
    }

    function testBitOrSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20);
            var u = 2**(i*20);
            ret = ret && v.bitOr(u, i*20) == 1;
        }
    }

    function testBitsOrSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * 31;
            var u = 2**(i*20) * 31;
            ret = ret && v.bitsOr(u, i*20, 5) == 31;
        }
    }

    function testBitXorSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20);
            var u = 2**(i*20);
            ret = ret && v.bitXor(u, i*20) == 0;
        }
    }

    function testBitsXorSuccess() constant returns (bool ret) {
        ret = true;
        for (uint i = 0; i < 10; i++) {
            var v = 2**(i*20) * 31;
            var u = 2**(i*20) * 31;
            ret = ret && v.bitsXor(u, i*20, 5) == 0;
        }
    }

}