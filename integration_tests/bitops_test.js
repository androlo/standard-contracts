const assert = require('assert');
const path = require('path');
const util = require('./utils');

var bitopstest;

const bytecode = "0x6060604052610a30806100126000396000f36060604052361561018a5760e060020a60003504630aa46c12811461018c5780632145e36c146101aa578063254c91b3146101d05780632581c674146102005780632b7859601461022557806331be69851461025857806342a745cb1461028b5780634f76cb02146102be578063622e88cb146102d0578063639d57f21461030857806364a4a5d71461034157806368e4bd991461037957806369f18967146103995780636d052f56146103b757806374087040146103eb5780637af30442146104215780638a120dc91461043f5780638ba9f354146104605780638e46fbb21461048157806391e8d3dc146104a6578063a1616429146104c7578063a268b332146104fa578063bac1e2e01461051b578063c388cca614610553578063c8bb73ef14610574578063da2b741614610587578063daa21e0e146105ac578063e706918c146105db578063ec0f1025146105fb578063f1cff4b514610633578063f362d78f1461065c578063f85aefba1461068d578063fadf87b1146106af578063fbffb355146106f2575b005b610717600161072b60006101005b600060ff8211156108f457610002565b610717600161072b60006101005b600061090483835b600060ff82111561097857610002565b61071760016000805b600a82101561072f57506014810260020a82801561073657506107346000601484026101b8565b610717600161072b60008060ff60025b60006000610100838501111561090e57610002565b6107176001600080805b600a8310156107445750506014810260020a8083801561074e575061074a828260148602610562565b6107176001600080805b600a8310156107445750506014810260020a80838015610760575061075c828260148602610509565b6107176001600080805b600a8310156107445750506014810260020a8083801561076e575061076e82826014860261044e565b610717600161072b60006101006101c0565b6107176001600080805b600a831015610744575050601f6014820260020a0280838015610780575061077c8282601486026005610491565b61071760016000805b600a82101561072f57600282068260140260020a02905082801561079057506002820661078e82601485026101c0565b6107176001600080805b600a831015610744575050601f6014820260020a028083801561079e575061079e8282601486026005610702565b61071760016000805b600a82101561072f576107ac6000601484026103a7565b610717600161072b60006101005b600060ff8211156109c057610002565b61071760016000805b600a82101561072f5750601f6014820260020a028280156107ce57506107ce8160148402600561069c565b61071760016000805b600a82101561072f5750601f6014820260020a028280156107de57506107dc600082601485026005610702565b610717600161072b60006101005b600060ff8211156109d857610002565b610717600161072b6000806101005b6000600060ff83111561096457610002565b61071760016000805b600a82101561072f576107ec6000196014840261019a565b610717600161072b60008060ff60025b60006000610100838501111561098857610002565b610717600161072b6000806101005b6000600060ff8311156109e557610002565b6107176001600080805b600a8310156107445750506014810260020a8083801561081a57506108168282601486026104b5565b610717600161072b6000806101005b6000600060ff83111561094a57610002565b6107176001600080805b600a831015610744575050601f6014820260020a028083801561082c57506108288282601486026005610597565b610717600161072b6000806101005b6000600060ff83111561092f57610002565b610717600161072b600060ff6002610848565b610717600161072b60008060ff60025b6000600061010083850111156109ff57610002565b61071760016000805b600a82101561072f57506014810260020a82801561085b575061085b81601484026101b8565b61071760016000805b600a82101561072f5761086960006014840261042f565b6107176001600080805b600a831015610744575050601f6014820260020a02808380156108ba57506108b68282601486026005610210565b610717600160005b600a81101561072b578180156108ca57506108c8600060148302600561069c565b61071760016000805b600a82101561072f57506014810260020a8280156108d657506108d46000826014850261044e565b610717600161072b600060ff60025b6000610100828401111561083a57610002565b61071760016000805b600a82101561072f57506014810260020a602b8202604b01028280156108e65750602b8202604b01603f166108e482601485026006610848565b610717600161072b60008060ff60025b6000600061010083850111156109a457610002565b604080519115158252519081900360200190f35b5090565b505090565b155b9250600191909101906101d9565b50505090565b6001145b93506001929092019161022f565b6000145b935060019290920191610262565b935060019290920191610295565b6000145b9350600192909201916102da565b145b925060019190910190610311565b93506001929092019161034b565b90508280156107c057508160140260020a81145b925060019190910190610382565b9250600191909101906103c0565b155b9250600191909101906103f4565b9050828015610808575060001961080682601485026103a7565b145b925060019190910190610469565b6001145b9350600192909201916104d1565b601f145b935060019290920191610525565b60018260020a036109cd8585855b60006101008284011115610a1b57610002565b9250600191909101906105b5565b905082801561088a575060148202600281900a906108889083906103a7565b145b9250610899816014840261042f565b90508280156108a85750806000145b9250600191909101906105e4565b601f145b935060019290920191610605565b155b915060010161063b565b155b925060019190910190610665565b145b9250600191909101906106b8565b8160020a19831690505b92915050565b60011490506108fe565b8360020a905060018360020a03818604828804171691505b50949350505050565b5050600281900a80840481840416600116905b509392505050565b8260020a9050808404600116818604600116189150610942565b8260020a9050808416818616149150610942565b8160020a830460011690506108fe565b8360020a905060018360020a0381860482880418169150610926565b8360020a60018460020a03029050808516818716149150610926565b8160020a831790506108fe565b1490505b9392505050565b8160020a831890506108fe565b8260020a9050808404600116818604600116179150610942565b8360020a905060018360020a0381860482880416169150610926565b60018260020a038360020a85041690506109d156";
const ABI = [{
    "constant": true,
    "inputs": [],
    "name": "testClearBitFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitSetFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitNotSetSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsOrFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitAndSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitXorSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitEqualSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testGetBitFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsXorSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testGetBitSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsEqualSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSetBitSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSetBitFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsSetSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsNotEqualSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testToggleBitFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitEqualFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testClearBitSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsXorFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitOrFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitOrSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitXorFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsAndSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitAndFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testGetBitsFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsAndFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitSetSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testToggleBitSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsOrSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsNotSetSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitNotEqualSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsSetFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testGetBitsSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testBitsEqualFailIndexOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}];


describe('Bits', function () {

    describe('BitOps', function () {

        before(function (done) {
            this.timeout(300000); // 5 minutes.
            console.log("\tInitializing web3 and deploying the BitOps test contract.");
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy(ABI, bytecode, function (err, contract) {
                    if (err)
                        return done(err);
                    bitopstest = contract;
                    done();
                });
            });
        });

        describe('bit()', function () {

            it('should get a bit successfully', function (done) {
                bitopstest.testGetBitSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to get a bit because index is out-of-bounds', function (done) {
                bitopstest.testGetBitFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bits()', function () {

            it('should get a series of bits successfully', function (done) {
                bitopstest.testGetBitsSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to get a series of bits because index is out-of-bounds', function (done) {
                bitopstest.testGetBitsFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('setBit()', function () {

            it('should set a bit successfully', function (done) {
                bitopstest.testSetBitSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to set a bit because index is out-of-bounds', function (done) {
                bitopstest.testSetBitFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('clearBit()', function () {

            it('should clear a bit successfully', function (done) {
                bitopstest.testClearBitSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to clear a bit because index is out-of-bounds', function (done) {
                bitopstest.testClearBitFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('toggleBit()', function () {

            it('should toggle a bit successfully', function (done) {
                bitopstest.testToggleBitSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to toggle a bit because index is out-of-bounds', function (done) {
                bitopstest.testToggleBitFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitSet()', function () {

            it('should confirm that a bit is set', function (done) {
                bitopstest.testBitSetSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should confirm that a bit is not set', function (done) {
                bitopstest.testBitNotSetSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to check a bit because index is out-of-bounds', function (done) {
                bitopstest.testBitSetFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitsSet()', function () {

            it('should confirm that a series of bits are set', function (done) {
                bitopstest.testBitsSetSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should confirm that a series of bits are not set', function (done) {
                bitopstest.testBitsNotSetSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to check a series of bits because index is out-of-bounds', function (done) {
                bitopstest.testBitsSetFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitEqual()', function () {

            it('should confirm that the bit with the given index is the same for two numbers', function (done) {
                bitopstest.testBitEqualSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should confirm that the bit with the given index is not the same for two numbers', function (done) {
                bitopstest.testBitNotEqualSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to confirm that the bit with the given index is the same for two numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitEqualFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitsEqual()', function () {

            it('should confirm that a series of bits with the given index are the same for two numbers', function (done) {
                bitopstest.testBitsEqualSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should confirm that a series of bits with the given index are not the same for two numbers', function (done) {
                bitopstest.testBitsNotEqualSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to confirm that a series of bits with the given index are the same for two numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitsEqualFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitAnd()', function () {

            it('should compute the logical -and- of two bits with the same index in two different numbers', function (done) {
                bitopstest.testBitAndSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to compute the logical -and- of two bits with the same index in two different numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitAndFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitsAnd()', function () {

            it('should compute the logical -and- of a series of bits starting at the same index in two different numbers', function (done) {
                bitopstest.testBitsAndSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to compute the logical -and- of a series of bits starting at the same index in two different numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitsAndFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitOr()', function () {

            it('should compute the logical -or- of two bits with the same index in two different numbers', function (done) {
                bitopstest.testBitOrSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to compute the logical -or- of two bits with the same index in two different numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitOrFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitsOr()', function () {

            it('should compute the logical -or- of a series of bits starting at the same index in two different numbers', function (done) {
                bitopstest.testBitsOrSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to compute the logical -or- of a series of bits starting at the same index in two different numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitsOrFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitXor()', function () {

            it('should compute the logical -xor- of two bits with the same index in two different numbers', function (done) {
                bitopstest.testBitXorSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to compute the logical -xor- of two bits with the same index in two different numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitXorFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

        describe('bitsXor()', function () {

            it('should compute the logical -xor- of a series of bits starting at the same index in two different numbers', function (done) {
                bitopstest.testBitsXorSuccess(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to compute the logical -xor- of a series of bits starting at the same index in two different numbers because the index is out-of-bounds', function (done) {
                bitopstest.testBitsXorFailIndexOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

        });

    });

});