const express = require('express');

const router = express.Router();

const addController = require('../controllers/addController');
const subtractController = require('../controllers/subtractController');
const multiplyController = require('../controllers/multiplyController');
const divideController = require('../controllers/divideController');
const errorHandlingMiddleware = require('../middleware/errorHandlingMiddleware');

router.post('/add', errorHandlingMiddleware, addController);
router.post('/sub', errorHandlingMiddleware, subtractController);
router.post('/multiply', errorHandlingMiddleware, multiplyController);
router.post('/divide', errorHandlingMiddleware, divideController);
router.post('/test', (req, res) => res.send('Test route works'));

module.exports = router;
