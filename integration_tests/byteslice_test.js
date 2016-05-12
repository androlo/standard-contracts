const assert = require('assert');
const path = require('path');
const util = require('./utils');

var byteslicetest;

const bytecode = "606060405261138e806100126000396000f36060604052361561018a5760e060020a600035046305088c8a811461018c5780630a53e81d1461022b5780630e6bda7a146102e25780630fafb6cb1461032f5780631342066514610361578063161ec4c61461038f57806332d7d446146103be5780633336d4b31461040b57806338db6d1214610453578063424023a1146104855780634e1da16f146104d557806350f419c9146105225780635253ea611461056f5780635401a5b5146105af57806364a4d63e1461064f5780636b3283c4146106825780637b2b388d146106b05780638312b073146106e25780638539762e14610715578063895fcc56146107625780638c75751d14610791578063977e7bfe146107d1578063aba6fe4614610811578063ace5786e1461083e578063b49b3afc1461087e578063b6f4dbd0146108b0578063ca56106c146108eb578063ccd9566314610928578063d3c9a9461461095e578063d8d9023e146109d3578063ec87cdee14610a05578063f7ca398114610a3d578063fc81607a14610a7b578063fef23fc814610ab3575b005b610b0660408051602081810183526000808352835180850190945280845290830181905260019290610b1f90845b60206040519081016040528060008152602001506000826040518059106101de5750595b818152602091820281019091016040529150600090505b82811015611181576101008406810160f860020a028282815181101561000257906020010190908160001a9053506001016101f5565b610b06604080516020818101835260008083528351808501909452808452908301819052918280610b715b604080516020810182526000815290516003908059106102735750595b908082528060200260200182016040525090508050600560f860020a02816000815181101561000257506005906020015350600660f860020a02816001815181101561000257506006906021015350600760f860020a0281600281518110156100025750600790602201535090565b610b06604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610bc68560016101ba565b610b0660408051602081810183526000808352835180850190945280845290830181905260019290610c7090846101ba565b610b066040805160208181018352600080835283518085019094528084529083018190529182610c8a610256565b610b06604080516020818101835260008083528351808501909452808452908301819052918290610d61610256565b610b06604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610d908560016101ba565b610b066040805180820182526000808252602091820181905282518084019093528252600190820181905290610b1a816001195b6000808083126111be5761117e8484610d09565b610b0660408051602081810183526000808352835180850190945280845290830181905260019290610dad90846101ba565b610b066040805180820182526000808252602091820181905282518084019093528252600190820181905290610da98160011960f860020a6015025b60008083126111a1576111b8848484610f83565b610b06604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610df58560016101ba565b610b06604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610e0e8560016101ba565b610b066040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610e4a8460196101ba565b60408051602081810183526000918290528251808401845282815280820183905283518083018552838152845180840186528481528551808701909652600786527f616263646566670000000000000000000000000000000000000000000000000093860193909352610b069492610e89845b6040805180820190915260008082526020828101918252835180151591850191909102835290525b919050565b610b0660408051602081810183526000808352835180850190945280845290830181905260019290610b1f9060036101ba565b610b066040805160208181018352600080835283518085019094528084529083018190529182610ec7610256565b610b0660408051602081810183526000808352835180850190945280845290830181905260019290610ee090846101ba565b610b0660408051602081810183526000808352835180850190945280845290830181905260019290610efb9060036101ba565b610b06604080516020818101835260008083528351808501855281815280830182905284518086018652828152808401839052855193840190955281835290939091610f178560016101ba565b610b06604080516020818101835260008083528351808501909452808452908301819052918280610f2f610256565b610b066040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610f938460196101ba565b610b066040805160208181018352600080835283518085018552818152808301829052845180860190955281855291840181905292610fd68460196101ba565b610b066040805160208181018352600080835283518085019094528084529083018190529161101a610256565b610b06604080516020818101835260008083528351808501855281815280830182905284518086019095528185529184018190529261103f8460196101ba565b610b066040805160208181018352600080835283518085019094528084529083018190526001929061107f90846101ba565b610b0660408051602081810183526000808352835180850185528181528083018290528451928301909452808252929061109a8460196101ba565b610b0660408051602081810183526000808352835180850185528181528083018290528451808601909552818552918401819052926110bc610256565b610b066040805180820182526000808252602091820181905282518084019093528252600190820181905290610b1a8183610d09565b610b0660408051808201825260008082526020918201819052825180840184528181528201819052825180840184528181526005818401528351808501909452600784526003928401929092529161110b82825b6000816020015183602001511480156109cc575082518251145b9392505050565b610b066040805160208181018352600080835283518085019094528084529083018190526001929061111390846101ba565b610b066040805180820182526000808252602091820181905282518084019093528083526005918301919091529061112b81806109b2565b610b066040805180820182526000808252602091820181905282518084019093528252600190820181905290610da9818360f860020a601502610f83565b610b06604080516020818101835260008083528351808501855281815280830182905284519283019094528082529290611131610256565b610b06604080516020818101835260008083528351808501855281815291820181905292518391908290805910610ae75750595b8181526020918202810190910160405292506000915061116083610622565b60408051918252519081900360200190f35b505b505090565b9150610b2a82610622565b9050610b1881600260015b60408051808201909152600080825260208281019190915284015180841180610b5d57508083115b80610b6757508284115b1561118857610002565b9350610b7c84610622565b92507f79000000000000000000000000000000000000000000000000000000000000009150610bae83600119846104c1565b610bba8360011961043f565b91909114949350505050565b9350610bd184610622565b9250610c1283600019805b60408051808201909152600080825260208281018290528501518190818612156111d5578582039250808311156111e557610002565b9150610c3d825b60408051602081810190925260008082529183015190918181141561125c57611255565b805160001495509050848015610c54575081516000145b9450848015610c67575081602001516000145b94505050505090565b9150610c7b82610622565b9050610b188160006002610b35565b9250610c9583610622565b9150610ca2826000610d09565b7f0500000000000000000000000000000000000000000000000000000000000000811494509050838015610d2157507f0600000000000000000000000000000000000000000000000000000000000000610d1f836001610d09565b61117e84828660200151035b600060008360200151831015156112ac57610002565b145b9350838015610d5957507f0700000000000000000000000000000000000000000000000000000000000000610d57836002610d09565b145b935050505090565b9250602083019150610d7283610622565b8051831494509050838015610d595750602001516003149392505050565b9350610d9b84610622565b9250610c1283600080610b35565b5090565b9150610db882610622565b9050610b18816001195b604080518082019091526000808252602082810182905284015181908185126112e457849150808211156112f857610002565b9350610e0084610622565b9250610c1283600180610bdc565b9350610e1984610622565b9250610c128360015b604080518082019091526000808252602082810191909152830151808311156112fd57610002565b9250610e5583610622565b9150610e64826005600c610b35565b825181516005919091011494509050838015610d595750602001516007149392505050565b9250610ea78360408051602081019091526000815261131682610c19565b9150819050610c6784825b81518151600091908281831461131d576112db565b9250610ed283610622565b9150610ca28260021961043f565b9150610eeb82610622565b9050610b18816001196000610bdc565b9150610f0682610622565b9050610b1881600019600119610bdc565b9350610f2284610622565b9250610c12836001610dc2565b9350610f3a84610622565b92507f78000000000000000000000000000000000000000000000000000000000000009150610f6b83600184610f83565b610bba836001610d09565b6111b88482866020015103845b6020830151821061138057610002565b9250610f9e83610622565b9150610fab826003610e22565b825181516003919091011494509050838015610d595750602090810151910151600219011492915050565b9250610fe183610622565b9150610fef82601319610dc2565b825181516005919091011494509050838015610d595750602090810151910151600419011492915050565b915061102582610622565b905061103581602081015161064a565b6003149250505090565b925061104a83610622565b915061105b82600419600019610bdc565b8251815160149091011494509050838015610d595750602001516004149392505050565b915061108a82610622565b9050610b18816000600119610bdc565b92506110a583610622565b91506110b082610c19565b9050610d598382610eb2565b92506110c783610622565b6040805180820190915260008082526020828101918252835183528301519052909250825181511494509050838015610d5957506020908101519101511492915050565b159250505090565b915061111e82610622565b9050610b18816002610e22565b91505090565b925060208301600160038201535061114883610622565b915061115382610c19565b6023015115949350505050565b8051831494509050838015610d595750602001516000149392505050565b91505b5092915050565b5092518201919003801515919091028252602082015290565b8260000390508360200151811115610f7657610002565b50505050565b8260000390508360200151811115610cfd57610002565b859250808311156111ea57610002565b918203915b600085121561120757600085900391508082111561121757610002565b8491508082111561121c57610002565b908103905b8183111561122957610002565b5094518101940380151594909402815260208101939093525090919050565b6000602086880101525050505b5050919050565b50604051835190829080591061126f5750595b818152602091820281018201604052935060009084810190601f8501045b808311611248576020830280850151818401526001840193505061128d565b50509051015160001a60f860020a0290565b908103905b81810390508015158287510102808552816020860152505b50505092915050565b60008590039150808211156112be57610002565b6112c3565b9251820191909203801515919091028252602082015290565b905061064a565b5060005b8281101561136f57848181518110156100025790602001015160f860020a900460f860020a028682815181101561000257016020015160f860020a90819004021461137857600093506112db565b600193506112db565b600101611321565b8060001a828451015350505056";
const ABI = [{"constant":true,"inputs":[],"name":"testNewSliceFromStartposAndEndposFailStartposOOB","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testSetSigned","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposAndEndposEmptyBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartposAndEndposFailEndposOOB","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testAt","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testCreateFromBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartposAndEndposEmptyBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testAtSignedFailIndexOutOfBounds","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposFailSOOB","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testSetSignedFailIndexOutOfBounds","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposAndEndpos2EmptyBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartposEmptyBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartposAndEndpos","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testToAscii","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartposAndEndposPositionsOverlap","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testAtSigned","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposAndEndposFailStartposOOB","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposAndEndposPositionsOverlap","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposEmptyBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testSet","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartpos","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartpos","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testLength","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposAndEndpos","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromSignedStartposAndEndposFailEndposOOB","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testToBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testCopy","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testAtFailIndexOutOfBounds","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testSlicesEqualFail","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testNewSliceFromStartposFailSOOB","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testSlicesEqualSuccess","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testSetFailIndexOutOfBounds","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testExcessBytesCleanedAfterToBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"testCreateFromEmptyBytes","outputs":[{"name":"ret","type":"bool"}],"type":"function"}];

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