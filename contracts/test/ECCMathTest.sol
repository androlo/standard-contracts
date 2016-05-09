import {ECCMath} from "github.com/androlo/standard-contracts/contracts/src/crypto/ECCMath.sol";

// Exposes the methods of ECCMath
contract ECCMathTest {

    function invmod(uint a, uint p) constant returns (uint) {
        return ECCMath.invmod(a, p);
    }

    function expmod(uint b, uint e, uint m) constant returns (uint) {
        return ECCMath.expmod(b, e, m);
    }

    function toZ1(uint[3] memory P, uint zInv, uint z2Inv, uint prime) constant returns (uint[3]) {
        ECCMath.toZ1(P, zInv, z2Inv, prime);
        return P;
    }

    function toZ1(uint[3] PJ, uint prime) constant returns (uint[3]) {
        ECCMath.toZ1(PJ, prime);
        return PJ;
    }

}