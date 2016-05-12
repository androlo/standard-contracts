import {RLP} from "github.com/androlo/standard-contracts/contracts/src/codec/RLP.sol";

contract RLPReaderTest {

    using RLP for RLP.RLPItem;
    using RLP for RLP.Iterator;
    using RLP for bytes;

    function testItem(bytes rlp) constant returns (uint memPtr, uint len, bool isList, uint[] list, uint listLen) {
        var item = rlp.toRLPItem();
        return _testItem(item);
    }

    function testItemStrict(bytes rlp) constant returns (bool res) {
        res = true;
        rlp.toRLPItem(true);
    }

    function testFirst(bytes rlp) constant returns (uint memPtr, uint len, byte first) {
        var item = rlp.toRLPItem();
        memPtr = item._unsafe_memPtr;
        len = item._unsafe_length;
        uint b0;
        assembly {
            b0 := byte(0, mload(memPtr))
        }
        first = byte(b0);
    }

    function testIsList(bytes rlp) constant returns (bool ret) {
        ret = rlp.toRLPItem().isList();
    }

    function testIsData(bytes rlp) constant returns (bool ret) {
        ret = rlp.toRLPItem().isData();
    }

    function testIsNull(bytes rlp) constant returns (bool ret) {
        ret = rlp.toRLPItem().isNull();
    }

    function testIsEmpty(bytes rlp) constant returns (bool ret) {
        ret = rlp.toRLPItem().isEmpty();
    }

    function testItems(bytes rlp) constant returns (uint) {
        return rlp.toRLPItem().items();
    }

    function testSubItem(bytes rlp, uint index) constant returns (uint memPtr, uint len, bool isList, uint[] list, uint listLen) {
        var it = rlp.toRLPItem().iterator();
        uint idx;
        while(it.hasNext() && idx < index) {
            it.next();
            idx++;
        }
       var si = it.next();
       return _testItem(si);
    }

    function testToData(bytes rlp) constant returns (bytes memory bts) {
        bts = rlp.toRLPItem().toData();
    }

    function testToUint(bytes rlp) constant returns (uint) {
        return rlp.toRLPItem().toUint();
    }

    function testToInt(bytes rlp) constant returns (int) {
        return rlp.toRLPItem().toInt();
    }

    function testToBytes32(bytes rlp) constant returns (bytes32) {
        return rlp.toRLPItem().toBytes32();
    }

    function testToAddress(bytes rlp) constant returns (address) {
        return rlp.toRLPItem().toAddress();
    }

    function testToByte(bytes rlp) constant returns (byte) {
        return rlp.toRLPItem().toByte();
    }

    function testToBool(bytes rlp) constant returns (bool) {
        return rlp.toRLPItem().toBool();
    }

    function _testItem(RLP.RLPItem item) internal constant returns (uint memPtr, uint len, bool isList, uint[] memory list, uint listLen) {
        memPtr = item._unsafe_memPtr;
        len = item._unsafe_length;
        isList = item.isList();

        if (isList) {
            uint i;
            listLen = item.items();
            list = new uint[](listLen);
            var it = item.iterator();
            while(it.hasNext() && i < listLen) {
                var si = it.next();
                uint ptr;
                assembly {
                    ptr := mload(si)
                }
                list[i] = ptr;
                i++;
            }
        }
    }
}