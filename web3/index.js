let account;

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
      gas: 21000,
      gasPrice: 250000,
      value: 1,
    },
  ];
  console.log("params", params);
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
