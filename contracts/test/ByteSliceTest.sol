import {ByteSlice} from "github.com/androlo/standard-contracts/contracts/src/bytes/ByteSlice.sol";

contract ByteSliceTest is ByteSlice {

    function testCreate() constant returns (bool ret) {
        var bts = _testArr();
        uint memPtr;
        assembly {
            memPtr := add(bts, 0x20)
        }
        var slice = fromBytes(bts);
        ret = slice._unsafe_memPtr == memPtr;
        ret = ret && slice._unsafe_len == 3;
    }

    function testCreateFromEmptyBytes() constant returns (bool ret) {
        bytes memory bts = new bytes(0);
        uint memPtr;
        assembly {
            memPtr := add(bts, 0x20)
        }
        var slice = fromBytes(bts);
        ret = slice._unsafe_memPtr == memPtr;
        ret = ret && slice._unsafe_len == 0;
    }

    function testLength() constant returns (bool ret) {
        var bts = _testArr();
        var slice = fromBytes(bts);
        uint sLen = len(slice);
        ret = sLen == 3;
    }

    function testAt() constant returns (bool ret) {
        var bts = _testArr();
        var slice = fromBytes(bts);
        byte at0 = at(slice, uint(0));
        ret = at0 == byte(5);
        ret = ret && at(slice, uint(1)) == byte(6);
        ret = ret && at(slice, uint(2)) == byte(7);
    }

    // Should throw
    function testAtFailIndexOutOfBounds() constant returns (bool ret) {
        ret = true;
        var s = Slice(0, 1);
        at(s, uint(1));
    }

    function testAtSigned() constant returns (bool ret) {
        var bts = _testArr();
        var slice = fromBytes(bts);
        byte at0 = at(slice, -3);
        ret = at0 == byte(5);
        ret = ret && at(slice, uint(1)) == byte(6);
        ret = ret && at(slice, uint(2)) == byte(7);
    }

    // Should throw
    function testAtSignedFailIndexOutOfBounds() constant returns (bool ret) {
        ret = true;
        var s = Slice(0, 1);
        at(s, -2);
    }

    function testToBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var slice = fromBytes(bts);
        var btsOut = toBytes(slice);
        ret = _btsEqual(bts, btsOut);
    }

    function testExcessBytesCleanedAfterToBytes() constant returns (bool ret) {
        var bts = _testArr();
        assembly {
            let memPtr := add(bts, 0x20)
            mstore8(add(memPtr, 3), 1) // Add garbage byte.
        }
        var slice = fromBytes(bts);
        var out = toBytes(slice);
        assembly {
            ret := not(mload(add(out, 0x23)))
        }
    }

    function testCopy() constant returns (bool ret) {
        var bts = _testArr();
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice);
        ret = slice._unsafe_memPtr == slice2._unsafe_memPtr;
        ret = ret && slice._unsafe_len == slice2._unsafe_len;
    }

    function testNewSliceFromStartpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, uint(3));
        ret = slice._unsafe_memPtr + 3 == slice2._unsafe_memPtr;
        ret = ret && slice._unsafe_len - 3  == slice2._unsafe_len;
    }

    // Should throw
    function testNewSliceFromStartposFailSOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, uint(2));
    }

    function testNewSliceFromSignedStartpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, -20);
        ret = slice._unsafe_memPtr + 5 == slice2._unsafe_memPtr;
        ret = ret && slice._unsafe_len - 5  == slice2._unsafe_len;
    }

    // Should throw
    function testNewSliceFromSignedStartposFailSOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, -2);
    }

    function testNewSliceFromStartposAndEndpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, uint(5), uint(12));
        ret = slice._unsafe_memPtr + 5 == slice2._unsafe_memPtr;
        ret = ret && 7 == slice2._unsafe_len;
    }

    // Should throw
    function testNewSliceFromStartposAndEndposFailStartposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, uint(2), uint(1));
    }

    // Should throw
    function testNewSliceFromStartposAndEndposFailEndposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, uint(0), uint(2));
    }

    function testNewSliceFromSignedStartposAndEndpos() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 25);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, -5, -1);
        ret = slice._unsafe_memPtr + 20 == slice2._unsafe_memPtr;
        ret = ret && 4 == slice2._unsafe_len;
    }

    // Should throw
    function testNewSliceFromSignedStartposAndEndposFailStartposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, -2, 0);
    }

    // Should throw
    function testNewSliceFromSignedStartposAndEndposFailEndposOOB() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, 0, -2);
    }

    // Should throw
    function testNewSliceFromSignedStartposAndEndposPositionsOverlap() constant returns (bool ret) {
        ret = true;
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        newSlice(slice, -2, -1);
    }

    function testNewSliceFromStartposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, uint(1));
        var bts2 = toBytes(slice2);
        ret = bts2.length == 0;
        ret = ret && slice2._unsafe_memPtr == 0;
        ret = ret && slice2._unsafe_len == 0;
    }
    
    function testNewSliceFromSignedStartposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, int(1));
        var bts2 = toBytes(slice2);
        ret = bts2.length == 0;
        ret = ret && slice2._unsafe_memPtr == 0;
        ret = ret && slice2._unsafe_len == 0;
    }

    function testNewSliceFromStartposAndEndposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, uint(0), uint(0));
        var bts2 = toBytes(slice2);
        ret = bts2.length == 0;
        ret = ret && slice2._unsafe_memPtr == 0;
        ret = ret && slice2._unsafe_len == 0;
    }

    function testNewSliceFromSignedStartposAndEndposEmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, -1, -1);
        var bts2 = toBytes(slice2);
        ret = bts2.length == 0;
        ret = ret && slice2._unsafe_memPtr == 0;
        ret = ret && slice2._unsafe_len == 0;
    }

    function testNewSliceFromSignedStartposAndEndpos2EmptyBytes() constant returns (bool ret) {
        var bts = _testArrDynSize(0, 1);
        var slice = fromBytes(bts);
        var slice2 = newSlice(slice, int(1), int(1));
        var bts2 = toBytes(slice2);
        ret = bts2.length == 0;
        ret = ret && slice2._unsafe_memPtr == 0;
        ret = ret && slice2._unsafe_len == 0;
    }

    function testSlicesEqualSuccess() constant returns (bool ret) {
        Slice memory slice = Slice(0, 5);
        ret = slicesEqual(slice, slice);
    }

    function testSlicesEqualFail() constant returns (bool ret) {
        Slice memory slice = Slice(0, 5);
        Slice memory slice2 = Slice(7, 3);
        ret = slicesEqual(slice, slice2);
    }

    function testDeleteSliceSuccess() constant returns (bool ret) {
        Slice memory slice = Slice(0, 5);
        deleteSlice(slice);
        ret = slicesEqual(slice, Slice(0,0));
    }

    function _testArr() internal constant returns (bytes memory bts) {
        bts = new bytes(3);
        bts[0] = 5;
        bts[1] = 6;
        bts[2] = 7;
    }

    function _testArrDynSize(uint startVal, uint len) internal constant returns (bytes memory bts) {
        bts = new bytes(len);
        for(uint i = 0; i < len; i++) {
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