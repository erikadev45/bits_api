const express = require('express');
const router = express.Router();
const RatingController = require('../../controller/rating')

router.post('/create', RatingController.addRate);
router.get('/', RatingController.getRatings);
router.post('/branch', RatingController.getRatingById);
router.post('/delete-by-id', RatingController.deleteRatingById);

module.exports = router;
