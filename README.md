# rpcCheck
Check the validity of RPC.

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
Edit array variable: targets.

# execute
example
```
node rpcCheck.js -block
```
Usage: node rpcCheck.js {function}<br>
<br>
where {function} is one of the following;<br>
============================================================<br>
&nbsp;&nbsp;&nbsp;&nbsp;-block &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;== Display the synchronized block number.<br>
&nbsp;&nbsp;&nbsp;&nbsp;-version &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;== Display Master Node version via RPC.<br>
&nbsp;&nbsp;&nbsp;&nbsp;-wsversion == Display Master Node version via websocket.<br>
<br>
============================================================<br>
