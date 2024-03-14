const express = require("express");
const httpProxy = require('http-proxy-middleware');

const app = express();


const options =
    [
        {
            target: 'https://jsonplaceholder.typicode.com/users/2',
            changeOrigin: true,
            pathRewrite: {
                [`^/users/2`]: '',
            }
        },
        {
            target: 'https://jsonplaceholder.typicode.com/users/3',
            changeOrigin: true,
            pathRewrite: {
                [`^/users/3`]: '',
            }
        }
    ]

app.get('/', (req, res) => {
    return res.json({
        "ok": true
    })
})

app.get('/users', (req, res) => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(res => res.json())
        .then(data => res.json(data))
})


app.get('/users/2', httpProxy.createProxyMiddleware(options[0]));
app.get('/users/3', httpProxy.createProxyMiddleware(options[1]));


app.listen(3000, () => {
    console.info(`server is running on PORT 3000`);
})