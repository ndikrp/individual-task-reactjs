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

app.get('/user-fruits', async (req, res) => {
    try {
        const fileContent = await fs.promises.readFile('./data/user-fruits.json');
        const userFruits = JSON.parse(fileContent);
        res.status(200).json(userFruits);
    } catch (error) {
        console.error('Error reading user-fruits JSON file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/add-fruit', async (req, res) => {
    try {
        const { fruit } = req.body; 
        const fileContent = await fs.promises.readFile('./data/user-fruits.json');
        let userFruits = JSON.parse(fileContent);
        userFruits.push(fruit);
        await fs.promises.writeFile('./data/user-fruits.json', JSON.stringify(userFruits, null, 2));
        res.status(200).json({ message: 'Fruit added successfully' });
    } catch (error) {
        console.error('Error adding fruit:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 404 Not Found Page
app.use((req, res, next) => {
    res.status(404).send('Not Found')
})

// Error Handling
app.use((err, req, res, next) => {
    console.error('Error', err);
    res.status(500).send('Internal Server Error');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})