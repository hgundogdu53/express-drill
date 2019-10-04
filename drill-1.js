const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));


app.get('/sum', (req, res) => {
    const { a, b } = req.query;

    if (!a) {
        return res.status(400).send('a is required');
    }
    if (!b) {
        return res.status(400).send('b is required');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (Number.isNaN(numA)) {
        return res.status(400).send('a must be a number');
    }
    if (Number.isNaN(numB)) {
        return res.status(400).send('b must be a number');
    }

    const c = numA + numB;
    const responseString = `The sum of ${numA} and ${numB} is ${c}`;

    res.status(200).send(responseString);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});