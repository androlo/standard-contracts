/**
 * @title BitOps
 *
 * This library has functions for reading, writing, and comparing the bits
 * in unsigned integers. Bits are returned as unsigned integers; 0 or 1 in the
 * case of individual bits.
 *
 * Arrays as bit-vectors are not supported; this library is for bit manipulation,
 * not storage/memory management.
 *
 * @author Andreas Olofsson (androlo1980@gmail.com)
 */
library BitOps {

    /// @dev Set the bit of the uint 'self' at the given 'index'.
    /// @param self The integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The modified integer.
    function setBit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return self | 2**index;
    }

    /// @dev Clear the bit of the uint 'self' at the given 'index'.
    /// @param self The integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The modified integer.
    function clearBit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return self & ~(2**index);
    }

    /// @dev Toggle the bit of the uint 'self' at the given 'index'.
    /// @param self The integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The modified integer.
    function toggleBit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return self ^ 2**index;
    }

    /// @dev Get the bit of the uint 'self' at the given 'index'.
    /// @param self The integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The bit.
    function bit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return (self / 2**index) & 1;
    }

    /// @dev Get 'numBits' bits of the uint 'self' starting at the given 'index'.
    /// Must satisfy '0 <= index + numBits < 256'
    /// @param self The integer.
    /// @param index The index.
    /// @param numBits The number of bits.
    /// @return The bit.
    function bits(uint self, uint index, uint numBits) internal constant returns (uint) {
        if (index + numBits > 256)
            throw;
        return (self / 2**index) & (2**numBits - 1);
    }

    /// @dev Check if the uint 'self' at the given 'index' is set.
    /// @param self The integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The bit.
    function bitSet(uint self, uint index) internal constant returns (bool) {
        return bit(self, index) == 1;
    }

    /// @dev Check if 'numBits' bits of the uint 'self' starting at the given 'index' is set.
    /// Must satisfy '0 <= index + numBits < 256'
    /// @param self The integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @param numBits The number of bits.
    /// @return The bit.
    function bitsSet(uint self, uint index, uint numBits) internal constant returns (bool) {
        if (index + numBits > 256)
            throw;
        return bits(self, index, numBits) == 2**numBits - 1;
    }

    /// @dev 'self.bit(index) == self.bit(index)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The bit.
    function bitEqual(uint self, uint other, uint index) internal constant returns (bool) {
        if (index > 255)
            throw;
        uint mask = 2**index;
        return (self & mask) == (other & mask);
    }

    /// @dev 'self.bits(index, numBits) == self.bits(index, numBits)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @param numBits The number o bits.
    /// @return The bit.
    function bitsEqual(uint self, uint other, uint index, uint numBits) internal constant returns (bool) {
        if (index + numBits > 256)
            throw;
        uint mask = (2**numBits - 1) * 2**index;
        return (self & mask) == (other & mask);
    }

    /// @dev 'self.bit(index) & self.bit(index)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The bit.
    function bitAnd(uint self, uint other, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        uint p2 = 2**index;
        return (self / p2 & 1) & (other / p2 & 1);
    }

    /// @dev 'self.bits(index, numBits) & self.bits(index, numBits)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @param numBits The number o bits.
    /// @return The bit.
    function bitsAnd(uint self, uint other, uint index, uint numBits) internal constant returns (uint) {
        if (index + numBits > 256)
            throw;
        uint p2 = 2**index;
        return (self / p2 & other / p2) & (2**numBits - 1);
    }

    /// @dev 'self.bit(index) | self.bit(index)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The bit.
    function bitOr(uint self, uint other, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        uint p2 = 2**index;
        return (self / p2 & 1) | (other / p2 & 1);
    }

    /// @dev 'self.bits(index, numBits) | self.bits(index, numBits)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @param numBits The number o bits.
    /// @return The bit.
    function bitsOr(uint self, uint other, uint index, uint numBits) internal constant returns (uint) {
        if (index + numBits > 256)
            throw;
        uint p2 = 2**index;
        return (self / p2 | other / p2) & (2**numBits - 1);
    }

    /// @dev 'self.bit(index) ^ self.bit(index)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @return The bit.
    function bitXor(uint self, uint other, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        uint p2 = 2**index;
        return (self / p2 & 1) ^ (other / p2 & 1);
    }

    /// @dev 'self.bits(index, numBits) ^ self.bits(index, numBits)'
    /// @param self The first integer.
    /// @param other The second integer.
    /// @param index The index. Must be between 0 and 255 (inclusive).
    /// @param numBits The number o bits.
    /// @return The bit.
    function bitsXor(uint self, uint other, uint index, uint numBits) internal constant returns (uint) {
        if (index + numBits > 256)
            throw;
        uint p2 = 2**index;
        return (self / p2 ^ other / p2) & (2**numBits - 1);
    }

}