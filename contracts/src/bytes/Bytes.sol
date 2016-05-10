/**
 * @title Bytes
 *
 * Methods for working with bytes.
 *
 * @author Andreas Olofsson (androlo1980@gmail.com)
 */
library Bytes {

    /// @dev Concatenate two 'bytes'
    /// @param self The first 'bytes'
    /// @param bts The second 'bytes'
    /// @returns A new 'bytes' with length 'self.length + bts.length',
    /// and elements [self[0], ... , self[self.length - 1], bts[0], ... , bts[bts.length - 1]]
    function concat(bytes memory self, bytes memory bts) internal constant returns (bytes memory newBts) {
        uint totLen = self.length + bts.length;
        if (totLen == 0)
            return;
        newBts = new bytes(totLen);
        assembly {
                let i := 0
                let inOffset := 0
                let outOffset := add(newBts, 0x20)
                let words := 0
                let tag := tag_bts
            tag_self:
                inOffset := add(self, 0x20)
                words := div(add(mload(self), 31), 32)
                jump(tag_loop)
            tag_bts:
                i := 0
                inOffset := add(bts, 0x20)
                outOffset := add(newBts, add(0x20, mload(self)))
                words := div(add(mload(bts), 31), 32)
                tag := tag_end
            tag_loop:
                jumpi(tag, gt(i, words))
                {
                    let offset := mul(i, 32)
                    outOffset := add(outOffset, offset)
                    mstore(outOffset, mload(add(inOffset, offset)))
                    i := add(i, 1)
                }
                jump(tag_loop)
            tag_end:
                mstore(add(newBts, add(totLen, 0x20)), 0)
        }
    }
}