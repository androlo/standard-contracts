/**
 * @title ByteSlice
 *
 * Slices are objects that allow you to work with arrays without copying them.
 *
 * @author Andreas Olofsson (androlo1980@gmail.com)
 */
library ByteSlice {

    struct Slice {
        uint _unsafe_memPtr;   // Memory address of the first byte.
        uint _unsafe_length;   // Length.
    }

    /// @dev Converts bytes to a slice.
    /// @param self The bytes.
    /// @return A slice.
    function slice(bytes memory self) internal constant returns (Slice memory slice) {
        assembly {
            let len := mload(self)
            let memPtr := add(self, 0x20)
            mstore(slice, mul(memPtr, iszero(iszero(len))))
            mstore(add(slice, 0x20), len)
        }
    }

    /// @dev Converts bytes to a slice from the given starting position.
    /// 'startpos' <= 'len(slice)'
    /// @param self The bytes.
    /// @param startpos The starting position.
    /// @return A slice.
    function slice(bytes memory self, uint startpos) internal constant returns (Slice memory) {
        return slice(slice(self), startpos);
    }

    /// @dev Converts bytes to a slice from the given starting position.
    /// -len(slice) <= 'startpos' <= 'len(slice)'
    /// @param self The bytes.
    /// @param startpos The starting position.
    /// @return A slice.
    function slice(bytes memory self, int startpos) internal constant returns (Slice memory) {
        return slice(slice(self), startpos);
    }

    /// @dev Converts bytes to a slice from the given starting-position, and end-position.
    /// 'startpos <= len(slice) and startpos <= endpos'
    /// 'endpos <= len(slice)'
    /// @param self The bytes.
    /// @param startpos The starting position.
    /// @param endpos The end position.
    /// @return A slice.
    function slice(bytes memory self, uint startpos, uint endpos) internal constant returns (Slice memory) {
        return slice(slice(self), startpos, endpos);
    }

    /// @dev Converts bytes to a slice from the given starting-position, and end-position.
    /// Warning: higher cost then using unsigned integers.
    /// @param self The bytes.
    /// @param startpos The starting position.
    /// @param endpos The end position.
    /// @return A slice.
    function slice(bytes memory self, int startpos, int endpos) internal constant returns (Slice memory) {
        return slice(slice(self), startpos, endpos);
    }

    /// @dev Get the length of the slice (in bytes).
    /// @param self The slice.
    /// @return the length.
    function len(Slice memory self) internal constant returns (uint) {
        return self._unsafe_length;
    }

    /// @dev Returns the byte from the backing array at a given index.
    /// The function will throw unless 'index < len(slice)'
    /// @param self The slice.
    /// @param index The index.
    /// @return The byte at that index.
    function at(Slice memory self, uint index) internal constant returns (byte b) {
        if (index >= self._unsafe_length)
            throw;
        uint bb;
        assembly {
            // Get byte at index, and format to 'byte' variable.
            bb := byte(0, mload(add(mload(self), index)))
        }
        b = byte(bb);
    }

    /// @dev Returns the byte from the backing array at a given index.
    /// The function will throw unless '-len(self) <= index < len(self)'.
    /// @param self The slice.
    /// @param index The index.
    /// @return The byte at that index.
    function at(Slice memory self, int index) internal constant returns (byte b) {
        if (index >= 0)
            return at(self, uint(index));
        uint iAbs = uint(-index);
        if (iAbs > self._unsafe_length)
            throw;
        return at(self, self._unsafe_length - iAbs);
    }

    /// @dev Set the byte at the given index.
    /// The function will throw unless 'index < len(slice)'
    /// @param self The slice.
    /// @param index The index.
    /// @return The byte at that index.
    function set(Slice memory self, uint index, byte b) internal constant {
        if (index >= self._unsafe_length)
            throw;
        assembly {
            mstore8(add(mload(self), index), byte(0, b))
        }
    }

    /// @dev Set the byte at the given index.
    /// The function will throw unless '-len(self) <= index < len(self)'.
    /// @param self The slice.
    /// @param index The index.
    /// @return The byte at that index.
    function set(Slice memory self, int index, byte b) internal constant {
        if (index >= 0)
            return set(self, uint(index), b);
        uint iAbs = uint(-index);
        if (iAbs > self._unsafe_length)
            throw;
        return set(self, self._unsafe_length - iAbs, b);
    }

    /// @dev Creates a copy of the slice.
    /// @param self The slice.
    /// @return the new reference.
    function slice(Slice memory self) internal constant returns (Slice memory newSlice) {
        newSlice._unsafe_memPtr = self._unsafe_memPtr;
        newSlice._unsafe_length = self._unsafe_length;
    }

    /// @dev Create a new slice from the given starting position.
    /// 'startpos' <= 'len(slice)'
    /// @param self The slice.
    /// @param startpos The starting position.
    /// @return The new slice.
    function slice(Slice memory self, uint startpos) internal constant returns (Slice memory newSlice) {
        uint len = self._unsafe_length;
        if (startpos > len)
            throw;
        assembly {
            len := sub(len, startpos)
            let newMemPtr := mul(add(mload(self), startpos), iszero(iszero(len)))
            mstore(newSlice, newMemPtr)
            mstore(add(newSlice, 0x20), len)
        }
    }

    /// @dev Create a new slice from the given starting position.
    /// -len(slice) <= 'startpos' <= 'len(slice)'
    /// @param self The slice.
    /// @param startpos The starting position.
    /// @return The new slice.
    function slice(Slice memory self, int startpos) internal constant returns (Slice memory newSlice) {
        uint sAbs;
        uint startpos_;
        uint len = self._unsafe_length;
        if (startpos >= 0) {
            startpos_ = uint(startpos);
            if (startpos_ > len)
                throw;
        } else {
            startpos_ = uint(-startpos);
            if (startpos_ > len)
                throw;
            startpos_ = len - startpos_;
        }
        assembly {
            len := sub(len, startpos_)
            let newMemPtr := mul(add(mload(self), startpos_), iszero(iszero(len)))
            mstore(newSlice, newMemPtr)
            mstore(add(newSlice, 0x20), len)
        }
    }

    /// @dev Create a new slice from a given slice, starting-position, and end-position.
    /// 'startpos <= len(slice) and startpos <= endpos'
    /// 'endpos <= len(slice)'
    /// @param self The slice.
    /// @param startpos The starting position.
    /// @param endpos The end position.
    /// @return the new slice.
    function slice(Slice memory self, uint startpos, uint endpos) internal constant returns (Slice memory newSlice) {
        uint len = self._unsafe_length;
        if (startpos > len || endpos > len || startpos > endpos)
            throw;
        assembly {
            len := sub(endpos, startpos)
            let newMemPtr := mul(add(mload(self), startpos), iszero(iszero(len)))
            mstore(newSlice, newMemPtr)
            mstore(add(newSlice, 0x20), len)
        }
    }

    /// Same as new(Slice memory, uint, uint) but allows for negative indices.
    /// Warning: higher cost then using unsigned integers.
    /// @param self The slice.
    /// @param startpos The starting position.
    /// @param endpos The end position.
    /// @return The new slice.
    function slice(Slice memory self, int startpos, int endpos) internal constant returns (Slice memory newSlice) {
       // Don't allow slice on bytes of length 0.
        uint startpos_;
        uint endpos_;
        uint len = self._unsafe_length;
        if (startpos < 0) {
            startpos_ = uint(-startpos);
            if (startpos_ > len)
                throw;
            startpos_ = len - startpos_;
        }
        else {
            startpos_ = uint(startpos);
            if (startpos_ > len)
                throw;
        }
        if (endpos < 0) {
            endpos_ = uint(-endpos);
            if (endpos_ > len)
                throw;
            endpos_ = len - endpos_;
        }
        else {
            endpos_ = uint(endpos);
            if (endpos_ > len)
                throw;
        }
        if(startpos_ > endpos_)
            throw;
        assembly {
            len := sub(endpos_, startpos_)
            let newMemPtr := mul(add(mload(self), startpos_), iszero(iszero(len)))
            mstore(newSlice, newMemPtr)
            mstore(add(newSlice, 0x20), len)
        }
    }

    /// @dev Creates a 'bytes memory' variable from a slice, copying the data.
    /// Bytes are copied from the memory address 'self._unsafe_memPtr'.
    /// The number of bytes copied is 'self._unsafe_length'.
    /// @param self The slice.
    /// @return The bytes variable.
    function toBytes(Slice memory self) internal constant returns (bytes memory bts) {
        uint length = self._unsafe_length;
        if (length == 0)
            return;
        uint memPtr = self._unsafe_memPtr;
        bts = new bytes(length);
        // We can do word-by-word copying since 'bts' was the last thing to be
        // allocated. Just overwrite any excess bytes at the end with zeroes.
        assembly {
                let i := 0
                let btsOffset := add(bts, 0x20)
                let words := div(add(length, 31), 32)
            tag_loop:
                jumpi(end, gt(i, words))
                {
                    let offset := mul(i, 32)
                    mstore(add(btsOffset, offset), mload(add(memPtr, offset)))
                    i := add(i, 1)
                }
                jump(tag_loop)
            end:
                mstore(add(add(bts, length), 0x20), 0)
        }
    }

    /// @dev Creates an ascii-encoded 'string' variable from a slice, copying the data.
    /// Bytes are copied from the memory address 'self._unsafe_memPtr'.
    /// The number of bytes copied is 'self._unsafe_length'.
    /// @param self The slice.
    /// @return The bytes variable.
    function toAscii(Slice memory self) internal constant returns (string memory str) {
        return string(toBytes(self));
    }

    /// @dev Check if two slices are equal.
    /// @param self The slice.
    /// @param other The other slice.
    /// @return True if both slices point to the same memory address, and has the same length.
    function equals(Slice memory self, Slice memory other) internal constant returns (bool) {
        return (
            self._unsafe_length == other._unsafe_length &&
            self._unsafe_memPtr == other._unsafe_memPtr
        );
    }

}
