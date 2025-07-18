const express = require('express')
require('dotenv').config();
const cors = require('cors')
const connectDb = require('./config/connectDb')
const errorHandler = require('./middleware/errorHandler')

const app = express();
const port = process.env.PORT || 3000;

connectDb();

console.log("Allowed CORS Origin:", process.env.DEV_FRONTEND_URL);

app.use(
	cors({
		origin: [process.env.DEV_FRONTEND_URL, process.env.PROD_FRONTEND_URL],
		methods: ["GET", "POST"],
		credentials: true,
	})
);
app.use(express.json())

app.use("/api/v1", require('./routes/boardRoute'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})