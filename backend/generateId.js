const Board = require("./models/boardModel");


const generateId = async () => {        
        let unique = false;
        let id;
        while (!unique) {
            id = String(Math.floor(1000 + Math.random() * 9000));
            const isPresent = await Board.findOne({shortId: id});
            if (!isPresent) unique = true;
        }
        return id;
}

module.exports = generateId