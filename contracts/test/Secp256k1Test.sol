import {Secp256k1} from "github.com/androlo/standard-contracts/contracts/src/crypto/Secp256k1.sol";

contract Secp256k1Test is Secp256k1 {

    function add(uint[3] memory P, uint[3] memory Q) constant internal returns (uint[3] memory R) {
        R = _add(P, Q);
    }

    function addMixed(uint[3] memory P, uint[2] memory Q) constant internal returns (uint[3] memory R) {
        R = _addMixed(P, Q);
    }

    function addMixedM(uint[3] memory P, uint[2] memory Q) constant returns (uint[3] memory R) {
        _addMixedM(P, Q);
        R = P;
    }

    function double(uint[3] memory P) constant returns (uint[3] memory Q) {
        Q = _double(P);
    }

    function doubleM(uint[3] memory P) constant returns (uint[3] Q) {
        _doubleM(P);
        Q = P;
    }

    function mul(uint d, uint[2] memory P) constant returns (uint[3] memory Q) {
        Q = _mul(d, P);
    }
}