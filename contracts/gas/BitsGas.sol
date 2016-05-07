import {Bits} from "github.com/androlo/standard-contracts/contracts/src/bits/Bits.sol";

contract BitsGas {

    using Bits for uint;

    uint[] data;

    function testGetBitGas() constant returns (uint gas) {
        uint u = uint(~0);
        gas = msg.gas;
        u.bit(5);
        gas = gas - msg.gas;
    }

    function testGetBitsGas() constant returns (uint gas) {
        uint u = uint(~0);
        gas = msg.gas;
        u.bits(173, 58);
        gas = gas - msg.gas;
    }

    function testSetBitGas() constant returns (uint gas) {
        uint u = 0;
        gas = msg.gas;
        u.setBit(173);
        gas = gas - msg.gas;
    }

}