const express = require('express')
const albumArt = require( 'album-art' )

const app = express()
const PORT = process.env.PORT || 3000

const connectDB = require('./src/config/db')
require('dotenv').config()
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