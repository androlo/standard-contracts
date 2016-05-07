import {ByteSlice} from "github.com/androlo/standard-contracts/contracts/src/bytes/ByteSlice.sol";

contract ByteSliceGas {

    using ByteSlice for ByteSlice.Slice;
    using ByteSlice for bytes;

    function sliceFromBytesCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        gas = msg.gas;
        bts.slice();
        gas = gas - msg.gas;
    }

    function sliceFromLongBytesCost() constant returns (uint gas) {
        // length 128
        bytes memory bts = "abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh";
        gas = msg.gas;
        bts.slice();
        gas = gas - msg.gas;
    }

    function toBytesCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.toBytes();
        gas = gas - msg.gas;
    }

    function toLongBytesCost() constant returns (uint gas) {
        bytes memory bts = "abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh";
        var s = bts.slice();
        gas = msg.gas;
        s.toBytes();
        gas = gas - msg.gas;
    }

    function toAsciiCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.toAscii();
        gas = gas - msg.gas;
    }

    function newSliceCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.slice();
        gas = gas - msg.gas;
    }

    function newSliceWithStartposCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.slice(uint(3));
        gas = gas - msg.gas;
    }

    function newSliceWithNegStartposCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.slice(int(-4));
        gas = gas - msg.gas;
    }

    function newSliceWithStartAndEndposCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.slice(uint(3), uint(5));
        gas = gas - msg.gas;
    }


    function newSliceWithNegStartAndEndposCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.slice(int(-4), int(-2));
        gas = gas - msg.gas;
    }

    function sliceAtCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.at(uint(3));
        gas = gas - msg.gas;
    }

    function sliceAtNegIdxCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.at(int(-4));
        gas = gas - msg.gas;
    }

    function sliceSetCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.set(uint(3), 'x');
        gas = gas - msg.gas;
    }

    function sliceSetNegIdxCost() constant returns (uint gas) {
        bytes memory bts = "abcdefg";
        var s = bts.slice();
        gas = msg.gas;
        s.set(int(-4), 'y');
        gas = gas - msg.gas;
    }
}