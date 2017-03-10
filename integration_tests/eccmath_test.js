const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');
const BigNumber = require("bignumber.js");

var eccmath;

const bytecode = "0x60606040526102fa806100126000396000f3606060405260e060020a60003504630b80f8d3811461003c578063783ce4581461007c578063c8389663146100a6578063f6458c6a1461012d575b005b61019460043560243560006101c883835b600060006000600060006000876000148061006757508688145b806100725750866000145b156101f857610002565b61019460043560243560443560006101d1848484600060008460001415610248575b509392505050565b6040805160608181019092526101a6916004916064918390600390839083908082843760408051918201905291965050933593608435935060a435925090815b60008152602001906001900390816100e6579050506101d9858585858082856000505109845280808385096020860151096020949094019390935250506001604088015250565b6040805160608181019092526101a691600491606491839060039083908390808284376040805191820190529196505093359392509050815b6000815260200190600190039081610166579050506101e283836000806102c784600250604001518461004d565b60408051918252519081900360200190f35b6040518082606080838184600060046030f15090500191505060405180910390f35b90505b92915050565b949350505050565b50929392505050565b50816101cb565b8495505b505050505092915050565b868811156102065796869006965b600193508692508791505b60008214610232575091928282048085029091039291818302900390610211565b60008512156101e95784600003870395506101ed565b836000141561025a576001915061009e565b826000141561026857610002565b506001905060ff60020a5b801561009e57828185161515860a84848509099150826002820485161515860a84848509099150826004820485161515860a84848509099150826008820485161515860a8484850909915060109004610273565b9150828283099050828185600050510984528280828409602086015109602085015250506001604092909201919091525056";
const ABI = [{
    "constant": true,
    "inputs": [{"name": "a", "type": "uint256"}, {"name": "p", "type": "uint256"}],
    "name": "invmod",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "b", "type": "uint256"}, {"name": "e", "type": "uint256"}, {"name": "m", "type": "uint256"}],
    "name": "expmod",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "P", "type": "uint256[3]"}, {"name": "zInv", "type": "uint256"}, {
        "name": "z2Inv",
        "type": "uint256"
    }, {"name": "prime", "type": "uint256"}],
    "name": "toZ1",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "PJ", "type": "uint256[3]"}, {"name": "prime", "type": "uint256"}],
    "name": "toZ1",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}];

const SECP256K1P = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
const SECP256K1PM1 = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2E");
const SECP256K1N = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
const SECP256K1NM1 = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140");

// TODO add in the ones for 'toZ1'

const numsToInv = [
    [
        "0x56",
        "0x55"
    ], [
        "0x2",
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ], [
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE",
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ], [
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F",
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ], [
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"
    ]
];

const numsToInvExpected = [
    0x0000000000000000000000000000000000000000000000000000000000000001,
    0x8000000000000000000000000000000000000000000000000000000000000000,
    0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe,
    0x41bce9245fc72552d8c1b4259d8130978376be5acb4a45d8f4d5b4da913e7eb6,
    0xbe4316dba038daad273e4bda627ecf687c8941a534b5ba270b2a4b24b07e6798
];

const numsToInvBad = [
    [0, 5],
    [5, 0],
    [5, 5]
];

const numsToExpFLT = [
    "0x12",
    "0x550",
    "0x123456",
    "0xa34ffffffffaa",
    "0x123456787654321",
    "0x1111111111111eeeeeeeeeeeeeeeee1111111111"
];

describe('Crypto', function () {

    describe('ECCMath', function () {

        before(function (done) {
            this.timeout(300000); // 5 minutes.
            console.log("\tInitializing web3 and deploying the ECCMath test contract.");
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy(ABI, bytecode, function (err, contract) {
                    if (err)
                        return done(err);
                    eccmath = contract;
                    done();
                });
            });
        });

        describe('#invmod()', function () {

            it('should calculate the values from the list', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(numsToInv, function (numPair, idx, cb) {
                        eccmath.invmod(numPair[0], numPair[1], function (err, result) {
                            assert.ifError(err);
                            assert(result == numsToInvExpected[idx]);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should calculate invmod for several powers of two', function (done) {
                this.timeout(10000);
                var i = 1;
                var m = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
                async.whilst(
                    function () {
                        return i < 32
                    },
                    function (cb) {
                        var n = new BigNumber(256).pow(i);
                        eccmath.invmod(n, m, function (err, result) {
                            assert.ifError(err);
                            var r = new BigNumber(256).pow(32 - i);
                            assert(result.eq(r));
                            i++;
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should throw for bad input', function (done) {
                async.eachSeries(numsToInvBad, function (numPair, cb) {
                        eccmath.invmod(numPair[0], numPair[1], function (err, result) {
                            assert.ifError(err);
                            assert.ifError(err);
                            assert(result.eq(0));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

        });

        describe('#expmod()', function () {

            it('should validate FLT for a large prime and several inputs', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(numsToExpFLT, function (num, idx, cb) {
                        eccmath.expmod(num, SECP256K1PM1, SECP256K1P, function (err, result) {
                            assert.ifError(err);
                            assert(result.eq(1));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should validate FLT for another large prime and several inputs', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(numsToExpFLT, function (num, idx, cb) {
                        eccmath.expmod(num, SECP256K1NM1, SECP256K1N, function (err, result) {
                            assert.ifError(err);
                            assert(result.eq(1));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should throw for bad input', function (done) {
                eccmath.expmod(24, 22, 0, function (err, result) {
                    assert.ifError(err);
                    assert(result.eq(0));
                    done();
                });
            });

        });

    });

});
