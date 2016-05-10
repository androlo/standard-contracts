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

    function tstNumItems(bytes rlp) constant returns (uint) {
        return rlp.toRLPItem().numItems();
    }

    function item(bytes rlp, uint index) constant returns (uint memPtr, uint length, bool isList, uint[] list, uint listLen) {
        return _dumpRLPItem(rlp.toRLPItem().item(index));
    }

    function decode(bytes rlp) constant returns (bytes memory bts) {
        return rlp.toRLPItem().decode();
    }

    function copyToBytes(uint btsPtr, bytes memory tgt, uint btsLen) constant returns (bytes memory btsOut) {
        RLPReader._copyToBytes(btsPtr, tgt, btsLen);
    }

    function lenLong(uint pos, uint rlpOffset) constant returns (uint len) {
        return RLPReader._lenLong(pos, rlpOffset);
    }

    function _dumpRLPItem(RLPReader.RLPItem memory item) internal constant returns (uint start, uint len, bool isList, uint[] list, uint listLen) {
        start = item._unsafe_memPtr;
        len = item._unsafe_length;
        isList = item._unsafe_isList;
        if (isList) {
            list = new uint[](item._unsafe_listLength);
            uint listStart =  item._unsafe_listPtr;
            for(uint i = 0; i < item._unsafe_listLength; i++) {
                uint lp;
                assembly {
                    lp := mload(add(listStart, mul(i, 0x20)))
                }
                list[i] = lp;
            }
            listLen = item._unsafe_listLength;
        }
    }

}