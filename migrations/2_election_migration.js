const Election = artifacts.require("Election");
        module.exports = function (deployer) {
          deployer.deploy(Election,"0x44D7815C175e1737e066a4bA3Cb18C2da304A936","test2","test2");
        };
        