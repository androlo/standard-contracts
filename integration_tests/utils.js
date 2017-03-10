const Web3 = require('web3');

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

function deploy(ABI, bytecode, callback) {
    web3.eth.contract(ABI).new({data: bytecode, gas: "0x30000000"}, function (err, contract) {
        if (err) {
            callback(err);
            // callback fires twice, we only want the second call when the contract is deployed
        } else if (contract.address) {
            callback(null, contract);
        }
    });
}

module.exports = {
    initWeb3: initWeb3,
    deploy: deploy
};