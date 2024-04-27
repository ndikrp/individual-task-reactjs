import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.static('images'))
app.use(bodyParser.json())

app.get('/fruit', async (req, res) => {
    try {
        const fileContent = await fs.promises.readFile('./data/fruits.json');
        const fruitsData = JSON.parse(fileContent);
        res.status(200).json(fruitsData);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.use((req, res, next) => {
    res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
    console.error('Error', err);
    res.status(500).send('Internal Server Error');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})