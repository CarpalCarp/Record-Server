const express = require('express');
const recordController = require('../controllers/recordController');

const router = express.Router();

router.get('/records', recordController.getRecords);
router.get('/records/:id', recordController.getRecordById);
router.post('/records', recordController.addRecord);
router.put('/records/:id', recordController.updateRecord);
router.delete('/records/:id', recordController.deleteRecord);

module.exports = router;
