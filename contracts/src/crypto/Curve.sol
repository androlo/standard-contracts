// Interface for curves.
contract Curve {

    // Check whether the input point is on the curve.
    // SEC 1: 3.2.3.1
    function onCurve(uint[2] P) constant returns (bool);

    // Check if the given point is a valid public key.
    // SEC 1: 3.2.2.1
    function isPubKey(uint[2] P) constant returns (bool onc);

    // Validate the signature 'rs' of 'h = H(message)' against the public key Q.
    // SEC 1: 4.1.4
    function validateSignature(bytes32 h, uint[2] rs, uint[2] Q) constant returns (bool);

    // compress a point 'P = (Px, Py)' on the curve, giving 'C(P) = (yBit, Px)'
    // SEC 1: 2.3.3 - but only the curve-dependent code.
    function compress(uint[2] P) constant returns (uint8 yBit, uint x);

    // decompress a point 'Px', giving 'Py' for 'P = (Px, Py)'
    // 'yBit' is 1 if 'Qy' is odd, otherwise 0.
    // SEC 1: 2.3.4 - but only the curve-dependent code.
    function decompress(uint8 yBit, uint Px) constant returns (uint Py);

}