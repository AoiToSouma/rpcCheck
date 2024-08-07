const Xdc3 = require("xdc3");

const rpc_targets = [
  ["https://erpc.apothem.network","apothem"],
  ["https://earpc.apothem.network","apothem"],
  ["https://erpc.xinfin.network","mainnet"],
  ["https://earpc.xinfin.network","mainnet"]
];

const ws_targets = [
  ["wss://ws.apothem.network/ws","apothem"],
  ["wss://ws.xinfin.network","mainnet"],
  ["wss://ews.xinfin.network","mainnet"],
  ["wss://aws.xinfin.network","mainnet"],
  ["wss://eaws.xinfin.network","mainnet"]
];

const plitoken = {
  "mainnet": "0xFf7412Ea7C8445C46a8254dFB557Ac1E48094391",
  "apothem": "0x33f4212b027E22aF7e6BA21Fc572843C0D701CD1"
};

function getMaxLength() {
    let maxlength = 0;
    for (i=0;i<rpc_targets.length;i++){
        if((rpc_targets[i][0].length + rpc_targets[i][1].length) > maxlength) {
            maxlength = rpc_targets[i][0].length + rpc_targets[i][1].length;
        }
    }
    for (j=0;j<ws_targets.length;j++){
        if((ws_targets[j][0].length + ws_targets[j][1].length) > maxlength) {
            maxlength = ws_targets[j][0].length + ws_targets[j][1].length;
        }
    }
    return maxlength + 2;
}

async function getInfo(url_type, proc, url, network) {
    try{
        let xdc3;
        let value;
        switch (url_type) {
            case 'rpc':
                xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(url));
                break;
            case 'ws':
                xdc3 = new Xdc3(new Xdc3.providers.WebsocketProvider(url));
                break;
        }
      switch (proc) {
            case '-block':
                value = await xdc3.eth.getBlockNumber();
                break;
            case '-version':
                value = await xdc3.eth.getNodeInfo();
                break;
            case '-gasprice':
                value = await xdc3.eth.getGasPrice();
                break;
            case '-prefix':
                let coinbase = await xdc3.eth.getCoinbase();
                let prefix = await xdc3.utils.isHexStrict(coinbase);
                if (prefix) {
                    value = '0x prefix';
                } else {
                    value = 'XDC prefix';
                }
                break;
            case '-latency':
              let times = [];
              times[0] = new Date();
              let blockNumber = await xdc3.eth.getBlockNumber();
              times[1] = new Date();
              let block = await xdc3.eth.getBlock(blockNumber);
              times[2] = new Date();
              let blockTime = new Date(JSON.stringify(block.timestamp) * 1000).toISOString();
              times[3] = (times[1] - times[0]) + (times[2] - times[1]) // Execution time of getBlockNumber + getBlock
              value = `[latency] ${times[3].toString().padStart(5, ' ')}ms [blockNumber] ${blockNumber} [unix timestamp] ${blockTime}`
              break;
        }
        console.log(`[${network}]${url}`.padEnd(maxlength, ' ') + `: ${value}`);
        return value;
    }catch(e){
        console.log(`[${network}]${url}`.padEnd(maxlength, ' ') + `: [${e.name}]${e.message}`);
    }
}

async function outputInfo(url_type, proc, title, targetArray) {
    const now = new Date();
    var results = [];
    console.log("["+title+"] ", now);
    for (i=0;i<targetArray.length;i++){
        getInfo(url_type, proc, targetArray[i][0], targetArray[i][1]);
    }
}

//main logic
const param = process.argv[2];
const maxlength = getMaxLength();

switch (param) {
  case '-blc':
    outputInfo('rpc', '-block', 'Block Number', rpc_targets);
    break;
  case '-rpcv':
    outputInfo('rpc', '-version', 'MN Version', rpc_targets);
    break;
  case '-wsv':
    outputInfo('ws', '-version', 'MN Version', ws_targets);
    break;
  case '-gas':
    outputInfo('rpc', '-gasprice', 'gas price', rpc_targets);
    break;
  case '-prfx':
    outputInfo('rpc', '-prefix', 'prefix type', rpc_targets);
    break;
  case '-ltcy':
    outputInfo('rpc', '-latency', 'latency of getBlock', rpc_targets);
    break;
  default:
    console.log("");
    console.log("");
    console.log("Usage: node rpcCheck.js {function}");
    console.log("");
    console.log("where {function} is one of the following;");
    console.log("============================================================");
    console.log("    -blc       == Display the synchronized block number.");
    console.log("    -rpcv      == Display Master Node version via RPC.");
    console.log("    -wsv       == Display Master Node version via websocket.");
    console.log("    -gas       == Display gasprice.");
    console.log("    -prfx      == Display prefix type");
    console.log("    -ltcy      == Display latency of getBlock function");
    console.log("");
    console.log("============================================================");
    console.log("");
    process.exit();
}
