const Board = require("./models/boardModel");


const generateId = async () => {        
        let unique = false;
        let id;
        while (!unique) {
            console.log("unique id")
            id = String(Math.floor(1000 + Math.random() * 9000));
            const isPresent = await Board.findOne({shortId: id});
            console.log(isPresent)
            if (!isPresent) unique = true;
        }
        console.log(id);
        return id;
}

module.exports = generateId