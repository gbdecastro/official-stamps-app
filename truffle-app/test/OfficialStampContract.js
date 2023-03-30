const Contract = artifacts.require("../contracts/OfficialStampContract.sol");

contract("OfficialStampContract", (accounts) => {
    it("Should validate info tokens", async () => {
        const instance = await Contract.deployed();

        const name = await instance.name();
        const symbol = await instance.symbol();

        assert.equal(name, "Official Stamp Contract");
        assert.equal(symbol, "OSC");
    });

    it("Should Buy Token", async () => {
        const instance = await Contract.deployed();

        // Mock Data
        const buyer = accounts[1];
        const name = "Official Stamp 1";
        const price = 1;

        //Buy Token (mint and transfer)
        await instance.buyToken(name, price, buyer);

        // check that the buyer has the token in their collection
        const buyerTokens = await instance.getAllTokensFromWallet(buyer);
        assert.equal(buyerTokens.length, 1);
        assert.equal(buyerTokens[0].name, name);
        assert.equal(buyerTokens[0].price, price);
    });
});
