const express = require("express");
const router = express.Router();
const infoController = require("../controllers/infoController");
const socialController = require("../controllers/socialController");
const policyController = require("../controllers/policyController");
const imagesController = require("../controllers/imagesController");
const heroController = require("../controllers/heroController");
const subController = require("../controllers/subController");

// isValidID Middleware
router.param("token", infoController.validateID);

router.route(`/social/`).get(socialController.getAll);
router.route(`/policies/`).get(policyController.getAll);
router.route(`/images/`).get(imagesController.getAll);
router.route(`/hero/`).get(heroController.getAll);
router.route(`/subs/`).post(subController.addOne);

router.route(`/subs/:token`).get(subController.getAll);
router.route(`/social/:token`).patch(socialController.patchAll);
router.route(`/policies/:token`).patch(policyController.patchAll);
router.route(`/images/:token`).patch(imagesController.patchAll);
router.route(`/hero/:token`).patch(heroController.patchAll);

module.exports = router;
