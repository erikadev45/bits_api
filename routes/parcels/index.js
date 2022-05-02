const express = require('express');
const router = express.Router();
const ParcelController = require('../../controller/parcel')

router.post('/create', ParcelController.addParcel);
router.post('/get-by-reference-number', ParcelController.getParcelByReferenceNumber);
router.post('/delete-by-id', ParcelController.deleteParcelById);
router.post('/delete-by-ref', ParcelController.getParcelByReferenceNumber);
router.get('/', ParcelController.getParcels);
router.post('/get-parcel-by-ref', ParcelController.getParcelByReferenceNumber);
router.post('/get-parcel-by-id', ParcelController.getParcelById);
router.post('/update', ParcelController.updateParcel);
router.post('/delete-parcel-product', ParcelController.deleteParcelProductById);

module.exports = router;
