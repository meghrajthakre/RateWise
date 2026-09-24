const express = require('express');
const controller = require('../controllers/history.controller');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
router.get('/', asyncHandler(controller.listHistory));
router.post('/', asyncHandler(controller.createHistory));
router.delete('/:id', asyncHandler(controller.deleteHistory));

module.exports = router;
