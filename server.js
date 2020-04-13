const http = require('http');
const chokidar = require('chokidar');
const request = require('request');
const fs = require('fs');
require('dotenv').config();

const server = http.createServer((req, res) => {
    res.end();
});

const watcher = chokidar.watch('./'+process.env.WATCHDIR);

watcher.on('add', async file => {
    console.log(__dirname + '/' +file);
    const fileSend = __dirname + '/' +file;

    try {

        const formData = {
            file: fs.createReadStream(fileSend),
            type: 'photobooth'
        };

        request.post({url: process.env.URL, formData: formData}, (err, httpResponse, body) => {
        if(err){
            return console.log('Upload Failed :', err);
        }
        console.log('Upload successful ! Server responsed with: ', body);
        });

    
    } catch (e) {
        console.log(e);
    }
    

});


server.listen(process.env.PORT, console.log('Server started'));
