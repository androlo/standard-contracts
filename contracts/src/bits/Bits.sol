/**
 * @title Bits
 *
 * This library has functions for reading, writing, and comparing the bits
 * in unsigned integers. Bits are returned as unsigned integers; 0 or 1 in the
 * case of individual bits.
 *
 * Arrays as bit-vectors are not supported; this library is for bit manipulation,
 * not storage/memory management.
 */
library Bits {

    function setBit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return self | 2**index;
    }

    function clearBit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return self & ~(2**index);
    }

    function toggleBit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return self ^ 2**index;
    }

    function bit(uint self, uint index) internal constant returns (uint) {
        if (index > 255)
            throw;
        return (self / 2**index) & 1;
    }

    function bits(uint self, uint index, uint numBits) internal constant returns (uint) {
        if (index + numBits > 254)
            throw;
        return (self / 2**index) & (2**numBits - 1);
    }

    function bitSet(uint self, uint index) internal constant returns (bool) {
        return bit(self, index) == 1;
    }

    function bitsSet(uint self, uint index, uint numBits) constant returns (bool) {
        if (index + numBits > 254)
            throw;
        uint mask = 2**numBits - 1;
        return self / 2**index & mask == mask;
    }

    function bitEqual(uint self, uint other, uint index) constant returns (bool) {
        if (index > 255)
            throw;
        uint mask = 2**index;
        return (self & mask) == (other & mask);
    }

    function bitsEqual(uint self, uint other, uint index, uint numBits) constant returns (bool) {
        if (index + numBits > 254)
            throw;
        uint mask = (2**numBits - 1) * 2**index;
        return (self & mask) == (other & mask);
    }

    function bitAnd(uint self, uint other, uint index) constant returns (uint) {
        if (index > 255)
            throw;
        uint p2 = 2**index;
        return (self / p2 & 1) & (other / p2 & 1);
    }

    function bitsAnd(uint self, uint other, uint index, uint numBits) constant returns (uint) {
        if (index + numBits > 254)
            throw;
        uint p2 = 2**index;
        return (self / p2 & other / p2) & (2**numBits - 1);
    }

    function bitOr(uint self, uint other, uint index) constant returns (uint) {
        if (index > 255)
            throw;
        uint p2 = 2**index;
        return (self / p2 & 1) | (other / p2 & 1);
    }

    function bitsOr(uint self, uint other, uint index, uint numBits) constant returns (uint) {
        if (index + numBits > 254)
            throw;
        uint p2 = 2**index;
        return (self / p2 | other / p2) & (2**numBits - 1);
    }

    function bitXor(uint self, uint other, uint index) constant returns (uint) {
        if (index > 255)
            throw;
        uint p2 = 2**index;
        return (self / p2 & 1) ^ (other / p2 & 1);
    }

    function bitsXor(uint self, uint other, uint index, uint numBits) constant returns (uint) {
        if (index + numBits > 254)
            throw;
        uint p2 = 2**index;
        return (self / p2 ^ other / p2) & (2**numBits - 1);
    }

}