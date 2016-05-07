const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');
const BigNumber = require("bignumber.js");
const testdata = require('./data/secp2561k_data.json');

var secp256k1;

const numTag = "__Integers______________________________";

// const SECP256K1P = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
// const SECP256K1N = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

describe('Crypto', function () {

    before(function (done) {
        this.timeout(300000); // 5 minutes.
        util.initWeb3(function (err) {
            if (err)
                return done(err);
            util.deploy("Integers", path.join(__dirname, "../contracts/build/release"), null, function (err, contract) {
                if (err)
                    return done(err);
                var intAddr = contract.address;
                var linkerData = [[numTag, intAddr.substr(2)]];
                util.deploy("Secp256k1Test", path.join(__dirname, "../contracts/build/test"), linkerData, function (err, contract) {
                    if (err)
                        return done(err);
                    secp256k1 = contract;
                    done();
                });
            });
        });
    });

    describe('Secp256k1', function () {

        describe('#onCurve()', function () {

            it('should detect that the given points are on the curve', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (point, idx, cb) {
                        secp256k1.onCurve(point, function (err, result) {
                            assert.ifError(err);
                            assert(result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should detect that the given points are not on the curve', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (point, idx, cb) {
                        secp256k1.onCurve([point[0] + 1, point[1]], function (err, result) {
                            assert.ifError(err);
                            assert(!result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });
        });

        describe('#isPubKey()', function () {

            it('should detect that the given points are valid public keys', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (point, idx, cb) {
                        secp256k1.isPubKey(point, function (err, result) {
                            assert.ifError(err);
                            assert(result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should detect that the given points are not valid public keys', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (point, idx, cb) {
                        secp256k1.isPubKey([point[0] + 1, point[1]], function (err, result) {
                            assert.ifError(err);
                            assert(!result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });
        });

        describe('#validateSignature()', function () {

            it('should detect that the given signatures are valid', function (done) {
                this.timeout(100000);
                var message = testdata.message;
                async.forEachOfSeries(testdata.keypairs, function (keypair, idx, cb) {
                        var signature = testdata.signatures[idx];
                        secp256k1.validateSignature(message, signature, keypair.pub, function (err, result) {
                            assert.ifError(err);
                            assert(result);
                            console.log(idx);
                            console.log(result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should detect that the public key does not correspond to the given signature', function (done) {
                this.timeout(100000);
                var message = testdata.message;
                async.forEachOfSeries(testdata.keypairs, function (keypair, idx, cb) {
                        var signature = testdata.signatures[17 - idx];
                        secp256k1.validateSignature(message, signature, keypair.pub, function (err, result) {
                            assert.ifError(err);
                            assert(!result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should detect that the given signatures and pubkeys are wrong for the given message', function (done) {
                this.timeout(100000);
                var message = testdata.message;
                message[2] = "3";
                async.forEachOfSeries(testdata.keypairs, function (keypair, idx, cb) {
                        var signature = testdata.signatures[17 - idx];
                        secp256k1.validateSignature(message, signature, keypair.pub, function (err, result) {
                            assert.ifError(err);
                            assert(!result);
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

        });

    });

});