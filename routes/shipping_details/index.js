const express = require('express');
const router = express.Router();
const ShippingDetailsController = require('../../controller/shipping_details')

router.post('/get-shipping-details-by-parcel', ShippingDetailsController.getShippingDetailsByParcelId);

module.exports = router;
