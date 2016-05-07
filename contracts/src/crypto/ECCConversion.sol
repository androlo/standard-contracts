contract ECCConversion {

    // SEC 1: 2.3.3
    function curvePointToBytes(Curve curve, uint[2] memory P, bool compress) internal constant returns (bytes memory bts) {
        // var curve = Curve(curveContract);
        if(P[0] == 0 && P[1] == 0)
            bts = new bytes(1);
        else if (!compress) {
            bts = new bytes(65);
            bts[0] = 4;
            uint Px = P[0];
            uint Py = P[1];
            assembly {
                mstore(add(bts, 0x21), Px)
                mstore(add(bts, 0x41), Py)
            }
        }
        else {
            bts = new bytes(33);
            var (yBit, x) = curve.compress(P);
            bts[0] = yBit & 1 == 1 ? byte(3) : byte(2);
            assembly {
                mstore(add(bts, 0x21), mload(P))
            }
        }
    }

    // SEC 1: 2.3.4
    function bytesToCurvePoint(Curve curve, bytes memory bts) internal constant returns (uint[2] memory P) {
        if (bts.length == 0 && bts[0] == 0)
            return;
        else if (bts.length == 65 && bts[0] == 4) {
            // This is an uncompressed point.
            assembly {
                mstore(P, mload(add(bts, 0x21)))
                mstore(add(P, 0x20), mload(add(bts, 0x41)))
            }
        }
        else if (bts.length == 33) {
            byte b0 = bts[0];
            if (b0 != 2 && b0 != 3)
                throw;
            uint8 yBit = uint8(b0) - 2;
            uint Px;
            assembly {
                Px := mload(add(bts, 0x21))
            }
            uint Py = curve.decompress(yBit, Px);
            P = [Px, Py];
        }
        else
            throw; // Invalid format.
    }
}

contract Test is ECCConversion {
    Curve c = new Secp256k1();

    uint constant Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798;
    uint constant Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8;

    function testCurvePointToBytesCompressed() constant returns (bytes memory bts) {
        uint[2] memory P = [Gx, Gy];
        bts = curvePointToBytes(c, P, true);
    }

    function testCurvePointToBytesUncompressed() constant returns (bytes memory bts) {
        uint[2] memory P = [Gx, Gy];
        bts = curvePointToBytes(c, P, false);
    }

    function toFromPointCompressed() constant returns (uint[2] memory P) {
        P = [Gx, Gy];
        bytes memory bts = curvePointToBytes(c, P, true);
        P = bytesToCurvePoint(c, bts);
    }

    function toFromPointUncompressed() constant returns (uint[2] memory P) {
        P = [Gx, Gy];
        bytes memory bts = curvePointToBytes(c, P, false);
        P = bytesToCurvePoint(c, bts);
    }

}