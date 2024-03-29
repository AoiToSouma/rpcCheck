# rpcCheck
Check the validity of RPC and websocket.

# Install the repo
```
git clone https://github.com/AoiToSouma/rpcCheck.git
cd rpcCheck
```

# npm install
```
npm install
```

# edit RPC URL
```
nano rpcCheck.js
```
Edit array variable: targets and ws_targets.

# execute
example
```
node rpcCheck.js -blc
```
Usage: node rpcCheck.js {function}<br>
<br>
where {function} is one of the following;<br>
============================================================<br>
&nbsp;&nbsp;&nbsp;&nbsp;-blc &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;== Display the synchronized block number.<br>
&nbsp;&nbsp;&nbsp;&nbsp;-rpcv &nbsp;&nbsp;&nbsp;&nbsp;== Display Master Node version via RPC.<br>
&nbsp;&nbsp;&nbsp;&nbsp;-wsv &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;== Display Master Node version via websocket.<br>
&nbsp;&nbsp;&nbsp;&nbsp;-gas &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;== Display gasprice.<br>
&nbsp;&nbsp;&nbsp;&nbsp;-prfx &nbsp;&nbsp;&nbsp;&nbsp;== Display prefix type.<br>
<br>
============================================================<br>
