import express from 'express'
import path from 'path'

const __dirname = path.resolve();

const app = express()
const port = 3000

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/index.html'))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
