const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('this is our first get, getit ? ')
})

app.listen(5000, () => {
    console.log('We are connected on port 5000')
})