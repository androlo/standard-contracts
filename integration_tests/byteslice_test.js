const assert = require('assert');
const path = require('path');
const util = require('./utils');

var byteslicetest;

const bytecode = "606060405261134f806100126000396000f36060604052361561017f5760e060020a600035046305088c8a81146101815780630a53e81d146102205780630e6bda7a146102d75780630fafb6cb146103245780631342066514610356578063161ec4c61461038457806332d7d446146103b35780633336d4b31461040057806338db6d1214610448578063424023a11461047a5780634e1da16f146104ca57806350f419c9146105175780635253ea61146105645780635401a5b5146105a45780636b3283c4146106445780637b2b388d146106725780638312b073146106a45780638539762e146106d6578063895fcc56146107235780638c75751d14610752578063977e7bfe14610792578063aba6fe46146107d2578063ace5786e146107ff578063b49b3afc1461083f578063b6f4dbd014610871578063ca56106c146108ac578063ccd95663146108e9578063d3c9a9461461091f578063d8d9023e14610994578063ec87cdee146109c6578063f7ca3981146109fe578063fc81607a14610a3c578063fef23fc814610a74575b005b610ac760408051602081810183526000808352835180850190945280845290830181905260019290610ae090845b60206040519081016040528060008152602001506000826040518059106101d35750595b818152602091820281019091016040529150600090505b82811015611142576101008406810160f860020a028282815181101561000257906020010190908160001a9053506001016101ea565b610ac7604080516020818101835260008083528351808501909452808452908301819052918280610b325b604080516020810182526000815290516003908059106102685750595b908082528060200260200182016040525090508050600560f860020a02816000815181101561000257506005906020015350600660f860020a02816001815181101561000257506006906021015350600760f860020a0281600281518110156100025750600790602201535090565b610ac7604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610b878560016101af565b610ac760408051602081810183526000808352835180850190945280845290830181905260019290610c3190846101af565b610ac76040805160208181018352600080835283518085019094528084529083018190529182610c4b61024b565b610ac7604080516020818101835260008083528351808501909452808452908301819052918290610d2261024b565b610ac7604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610d518560016101af565b610ac76040805180820182526000808252602091820181905282518084019093528252600190820181905290610adb816001195b60008080831261117f5761113f8484610cca565b610ac760408051602081810183526000808352835180850190945280845290830181905260019290610d6e90846101af565b610ac76040805180820182526000808252602091820181905282518084019093528252600190820181905290610d6a8160011960f860020a6015025b600080831261116257611179848484610f44565b610ac7604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610db68560016101af565b610ac7604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610dcf8560016101af565b610ac76040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610e0b8460196101af565b60408051602081810183526000918290528251808401845282815280820183905283518083018552838152845180840186528481528551808701909652600786527f616263646566670000000000000000000000000000000000000000000000000093860193909352610ac79492610e4a845b6040805180820190915260008082526020828101918252835180151591850191909102835290525b919050565b610ac76040805160208181018352600080835283518085019094528084529083018190529182610e8861024b565b610ac760408051602081810183526000808352835180850190945280845290830181905260019290610ea190846101af565b610ac760408051602081810183526000808352835180850190945280845290830181905260019290610ebc90846101af565b610ac7604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610ed88560016101af565b610ac7604080516020818101835260008083528351808501909452808452908301819052918280610ef061024b565b610ac76040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610f548460196101af565b610ac76040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610f978460196101af565b610ac760408051602081810183526000808352835180850190945280845290830181905291610fdb61024b565b610ac760408051602081810183526000808352835180850185528181528083018290528451808601909552818552918401819052926110008460196101af565b610ac76040805160208181018352600080835283518085019094528084529083018190526001929061104090846101af565b610ac760408051602081810183526000808352835180850185528181528083018290528451928301909452808252929061105b8460196101af565b610ac7604080516020818101835260008083528351808501855281815280830182905284518086019095528185529184018190529261107d61024b565b610ac76040805180820182526000808252602091820181905282518084019093528252600190820181905290610adb8183610cca565b610ac76040805180820182526000808252602091820181905282518084018452818152820181905282518084018452818152600581840152835180850190945260078452600392840192909252916110cc82825b60008160200151836020015114801561098d575082518251145b9392505050565b610ac7604080516020818101835260008083528351808501909452808452908301819052600192906110d490846101af565b610ac7604080518082018252600080825260209182018190528251808401909352808352600591830191909152906110ec8180610973565b610ac76040805180820182526000808252602091820181905282518084019093528252600190820181905290610d6a818360f860020a601502610f44565b610ac76040805160208181018352600080835283518085018552818152808301829052845192830190945280825292906110f261024b565b610ac7604080516020818101835260008083528351808501855281815291820181905292518391908290805910610aa85750595b8181526020918202810190910160405292506000915061112183610617565b60408051918252519081900360200190f35b505b505090565b9150610aeb82610617565b9050610ad981600260015b60408051808201909152600080825260208281019190915284015180841180610b1e57508083115b80610b2857508284115b1561114957610002565b9350610b3d84610617565b92507f79000000000000000000000000000000000000000000000000000000000000009150610b6f83600119846104b6565b610b7b83600119610434565b91909114949350505050565b9350610b9284610617565b9250610bd383600019805b6040805180820190915260008082526020828101829052850151819081861215611196578582039250808311156111a657610002565b9150610bfe825b60408051602081810190925260008082529183015190918181141561121d57611216565b805160001495509050848015610c15575081516000145b9450848015610c28575081602001516000145b94505050505090565b9150610c3c82610617565b9050610ad98160006002610af6565b9250610c5683610617565b9150610c63826000610cca565b7f0500000000000000000000000000000000000000000000000000000000000000811494509050838015610ce257507f0600000000000000000000000000000000000000000000000000000000000000610ce0836001610cca565b61113f84828660200151035b6000600083602001518310151561126d57610002565b145b9350838015610d1a57507f0700000000000000000000000000000000000000000000000000000000000000610d18836002610cca565b145b935050505090565b9250602083019150610d3383610617565b8051831494509050838015610d1a5750602001516003149392505050565b9350610d5c84610617565b9250610bd383600080610af6565b5090565b9150610d7982610617565b9050610ad9816001195b604080518082019091526000808252602082810182905284015181908185126112a557849150808211156112b957610002565b9350610dc184610617565b9250610bd383600180610b9d565b9350610dda84610617565b9250610bd38360015b604080518082019091526000808252602082810191909152830151808311156112be57610002565b9250610e1683610617565b9150610e25826005600c610af6565b825181516005919091011494509050838015610d1a5750602001516007149392505050565b9250610e68836040805160208101909152600081526112d782610bda565b9150819050610c2884825b8151815160009190828183146112de5761129c565b9250610e9383610617565b9150610c6382600219610434565b9150610eac82610617565b9050610ad9816001196000610b9d565b9150610ec782610617565b9050610ad981600119600019610b9d565b9350610ee384610617565b9250610bd3836001610d83565b9350610efb84610617565b92507f78000000000000000000000000000000000000000000000000000000000000009150610f2c83600184610f44565b610b7b836001610cca565b6111798482866020015103845b6020830151821061134157610002565b9250610f5f83610617565b9150610f6c826003610de3565b825181516003919091011494509050838015610d1a5750602090810151910151600219011492915050565b9250610fa283610617565b9150610fb082601319610d83565b825181516005919091011494509050838015610d1a5750602090810151910151600419011492915050565b9150610fe682610617565b9050610ff681602081015161063f565b6003149250505090565b925061100b83610617565b915061101c82600419600019610b9d565b8251815160149091011494509050838015610d1a5750602001516004149392505050565b915061104b82610617565b9050610ad9816000600119610b9d565b925061106683610617565b915061107182610bda565b9050610d1a8382610e73565b925061108883610617565b6040805180820190915260008082526020828101918252835183528301519052909250825181511494509050838015610d1a57506020908101519101511492915050565b159250505090565b91506110df82610617565b9050610ad9816002610de3565b91505090565b925060208301600160038201535061110983610617565b915061111482610bda565b6023015115949350505050565b8051831494509050838015610d1a5750602001516000149392505050565b91505b5092915050565b5092518201919003801515919091028252602082015290565b8260000390508360200151811115610f3757610002565b50505050565b8260000390508360200151811115610cbe57610002565b859250808311156111ab57610002565b918203915b60008512156111c85760008590039150808211156111d857610002565b849150808211156111dd57610002565b908103905b818311156111ea57610002565b5094518101940380151594909402815260208101939093525090919050565b6000602086880101525050505b5050919050565b5060405183519082908059106112305750595b818152602091820281018201604052935060009084810190601f8501045b808311611209576020830280850151818401526001840193505061124e565b50509051015160001a60f860020a0290565b908103905b81810390508015158287510102808552816020860152505b50505092915050565b600085900391508082111561127f57610002565b611284565b9251820191909203801515919091028252602082015290565b905061063f565b5060005b8281101561133057848181518110156100025790602001015160f860020a900460f860020a028682815181101561000257016020015160f860020a908190040214611339576000935061129c565b6001935061129c565b6001016112e2565b8060001a828451015350505056";
const ABI = [{
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartposAndEndposFailStartposOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSetSigned",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposAndEndposEmptyBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartposAndEndposFailEndposOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testAt",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testCreateFromBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartposAndEndposEmptyBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testAtSignedFailIndexOutOfBounds",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposFailSOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSetSignedFailIndexOutOfBounds",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposAndEndpos2EmptyBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartposEmptyBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartposAndEndpos",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testToAscii",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testAtSigned",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposAndEndposFailStartposOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposAndEndposPositionsOverlap",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposEmptyBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSet",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartpos",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartpos",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testLength",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposAndEndpos",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromSignedStartposAndEndposFailEndposOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testToBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testCopy",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testAtFailIndexOutOfBounds",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSlicesEqualFail",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testNewSliceFromStartposFailSOOB",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSlicesEqualSuccess",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testSetFailIndexOutOfBounds",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testExcessBytesCleanedAfterToBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "testCreateFromEmptyBytes",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}];

describe('Bytes', function () {

    describe('ByteSlice', function () {

        before(function (done) {
            this.timeout(300000); // 5 minutes.
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy(ABI, bytecode, function (err, contract) {
                    if (err)
                        return done(err);
                    byteslicetest = contract;
                    done();
                });
            });
        });

        describe('#slice(bytes)', function () {
            it('should create a slice from bytes', function (done) {
                byteslicetest.testCreateFromBytes(function (err, result) {
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
        });

        describe('#slice(Slice)', function () {
            it('should copy the slice', function (done) {
                byteslicetest.testCopy(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });
        });

        describe('#slice(Slice, uint)', function () {
            it('should create a new slice from the given start-position', function (done) {
                byteslicetest.testNewSliceFromStartpos(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to create a new slice from a too high start-position', function (done) {
                byteslicetest.testNewSliceFromStartposFailSOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
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
        });

        describe('#slice(Slice, int)', function () {
            it('should create a new slice from the given signed start-position', function (done) {
                byteslicetest.testNewSliceFromSignedStartpos(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to create a new slice from a too low signed start-position', function (done) {
                byteslicetest.testNewSliceFromSignedStartposFailSOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

            it('should slice a slice (so that the length is 0 and output an empty from toBytes', function (done) {
                byteslicetest.testNewSliceFromSignedStartposEmptyBytes(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });
        });

        describe('#slice(Slice, uint, uint)', function () {

            it('should create a new slice from the given start- and end-position', function (done) {
                byteslicetest.testNewSliceFromStartposAndEndpos(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to create a new slice from a too high start-position (with end position)', function (done) {
                byteslicetest.testNewSliceFromStartposAndEndposFailStartposOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

            it('should fail to create a new slice from a too high end-position', function (done) {
                byteslicetest.testNewSliceFromStartposAndEndposFailEndposOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

            it('should fail to create a new slice from signed start- and end-position because start is larger then end', function (done) {
                byteslicetest.testNewSliceFromStartposAndEndposPositionsOverlap(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
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
            
        });

        describe('#slice(Slice, int, int)', function () {
            it('should create a new slice from the given signed start- and end-position', function (done) {
                byteslicetest.testNewSliceFromSignedStartposAndEndpos(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to create a new slice from a too high signed start-position (with end position)', function (done) {
                byteslicetest.testNewSliceFromSignedStartposAndEndposFailStartposOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

            it('should fail to create a new slice from a too high signed end-position', function (done) {
                byteslicetest.testNewSliceFromSignedStartposAndEndposFailEndposOOB(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });

            it('should fail to create a new slice from signed start- and end-position because start is larger then end', function (done) {
                byteslicetest.testNewSliceFromSignedStartposAndEndposPositionsOverlap(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
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
        });

        describe('#len(Slice)', function () {
            it('should get the right length', function (done) {
                byteslicetest.testLength(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });
        });

        describe('#at(Slice, uint)', function () {
            it('should get a byte from a slice.', function (done) {
                byteslicetest.testAt(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });


            it('should fail to get a byte from a slice because the index is too high.', function (done) {
                byteslicetest.testAtFailIndexOutOfBounds(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });
        });

        describe('#at(Slice, int)', function () {
            it('should get a byte from a slice using a signed index.', function (done) {
                byteslicetest.testAtSigned(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to get a byte from a slice because the signed index is too low.', function (done) {
                byteslicetest.testAtSignedFailIndexOutOfBounds(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });
        });

        describe('#set(Slice, uint)', function () {
            it('should set a byte in a slice.', function (done) {
                byteslicetest.testSet(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to set a byte in a slice because the index is too high.', function (done) {
                byteslicetest.testSetFailIndexOutOfBounds(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });
        });

        describe('#set(Slice, int)', function () {
            it('should set a byte in a slice using a signed index.', function (done) {
                byteslicetest.testSetSigned(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });

            it('should fail to set a byte in a slice because the signed index is too low.', function (done) {
                byteslicetest.testSetSignedFailIndexOutOfBounds(function (err, result) {
                    assert.ifError(err);
                    assert(!result);
                    done();
                })
            });
        });

        describe('#toBytes(Slice)', function () {
            it('should get the bytes from a slice.', function (done) {
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
        });

        describe('#toAscii(Slice)', function () {
            it('should get the ASCII string from a slice.', function (done) {
                byteslicetest.testToAscii(function (err, result) {
                    assert.ifError(err);
                    assert(result);
                    done();
                })
            });
        });

        describe('#equal(Slice, Slice)', function () {
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
                    assert(result);
                    done();
                })
            });
        });

    });

});