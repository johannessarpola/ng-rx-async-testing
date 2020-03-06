const express = require('express');
const app = express();
const port = 4201;
const fs = require('fs');


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/products', (req, res) => {

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader("Connection", "keep-alive");
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Expose-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.flushHeaders();

    // let productData = JSON.parse(fs.readFileSync("./.data/product500.json"));
    let productData = JSON.parse(fs.readFileSync("./.data/product500.json"));

    let interValID = setInterval(() => {
        if(productData.length == 0) {
            res.write(`event: poison\n`);
            res.write(`data: \n\n`);
            res.end();
            clearInterval(interValID);
        } else {
            res.write(`data: ${JSON.stringify(productData.pop())}\n\n`); // res.write() instead of res.send()
        }
    }, 100); // flush the headers to establish SSE with client

    // If client closes connection, stop sending events
    res.on('close', () => {
        console.log('client dropped me');
        clearInterval(interValID);
        res.end();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))