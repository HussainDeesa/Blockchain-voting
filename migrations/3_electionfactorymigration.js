const ElectionFact = artifacts.require("ElectionFact");
        module.exports = function (deployer) {
          deployer.deploy(ElectionFact);
        };
        