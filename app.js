const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
    // Insert the ABI here
];

let web3;
let timeLockContract;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        userAccount = (await web3.eth.getAccounts())[0];
        document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
        timeLockContract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert('Please install MetaMask!');
    }
}

async function lockEther() {
    const amount = document.getElementById('amount').value;
    const unlockTime = new Date(document.getElementById('unlockTime').value).getTime() / 1000;
    const withdrawalAddress = document.getElementById('withdrawalAddress').value;

    await timeLockContract.methods.lockEther(unlockTime, withdrawalAddress).send({
        from: userAccount,
        value: web3.utils.toWei(amount, 'ether')
    });

    alert('Ether locked successfully!');
}

async function unlockEther() {
    await timeLockContract.methods.unlockEther().send({
        from: userAccount
    });

    alert('Ether unlocked successfully!');
}

document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
document.getElementById('lockEtherButton').addEventListener('click', lockEther);
document.getElementById('unlockEtherButton').addEventListener('click', unlockEther);
