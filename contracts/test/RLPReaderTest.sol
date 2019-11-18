import {RLP} from "github.com/androlo/standard-contracts/contracts/src/codec/RLP.sol";

contract RLPReaderTest {

    using RLP for RLP.RLPItem;
    using RLP for RLP.Iterator;
    using RLP for bytes;

    function testItem(bytes memory rlp) public pure returns (uint memPtr, uint len, bool isList, uint[] memory list, uint listLen) {
        RLP.RLPItem memory item = rlp.toRLPItem();
        return _testItem(item);
    }

    function testItemStrict(bytes memory rlp) public pure returns (bool res) {
        res = true;
        rlp.toRLPItem(true);
    }

    function testFirst(bytes memory rlp) public pure returns (uint memPtr, uint len, byte first) {
        RLP.RLPItem memory item = rlp.toRLPItem();
        memPtr = item._unsafe_memPtr;
        len = item._unsafe_length;
        byte b0;
        assembly {
            b0 := byte(0, mload(memPtr))
        }
        first = b0;
    }

    function testIsList(bytes memory rlp) public pure returns (bool ret) {
        ret = rlp.toRLPItem().isList();
    }

    function testIsData(bytes memory rlp) public pure returns (bool ret) {
        ret = rlp.toRLPItem().isData();
    }

    function testIsNull(bytes memory rlp) public pure returns (bool ret) {
        ret = rlp.toRLPItem().isNull();
    }

    function testIsEmpty(bytes memory rlp) public pure returns (bool ret) {
        ret = rlp.toRLPItem().isEmpty();
    }

    function testItems(bytes memory rlp) public pure returns (uint) {
        return rlp.toRLPItem().items();
    }

    function testSubItem(bytes memory rlp, uint index) public pure returns (uint memPtr, uint len, bool isList, uint[] memory list, uint listLen) {
        RLP.Iterator memory it = rlp.toRLPItem().iterator();
        uint idx;
        while(it.hasNext() && idx < index) {
            it.next();
            idx++;
        }
        RLP.RLPItem memory si = it.next();
        return _testItem(si);
    }

    function testToData(bytes memory rlp) public pure returns (bytes memory bts) {
        bts = rlp.toRLPItem().toData();
    }

    function testToUint(bytes memory rlp) public pure returns (uint) {
        return rlp.toRLPItem().toUint();
    }

    function testToInt(bytes memory rlp) public pure returns (int) {
        return rlp.toRLPItem().toInt();
    }

    function testToBytes32(bytes memory rlp) public pure returns (bytes32) {
        return rlp.toRLPItem().toBytes32();
    }

    function testToAddress(bytes memory rlp) public pure returns (address) {
        return rlp.toRLPItem().toAddress();
    }

    function testToByte(bytes memory rlp) public pure returns (byte) {
        return rlp.toRLPItem().toByte();
    }

    function testToBool(bytes memory rlp) public pure returns (bool) {
        return rlp.toRLPItem().toBool();
    }

    function _testItem(RLP.RLPItem memory item) internal pure returns (uint memPtr, uint len, bool isList, uint[] memory list, uint listLen) {
        memPtr = item._unsafe_memPtr;
        len = item._unsafe_length;
        isList = item.isList();

        if (isList) {
            uint i;
            listLen = item.items();
            list = new uint[](listLen);
            RLP.Iterator memory it = item.iterator();
            while (it.hasNext() && i < listLen) {
                RLP.RLPItem memory si = it.next();
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