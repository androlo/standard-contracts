const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');

var web3;

function initWeb3(callback){
    web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.getAccounts(function (err, accs) {
        if (err)
            return callback(err);
        web3.eth.defaultAccount = accs[0];
        callback();
    });
}

function deploy(name, dir, callback) {
    loadContract(name, dir, function(err, data){
        if (err)
            callback(err);
        web3.eth.contract(data.abi).new({data: data.bytecode}, function (err, contract) {
            if (err) {
                callback(err);
                // callback fires twice, we only want the second call when the contract is deployed
            } else if (contract.address) {
                callback(null, contract);
            }
        });
    });
}

function loadContract(name, dir, callback) {
    var bytecode, abi;
    var bytecodePath = path.join(dir, name + ".bin");
    var abiPath = path.join(dir, name + ".abi");
    fs.readFile(bytecodePath, function(err, data){
        if (err)
            return callback(err);
        bytecode = data.toString();
        fs.readJson(abiPath, function(err, data){
            if (err)
                return callback(err);
            abi = data;
            callback(null, {bytecode: bytecode, abi: abi});
        });
    });
}

module.exports = {
    loadContract: loadContract,
    initWeb3: initWeb3,
    deploy: deploy
};