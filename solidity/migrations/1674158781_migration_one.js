var OSContract = artifacts.require("OfficialStampContract");
module.exports = function (_deployer) {
    _deployer.deploy(OSContract);
};
