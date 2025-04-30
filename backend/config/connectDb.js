const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
            console.log(
				"Database Connected Successfully - ",
				connection.connection.host,
				connection.connection.name
);
    } catch (error) {
        console.log("Database Connection Failed", error);
        process.exit(1)
    }
}

module.exports = connectDb