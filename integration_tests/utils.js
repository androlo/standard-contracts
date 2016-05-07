const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');

var web3;

function initWeb3(callback){
    web3 = new Web3();
    var host = process.env.STANDARD_CONTRACTS_RPC_HOST || "localhost";
    web3.setProvider(new web3.providers.HttpProvider('http://' + host + ':8545'));
    web3.eth.getAccounts(function (err, accs) {
        if (err)
            return callback(err);
        web3.eth.defaultAccount = accs[0];
        callback();
    });
}

function deploy(name, dir, linkerData, callback) {
    loadContract(name, dir, linkerData, function(err, data){
        if (err)
            callback(err);
        web3.eth.contract(data.abi).new({data: data.bytecode, gas: "0x30000000"}, function (err, contract) {
            if (err) {
                callback(err);
                // callback fires twice, we only want the second call when the contract is deployed
            } else if (contract.address) {
                callback(null, contract);
            }
        });
    });
}

function loadContract(name, dir, linkerData, callback) {
    var bytecode, abi;
    var bytecodePath = path.join(dir, name + ".bin");
    var abiPath = path.join(dir, name + ".abi");
    fs.readFile(bytecodePath, function(err, data){
        if (err)
            return callback(err);
        bytecode = data.toString();
        bytecode = link(bytecode, linkerData);
        fs.readJson(abiPath, function(err, data){
            if (err)
                return callback(err);
            abi = data;
            callback(null, {bytecode: bytecode, abi: abi});
        });
    });
}

function link(bytecode, linkerData) {
    if (!linkerData || linkerData.length == 0)
        return bytecode;
    for (var i = 0; i < linkerData.length; i++) {
        var tag = linkerData[i][0];
        var addr = linkerData[i][1];
        while(bytecode.indexOf(tag) > -1)
            bytecode = bytecode.replace(tag, addr);
    }
    return bytecode;
}

module.exports = {
    loadContract: loadContract,
    initWeb3: initWeb3,
    deploy: deploy,
    link: link
};