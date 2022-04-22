const express = require('express');
const router = express.Router();
global.sql = require('../model/index');
global.node_validator = require('node-input-validator');

const ParcelRoutes = require('./parcels/index')
const BranchRoutes = require('./branches/index')
const UserRoutes = require('./users/index')
const ProductRoutes = require('./products/index')
const ShippingDetailsRoutes = require('./shipping_details/index')
const RatingRoutes = require('./rating/index')

// Parcels
router.use('/parcels', ParcelRoutes)

// Branches
router.use('/branches', BranchRoutes)

// Products
router.use('/products', ProductRoutes)

// Shipping Details
router.use('/shipping-details', ShippingDetailsRoutes)

// Ratings
router.use('/ratings', RatingRoutes)

// Users
router.use('/users', UserRoutes)

module.exports = router;
