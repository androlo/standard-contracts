/**
 * @title Curve
 *
 * Interface for elliptic curves and related crypto primitives.
 *
 * @author Andreas Olofsson (androlo1980@gmail.com)
 */
contract Curve {

    /// @dev Check whether the input point is on the curve.
    /// SEC 1: 3.2.3.1
    /// @param P The point.
    /// @return True if the point is on the curve.
    function onCurve(uint[2] P) constant returns (bool);

    /// @dev Check if the given point is a valid public key.
    /// SEC 1: 3.2.2.1
    /// @param P The point.
    /// @return True if the point is on the curve.
    function isPubKey(uint[2] P) constant returns (bool onc);

    /// @dev Validate the signature 'rs' of 'h = H(message)' against the public key Q.
    /// SEC 1: 4.1.4
    /// @param h The hash of the message.
    /// @param rs The signature (r, s)
    /// @param Q The public key to validate against.
    /// @return True if the point is on the curve.
    function validateSignature(bytes32 h, uint[2] rs, uint[2] Q) constant returns (bool);

    /// @dev compress a point 'P = (Px, Py)' on the curve, giving 'C(P) = (yBit, Px)'
    /// SEC 1: 2.3.3 - but only the curve-dependent code.
    /// @param P The point.
    /// @return The compressed y coordinate (yBit) and the x coordinate.
    function compress(uint[2] P) constant returns (uint8 yBit, uint x);

    /// @dev decompress a point 'Px', giving 'Py' for 'P = (Px, Py)'
    /// 'yBit' is 1 if 'Qy' is odd, otherwise 0.
    /// SEC 1: 2.3.4 - but only the curve-dependent code.
    /// @param yBit The compressed y-coordinate (One bit)
    /// @param Px The x-coordinate.
    /// @return True if the point is on the curve.
    function decompress(uint8 yBit, uint Px) constant returns (uint[2] Q);

}