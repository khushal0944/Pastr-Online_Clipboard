const asyncHandler = require('express-async-handler');
const Board = require('../models/boardModel');
const generateId = require('../generateId')

// @desc Register a Board
// @route GET /api/board
// @access public
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

// const updateBoard = asyncHandler( async (req, res) => {
//     const id = req.params.id;
//         if (!id) {
// 			res.status(400);
// 			throw new Error("Missing ID");
// 		}
//     const findDoc = await Board.findOne({shortId: id})
//     if (!findDoc) {
//         res.status(404)
//         throw new Error(`Document with ID ${id} Not Found`)
//     }
//     const content = req.body
//     const updatedDoc = await Board.findOneAndUpdate(
//         {shortId: id},
//         {$set: content},
//         {new: true}
//     )
//     res.json({updatedDoc})
// })

// const deleteBoard = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     if (!id) {
//         res.status(400);
//         throw new Error("Missing ID")
//     }
//     const delDoc = await Board.findOneAndDelete({shortId: id});
//     if (!delDoc) {
// 		res.status(404);
// 		throw new Error("Document Not Found");
// 	}
//     res.json(delDoc)
// })

module.exports = {getBoard, uploadBoard}