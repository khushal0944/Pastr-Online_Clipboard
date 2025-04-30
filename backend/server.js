const express = require('express')
require('dotenv').config();
const cors = require('cors')
const connectDb = require('./config/connectDb')
const errorHandler = require('./middleware/errorHandler')

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(cors())
app.use(express.json())

app.use("/api/v1", require('./routes/boardRoute'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})