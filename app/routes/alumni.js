const express = require("express");
const router = express.Router();
const alumniController = require("../controllers/alumniController");
router
  .route("/")
  .get(alumniController.getAlumni)
  .post(alumniController.newAlumni);

router
  .route("/:id")
  .get(alumniController.getAlumniId)
  .put(alumniController.updateAlumni)
  .delete(alumniController.deleteAlumni);
router
  .route("/worker/:consumer_id")
  .get(alumniController.getWorkerDataWithConsumerId);
router
  .route("/getalumnidata")
  .post(alumniController.getAlumniKuisionerByInstitution);
router
  .route("/getworkerdata")
  .post(alumniController.getConsumerKuisionerByInstitutionBasedOnAlumni);
router
  .route("/get-consumer-id")
  .post(alumniController.getConsumerIdFromWorkingHistory);
router
  .route("/get-consumer-id-with-alumni")
  .post(alumniController.getConsumerIdFromWorkingHistoryWithAlumni);
router
  .route("/get-alumni-from-consumer-id")
  .post(alumniController.getAlumniFromConsumerId);
router.route("/get-alumni-data").post(alumniController.alumniDataOfInstitution);
router
  .route("/riwayat/history/:id")
  .get(alumniController.getAlumniRiwayatId)
  .put(alumniController.updateRiwayat)
  .delete(alumniController.deleteRiwayat);
router
  .route("/riwayat/remove-history")
  .post(alumniController.deleteRiwayatOfAlumni);
router.route("/update/alumni").post(alumniController.updateAlumni);
router.post("/riwayat", alumniController.newRiwayat);
module.exports = router;
