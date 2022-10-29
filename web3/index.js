let account;
let provider;

const ContractAddress = "0x4a99d5183FD1D5FFBD1Cc32492Cd43686C01e945";
const erc20AbiJSON = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

function setData(id, text) {
  document.querySelector("#" + id).innerHTML = text;
}

window.onload = function () {
  if (window.ethereum) {
    this.ethereum.on("accountsChanged", (a) => {
      account = a;
      setData("account", account);
    });
    this.ethereum
      .request({ method: "eth_accounts" })
      .then((a) => {
        account = a;
        setData("account", account);
      })
      .catch((err) => {
        console.log("err", err);
      });

    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
};

const connectWallet = async () => {
  account = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log("err", err);
    });
  setData("account", account);
};

const getBalance = async () => {
  let mx = Math.pow(10, 18);
  let balance = await window.ethereum
    .request({
      method: "eth_getBalance",
      params: [account[0], "latest"],
    })
    .catch((err) => {
      console.log("err", err);
    });

  balance = parseInt(balance) / mx;
  setData("balance", balance);
};

const sendTransaction = async () => {
  let params = [
    {
      from: account[0],
      to: "0xb4A573DF804195641530D39Ebcc5019Cfdd2E280",
      gas: (21000).toString(16),
      gasPrice: (250000).toString(16),
      value: (1).toString(16),
    },
  ];
  let result = await window.ethereum
    .request({
      method: "eth_sendTransaction",
      params,
    })
    .catch((err) => {
      console.log("err", err);
    });

  console.log("res", result);
};

const checkTokenBalance = async () => {
  const contract = new ethers.Contract(ContractAddress, erc20AbiJSON, provider);
  let balance = await contract.balanceOf(
    "0x1abe2fa6908f74863bb857029e353ca3997feefa"
  );
  balance = balance.toString();
  console.log("balance", balance);

  setData("TokenBalance", balance);
};

const transferToken = async () => {
  const contract = new ethers.Contract(
    ContractAddress,
    erc20AbiJSON,
    provider.getSigner()
  );

  const amount = ethers.utils.parseUnits(".1", 18);
  // const FinalSupply = BigInt(30780 * Math.pow(10, 8));
  let tx = await contract.estimateGas.transfer(
    "0xb4A573DF804195641530D39Ebcc5019Cfdd2E280",
    // "ricmoo.eth",
    amount
    // FinalSupply,
    // {
    //   gasLimit: 250000,
    // }
  );
  console.log("tx", tx);
};
