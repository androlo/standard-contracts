const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');
const BigNumber = require("bignumber.js");

var integers;

const SECP256K1P = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
const SECP256K1PM1 = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2E");
const SECP256K1N = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");
const SECP256K1NM1 = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140");

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

describe('Math', function () {

    before(function (done) {
        this.timeout(300000); // 5 minutes.
        util.initWeb3(function (err) {
            if (err)
                return done(err);
            util.deploy("Integers", path.join(__dirname, "../contracts/build/release"), null, function (err, contract) {
                if (err)
                    return done(err);
                integers = contract;
                done();
            });
        });
    });

    describe('Integers', function () {

        describe('#invmod()', function () {

            it('should calculate the values from the list', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(numsToInv, function (numPair, idx, cb) {
                        integers.invmod(numPair[0], numPair[1], function (err, result) {
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
                    function() {
                        return i < 32
                    },
                    function(cb) {
                        var n = new BigNumber(256).pow(i);
                        integers.invmod(n, m, function (err, result) {
                            assert.ifError(err);
                            var r = new BigNumber(256).pow(32 - i);
                            assert(result.eq(r));
                            i++;
                            cb();
                        })
                    }, function(){
                        done();
                    }
                );
            });

            it('should throw for bad input', function (done) {
                async.eachSeries(numsToInvBad, function (numPair, cb) {
                        integers.invmod(numPair[0], numPair[1], function (err, result) {                assert.ifError(err);
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
                        integers.expmod(num, SECP256K1PM1, SECP256K1P, function (err, result) {
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
                        integers.expmod(num, SECP256K1NM1, SECP256K1N, function (err, result) {
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
                integers.expmod(24, 22, 0, function (err, result) {
                    assert.ifError(err);
                    assert(result.eq(0));
                    done();
                });
            });

        });

    });

});
