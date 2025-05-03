const Board = require("./models/boardModel");


const generateId = async () => {        
        let id;
        while (true) {
            id = String(Math.floor(1000 + Math.random() * 9000));
            const isPresent = await Board.findOne({shortId: id});
            if (!isPresent) return id;
        }
}

module.exports = generateId
