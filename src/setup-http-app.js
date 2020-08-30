const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = {
    setupHttpApp: () => new Promise((resolve, reject) => {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use(cors());

        const server = http.createServer(app);

        server.on('error', function (err) {
            if (!listening) {
                reject(err);
                return;
            }
        });

        server.listen(process.env.RFS_PORT, () => {
            listening = true;
            resolve(app);
        });
    })
}