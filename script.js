let blockchain = [];

function buatGenesis() {
  const blokGenesis = {
    index: 0,
    waktu: new Date().toLocaleString(),
    data: "Blok Genesis",
    hashSebelumnya: "0",
    hash: btoa("Genesis" + Date.now())
  };
  blockchain.push(blokGenesis);
  simpanKeLocalStorage();
  tampilkanBlockchain();
}

function tambahBlok() {
  const blokTerakhir = blockchain[blockchain.length - 1];
  const blokBaru = {
    index: blockchain.length,
    waktu: new Date().toLocaleString(),
    data: "Transaksi dari " + (window.walletAddress || "Anonim"),
    hashSebelumnya: blokTerakhir.hash,
    hash: btoa(Math.random() + Date.now())
  };
  blockchain.push(blokBaru);
  simpanKeLocalStorage();
  tampilkanBlockchain();
}

function tampilkanBlockchain() {
  let html = "";
  blockchain.forEach(blk => {
    html += `Blok ${blk.index}\nWaktu: ${blk.waktu}\nData: ${blk.data}\nHash:\n${blk.hash}\nHash Sebelumnya:\n${blk.hashSebelumnya}\n\n`;
  });
  document.getElementById("output").innerText = html;
}

function simpanKeLocalStorage() {
  localStorage.setItem("blockchain", JSON.stringify(blockchain));
}

function loadBlockchain() {
  const data = localStorage.getItem("blockchain");
  if (data) blockchain = JSON.parse(data);
  else buatGenesis();
  tampilkanBlockchain();
}

function hubungkanWallet() {
  if (window.ethereum) {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      window.walletAddress = accounts[0];
      alert("Wallet terhubung: " + accounts[0]);
    });
  } else {
    alert("Wallet Ethereum tidak ditemukan!");
  }
}

loadBlockchain();
