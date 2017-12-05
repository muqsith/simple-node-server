const fs = require('fs'),
    http = require('http'),
    url = require('url'),
    querystring = require('querystring')
    ;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let _url = url.parse(req.url)
    if (_url && _url.query) {
        let params = querystring.parse(_url.query);
        if (params && params.file && fs.existsSync(`./${params.file}`)) {
            fs.readFile(`./${params.file}`, (err, data) => {
                res.end(data);
            });
        } else {
            res.end(JSON.stringify({error: 'No file'}));
        }
    } else {
        res.end(JSON.stringify({error: 'Invalid URL'}));
    }
});

server.listen(9876, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`
            Server ready and listening on port 9876
            Send requests like, eg: http://localhost:9876/?file=sms_pending.json
        `);
    }
});