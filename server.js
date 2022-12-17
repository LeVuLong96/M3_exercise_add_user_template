const http = require('http');
const fs = require("fs");
const qs = require("qs");

let user = [];

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('views/Register.html','utf-8', (err, RegisterHTML) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(RegisterHTML);
            res.end();
        })
    } else {
        let userInfo = '';
        req.on('data', chunk => {
            userInfo += chunk;
        })
        req.on('end', (path, callback) => {
            user.push(qs.parse(userInfo));
            console.log(user)
            userInfo = '';
            fs.readFile('views/Register.html','utf-8', (err, RegisterHTML) => {
                if(err) throw err;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(RegisterHTML);
                res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen(8000, 'localhost', function() {
    console.log('server running at http://localhost:8000')
})