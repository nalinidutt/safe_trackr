const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PythonShell } = require('python-shell');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the Python Shell API!');
});

app.post('/process', (req, res) => {
    const inputData = JSON.stringify({ data: req.body.data });  // req.body.{ field } has to match the { field } passed in home.tsx
    console.log(inputData); // Log the input data

    const options = {
        mode: 'json',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './data', // path where your script is located
        args: [inputData] // pass data to Python script
    };

    PythonShell.run('test.py', options, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
