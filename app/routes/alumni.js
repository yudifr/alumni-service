const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
router.route('/')
.get(alumniController.getAlumni)
.post(alumniController.newAlumni)


;
router.route('/:id')
.get(alumniController.getAlumniId)
.put(alumniController.updateAlumni)
.delete(alumniController.deleteAlumni)
;
router.route('/riwayat/:id')
.get(alumniController.getAlumniRiwayatId)
.put(alumniController.updateRiwayat)
.delete(alumniController.deleteRiwayat)

;
router.post('/riwayat',alumniController.newRiwayat);
module.exports = router;