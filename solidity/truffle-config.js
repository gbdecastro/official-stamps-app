module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
        },
        geth: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "12345",
            from: "0xF8717030f744339104C0B8e1B73799C9931687cB",
            gas: 20000000,
        },
    },
    mocha: {},
    compilers: {
        solc: {
            version: "0.8.17",
        },
    },
};
