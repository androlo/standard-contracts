const assert = require('assert');
const path = require('path');
const util = require('./utils');

var byteslicetest;

describe('Bytes', function () {

    describe('ByteSlice', function () {
        before(function (done) {
            this.timeout(300000); // 5 minutes.
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy("ByteSliceTest", path.join(__dirname, "../contracts/build/test"), function (err, contract) {
                    if (err)
                        return done(err);
                    byteslicetest = contract;
                    done();
                });
            });
        });

        it('should create a slice from bytes', function (done) {
            byteslicetest.testCreate(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should create a slice from empty bytes', function (done) {
            byteslicetest.testCreateFromEmptyBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should get the right length', function (done) {
            byteslicetest.testLength(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should get a byte from a slice.', function (done) {
            byteslicetest.testAt(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should fail to get a byte from a slice because the index is too high.', function (done) {
            byteslicetest.testAtFailIndexOutOfBounds(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should get a byte from a slice using a signed index.', function (done) {
            byteslicetest.testAtSigned(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should fail to get a byte from a slice because the signed index is too low.', function (done) {
            byteslicetest.testAtSignedFailIndexOutOfBounds(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should get the byte array from a slice.', function (done) {
            byteslicetest.testToBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should not copy any bytes that are outside the source array.', function (done) {
            byteslicetest.testExcessBytesCleanedAfterToBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should copy the slice', function (done) {
            byteslicetest.testCopy(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should create a new slice from the given start-position', function (done) {
            byteslicetest.testNewSliceFromStartpos(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should fail to create a new slice from a too high start-position', function (done) {
            byteslicetest.testNewSliceFromStartposFailSOOB(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should create a new slice from the given signed start-position', function (done) {
            byteslicetest.testNewSliceFromSignedStartpos(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should fail to create a new slice from a too low signed start-position', function (done) {
            byteslicetest.testNewSliceFromSignedStartposFailSOOB(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should create a new slice from the given start- and end-position', function (done) {
            byteslicetest.testNewSliceFromStartposAndEndpos(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should fail to create a new slice from a too high start-position (with end position)', function (done) {
            byteslicetest.testNewSliceFromStartposAndEndposFailStartposOOB(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should fail to create a new slice from a too high end-position', function (done) {
            byteslicetest.testNewSliceFromStartposAndEndposFailEndposOOB(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should create a new slice from the given signed start- and end-position', function (done) {
            byteslicetest.testNewSliceFromSignedStartposAndEndpos(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should fail to create a new slice from a too high signed start-position (with end position)', function (done) {
            byteslicetest.testNewSliceFromSignedStartposAndEndposFailStartposOOB(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should fail to create a new slice from a too high signed end-position', function (done) {
            byteslicetest.testNewSliceFromSignedStartposAndEndposFailEndposOOB(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should fail to create a new slice from signed start- and end-position because start is larger then end', function (done) {
            byteslicetest.testNewSliceFromSignedStartposAndEndposPositionsOverlap(function (err) {
                assert.ifError(!err);
                done();
            })
        });

        it('should slice a slice so that the length is 0 and output an empty from toBytes', function (done) {
            byteslicetest.testNewSliceFromStartposEmptyBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should slice a slice (using a signed index) so that the length is 0 and output an empty from toBytes', function (done) {
            byteslicetest.testNewSliceFromSignedStartposEmptyBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should slice a slice so that the length is 0 and output an empty from toBytes', function (done) {
            byteslicetest.testNewSliceFromStartposAndEndposEmptyBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should slice a slice (using signed indices) so that the length is 0 and output an empty from toBytes', function (done) {
            byteslicetest.testNewSliceFromSignedStartposAndEndposEmptyBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should slice a slice differently (using signed indices) so that the length is 0 and output an empty from toBytes', function (done) {
            byteslicetest.testNewSliceFromSignedStartposAndEndpos2EmptyBytes(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should find that a slice is equal to itself.', function (done) {
            byteslicetest.testSlicesEqualSuccess(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

        it('should find two different slices un-equal.', function (done) {
            byteslicetest.testSlicesEqualFail(function (err, result) {
                assert.ifError(err);
                assert(!result);
                done();
            })
        });

        it('should succesfully delete a slice.', function (done) {
            byteslicetest.testDeleteSliceSuccess(function (err, result) {
                assert.ifError(err);
                assert(result);
                done();
            })
        });

    });

});