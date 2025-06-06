exports.forwarderContractABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
    {
        inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
        name: "ECDSAInvalidSignatureLength",
        type: "error",
    },
    {
        inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
        name: "ECDSAInvalidSignatureS",
        type: "error",
    },
    { inputs: [], name: "InvalidShortString", type: "error" },
    {
        inputs: [{ internalType: "string", name: "str", type: "string" }],
        name: "StringTooLong",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [],
        name: "EIP712DomainChanged",
        type: "event",
    },
    {
        inputs: [],
        name: "eip712Domain",
        outputs: [
            { internalType: "bytes1", name: "fields", type: "bytes1" },
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "version", type: "string" },
            { internalType: "uint256", name: "chainId", type: "uint256" },
            {
                internalType: "address",
                name: "verifyingContract",
                type: "address",
            },
            { internalType: "bytes32", name: "salt", type: "bytes32" },
            {
                internalType: "uint256[]",
                name: "extensions",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                    { internalType: "uint256", name: "gas", type: "uint256" },
                    { internalType: "uint256", name: "nonce", type: "uint256" },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                internalType: "struct ERC2771Forwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "execute",
        outputs: [
            { internalType: "bool", name: "", type: "bool" },
            { internalType: "bytes", name: "", type: "bytes" },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "from", type: "address" }],
        name: "getNonce",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "value", type: "uint256" },
                    { internalType: "uint256", name: "gas", type: "uint256" },
                    { internalType: "uint256", name: "nonce", type: "uint256" },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                internalType: "struct ERC2771Forwarder.ForwardRequest",
                name: "req",
                type: "tuple",
            },
            { internalType: "bytes", name: "signature", type: "bytes" },
        ],
        name: "verify",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
];
