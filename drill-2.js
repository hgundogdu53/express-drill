const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'))

app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;

    if (!text) {
        return res.status(400).send('text is required');
    }
    if (!shift) {
        return res.status(400).send('shift is required');
    }

    const numShift = parseFloat(shift);
    if (Number.isNaN(numShift)) {
        return res.status(400).send('shift must be a number');
    }

    const base = 'A'.charCodeAt(0);

    const cipher = text
        .toUpperCase()
        .split(' ')
        .map(char => {
            const code = char.charCodeAt(0);
            if (code < base || code > (base + 26)) {
                return char;
            }
            let diff = code - base;
            diff = diff + numShift;

            diff = diff % 26;

            const shiftedChar = String.fromCharCode(base + diff);
            return shiftedChar;
        })
        .join(' ');

    res.status(200).send(cipher);
});

app.listen(8000, () => {
    console.log('Listening on port 8000 for drill-2');
});
