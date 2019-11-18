const assert = require('assert');
const path = require('path');
const util = require('./utils');
const async = require('async');

var rlpreadertest;
                  
const bytecode = "0x608060405234801561001057600080fd5b50611abf806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806395e77a0511610097578063d572056e11610066578063d572056e14610bce578063e59b0e1414610cfe578063e95bd5f214610dd1578063f8f1f15114610f0557610100565b806395e77a0514610838578063a49886ce1461090b578063b66e68f2146109da578063c91813ca14610afb57610100565b806361cd5683116100d357806361cd5683146104b45780636f826a7d146105c75780637b0531951461069a5780637b8167191461076957610100565b8063024a56a41461010557806304455e95146101d85780630902c6d7146102ab578063564ad1421461037a575b600080fd5b6101be6004803603602081101561011b57600080fd5b810190808035906020019064010000000081111561013857600080fd5b82018360208201111561014a57600080fd5b8035906020019184600183028401116401000000008311171561016c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611000565b604051808215151515815260200191505060405180910390f35b610291600480360360208110156101ee57600080fd5b810190808035906020019064010000000081111561020b57600080fd5b82018360208201111561021d57600080fd5b8035906020019184600183028401116401000000008311171561023f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061101a565b604051808215151515815260200191505060405180910390f35b610364600480360360208110156102c157600080fd5b81019080803590602001906401000000008111156102de57600080fd5b8201836020820111156102f057600080fd5b8035906020019184600183028401116401000000008311171561031257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611034565b6040518082815260200191505060405180910390f35b61043d6004803603604081101561039057600080fd5b81019080803590602001906401000000008111156103ad57600080fd5b8201836020820111156103bf57600080fd5b803590602001918460018302840111640100000000831117156103e157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061104e565b604051808681526020018581526020018415151515815260200180602001838152602001828103825284818151815260200191508051906020019060200280838360005b8381101561049c578082015181840152602081019050610481565b50505050905001965050505050505060405180910390f35b61056d600480360360208110156104ca57600080fd5b81019080803590602001906401000000008111156104e757600080fd5b8201836020820111156104f957600080fd5b8035906020019184600183028401116401000000008311171561051b57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506110d8565b60405180827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b610680600480360360208110156105dd57600080fd5b81019080803590602001906401000000008111156105fa57600080fd5b82018360208201111561060c57600080fd5b8035906020019184600183028401116401000000008311171561062e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506110f2565b604051808215151515815260200191505060405180910390f35b610753600480360360208110156106b057600080fd5b81019080803590602001906401000000008111156106cd57600080fd5b8201836020820111156106df57600080fd5b8035906020019184600183028401116401000000008311171561070157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061110c565b6040518082815260200191505060405180910390f35b6108226004803603602081101561077f57600080fd5b810190808035906020019064010000000081111561079c57600080fd5b8201836020820111156107ae57600080fd5b803590602001918460018302840111640100000000831117156107d057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611126565b6040518082815260200191505060405180910390f35b6108f16004803603602081101561084e57600080fd5b810190808035906020019064010000000081111561086b57600080fd5b82018360208201111561087d57600080fd5b8035906020019184600183028401116401000000008311171561089f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611140565b604051808215151515815260200191505060405180910390f35b6109c46004803603602081101561092157600080fd5b810190808035906020019064010000000081111561093e57600080fd5b82018360208201111561095057600080fd5b8035906020019184600183028401116401000000008311171561097257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611160565b6040518082815260200191505060405180910390f35b610a93600480360360208110156109f057600080fd5b8101908080359060200190640100000000811115610a0d57600080fd5b820183602082011115610a1f57600080fd5b80359060200191846001830284011164010000000083111715610a4157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061117a565b60405180848152602001838152602001827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001935050505060405180910390f35b610bb460048036036020811015610b1157600080fd5b8101908080359060200190640100000000811115610b2e57600080fd5b820183602082011115610b4057600080fd5b80359060200191846001830284011164010000000083111715610b6257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506111b5565b604051808215151515815260200191505060405180910390f35b610c8760048036036020811015610be457600080fd5b8101908080359060200190640100000000811115610c0157600080fd5b820183602082011115610c1357600080fd5b80359060200191846001830284011164010000000083111715610c3557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506111cf565b604051808681526020018581526020018415151515815260200180602001838152602001828103825284818151815260200191508051906020019060200280838360005b83811015610ce6578082015181840152602081019050610ccb565b50505050905001965050505050505060405180910390f35b610db760048036036020811015610d1457600080fd5b8101908080359060200190640100000000811115610d3157600080fd5b820183602082011115610d4357600080fd5b80359060200191846001830284011164010000000083111715610d6557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611208565b604051808215151515815260200191505060405180910390f35b610e8a60048036036020811015610de757600080fd5b8101908080359060200190640100000000811115610e0457600080fd5b820183602082011115610e1657600080fd5b80359060200191846001830284011164010000000083111715610e3857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611222565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610eca578082015181840152602081019050610eaf565b50505050905090810190601f168015610ef75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610fbe60048036036020811015610f1b57600080fd5b8101908080359060200190640100000000811115610f3857600080fd5b820183602082011115610f4a57600080fd5b80359060200191846001830284011164010000000083111715610f6c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061123c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600061101361100e83611256565b6112b3565b9050919050565b600061102d61102883611256565b6112e4565b9050919050565b600061104761104283611256565b611316565b9050919050565b60008060006060600061105f611a36565b61107061106b89611256565b611375565b905060005b61107e826113bb565b801561108957508781105b156110a557611097826113e5565b508080600101915050611075565b6110ad611a56565b6110b6836113e5565b90506110c181611442565b975097509750975097505050509295509295909350565b60006110eb6110e683611256565b611523565b9050919050565b600061110561110083611256565b61156c565b9050919050565b600061111f61111a83611256565b6115af565b9050919050565b600061113961113483611256565b611627565b9050919050565b60006001905061115a60018361163990919063ffffffff16565b50919050565b600061117361116e83611256565b6116ab565b9050919050565b6000806000611187611a56565b61119085611256565b905080600001519350806020015192506000845160001a905080925050509193909250565b60006111c86111c383611256565b6116c0565b9050919050565b6000806000606060006111e0611a56565b6111e987611256565b90506111f481611442565b955095509550955095505091939590929450565b600061121b61121683611256565b611728565b9050919050565b606061123561123083611256565b611738565b9050919050565b600061124f61124a83611256565b6117a8565b9050919050565b61125e611a56565b600082519050600081141561128c5760405180604001604052806000815260200160008152509150506112ae565b6000602084019050604051806040016040528082815260200183815250925050505b919050565b600080826020015114156112ca57600090506112df565b60008260000151905060c0815160001a109150505b919050565b600080826020015114156112fb5760009050611311565b60008260000151905060c0815160001a10159150505b919050565b6000611321826112b3565b61132a57600080fd5b600080611336846117ef565b8092508193505050602081111561134c57600080fd5b600081141561136057600092505050611370565b806020036101000a825104925050505b919050565b61137d611a36565b611386826112e4565b61138f57600080fd5b600061139a8361187c565b83600001510190508282600001819052508082602001818152505050919050565b60006113c5611a56565b826000015190508060200151816000015101836020015110915050919050565b6113ed611a56565b6113f6826113bb565b1561143857600082602001519050600061140f8261190e565b90508183600001818152505080836020018181525050808201846020018181525050505061143d565b600080fd5b919050565b6000806000606060008560000151945085602001519350611462866112e4565b9250821561151a576000611475876115af565b9150816040519080825280602002602001820160405280156114a65781602001602082028038833980820191505090505b5092506114b1611a36565b6114ba88611375565b90505b6114c6816113bb565b80156114d157508282105b15611517576114de611a56565b6114e7826113e5565b9050600081519050808685815181106114fc57fe5b602002602001018181525050838060010194505050506114bd565b50505b91939590929450565b600061152e826112b3565b61153757600080fd5b600080611543846117ef565b80925081935050506001811461155857600080fd5b6000825160001a9050809350505050919050565b600061157782611728565b1561158557600090506115aa565b60008083600001519050805160001a915060808214806115a5575060c082145b925050505b919050565b60006115ba826112e4565b6115c75760009050611622565b60008083600001519050805160001a915060006115e38561187c565b82019050600060018660200151840103905060005b818311611619576116088361190e565b8301925080806001019150506115f8565b80955050505050505b919050565b600061163282611316565b9050919050565b611641611a56565b611649611a56565b61165284611256565b905082156116a1576000845190508061166a8361187c565b111561167557600080fd5b80611683836000015161190e565b1461168d57600080fd5b611696826119a8565b61169f57600080fd5b505b8091505092915050565b60006116b682611316565b60001b9050919050565b60006116cb826112b3565b6116d457600080fd5b6000806116e0846117ef565b8092508193505050600181146116f557600080fd5b6000825160001a9050600181111561170c57600080fd5b6001811461171b57600061171e565b60015b9350505050919050565b6000808260200151149050919050565b6060611743826112b3565b61174c57600080fd5b600080611758846117ef565b8092508193505050806040519080825280601f01601f1916602001820160405280156117935781602001600182028038833980820191505090505b5092506117a18284836119f4565b5050919050565b60006117b3826112b3565b6117bc57600080fd5b6000806117c8846117ef565b8092508193505050601481146117dd57600080fd5b600c6101000a82510492505050919050565b6000806117fb836112b3565b61180457600080fd5b60008084600001519050805160001a9150608082101561183257809350600192508383935093505050611877565b60b8821015611850576001856020015103925060018101935061186e565b600060b7830390508060018760200151030393506001818301019450505b83839350935050505b915091565b600080826020015114156118935760009050611909565b60008083600001519050805160001a915060808210156118b857600092505050611909565b60b88210806118d4575060c082101580156118d3575060f882105b5b156118e457600192505050611909565b60c08210156118fd57600160b783030192505050611909565b600160f7830301925050505b919050565b600080825160001a9050608081101561192a57600191506119a2565b60b8811015611941576001608082030191506119a1565b60c081101561196b5760b78103806020036101000a600185015104808201600101935050506119a0565b60f881101561198257600160c0820301915061199f565b60f78103806020036101000a600185015104808201600101935050505b5b5b5b50919050565b60008060008084600001519050805160001a9250805160011a91506001608001831480156119d65750608082105b156119e757600093505050506119ef565b600193505050505b919050565b6020601f820104836020840160005b83811015611a235760208102808401518184015250600181019050611a03565b5060008551602001860152505050505050565b6040518060400160405280611a49611a70565b8152602001600081525090565b604051806040016040528060008152602001600081525090565b60405180604001604052806000815260200160008152509056fea265627a7a7231582063fcde3b0e28bb30f1c3c5f724688cf956f560e7e952c32bb52e1f51637de8ed64736f6c634300050d0032";
const ABI = [{
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testFirst",
    "outputs":[{"internalType":"uint256","name":"memPtr","type":"uint256"},{"internalType":"uint256","name":"len","type":"uint256"},{"internalType":"bytes1","name":"first","type":"bytes1"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testIsData",
    "outputs":[{"internalType":"bool","name":"ret","type":"bool"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testIsEmpty",
    "outputs":[{"internalType":"bool","name":"ret","type":"bool"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testIsList",
    "outputs":[{"internalType":"bool","name":"ret","type":"bool"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testIsNull",
    "outputs":[{"internalType":"bool","name":"ret","type":"bool"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testItem",
    "outputs":[{"internalType":"uint256","name":"memPtr","type":"uint256"},{"internalType":"uint256","name":"len","type":"uint256"},{"internalType":"bool","name":"isList","type":"bool"},{"internalType":"uint256[]","name":"list","type":"uint256[]"},{"internalType":"uint256","name":"listLen","type":"uint256"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testItemStrict",
    "outputs":[{"internalType":"bool","name":"res","type":"bool"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testItems",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "payable":false,"stateMutability":
    "pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"},{"internalType":"uint256","name":"index","type":"uint256"}],
    "name":"testSubItem",
    "outputs":[{"internalType":"uint256","name":"memPtr","type":"uint256"},{"internalType":"uint256","name":"len","type":"uint256"},{"internalType":"bool","name":"isList","type":"bool"},{"internalType":"uint256[]","name":"list","type":"uint256[]"},{"internalType":"uint256","name":"listLen","type":"uint256"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToAddress",
    "outputs":[{"internalType":"address","name":"","type":"address"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToBool",
    "outputs":[{"internalType":"bool","name":"","type":"bool"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToByte",
    "outputs":[{"internalType":"bytes1","name":"","type":"bytes1"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToBytes32",
    "outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToData",
    "outputs":[{"internalType":"bytes","name":"bts","type":"bytes"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToInt",
    "outputs":[{"internalType":"int256","name":"","type":"int256"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
}, {
    "constant":true,
    "inputs":[{"internalType":"bytes","name":"rlp","type":"bytes"}],
    "name":"testToUint",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "payable":false,
    "stateMutability":"pure",
    "type":"function"
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