/**
 * @title RLPReader
 *
 * Keeps reference to the RLP encoded string. If the string is the encoding of
 * a list, it will keep a list of indices to each (non-nested) item so that a
 * new RLPItem can be created.
 *
 * Example:
 *
 * rlpStr = RLP(["haha", ["lala"]])   (a byte array)
 * let 'pos' be the position of the first byte of an item
 * items = [pos("haha"), pos(["lala"])]
 *
 * The RLPItem would be:
 * item = {
 *     start:     &rlpStr
 *     len:       len(rlpStr)
 *     isList:    true
 *     listStart: &items
 *     listLen:   2
 * }
 *
 * When it comes to the sub-items, toRLPItem(item, 0) would be the RLP encoding
 * of "haha", and toRLPItem(item, 1) would be the RLP encoding of ["lala"]. Finally,
 * toRLPItem(toRLPItem(item, 1), 0) would be the RLP encoding of "lala".
 */
library RLPReader {

    uint constant LENGTH_THRESHOLD = 56;
    uint constant MAX_LENGTH = 0x10000000000000000;

    struct RLPItem {
        uint _unsafe_memPtr;
        uint _unsafe_length;
        bool _unsafe_isList;
        uint _unsafe_listPtr;
        uint _unsafe_listLength;
    }

    /// @dev Creates an RLPItem from an array of RLP encoded bytes.
    /// @dev The RLP encoded bytes.
    /// @return An RLPItem
    function toRLPItem(bytes memory rlp) internal constant returns (RLPItem memory item) {
        uint start;
        assembly {
            start := add(rlp, 0x20)
        }
        item = _toRLPItem(start);
    }

    /// @dev Creates an RLPItem from a sub-item inside an existing RLPItem.
    /// The current RLPItem must be of list type.
    /// @param rlpItem The RLPItem
    /// @param index The index of the sub-item in the list.
    /// @return A new RLPItem.
    function toRLPItem(RLPItem memory rlpItem, uint index) internal constant returns (RLPItem memory item) {
        if(index >= rlpItem.len)
            throw;
        uint bPos;
        uint listStart = rlpItem.listStart;
        assembly {
            bPos := mload(add(listStart, mul(index, 0x20)))
        }
        item = _toRLPItem(bPos);
    }

    /// @dev Creates an RLPItem from a memory address.
    /// @param start The starting position of the RLP encoded bytes in memory.
    /// @return A new RLPItem.
    function _toRLPItem(uint start) internal constant returns (RLPItem memory item) {
        uint b0;
        assembly {
            b0 := byte(0, mload(start))
        }
        // This is a single string.
        if (b0 < 0x80) {
            item = RLPItem(start, 1, false, 0, 0);
            return;
        }
        if (b0 < 0xB8) {
            item = RLPItem(start, 1 + (b0 - 0x80), false, 0, 0);
            return;
        }
        if (b0 < 0xC0) {
            item = RLPItem(start, _lenLong(start, 0xB7), false, 0, 0);
            return;
        }
        // This is a list. Need to calculate where each item is, and how many
        // there are in total.
        uint listStart;
        assembly {
            listStart := mload(0x40)
        }
        uint listLen;
        uint pos;
        uint len;
        pos = start + 1;
        if(b0 < 0xF8)
            len = b0 - 0xC0 + 1;
        else
            len = 1 + _lenLong(start, 0xF7);

        uint end = start + len;
        while(pos < end) {
            assembly {
                mstore(add(listStart, mul(listLen, 0x20)), pos)
                b0 := byte(0, mload(pos))
            }
            if (b0 <= 0x80) // 0x80 is length 0 so just push one byte ahead like with < 0x80
                pos++;
            else if (b0 < 0xB8)
                pos += 1 + (b0 - 0x80);
            else if (b0 < 0xC0)
                pos += _lenLong(start, 0xB7);
            else if (b0 == 0xC0) // 0 length list so have to increment by one.
                pos++;
            else if (b0 < 0xF8)
                pos += b0 - 0xC0 + 1;
            else
                pos += _lenLong(pos, 0xF7);
            listLen++;
        }
        assembly {
            mstore(0x40, add(listStart, mul(listLen, 0x20)))
        }
        item = RLPItem(start, len, true, listStart, listLen);
    }

    /// @dev encode a string to an RLP item. This does not work for lists
    /// since there is no way to process arbitrary RLP encode-able data.
    /// @param data An RLP encoded string.
    /// @return The RLPItem.
    function encode(bytes memory data) internal constant returns (RLPItem) {
        bytes memory encoded;
        var dataL = data.length;
        if (dataL == 1 && data[0] < 128)
            encoded = data;
        else {
            uint iOffset;
            if (dataL < LENGTH_THRESHOLD) {
                iOffset = 1;
                encoded = new bytes(dataL + 1);
                encoded[0] = byte(data.length + 128);
            } else if (dataL < MAX_LENGTH) {
                uint bLen;
                assembly {
                    bLen := add(div(dataL, 256), gt(mod(dataL, 256), 0))
                }
                iOffset = bLen + 1;
                encoded = new bytes(dataL + 1 + bLen);
                encoded[0] = byte(bLen + 184);
                // Write the length in encoding[1], ... , encoding[bLen]
                assembly {
                    mstore(add(encoded, 33), mul(dataL, exp(256, sub(32, bLen))))
                }
            } else
                throw;
            uint dataPtr;
            uint copyLen;
            assembly {
                dataPtr := add(data, 0x20)
                copyLen := mload(data)
            }
            _copyToBytes(dataPtr, encoded, iOffset, copyLen);

        }
        return RLPItem(dataPtr, copyLen, false, 0, 0);
    }

    /// @dev Decode an RLPItem into bytes. This will not work if the
    /// RLPItem is a list.
    /// @param rlpItem The RLPItem.
    /// @return The decoded string.
    function decode(RLPItem memory rlpItem) internal constant returns (bytes memory bts) {
        if(rlpItem.isList)
            throw;
        uint len;
        uint b0;
        uint start = rlpItem._unsafe_memPtr;
        assembly {
            b0 := byte(0, mload(start))
        }
        if (b0 < 0x80) {
            bts = new bytes(1);
            bts[0] = byte(b0);
            return;
        }
        uint rStartPos; // Where to start reading.

        if (b0 < 0xB8) {
            len = b0 - 0x80;
            rStartPos = start + 1;
        } else {
            assembly {
                let bLen := sub(b0, 0xB7) // bytes length
                let len := div(mload(add(start, 1)), exp(256, sub(32, bLen))) // data length
                rStartPos := add(add(start, 1), bLen)
            }
        }

        bts = new bytes(len);
        _copyToBytes(rStartPos, bts, 0, len);
    }

    // Assumes that enough memory has been allocated to store in target.
    function _copyToBytes(uint btsPtr, bytes memory tgt, uint tgtStartPos, uint btsLen) constant private {
        // Exploiting the fact that 'tgt' was the last thing to be allocated,
        // we can write entire words, and just overwrite any excess.
        assembly {
            {
                    let i := 0 // Start at arr + 0x20
                    let words := add(div(btsLen, 32), gt(mod(btsLen, 32), 0))
                    let rOffset := btsPtr
                    let wOffset := add(tgt, add(tgtStartPos, 0x20))
                tag_loop:
                    jumpi(end, eq(i, words))
                    {
                        let offset := mul(i, 0x20)
                        mstore(add(wOffset, offset), mload(add(rOffset, offset)))
                        i := add(i, 1)
                    }
                    jump(tag_loop)
                end:
                    mstore(add(tgt, add(0x20, mload(tgt))), 0)
            }
        }
    }

    // Length for long arrays, i.e. those with a variable byte length component.
    // 'rlpOffset' can be either '0xB7' (for strings) or '0xF7' (for lists)
    function _lenLong(uint pos, uint rlpOffset) internal constant returns (uint len) {
        uint b0;
        assembly {
            b0 := byte(0, mload(pos))
            let bLen := sub(b0, rlpOffset) // bytes length
            let dLen := div(mload(add(pos, 1)), exp(256, sub(32, bLen))) // data length
            len := add(1, add(bLen, dLen)) // total length
        }
    }

}

/*
contract RLPTest is RLP {
    // String "0xB8380102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708"
    // String "0xB9011801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708"
    // List "0xC0" []
    // List "0xC3820400" ["1024"]
    // List "0xcac5c0c28080c0c3820400" [[[], ["", ""], []], ["1024"]]
    function testDumpRLPItem(bytes rlp) constant returns (uint start, uint len, bool isList, uint[] list, uint listLen) {
        var item = toRLPItem(rlp);
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

    function testRLPItemToBytes(bytes rlp) constant returns (bytes memory bts) {
        var item = toRLPItem(rlp);
        return toBytes(item);
    }

}
*/