const Xdc3 = require("xdc3");

const targets = [
  ["https://erpc.apothem.network","apothem"],
  ["https://earpc.apothem.network","apothem"],
  ["https://rpc.ankr.com/xdc_testnet","apothem"],
  ["https://rpc-a.pluginjp.com","apothem"],
  ["https://erpc.xinfin.network","mainnet"],
  ["https://earpc.xinfin.network","mainnet"],
  ["https://rpc-xdc.icecreamswap.com/","mainnet"],
  ["https://rpc.primenumbers.xyz/","mainnet"],
  ["https://rpc.ankr.com/xdc","mainnet"],
  ["https://rpc.xinfin.network","mainnet"],
  ["https://rpc.pluginjp.com","mainnet"]
];

const ws_targets = [
  ["wss://ws.xinfin.network","mainnet"],
  ["wss://ews.xinfin.network","mainnet"],
  ["wss://aws.xinfin.network","mainnet"],
  ["wss://eaws.xinfin.network","mainnet"],
  ["wss://ws.pluginjp.com","mainnet"],
  ["wss://wss.xinfin.org.uk","mainnet"]
//  ["wss://172.67.69.226","mainnet"],
//  ["wss://104.26.9.44","mainnet"]
];

/*
const plitoken = {
  "mainnet": "Ff7412Ea7C8445C46a8254dFB557Ac1E48094391",
  "apothem": "33f4212b027E22aF7e6BA21Fc572843C0D701CD1"
};
*/
async function getBlock(rpc, network) {
    try{
        const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(rpc));
        const blockNumber = await xdc3.eth.getBlockNumber();
        console.log("["+network+"]"+rpc+" : "+blockNumber);
    }catch(e){
        console.log("["+network+"]"+rpc+" : ["+e.name+"]"+e.message);
    }
}

async function checkBlock() {
    const now = new Date();
    console.log("[Block Number] ", now);
    for (i=0;i<targets.length;i++){
        await getBlock(targets[i][0], targets[i][1]);
    }
    process.exit();
}
/*
async function getPrefix(rpc, network) {
    try{
        const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(rpc));
        const tokenABI = require("./abi/PliTokenInterface.json").abi;
        const tokenContract = new xdc3.eth.Contract(tokenABI, plitoken[network]);
        const name = await tokenContract.methods.name().call();
        console.log("["+network+"]"+rpc+" : "+name);
    }catch(e){
        console.log("["+network+"]"+rpc+" : ["+e.name+"]"+e.message);
    }
}

async function checkPrefix() {
    const now = new Date();
    console.log("[0x Prefix] ", now);
    for (i=0;i<targets.length;i++){
        await getPrefix(targets[i][0], targets[i][1]);
    }
    process.exit();
}
*/
async function getVersion(rpc, network) {
    try{
        const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(rpc));
        const version = await xdc3.eth.getNodeInfo();
        console.log("["+network+"]"+rpc+" : "+version);
    }catch(e){
        console.log("["+network+"]"+rpc+" : ["+e.name+"]"+e.message);
    }
}

async function checkVersion() {
    const now = new Date();
    console.log("[MN Version] ", now);
    for (i=0;i<targets.length;i++){
        await getVersion(targets[i][0], targets[i][1]);
    }
    process.exit();
}

async function getWSVersion(ws, network) {
    try{
        const xdc3 = new Xdc3(new Xdc3.providers.WebsocketProvider(ws));
        const version = await xdc3.eth.getNodeInfo();
        console.log("["+network+"]"+ws+" : "+version);
    }catch(e){
        console.log("["+network+"]"+ws+" : ["+e.name+"]"+e.message);
    }
}

async function checkWSVersion() {
    const now = new Date();
    console.log("[MN Version] ", now);
    for (i=0;i<ws_targets.length;i++){
        await getWSVersion(ws_targets[i][0], ws_targets[i][1]);
    }
    process.exit();
}

//main logic
const param = process.argv[2];
switch (param) {
  case '-block':
    checkBlock();
    break;
  case '-version':
    checkVersion();
    break;
  case '-wsversion':
    checkWSVersion();
    break;
  default:
    console.log("");
    console.log("");
    console.log("Usage: node rpcCheck.js {function}");
    console.log("");
    console.log("where {function} is one of the following;");
    console.log("============================================================");
    console.log("    -block     == Display the synchronized block number.");
    console.log("    -version   == Display Master Node version via RPC.");
    console.log("    -wsversion == Display Master Node version via websocket.");
    console.log("");
    console.log("============================================================");
    console.log("");
    process.exit();
}
