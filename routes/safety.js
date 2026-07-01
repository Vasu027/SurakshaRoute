const express = require('express');
const router = express.Router();
const safety = require('../controllers/safetyController');

router.post('/sos', safety.createSOS);
router.get('/events', safety.getEvents);

router.post('/trusted', safety.addTrusted);
router.get('/trusted', safety.getTrusted);

router.post('/verify-driver', safety.verifyDriver);

router.post('/companion/checkin', safety.checkin);

module.exports = router;