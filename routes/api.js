const express = require('express');
const router = express.Router();
global.sql = require('../model/index');
global.node_validator = require('node-input-validator');

const ParcelRoutes = require('./parcels/index')
const BranchRoutes = require('./branches/index')
const UserRoutes = require('./users/index')
const ProductRoutes = require('./products/index')

// Parcels
router.use('/parcels', ParcelRoutes)

// Branches
router.use('/branches', BranchRoutes)

// Branches
router.use('/products', ProductRoutes)

// Users
router.use('/users', UserRoutes)

module.exports = router;
