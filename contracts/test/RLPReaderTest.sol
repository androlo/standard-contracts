import {RLPReader} from "github.com/androlo/standard-contracts/contracts/src/codec/RLPReader.sol";

contract RLPReaderTest {

    using RLPReader for RLPReader.RLPItem;
    using RLPReader for bytes;

    function toRLPItem(bytes memory self) constant returns (uint memPtr, uint length, bool isList, uint[] list, uint listLen) {
        return _dumpRLPItem(self._toRLPItem());
    }

    function isList (RLPItem memory self) constant returns (bool) {
        return self.isList();
    }

    function numItems (RLPItem memory self) constant returns (uint) {
        return self.numItems();
    }

    function item(RLPItem memory self, uint index) constant returns (RLPItem memory) {
        return self.item(index);
    }

    function decode(RLPItem memory self) constant returns (bytes memory bts) {
        return self.decode();
    }

    function _copyToBytes(uint btsPtr, bytes memory tgt, uint btsLen) constant returns (bytes memory btsOut) {
        RLPReader._copyToBytes(btsPtr, tgt, btsLen);
    }

    function _lenLong(uint pos, uint rlpOffset) constant returns (uint len) {

    }

    function _dumpRLPItem(RLPItem memory item) constant returns (uint start, uint len, bool isList, uint[] list, uint listLen) {
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

/*
using RLPReader for RLPReader.RLPItem;
    using RLPReader for bytes;
    // String "0xB84001020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708"
    // String "0xB9010001020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708"
    // List "0xC0" []
    // List "0xC3820400" ["1024"]
    // List "0xcac5c0c28080c0c3820400" [[[], ["", ""], []], ["1024"]]


    function testToItemGas(bytes rlp) constant returns (uint gas) {
        gas = msg.gas;
        rlp.toRLPItem();
        gas -= msg.gas;
    }

    function testDecode(bytes rlp) constant returns (bytes bts, uint gas) {
        var item = rlp.toRLPItem();
        gas = msg.gas;
        bts = item.decode();
        gas -= msg.gas;
    }
    */