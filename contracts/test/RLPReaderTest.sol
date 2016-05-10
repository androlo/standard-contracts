import {RLPReader} from "github.com/androlo/standard-contracts/contracts/src/codec/RLPReader.sol";

contract RLPReaderTest {

    using RLPReader for RLPReader.RLPItem;
    using RLPReader for bytes;

    function testItem(bytes rlp) constant returns (uint start, uint len, bool isList, uint[] list, uint listLen) {
        return _dumpRLPItem(rlp.toRLPItem());
    }

    function testIsList(bytes rlp) constant returns (bool ret) {
        ret = rlp.toRLPItem().isList();
    }

    function testNumItems(bytes rlp) constant returns (uint) {
        return rlp.toRLPItem().numItems();
    }

    function testSubItem(bytes rlp, uint index) constant returns (uint memPtr, uint length, bool isList, uint[] list, uint listLen) {
        return _dumpRLPItem(rlp.toRLPItem().item(index));
    }

    function testDecode(bytes rlp) constant returns (bytes memory bts) {
        return rlp.toRLPItem().decode();
    }

    function testCopyToBytes(uint btsPtr, bytes memory tgt, uint btsLen) constant returns (bytes memory btsOut) {
        RLPReader._copyToBytes(btsPtr, tgt, btsLen);
    }

    function testLenLong(uint pos, uint rlpOffset) constant returns (uint len) {
        return RLPReader._lenLong(pos, rlpOffset);
    }

    function _dumpRLPItem(RLPReader.RLPItem memory item) internal constant returns (uint start, uint len, bool isList, uint[] list, uint listLen) {
        start = item._unsafe_memPtr;
        len = item._unsafe_length;
        isList = item._unsafe_isList;
        if (isList) {
            listLen = item._unsafe_listLength;
            list = new uint[](listLen);
            uint listStart =  item._unsafe_listPtr;
            for(uint i = 0; i < listLen; i++) {
                uint lp;
                assembly {
                    lp := mload(add(listStart, mul(i, 0x20)))
                }
                list[i] = lp;
            }
        }
    }

}