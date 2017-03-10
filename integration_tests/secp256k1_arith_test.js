const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');
const BigNumber = require("bignumber.js");
const testdata = require('./data/secp2561k_data.json');

var secp256k1;

const bytecode = "0x606060405261108c806100126000396000f3606060405236156100565760e060020a60003504631a36572f811461005857806325562632146100fa5780634a9f61fc146101ee5780634e0207451461034d57806398037180146103ca578063db44a94d14610424575b005b60408051606081810190925261054b91600491606491839060039083908390808284375050604080518082018252919650929460a49450909290915060029083908390808284375090955050505050506060604051908101604052806003905b60008152602001906001900390816100b857505060408051606081019091526003815b60008152602001906001900390816100db5790505061056d84846105c2565b60408051606081810190925261054b91600491606491839060039083908390808284375050604080518082018252919650929460a49450909290915060029083908390808284375090955050505050506060604051908101604052806003905b600081526020019060019003908161015a5790505061067583835b60006040604051908101604052806002905b600081526020019060019003908161018757505060408051608081019091526004815b60008152602001906001900390816101aa5750600090508080808089600150602001518114156109645788518a52602089810151908b0152600160408b0152610958565b60408051808201825261054b91600480359290916064919060249060029083908390808284375090955050505050506060604051908101604052806003905b600081526020019060019003908161022d57505060408051606081019091526003815b60008152602001906001900390816102505790505061056d84846060604051908101604052806003905b600081526020019060019003908161027a57905050600060006000610300604051908101604052806008905b6060604051908101604052806003905b60008152602001906001900390816102b6579050508152602001906001900390816102a657505060408051606081019091526003815b60008152602001906001900390816102ec5750506040805161020081019091526010815b6000815260200190600190039081610310579050506000600060006401000003d01998508b60001415610a1c575b50505050505050505092915050565b60408051606081810190925261054b91600491606491839060039083908390808284375090955050505050506060604051908101604052806003905b600081526020019060019003908161038957505060408051606081019091526003815b60008152602001906001900390816103ac5790505061068c836106a3565b60408051606081810190925261054b91600491606491839060039083908390808284375090955050505050506060604051908101604052806003905b6000815260200190600190039081610406579050506106f082610705565b60408051606081810190925261054b916004916064918390600390839083908082843760408051808301909152929750909560c4955091935090919083908390808284375090955050505050506060604051908101604052806003905b600081526020019060019003908161048157505060408051606081019091526003815b60008152602001906001900390816104a45790505061056d84845b6060604051908101604052806003905b60008152602001906001900390816104cf5790505060006080604051908101604052806004905b60008152602001906001900390816104f657505060408051608081019091526004815b6000815260200190600190039081610519575060009050808080808a60025060400151811415610e9a578998506107c2565b6040518082606080838184600060046030f15090500191505060405180910390f35b905061066e816401000003d0195b60008061088c8460025060400151845b60006000600060006000600087600014806105a557508688145b806105b05750866000145b1561103c57610002565b9450610a92858c5b6060604051908101604052806003905b60008152602001906001900390816105d25790505060006040604051908101604052806002905b60008152602001906001900390816105f957505060408051608081019091526004815b600081526020019060019003908161061c575060009050808080808a600250604001518114156107d057604080516060810182528b51815260208c8101519082015260019181019190915298506107c2565b9392505050565b610685836401000003d01961057b565b5090919050565b90506106ea816401000003d01961057b565b6108868b5b6060604051908101604052806003905b60008152602001906001900390816106b357506401000003d0199050600080808080808860025060400151811415610dba57610e1f565b92915050565b610727826401000003d01961057b565b610a178a5b6401000003d019600080808080808760025060400151811415610e2b57610e90565b5090565b8551604087015189918203900894508786600150602001518903876003506060015108935087858609925087858409915087828903898687090890508780808589600050510960020989038208808a5286519091508890819083820390829087900908850960208a8101919091528601518890819084900989038a600150602001510860208a015260408b01518890860960408a01525b505050505050505092915050565b60208a0151600014156107e5578a98506107c2565b60408b01516401000003d01998508890800980885260408c015189919009602088810191909152604080516080810182528d5181528d8301519281019290925288518c51918301918b91900981526020018989600160209190910151908e905060200151099052955085600250604001518660005051141561072b57602086015160608701511461069e576000808c5260208c0181905260408c01526107c2565b506107c2565b91508282830990508281856000505109845282808284096020860151096020850152505060016040929092019190915250565b8551604087015189918203900894508786600150602001518903876003506060015108935087858609925087858409915087828903898687090890508780808589600050510960020989038208808b5286519091508890819083820390829087900908850960208b8101919091528601518890819084900989038b6001909060200201510860208b015260408a01518890860960408b01525b50505050505050505050565b60208901516000141561097657610958565b60408a01516401000003d01998508890800980885260408b015189919009602088810191909152604080516080810182528c5181528c8301519281019290925288518b51918301918b91900981526020018989600160209190910151908d90506020015109905295508560025060400151866000505114156108bf576020860151606087015114610700576000808b5260208b0181905260408b0152610958565b610958565b6000604051985061020089016040525b8c15610a645760018d1615610a53575060208c0680888a015360206010821102818e03019c505b60028d049c50600188019750610a2c565b50604080516060810182528c51815260208d810151908201526001918101919091528087526105ba906106a3565b60208701819052610aa49086906104bf565b60408701819052610ab69086906104bf565b60608701819052610ac89086906104bf565b60808701819052610ada9086906104bf565b60a08701819052610aec9086906104bf565b60c08701819052610afe9086906104bf565b60e087015260208601516040015180855289908760025050604088810151015109602085018190526060870151604001518a9190096040858101829052608088015101518a9190096060850181905260a0870151604001518a9190096080850181905260c0870151604001518a91900960a0850181905260e0870151604001518a91900960c08501819052610b93908a61058b565b60e08501819052610100850181905260a08501518a9190096101e0850152600692505b60028310610c1d57610100840151899087600186016008811015610002576020020151604001510961010085018190528990856001198601601081101561000257602002015109848460080160108110156100025760200201526000199290920191610bb6565b61010084015160408781015101518a919009610120850152600092505b6007831015610d9657610cc086846001016008811015610002576020020151856009860160108110156100025760200201518b87600988016010811015610002576020020151886009890160108110156100025760200201510982518d908190839009845280808385096020860151096020850152505060016040929092019190915250565b60019290920191610c3a565b6010821115610d3257600282601f030490508050610d968a60406040519081016040528089856008811015610002575050602085028a015160009090602002015181526020018985600881101561000257505060208581028b015101518d039052610175565b6000821115610d96576002600183030490508050610d968a60406040519081016040528089856008811015610002575050602085028a015160009090602002015181526020018985600881101561000257505060208581028b015101519052610175565b600087111561033e578688016000199081015197019660001a9150610ccc8a610705565b885160208a015190965094508685800993508687858809600409925086878788096003099150868784850888038884850908808952905086808086800960080988038889848b0387088509086020890152604089015187908190870960020960408901525b50505050505050919050565b8751602089015190965094508685800993508687858809600409925086878788096003099150868784850888038884850908808952905086808086800960080988038889848b0387088509086020890152604088015187908190870960020960408901525b5050505050505050565b60408a015160001415610eaf578a98506107c2565b60408b01516401000003d01998508890800980885260408c015189919009602088015260408a01518890800960408881018290528b015189919009606088015260408051608081018252908801518c5182918b910981526020018989600350606001518e60015060200151098152602001898960009051908e9050510981526020018989600160209190910151908e9050602001510990529550856002506040015186600050511415610f79576020860151606087015114610f70576107c2565b6110268b6106a3565b8551604087015189918203900894508786600150602001518903876003506060015108935087858609925087858409915087828903898687090890508780808589600050510960020989038208808a5286519091508890819083820390829087900908850960208a8101919091528601518890819084900989038a600150602001510860208a015260408a810151908c01518991829109860960408a015250969998505050505050505050565b98506107c2565b8495505b505050505092915050565b8688111561104a5796869006965b600193508692508791505b60008214611076575091928282048481029091039291818302900390611055565b600085121561102d57846000038703955061103156";
const ABI = [{
    "constant": true,
    "inputs": [{"name": "P", "type": "uint256[3]"}, {"name": "Q", "type": "uint256[2]"}],
    "name": "addMixed",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "P", "type": "uint256[3]"}, {"name": "Q", "type": "uint256[2]"}],
    "name": "addMixedM",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "d", "type": "uint256"}, {"name": "P", "type": "uint256[2]"}],
    "name": "mul",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "P", "type": "uint256[3]"}],
    "name": "double",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "P", "type": "uint256[3]"}],
    "name": "doubleM",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "P", "type": "uint256[3]"}, {"name": "Q", "type": "uint256[3]"}],
    "name": "add",
    "outputs": [{"name": "", "type": "uint256[3]"}],
    "type": "function"
}];

// const SECP256K1P = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F");
// const SECP256K1N = new BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

describe('Crypto', function () {

    describe('Secp256k1Arith', function () {

        before(function (done) {
            this.timeout(300000); // 5 minutes.
            console.log("\tInitializing web3 and deploying the Secp256k1 arithmetic test contract.");
            util.initWeb3(function (err) {
                if (err)
                    return done(err);
                util.deploy(ABI, bytecode, function (err, contract) {
                    if (err)
                        return done(err);
                    secp256k1 = contract;
                    done();
                });
            });
        });

        describe('#add()', function () {

            it('should add a set of points successfully', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        secp256k1.add(randPoint, testdata.randomPoints[idx - 1], function (err, result) {
                            assert.ifError(err);
                            var expected = testdata.sums[idx - 1];
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should successfully add points with the point at identity.', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        secp256k1.add(randPoint, [0, 0, 0], function (err, result) {
                            assert.ifError(err);
                            var expected = randPoint;
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should successfully add the point at infinity with a point.', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        secp256k1.add([0, 0, 0], randPoint, function (err, result) {
                            assert.ifError(err);
                            var expected = randPoint;
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that addition is commutative for a set of points', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        secp256k1.add(randPoint, testdata.randomPoints[idx - 1], function (err, result) {
                            assert.ifError(err);
                            secp256k1.add(testdata.randomPoints[idx - 1], randPoint, function (err, result2) {
                                assert.ifError(err);
                                assert(result[0].eq(result2[0]));
                                assert(result[1].eq(result2[1]));
                                cb();
                            })
                        })
                    }, function () {
                        done();
                    }
                );
            });

        });

        describe('#addMixed()', function () {

            it('should add a set of points successfully', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        var P2 = testdata.randomPoints[idx - 1];
                        secp256k1.addMixed(randPoint, [P2[0], P2[1]], function (err, result) {
                            assert.ifError(err);
                            var expected = testdata.sums[idx - 1];
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should successfully add points with the point at identity.', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        secp256k1.addMixed(randPoint, [0, 0], function (err, result) {
                            assert.ifError(err);
                            var expected = randPoint;
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should successfully add the point at infinity with a point.', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        var P2 = testdata.randomPoints[idx];
                        secp256k1.addMixed([0, 0, 0], [P2[0], P2[1]], function (err, result) {
                            assert.ifError(err);
                            var expected = randPoint;
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that addition is commutative for a set of points', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        var P2 = testdata.randomPoints[idx - 1];
                        secp256k1.addMixed(randPoint, [P2[0], P2[1]], function (err, result) {
                            assert.ifError(err);
                            var P2 = testdata.randomPoints[idx];
                            secp256k1.addMixed(testdata.randomPoints[idx - 1], [P2[0], P2[1]], function (err, result2) {
                                assert.ifError(err);
                                assert(result[0].eq(result2[0]));
                                assert(result[1].eq(result2[1]));
                                cb();
                            })
                        })
                    }, function () {
                        done();
                    }
                );
            });

        });

        describe('#addMixedM()', function () {

            it('should add a set of points successfully', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        var P2 = testdata.randomPoints[idx - 1];
                        secp256k1.addMixedM(randPoint, [P2[0], P2[1]], function (err, result) {
                            assert.ifError(err);
                            var expected = testdata.sums[idx - 1];
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should successfully add points with the point at identity.', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        secp256k1.addMixedM(randPoint, [0, 0], function (err, result) {
                            assert.ifError(err);
                            var expected = randPoint;
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should successfully add the point at infinity with a point.', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        var P2 = testdata.randomPoints[idx];
                        secp256k1.addMixedM([0, 0, 0], [P2[0], P2[1]], function (err, result) {
                            assert.ifError(err);
                            var expected = randPoint;
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that addition is commutative for a set of points', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        if (idx == 0)
                            return cb();
                        var P2 = testdata.randomPoints[idx - 1];
                        secp256k1.addMixedM(randPoint, [P2[0], P2[1]], function (err, result) {
                            assert.ifError(err);
                            var P2 = testdata.randomPoints[idx];
                            secp256k1.addMixedM(testdata.randomPoints[idx - 1], [P2[0], P2[1]], function (err, result2) {
                                assert.ifError(err);
                                assert(result[0].eq(result2[0]));
                                assert(result[1].eq(result2[1]));
                                cb();
                            })
                        })
                    }, function () {
                        done();
                    }
                );
            });

        });

        describe('#double()', function () {

            it('should double a set of points successfully', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        secp256k1.double(randPoint, function (err, result) {
                            assert.ifError(err);
                            var expected = testdata.doubles[idx];
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that doubling is the same as addition with itself for a set of points', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        secp256k1.double(randPoint, function (err, result) {
                            assert.ifError(err);
                            secp256k1.add(randPoint, randPoint, function (err, result2) {
                                assert.ifError(err);
                                assert(result[0].eq(result2[0]));
                                assert(result[1].eq(result2[1]));
                                cb();
                            })
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that doubling the point at infinity yields the point at infinity', function (done) {
                this.timeout(10000);

                secp256k1.double([0, 0, 0], function (err, result) {
                    assert.ifError(err);
                    assert(isPaI(result));
                    done();
                })
            });

        });

        describe('#doubleM()', function () {

            it('should double a set of points successfully', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        secp256k1.doubleM(randPoint, function (err, result) {
                            assert.ifError(err);
                            var expected = testdata.doubles[idx];
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that doubling is the same as addition with itself for a set of points', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        secp256k1.doubleM(randPoint, function (err, result) {
                            assert.ifError(err);
                            secp256k1.add(randPoint, randPoint, function (err, result2) {
                                assert.ifError(err);
                                assert(result[0].eq(result2[0]));
                                assert(result[1].eq(result2[1]));
                                cb();
                            })
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that doubling the point at infinity yields the point at infinity', function (done) {
                this.timeout(10000);

                secp256k1.doubleM([0, 0, 0], function (err, result) {
                    assert.ifError(err);
                    assert(isPaI(result));
                    done();
                })
            });

        });

        describe('#mul()', function () {

            it('should multiply a set of points with random integers successfully', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        var scalar = testdata.randomInts[idx];
                        secp256k1.mul(scalar, randPoint, function (err, result) {
                            assert.ifError(err);
                            var expected = testdata.products[idx];
                            assert(result[0].eq(expected[0]));
                            assert(result[1].eq(expected[1]));
                            cb();
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that multiplying by 2 is the same as addition with itself', function (done) {
                this.timeout(10000);
                async.forEachOfSeries(testdata.randomPoints, function (randPoint, idx, cb) {
                        secp256k1.mul(2, randPoint, function (err, result) {
                            assert.ifError(err);
                            secp256k1.add(randPoint, randPoint, function (err, result2) {
                                assert.ifError(err);
                                assert(result[0].eq(result2[0]));
                                assert(result[1].eq(result2[1]));
                                cb();
                            })
                        })
                    }, function () {
                        done();
                    }
                );
            });

            it('should verify that multiplying a point with 0 yields the point at infinity', function (done) {
                this.timeout(10000);
                var P = testdata.randomPoints[0];
                secp256k1.mul(0, P, function (err, result) {
                    assert.ifError(err);
                    assert(isPaI(result));
                    done();
                })
            });

        });

    });

});

function isPaI(point) {
    return point[0].toNumber() === 0 && point[1].toNumber() === 0 && point[2].toNumber() === 0;
}