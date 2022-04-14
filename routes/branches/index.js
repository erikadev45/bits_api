const express = require('express');
const router = express.Router();
const BranchController = require('../../controller/branch')

router.post('/create', BranchController.addBranch);
router.get('/', BranchController.getBranches);
router.post('/branch', BranchController.getBranchById);
router.post('/update', BranchController.updateBranch);
router.post('/delete-by-id', BranchController.deleteBranchById);

module.exports = router;
