const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

const connectDB = require('./src/config/db')
require('dotenv').config()
connectDB()

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})

module.exports = app