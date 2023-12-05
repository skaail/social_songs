const express = require('express')
const albumArt = require( 'album-art' )
require('dotenv').config()
var cors = require('cors')

const app = express()
app.use(cors())


const PORT = process.env.PORT || 3001

const connectDB = require('./src/config/db')

connectDB()

app.use(express.json())

const userRouter = require('./src/routes/users')
app.use('/api', userRouter)

const authRouter = require('./src/routes/auth');
app.use('/api', authRouter);

const notasRouter = require('./src/routes/notas');
app.use('/api', notasRouter);

const listasRouter = require('./src/routes/listas');
app.use('/api', listasRouter);

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})

module.exports = app