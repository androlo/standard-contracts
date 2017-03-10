const assert = require('assert');
const path = require('path');
const util = require('./utils');

var byteslicetest;

const bytecode = "0x60606040526113da806100126000396000f36060604052361561018a5760e060020a600035046305088c8a811461018c5780630a53e81d146102355780630e6bda7a146102ec5780630fafb6cb14610339578063134206651461036b578063161ec4c61461039957806332d7d446146103c85780633336d4b31461041557806338db6d121461045d578063424023a11461048f5780634e1da16f146104df57806350f419c91461052c5780635253ea61146105795780635401a5b5146105b957806364a4d63e146106595780636b3283c41461068c5780637b2b388d146106ba5780638312b073146106ec5780638539762e1461071f578063895fcc561461076c5780638c75751d1461079b578063977e7bfe146107db578063aba6fe461461081b578063ace5786e14610848578063b49b3afc14610888578063b6f4dbd0146108ba578063ca56106c146108f5578063ccd9566314610932578063d3c9a94614610968578063d8d9023e146109dd578063ec87cdee14610a0f578063f7ca398114610a47578063fc81607a14610a85578063fef23fc814610abd575b005b610b1060408051602081810183526000808352835180850190945280845290830181905260019290610b2b90845b60206040519081016040528060008152602001506000826040518059106101de5750595b818152602091820281019091016040529150600090505b828110156111b9576101008406810160f860020a028282815181101561000257906020010190600160f860020a031916908160001a9053506001016101f5565b610b10604080516020818101835260008083528351808501909452808452908301819052918280610b7d5b6040805160208101825260008152905160039080591061027d5750595b908082528060200260200182016040525090508050600560f860020a02816000815181101561000257506005906020015350600660f860020a02816001815181101561000257506006906021015350600760f860020a0281600281518110156100025750600790602201535090565b610b10604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610be08560016101ba565b610b1060408051602081810183526000808352835180850190945280845290830181905260019290610c8a90846101ba565b610b106040805160208181018352600080835283518085019094528084529083018190529182610ca4610260565b610b10604080516020818101835260008083528351808501909452808452908301819052918290610d99610260565b610b10604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610dc88560016101ba565b610b106040805180820182526000808252602091820181905282518084019093528252600190820181905290610b26816001195b6000808083126111f6576111b68484610d2d565b610b1060408051602081810183526000808352835180850190945280845290830181905260019290610de590846101ba565b610b106040805180820182526000808252602091820181905282518084019093528252600190820181905290610de18160011960f860020a6015025b60008083126111d9576111f0848484610fbb565b610b10604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610e2d8560016101ba565b610b10604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610e468560016101ba565b610b106040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610e828460196101ba565b60408051602081810183526000918290528251808401845282815280820183905283518083018552838152845180840186528481528551808701909652600786527f616263646566670000000000000000000000000000000000000000000000000093860193909352610b109492610ec1845b6040805180820190915260008082526020828101918252835180151591850191909102835290525b919050565b610b1060408051602081810183526000808352835180850190945280845290830181905260019290610b2b9060036101ba565b610b106040805160208181018352600080835283518085019094528084529083018190529182610eff610260565b610b1060408051602081810183526000808352835180850190945280845290830181905260019290610f1890846101ba565b610b1060408051602081810183526000808352835180850190945280845290830181905260019290610f339060036101ba565b610b10604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610f4f8560016101ba565b610b10604080516020818101835260008083528351808501909452808452908301819052918280610f67610260565b610b106040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610fcb8460196101ba565b610b10604080516020818101835260008083528351808501855281815280830182905284518086019095528185529184018190529261100e8460196101ba565b610b1060408051602081810183526000808352835180850190945280845290830181905291611052610260565b610b1060408051602081810183526000808352835180850185528181528083018290528451808601909552818552918401819052926110778460196101ba565b610b10604080516020818101835260008083528351808501909452808452908301819052600192906110b790846101ba565b610b106040805160208181018352600080835283518085018552818152808301829052845192830190945280825292906110d28460196101ba565b610b1060408051602081810183526000808352835180850185528181528083018290528451808601909552818552918401819052926110f4610260565b610b106040805180820182526000808252602091820181905282518084019093528252600190820181905290610b268183610d2d565b610b1060408051808201825260008082526020918201819052825180840184528181528201819052825180840184528181526005818401528351808501909452600784526003928401929092529161114382825b6000816020015183602001511480156109d6575082518251145b9392505050565b610b106040805160208181018352600080835283518085019094528084529083018190526001929061114b90846101ba565b610b106040805180820182526000808252602091820181905282518084019093528083526005918301919091529061116381806109bc565b610b106040805180820182526000808252602091820181905282518084019093528252600190820181905290610de1818360f860020a601502610fbb565b610b10604080516020818101835260008083528351808501855281815280830182905284519283019094528082529290611169610260565b610b10604080516020818101835260008083528351808501855281815291820181905292518391908290805910610af15750595b818152602091820281019091016040529250600091506111988361062c565b604080519115158252519081900360200190f35b505b505090565b9150610b368261062c565b9050610b2481600260015b60408051808201909152600080825260208281019190915284015180841180610b6957508083115b80610b7357508284115b156111c057610002565b9350610b888461062c565b92507f79000000000000000000000000000000000000000000000000000000000000009150610bba83600119846104cb565b610bc683600119610449565b600160f860020a0319928316921691909114949350505050565b9350610beb8461062c565b9250610c2c83600019805b604080518082019091526000808252602082810182905285015181908186121561120d5785820392508083111561121d57610002565b9150610c57825b6040805160208181019092526000808252918301519091818114156112945761128d565b805160001495509050848015610c6e575081516000145b9450848015610c81575081602001516000145b94505050505090565b9150610c958261062c565b9050610b248160006002610b41565b9250610caf8361062c565b9150610cbc826000610d2d565b600160f860020a031981167f05000000000000000000000000000000000000000000000000000000000000001494509050838015610d4f57507f0600000000000000000000000000000000000000000000000000000000000000610d43836001610d2d565b6111b684828660200151035b600060008360200151831015156112e457610002565b600160f860020a031916145b9350838015610d9157507f0700000000000000000000000000000000000000000000000000000000000000610d85836002610d2d565b600160f860020a031916145b935050505090565b9250602083019150610daa8361062c565b8051831494509050838015610d915750602001516003149392505050565b9350610dd38461062c565b9250610c2c83600080610b41565b5090565b9150610df08261062c565b9050610b24816001195b6040805180820190915260008082526020828101829052840151819081851261131c578491508082111561133057610002565b9350610e388461062c565b9250610c2c83600180610bf6565b9350610e518461062c565b9250610c2c8360015b6040805180820190915260008082526020828101919091528301518083111561133557610002565b9250610e8d8361062c565b9150610e9c826005600c610b41565b825181516005919091011494509050838015610d915750602001516007149392505050565b9250610edf8360408051602081019091526000815261134e82610c33565b9150819050610c8184825b81518151600091908281831461135557611313565b9250610f0a8361062c565b9150610cbc82600219610449565b9150610f238261062c565b9050610b24816001196000610bf6565b9150610f3e8261062c565b9050610b2481600019600119610bf6565b9350610f5a8461062c565b9250610c2c836001610dfa565b9350610f728461062c565b92507f78000000000000000000000000000000000000000000000000000000000000009150610fa383600184610fbb565b610bc6836001610d2d565b6111f08482866020015103845b602083015182106113cc57610002565b9250610fd68361062c565b9150610fe3826003610e5a565b825181516003919091011494509050838015610d915750602090810151910151600219011492915050565b92506110198361062c565b915061102782601319610dfa565b825181516005919091011494509050838015610d915750602090810151910151600419011492915050565b915061105d8261062c565b905061106d816020810151610654565b6003149250505090565b92506110828361062c565b915061109382600419600019610bf6565b8251815160149091011494509050838015610d915750602001516004149392505050565b91506110c28261062c565b9050610b24816000600119610bf6565b92506110dd8361062c565b91506110e882610c33565b9050610d918382610eea565b92506110ff8361062c565b6040805180820190915260008082526020828101918252835183528301519052909250825181511494509050838015610d9157506020908101519101511492915050565b159250505090565b91506111568261062c565b9050610b24816002610e5a565b91505090565b92506020830160016003820153506111808361062c565b915061118b82610c33565b6023015115949350505050565b8051831494509050838015610d915750602001516000149392505050565b91505b5092915050565b5092518201919003801515919091028252602082015290565b8260000390508360200151811115610fae57610002565b50505050565b8260000390508360200151811115610d2157610002565b8592508083111561122257610002565b918203915b600085121561123f57600085900391508082111561124f57610002565b8491508082111561125457610002565b908103905b8183111561126157610002565b5094518101940380151594909402815260208101939093525090919050565b6000602086880101525050505b5050919050565b5060405183519082908059106112a75750595b818152602091820281018201604052935060009084810190601f8501045b80831161128057602083028085015181840152600184019350506112c5565b50509051015160001a60f860020a0290565b908103905b81810390508015158287510102808552816020860152505b50505092915050565b60008590039150808211156112f657610002565b6112fb565b9251820191909203801515919091028252602082015290565b9050610654565b5060005b828110156113bb57848181518110156100025790602001015160f860020a900460f860020a02600160f860020a0319168682815181101561000257016020015160f860020a9081900402600160f860020a031916146113c45760009350611313565b60019350611313565b600101611359565b8060001a828451015350505056";
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
    "name": "testNewSliceFromStartposAndEndposPositionsOverlap",
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
            console.log("\tInitializing web3 and deploying the ByteSlice test contract.");
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

            it('should fail to create a new slice from start- and end-position because start is larger then end', function (done) {
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