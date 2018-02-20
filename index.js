const express = require('express');
const app = express();


app.get("/", (req, res) => {
    res.send({hi: 'there', bye: 'see ya' });
});

const PORT = process.env.PORT || 5000;

console.log('running on port: ' + PORT)

app.listen(PORT);
