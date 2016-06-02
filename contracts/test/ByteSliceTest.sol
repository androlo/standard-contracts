import {ByteSlice} from "github.com/androlo/standard-contracts/contracts/src/bytes/ByteSlice.sol";

contract ByteSliceTest {

    using ByteSlice for ByteSlice.Slice;
    using ByteSlice for bytes;

    function testCreateFromBytes() constant returns (bool ret) {
        var bts = _testArr();
        uint memPtr;
        assembly {
            memPtr := add(bts, 0x20)
        }
        var s = bts.slice();
        ret = s._unsafe_memPtr == memPtr;
        ret = ret && s._unsafe_length == 3;
    }

    function testCreateFromEmptyBytes() constant returns (bool ret) {
        bytes memory bts = new bytes(0);
        uint memPtr= 0;
        var s = bts.slice();
        ret = s._unsafe_memPtr == memPtr;
        ret = ret && s._unsafe_length == 0;
    }

    function testLength() constant returns (bool ret) {
        var bts = _testArr();
        var s = bts.slice();
        ret = s.len() == 3;
    }

    function testAt() constant returns (bool ret) {
        var bts = _testArr();
        var s = bts.slice();
        byte at0 = s.at(uint(0));
        ret = at0 == byte(5);
        ret = ret && s.at(uint(1)) == byte(6);
        ret = ret && s.at(uint(2)) == byte(7);
    }

    // Should throw
    function testAtFailIndexOutOfBounds() constant returns (bool ret) {
        ret = true;
        var s = ByteSlice.Slice(0, 1);
        s.at(uint(1));
    }

    function testAtSigned() constant returns (bool ret) {
        var bts = _testArr();
        var s = bts.slice();
        byte at0 = s.at(-3);
        ret = at0 == byte(5);
        ret = ret && s.at(uint(1)) == byte(6);
        ret = ret && s.at(uint(2)) == byte(7);
    }

    // Should throw
    function testAtSignedFailIndexOutOfBounds() constant returns (bool ret) {
        ret = true;
        var s = ByteSlice.Slice(0, 1);
        s.at(-2);
    }

    function testSet() constant returns (bool ret) {
        var bts = _testArr();
        var s = bts.slice();
        byte v = 'x';
        s.set(uint(1), v);
        byte v_ = s.at(uint(1));
        ret = v_ == v;
    }

    // Should throw
    function testSetFailIndexOutOfBounds() constant returns (bool ret) {
        ret = true;
        var s = ByteSlice.Slice(0, 1);
        s.set(uint(1), 0x15);
    }

    function testSetSigned() constant returns (bool ret) {
        var bts = _testArr();
        var s = bts.slice();
        byte v = 'y';
        s.set(int(-2), v);
        byte v_ = s.at(int(-2));
        ret = v_ == v;
    }

    // Should throw
    function testSetSignedFailIndexOutOfBounds() constant returns (bool ret) {
        ret = true;
        var s = ByteSlice.Slice(0, 1);
        s.set(int(-2), 0x15);
    }

    function testToBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var s = bts.slice();
        var btsOut = s.toBytes();
        ret = _btsEqual(bts, btsOut);
    }

    function testToAscii() constant returns (bool ret) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        var strOut = s.toAscii();
        var btsOut = bytes(strOut);
        ret = _btsEqual(bts, btsOut);
    }

    function testExcessBytesCleanedAfterToBytes() constant returns (bool ret) {
        var bts = _testArr();
        assembly {
            let memPtr := add(bts, 0x20)
            mstore8(add(memPtr, 3), 1) // Add garbage byte.
        }
        var s = bts.slice();
        var out = s.toBytes();
        assembly {
            ret := iszero(mload(add(out, 0x23)))
        }
    }

    function testCopy() constant returns (bool ret) {
        var bts = _testArr();
        var s = bts.slice();
        var s2 = s.slice();
        ret = s._unsafe_memPtr == s2._unsafe_memPtr;
        ret = ret && s._unsafe_length == s2._unsafe_length;
    }

    function testNewSliceFromStartpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var s = bts.slice();
        var s2 = s.slice(uint(3));
        ret = s._unsafe_memPtr + 3 == s2._unsafe_memPtr;
        ret = ret && s._unsafe_length - 3  == s2._unsafe_length;
    }

    // Should throw
    function testNewSliceFromStartposFailSOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        s.slice(uint(2));
    }

    function testNewSliceFromSignedStartpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var s = bts.slice();
        var s2 = s.slice(-20);
        ret = s._unsafe_memPtr + 5 == s2._unsafe_memPtr;
        ret = ret && s._unsafe_length - 5  == s2._unsafe_length;
    }

    // Should throw
    function testNewSliceFromSignedStartposFailSOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        s.slice(-2);
    }

    function testNewSliceFromStartposAndEndpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var s = bts.slice();
        var s2 = s.slice(uint(5), uint(12));
        ret = s._unsafe_memPtr + 5 == s2._unsafe_memPtr;
        ret = ret && 7 == s2._unsafe_length;
    }

    // Should throw
    function testNewSliceFromStartposAndEndposFailStartposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        s.slice(uint(2), uint(1));
    }

    // Should throw
    function testNewSliceFromStartposAndEndposFailEndposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        s.slice(uint(0), uint(2));
    }

    // Should throw
    function testNewSliceFromStartposAndEndposPositionsOverlap() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 3);
        var s = bts.slice();
        s.slice(uint(2), 1);
    }

    function testNewSliceFromSignedStartposAndEndpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var s = bts.slice();
        var s2 = s.slice(-5, -1);
        ret = s._unsafe_memPtr + 20 == s2._unsafe_memPtr;
        ret = ret && 4 == s2._unsafe_length;
    }

    // Should throw
    function testNewSliceFromSignedStartposAndEndposFailStartposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        s.slice(-2, 0);
    }

    // Should throw
    function testNewSliceFromSignedStartposAndEndposFailEndposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        s.slice(0, -2);
    }

    // Should throw
    function testNewSliceFromSignedStartposAndEndposPositionsOverlap() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 3);
        var s = bts.slice();
        s.slice(-1, -2);
    }

    function testNewSliceFromStartposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        var s2 = s.slice(uint(1));
        var bts2 = ByteSlice.toBytes(s2);
        ret = bts2.length == 0;
        ret = ret && s2._unsafe_memPtr == 0;
        ret = ret && s2._unsafe_length == 0;
    }

    function testNewSliceFromSignedStartposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        var s2 = s.slice(int(1));
        var bts2 = ByteSlice.toBytes(s2);
        ret = bts2.length == 0;
        ret = ret && s2._unsafe_memPtr == 0;
        ret = ret && s2._unsafe_length == 0;
    }

    function testNewSliceFromStartposAndEndposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        var s2 = s.slice(uint(0), uint(0));
        var bts2 = ByteSlice.toBytes(s2);
        ret = bts2.length == 0;
        ret = ret && s2._unsafe_memPtr == 0;
        ret = ret && s2._unsafe_length == 0;
    }

    function testNewSliceFromSignedStartposAndEndposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        var s2 = s.slice(-1, -1);
        var bts2 = ByteSlice.toBytes(s2);
        ret = bts2.length == 0;
        ret = ret && s2._unsafe_memPtr == 0;
        ret = ret && s2._unsafe_length == 0;
    }

    function testNewSliceFromSignedStartposAndEndpos2EmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var s = bts.slice();
        var s2 = s.slice(int(1), int(1));
        var bts2 = ByteSlice.toBytes(s2);
        ret = bts2.length == 0;
        ret = ret && s2._unsafe_memPtr == 0;
        ret = ret && s2._unsafe_length == 0;
    }

    function testSlicesEqualSuccess() constant returns (bool ret) {
        ByteSlice.Slice memory s = ByteSlice.Slice(0, 5);
        ret = s.equals(s);
    }

    function testSlicesEqualFail() constant returns (bool ret) {
        ByteSlice.Slice memory s = ByteSlice.Slice(0, 5);
        ByteSlice.Slice memory s2 = ByteSlice.Slice(7, 3);
        ret = !s.equals(s2);
    }

    function _testArr() internal constant returns (bytes memory bts) {
        bts = new bytes(3);
        bts[0] = 5;
        bts[1] = 6;
        bts[2] = 7;
    }

    function _testArrDynSize(uint startVal, uint length) internal constant returns (bytes memory bts) {
        bts = new bytes(length);
        for(uint i = 0; i < length; i++) {
            bts[i] = byte(i + startVal % 256);
        }
    }

    function _btsEqual(bytes memory bts0, bytes memory bts1) constant internal returns (bool) {
        uint len0 = bts0.length;
        uint len1 = bts1.length;
        if (len0 != len1)
            return false;
        for(uint i = 0; i < len0; i++) {
            if (bts0[i] != bts1[i])
                return false;
        }
        return true;
    }

}