const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');

var rlpreadertest;

const bytecode = "0x6060604052611038806100126000396000f3606060405236156100c45760e060020a6000350463024a56a481146100c657806304455e951461011e5780630902c6d714610176578063564ad142146101ce57806361cd5683146102705780636f826a7d146102c85780637b053195146103205780637b8167191461037857806395e77a05146103d0578063a49886ce1461048b578063b66e68f2146104e3578063c91813ca14610552578063d572056e146105aa578063e59b0e1414610625578063e95bd5f21461067d578063f8f1f151146106e2575b005b61073a6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060006108a46108ac8361044f565b61073a6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060006108a46108d98361044f565b61074e6004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650505050505050600061094661094d8361044f565b6107606004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437505060408051602081810183526000808352835160a0810185526060810182815260808201839052815280830182905284518086019095528185529184018190529799509735978796508695509093508492509082906109526109078b61044f565b6107c86004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505050505050506000610946610a498361044f565b61073a6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060006108a4610a5a8361044f565b61074e6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505050505050506000610946610a7f8361044f565b61074e6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060006109466108b18361044f565b61073a6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060016109a782826040805180820182526000808252602082810182905283518085019094528184528301819052909190610d6f855b6040805180820190915260008082526020820181905282519081811415610b1c5760408051808201909152818152602081018290529250610b39565b61074e6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505050505050506000610946610a948361044f565b6107e56004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060408051808201909152600080825260208201819052908190819081610a9f8661044f565b61073a6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505050505050506000610946610abf8361044f565b6107606004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060408051602081810183526000808352835180850190945280845290830181905291829182918290610ad08761044f565b61073a6004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050505050505060006108a4610aee8361044f565b61080d6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505050505050506040805160208101909152600081526108a4610af38361044f565b61087b6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505050505050506000610946610b0d8361044f565b604080519115158252519081900360200190f35b60408051918252519081900360200190f35b604051808681526020018581526020018415158152602001806020018381526020018281038252848181518152602001915080519060200190602002808383829060006004602084601f0104600f02600301f150905001965050505050505060405180910390f35b60408051600160f860020a03199092168252519081900360200190f35b604080519384526020840192909252600160f860020a03191682820152519081900360600190f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561086d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b90505b919050565b6108c3565b6000610946825b600060006000610b61845b60006000826020015160001415610b40576109a7565b610930565b94508450846040518059106108f05750595b818152602091820281019091016040529550610c468a5b6040805160a0810190915260006060820181815260808301829052825260208201819052610bb5835b60006000826020015160001415610b50576109a7565b90506108a7565b6108b8565b92505b6109ad8361097f565b6109d3835b6040805180820190915260008082526020820181905280610bf0845b6040805180820190915260008082526020918201528151808201518151928401519201909110905b50919050565b80156109b857508882105b1561095e576109c683610963565b5060019190910190610955565b9050610a33815b60408051602081810183526000808352835160a0810185526060810182815260808201839052815280830182905284518086019095528185528483018290528551928601519294929391928391829182610a728a610930565b939e929d50909b50995090975095505050505050565b6000600060006000610cbd856108c3565b600060006000610ce3845b60208101516000146108a7565b96508615610c52576108de8a5b600060006000600060006000610d1f87610930565b6000610946826108b8565b602081015190518051909891975060001a60f860020a0295509350505050565b6000600060006000610ddd856108c3565b9050610adb816109da565b939b929a50909850965090945092505050565b610a65565b6040805160208101909152600080825280610e30846108c3565b600060006000610e9c846108c3565b506040805180820190915260208481018083529082018390529092505b5050919050565b5050515160c060009190911a1090565b5050515160c060009190911a101590565b1515610b6c57610002565b610b84845b60006000600060006000610eda866108c3565b915091506020811180610b975750806000145b15610ba157610002565b806020036101000a82510492505050919050565b1515610bc057610002565b610bdd835b600060006000836020015160001415610f4b57610b39565b8351938352929092016020820152919050565b15610c055783602001519150610c0a82610c2d565b610002565b8284526020848101829052818401908601529050610b39565b80610d8f83600001515b8051600090811a6080811015610fb157600191506109a7565b92505b610c5f8361097f565b5050505091939590929450565b8015610c6a57508484105b15610c5257610c7883610963565b915081519050808685815181101561000257505050602084810287010181905260019390930192610c49565b825160001a90508060f860020a0293505b505050919050565b1515610cc857610002565b610cd185610b71565b909350915060018214610ca457610002565b15610cf15760009250610b39565b50508151805160001a906080821480610d0a575060c082145b9250610b39565b8095505b5050505050919050565b1515610d2e5760009550610d15565b8651805160001a95509350610d4287610bc5565b840192506001876020015185010391505b818311610d1157610d6383610c2d565b90920191600101610d53565b91508315610dd55750835180610d8483610bc5565b1115610c2357610002565b14610d9957610002565b610dca828051805160009181831a9160011a90608183148015610dbc5750608082105b15610e265760009350610cb5565b1515610dd557610002565b509392505050565b1515610de857610002565b610df185610b71565b909350915060018214610e0357610002565b50815160001a6001811115610e1757610002565b80600114610e26576000610e29565b60015b9350610cb5565b1515610e3b57610002565b610e4484610b71565b9150915080604051805910610e565750595b818152602091820281019091016040529250610b3982848360006020601f83010484602085015b8284146110255760208402808301518183015260018501945050610e7d565b1515610ea757610002565b610eb084610b71565b909250905060148114610ec257610002565b50516c01000000000000000000000000900492915050565b1515610ee557610002565b8551805160001a935091506080831015610f0757909350600192508390610f43565b60b8831015610f26576020860151600183019550600019019350610f43565b50602085015181830160b51901945082900360b601925060b61982015b505050915091565b50508151805160001a906080821015610f675760009250610b39565b60b8821080610f82575060c08210158015610f82575060f882105b15610f905760019250610b39565b60c0821015610fa55760b51982019250610b39565b60f51982019250610b39565b60b8811015610fc657607e19810191506109a7565b60c0811015610fef57600183015160b76020839003016101000a9004810160b5190191506109a7565b60f88110156110045760be19810191506109a7565b6001929092015160f76020849003016101000a900490910160f51901919050565b600086516020018701525050505050505056";
const ABI = [{
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testIsData",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testIsList",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToUint",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}, {"name": "index", "type": "uint256"}],
    "name": "testSubItem",
    "outputs": [{"name": "memPtr", "type": "uint256"}, {"name": "len", "type": "uint256"}, {
        "name": "isList",
        "type": "bool"
    }, {"name": "list", "type": "uint256[]"}, {"name": "listLen", "type": "uint256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToByte",
    "outputs": [{"name": "", "type": "bytes1"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testIsEmpty",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testItems",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToInt",
    "outputs": [{"name": "", "type": "int256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testItemStrict",
    "outputs": [{"name": "res", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToBytes32",
    "outputs": [{"name": "", "type": "bytes32"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testFirst",
    "outputs": [{"name": "memPtr", "type": "uint256"}, {"name": "len", "type": "uint256"}, {
        "name": "first",
        "type": "bytes1"
    }],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToBool",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testItem",
    "outputs": [{"name": "memPtr", "type": "uint256"}, {"name": "len", "type": "uint256"}, {
        "name": "isList",
        "type": "bool"
    }, {"name": "list", "type": "uint256[]"}, {"name": "listLen", "type": "uint256"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testIsNull",
    "outputs": [{"name": "ret", "type": "bool"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToData",
    "outputs": [{"name": "bts", "type": "bytes"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "rlp", "type": "bytes"}],
    "name": "testToAddress",
    "outputs": [{"name": "", "type": "address"}],
    "type": "function"
}];

describe('Codec', function () {

    describe('RLP', function () {

        before(function (done) {
            this.timeout(300000); // 5 minutes.
            console.log("\tInitializing web3 and deploying the RLP test contract.");
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy(ABI, bytecode, function (err, contract) {
                    if (err)
                        return done(err);
                    rlpreadertest = contract;
                    done();
                });
            });
        });

        describe('RLPItem', function () {

            describe('#toRLPItem(bytes [, bool])', function () {

                it('should create a null RLP item from an empty byte-array', function (done) {
                    rlpreadertest.testItem("0x", function (err, result) {
                        assert.ifError(err);
                        var memPtr = result[0].toNumber();
                        assert.equal(memPtr, 0);
                        var len = result[1].toNumber();
                        assert.equal(len, 0);
                        var isList = result[2];
                        assert(!isList);
                        done();
                    })
                });

                it('should create an RLP item from encoded strings', function (done) {
                    async.forEachOfSeries(testStrings, function (testData, idx, cb) {
                            rlpreadertest.testItem(testData.input, function (err, result) {
                                assert.ifError(err);
                                var eRes = testData.result;
                                var len = result[1].toNumber();
                                assert.equal(len, eRes.length);
                                var isList = result[2];
                                assert(!isList);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

                it('should create an RLP item from encoded lists', function (done) {
                    async.forEachOfSeries(testLists, function (testData, idx, cb) {
                            rlpreadertest.testItem(testData.input, function (err, result) {
                                assert.ifError(err);
                                var eRes = testData.result;
                                var memPtr = result[0].toNumber();
                                var len = result[1].toNumber();
                                assert.equal(len, eRes.length);
                                var isList = result[2];
                                assert(isList);
                                var list = result[3];
                                var listLen = result[4].toNumber();
                                if (listLen > 0) {
                                    for (var i = 0; i < listLen; i++) {
                                        var le = list[i].toNumber();
                                        assert.equal(le - memPtr, eRes.list[i]);
                                    }
                                }
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

                it('should fail to create items from malformed RLP in strict mode', function (done) {
                    async.forEachOfSeries(invalidRLP, function (testData, idx, cb) {
                            rlpreadertest.testItemStrict(testData, function (err, result) {
                                assert.ifError(err);
                                assert(!result);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

                it('should succeed in creating RLP items from proper RLP in strict mode', function (done) {
                    async.forEachOfSeries(testLists, function (testData, idx, cb) {
                            rlpreadertest.testItemStrict(testData.input, function (err, result) {
                                assert.ifError(err);
                                assert(result);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

            });

            describe('#isList(Slice)', function () {

                it('should detect that 0x is not a list', function (done) {
                    rlpreadertest.testIsList("0x", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

                it('should detect that RLP encoded strings are not lists', function (done) {
                    async.forEachOfSeries(testStrings, function (testData, idx, cb) {
                            rlpreadertest.testIsList(testData.input, function (err, result) {
                                assert.ifError(err);
                                assert(!result);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

                it('should detect that RLP encoded lists are lists', function (done) {
                    async.forEachOfSeries(testLists, function (testData, idx, cb) {
                            rlpreadertest.testIsList(testData.input, function (err, result) {
                                assert.ifError(err);
                                assert(result);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

            });

            describe('#isData(Slice)', function () {

                it('should detect that 0x is not data', function (done) {
                    rlpreadertest.testIsData("0x", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

                it('should detect that RLP encoded strings are data', function (done) {
                    async.forEachOfSeries(testStrings, function (testData, idx, cb) {
                            rlpreadertest.testIsData(testData.input, function (err, result) {
                                assert.ifError(err);
                                assert(result);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

                it('should detect that RLP encoded lists are not data', function (done) {
                    async.forEachOfSeries(testLists, function (testData, idx, cb) {
                            rlpreadertest.testIsData(testData.input, function (err, result) {
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

            describe('#isEmpty(Slice)', function () {

                it('should detect that 0x00 is not empty', function (done) {
                    rlpreadertest.testIsEmpty("0x00", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

                it('should detect that 0x is not empty', function (done) {
                    rlpreadertest.testIsEmpty("0x", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

                it('should detect that 0x80 is empty', function (done) {
                    rlpreadertest.testIsEmpty("0x80", function (err, result) {
                        assert.ifError(err);
                        assert(result);
                        done();
                    });
                });

                it('should detect that 0xC0 is empty', function (done) {
                    rlpreadertest.testIsEmpty("0xC0", function (err, result) {
                        assert.ifError(err);
                        assert(result);
                        done();
                    });
                });

            });

            describe('#isNull(Slice)', function () {

                it('should detect that 0x is null', function (done) {
                    rlpreadertest.testIsNull("0x", function (err, result) {
                        assert.ifError(err);
                        assert(result);
                        done();
                    });
                });

                it('should detect that 0x00 is not null', function (done) {
                    rlpreadertest.testIsNull("0x00", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

                it('should detect that 0x80 is not null', function (done) {
                    rlpreadertest.testIsNull("0x80", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

                it('should detect that 0xC0 is not null', function (done) {
                    rlpreadertest.testIsNull("0xC0", function (err, result) {
                        assert.ifError(err);
                        assert(!result);
                        done();
                    });
                });

            });

            describe('#items(Slice)', function () {

                it('should find the correct number of elements in an RLP encoded list', function (done) {
                    async.forEachOfSeries(testLists, function (testData, idx, cb) {
                            rlpreadertest.testItems(testData.input, function (err, result) {
                                assert.ifError(err);
                                var listLen = result.toNumber();
                                assert.equal(listLen, testData.result.list.length);
                                cb();
                            })
                        }, function () {
                            done();
                        }
                    );
                });

            });

            describe('#item(Slice, uint)', function () {
                /*
                 // List of strings and lists mixed
                 input: "0xC8C201028101C20102",
                 result: {length: 9, list: [1, 4, 6]}
                 */
                it('should create an RLP item from index 0 of "0xC9C201028101C3010203"', function (done) {
                    rlpreadertest.testItem("0xC9C201028101C3010203", function (err, result) {
                        assert.ifError(err);
                        var subPtr = result[3][0].toNumber();
                        rlpreadertest.testSubItem("0xC9C201028101C3010203", 0, function (err, result) {
                            assert.ifError(err);
                            var memPtr = result[0].toNumber();
                            assert.equal(memPtr, subPtr);
                            var len = result[1].toNumber();
                            assert.equal(len, 3);
                            var isList = result[2];
                            assert(isList);
                            var list = result[3];
                            var listLen = result[4].toNumber();
                            assert.equal(listLen, 2);
                            assert.equal(list[0].toNumber(), memPtr + 1);
                            assert.equal(list[1].toNumber(), memPtr + 2);
                            done();
                        });

                    });

                });

                it('should create an RLP item from index 1 of "0xC9C201028101C3010203"', function (done) {
                    rlpreadertest.testItem("0xC9C201028101C3010203", function (err, result) {
                        assert.ifError(err);
                        var subPtr = result[3][1].toNumber();
                        rlpreadertest.testSubItem("0xC9C201028101C3010203", 1, function (err, result) {
                            assert.ifError(err);
                            var memPtr = result[0].toNumber();
                            assert.equal(memPtr, subPtr);
                            var len = result[1].toNumber();
                            assert.equal(len, 2);
                            var isList = result[2];
                            assert(!isList);
                            done();
                        });

                    });

                });

                it('should create an RLP item from index 2 of "0xC9C201028101C3010203"', function (done) {
                    rlpreadertest.testItem("0xC9C201028101C3010203", function (err, result) {
                        assert.ifError(err);
                        var subPtr = result[3][2].toNumber();
                        rlpreadertest.testSubItem("0xC9C201028101C3010203", 2, function (err, result) {
                            assert.ifError(err);
                            var memPtr = result[0].toNumber();
                            assert.equal(memPtr, subPtr);
                            var len = result[1].toNumber();
                            assert.equal(len, 4);
                            var isList = result[2];
                            assert(isList);
                            var list = result[3];
                            var listLen = result[4].toNumber();
                            assert.equal(listLen, 3);
                            assert.equal(list[0].toNumber(), memPtr + 1);
                            assert.equal(list[1].toNumber(), memPtr + 2);
                            assert.equal(list[2].toNumber(), memPtr + 3);
                            done();
                        });

                    });

                });

            });

            describe('#toData(Slice)', function () {

                it('should decode RLP encoded data and return it as bytes', function (done) {
                    async.forEachOfSeries(testStrings, function (testData, idx, cb) {
                            rlpreadertest.testToData(testData.input, function (err, result) {
                                assert.ifError(err);
                                assert.equal(result, testData.result.bytes);
                                cb();
                            });
                        }, function () {
                            done();
                        }
                    );
                });

            });
        });

        describe('Iterator', function () {

            describe('#next([bool])', function () {

                var parentMemPtr, parentLength, parentList;

                before(function (done) {
                    rlpreadertest.testItem("0xC7C2010201C20102", function (err, result) {
                        assert.ifError(err);
                        parentMemPtr = result[0].toNumber();
                        parentLength = result[1].toNumber();
                        parentList = result[3];
                        done();
                    });
                });

                it('should create an iterator from an RLP item and get the first item', function (done) {
                    rlpreadertest.testSubItem("0xC7C2010201C20102", 0, function (err, result) {
                        assert.ifError(err);
                        var memPtr = result[0].toNumber();
                        assert.equal(memPtr, parentMemPtr + 1);
                        var len = result[1].toNumber();
                        assert.equal(len, 3);
                        var isList = result[2];
                        assert(isList);
                        var list = result[3];
                        var listLen = result[4].toNumber();
                        assert.equal(listLen, 2);
                        var it0 = list[0].toNumber();
                        assert.equal(it0 - memPtr, 1);
                        var it1 = list[1].toNumber();
                        assert.equal(it1 - memPtr, 2);
                        done();
                    });
                });

                it('should create an iterator from an RLP item and get the second item', function (done) {
                    rlpreadertest.testSubItem("0xC7C2010201C20102", 1, function (err, result) {
                        assert.ifError(err);
                        var memPtr = result[0].toNumber();
                        assert.equal(memPtr, parentMemPtr + 4);
                        var len = result[1].toNumber();
                        assert.equal(len, 1);
                        var isList = result[2];
                        assert(!isList);
                        done();
                    });
                });

                it('should create an iterator from an RLP item and get the third item', function (done) {
                    rlpreadertest.testSubItem("0xC7C2010201C20102", 2, function (err, result) {
                        assert.ifError(err);
                        var memPtr = result[0].toNumber();
                        assert.equal(memPtr, parentMemPtr + 5);
                        var len = result[1].toNumber();
                        assert.equal(len, 3);
                        var isList = result[2];
                        assert(isList);
                        var list = result[3];
                        var listLen = result[4].toNumber();
                        assert.equal(listLen, 2);
                        var it0 = list[0].toNumber();
                        assert.equal(it0 - memPtr, 1);
                        var it1 = list[1].toNumber();
                        assert.equal(it1 - memPtr, 2);
                        done();
                    });
                });

            });
        });
    });

});

const testStrings = [
    {
        input: "0x00",
        result: {bytes: "0x00", length: 1}
    }, {
        input: "0x05",
        result: {bytes: "0x05", length: 1}
    }, {
        input: "0x80",
        result: {bytes: "0x", length: 1}
    }, {
        input: "0x820505",
        result: {bytes: "0x0505", length: 3}
    }, {
        input: "0x880102030405060708",
        result: {bytes: "0x0102030405060708", length: 9}
    }, {
        input: "0xB701020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607",
        result: {
            bytes: "0x01020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607",
            length: 56
        }
    }, {
        input: "0xB8380102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
        result: {
            bytes: "0x0102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
            length: 58
        }
    }, {
        input: "0xB9010001020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
        result: {
            bytes: "0x01020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
            length: 259
        }
    }
];

// List is offset by starting memory address in tests.
const testLists = [
    {
        // Empty list
        input: "0xC0",
        result: {length: 1, list: []}
    }, {
        // List of length 1 items
        input: "0xC80102030405060708",
        result: {length: 9, list: [1, 2, 3, 4, 5, 6, 7, 8]}
    }, {
        // List of mixed string types
        input: "0xF873B70102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060705B8380102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
        result: {length: 117, list: [2, 58, 59]}
    }, {
        // List of empty lists
        input: "0xC3C0C0C0",
        result: {length: 4, list: [1, 2, 3]}
    }, {
        // List of lists
        input: "0xC6C20102C20102",
        result: {length: 7, list: [1, 4]}
    }, {
        // List of strings and lists mixed
        input: "0xC7C2010201C20102",
        result: {length: 8, list: [1, 4, 5]}
    }, {
        // List of length 55
        input: "0xF7B6010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506",
        result: {length: 56, list: [1]}
    }, {
        // List of length > 55
        input: "0xF838B701020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607",
        result: {length: 58, list: [2]}
    }, {
        // List of length with length > 255
        input: "0xF90103B9010001020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708",
        result: {length: 262, list: [3]}
    }
];

const invalidRLP = [
    "0x817F",
    "0x81",
    "0xB70102030405060708010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060706",
    "0xB7010203040506070801020304050607080102030405060708010203040506070801020304050607080102030405060708010203040506",
    "0xC001",
    "0xC2010203"
];