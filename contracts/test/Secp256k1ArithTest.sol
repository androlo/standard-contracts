import {ECCMath} from "github.com/androlo/standard-contracts/contracts/src/crypto/ECCMath.sol";
import {Secp256k1} from "github.com/androlo/standard-contracts/contracts/src/crypto/Secp256k1.sol";

// Exposes the curve math functions.
contract Secp256k1ArithTest {

    uint constant pp = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;

    function add(uint[3] memory P, uint[3] memory Q) constant returns (uint[3]) {
        var R = Secp256k1._add(P, Q);
        ECCMath.toZ1(R, pp);
        return R;
    }

    function addMixed(uint[3] memory P, uint[2] memory Q) constant returns (uint[3]) {
        var R = Secp256k1._addMixed(P, Q);
        ECCMath.toZ1(R, pp);
        return R;
    }

    function addMixedM(uint[3] memory P, uint[2] memory Q) constant returns (uint[3]) {
        Secp256k1._addMixedM(P, Q);
        ECCMath.toZ1(P, pp);
        return P;
    }

    function double(uint[3] memory P) constant returns (uint[3]) {
        var R = Secp256k1._double(P);
        ECCMath.toZ1(R, pp);
        return R;
    }

    function doubleM(uint[3] memory P) constant returns (uint[3]) {
        Secp256k1._doubleM(P);
        ECCMath.toZ1(P, pp);
        return P;
    }

    function mul(uint d, uint[2] memory P) constant returns (uint[3]) {
        var R = Secp256k1._mul(d, P);
        ECCMath.toZ1(R, pp);
        return R;
    }

}