const router = require('express').Router();
const {getBoard, uploadBoard} = require('../controllers/boardController')

router.route('/board/:id').get(getBoard)
// .put(updateBoard).delete(deleteBoard)
router.route('/board').post(uploadBoard)

module.exports = router