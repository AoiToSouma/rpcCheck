const Xdc3 = require("xdc3");

const ppmrpc = "https://rpc-apothem.11ppm.com";
const erpc = "https://erpc.apothem.network";

const targets = [
"https://erpc.apothem.network",
"https://earpc.apothem.network",
"https://erpc.xinfin.network",
"https://earpc.xinfin.network",
"https://rpc-xdc.icecreamswap.com/",
"https://rpc.primenumbers.xyz/",
"https://rpc.ankr.com/xdc"
];

async function getBlock(rpc) {
    try{
        const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(rpc));
        const blockNumber = await xdc3.eth.getBlockNumber();
        console.log(rpc, " : ", blockNumber);
    }catch(e){
        console.log(rpc, " : ", e.name, " -> ", e.message);
    }
}

async function checkBlock() {
    const now = new Date();
    console.log("[Block Number] ", now);
    for (i=0;i<targets.length;i++){
    await getBlock(targets[i]);
    }
}

//main logic
const param = process.argv[2];
switch (param) {
  case '-block':
    checkBlock();
    break;
  default:
    console.log("");
    console.log("");
    console.log("Usage: node rpcCheck.js {function}");
    console.log("");
    console.log("where {function} is one of the following;");
    console.log("============================================================");
    console.log("    -block     == Displays the synchronized block number.");
    console.log("");
    console.log("============================================================");
    console.log("");
}
