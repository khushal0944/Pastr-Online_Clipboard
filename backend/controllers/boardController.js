const asyncHandler = require('express-async-handler');
const Board = require('../models/boardModel');
const generateId = require('../generateId')

/**
 * @desc Get a Board
 * @route GET /api/board/:id
 * @access public
*/

const getBoard = asyncHandler( async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400)
        throw new Error("Missing Board ID");
    }
    const board = await Board.findOne({shortId: id})
    if (!board) {
        res.status(404)
        throw new Error("Board Not Found");
    }
    res.status(200).json(board)
})

/**
 * @desc Register a Board
 * @route POST /api/board
 * @access public
*/

const uploadBoard = asyncHandler(async (req, res) => {
    const id = await generateId();
    const {content} = req.body;
    if (!content) {
        res.status(400)
        throw new Error("Missing Content")
    }
    const uploadedDoc = await Board.create({shortId: id, content});
    if (!uploadedDoc) {
        res.status(400);
        throw new Error("Uploading Board Failed")
    }
	res.status(200).json({ uploadedDoc });
})

module.exports = {getBoard, uploadBoard}