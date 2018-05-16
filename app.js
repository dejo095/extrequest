const express = require('express');
const exphbs = require('express-handlebars');
const request = require('request');
const app = express();

// PORT
const port = process.env.PORT || 3000;

 // Handlebars middleware
 app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
    const title = 'Data from jsonplaceholder.com';
    res.render('index', {
        title: title
    });
});

app.get('/request', (req, res) => {
    request('https://jsonplaceholder.typicode.com/posts/2', (err, response, body) => {
        if (!err && response.statusCode === 200) {
            res.render('replysingle', {
                body : JSON.parse(body)
            });
        } else {
            res.json(err);
        }
    });
});

app.get('/requests', (req, res) => {
    request('https://jsonplaceholder.typicode.com/posts', (err, response, body) => {
        if (!err && response.statusCode === 200) {
            res.render('reply', {
                body : JSON.parse(body)
            });
        } else {
            res.json(err);
        }
    });
});



app.listen(port, () => {
    console.log(`server started on port ${port}`);
})