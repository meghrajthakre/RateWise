const express = require('express');
const controller = require('../controllers/favorite.controller');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
router.post('/', asyncHandler(controller.createFavorite));
router.get('/', asyncHandler(controller.listFavorites));
router.delete('/:id', asyncHandler(controller.deleteFavorite));

module.exports = router;
