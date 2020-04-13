const http = require('http');
const chokidar = require('chokidar');
const request = require('request');
const fs = require('fs');
require('dotenv').config();

const server = http.createServer((req, res) => {
    res.end();
});

const watcher = chokidar.watch('./'+process.env.WATCHDIR);

console.log(watcher);

watcher.on('add', async file => {
    console.log(__dirname + '/' +file);
    const fileSend = __dirname + '/' +file;

    if(file.substring(7,12) !== process.env.IGNOREDFOLDER){

        try {

            setTimeout(() => {
                send(fileSend);
            },5000);
        
        } catch (e) {
            console.log(e);
        }
    
    }

});

function send(fileSend) {
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

}


server.listen(process.env.PORT, console.log('Server started'));
