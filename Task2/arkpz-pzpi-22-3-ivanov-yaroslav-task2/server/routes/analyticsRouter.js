const Router = require("express");
const router = new Router();
const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Analytics
 */

/**
 * @swagger
 * /api/analytics/recommendations:
 *   post:
 *     summary: Create a new recommendation
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Create recommendation endpoint is not yet implemented
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Create recommendation endpoint is not yet implemented"
 */

router.post(
  "/recommendations/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  analyticsController.createRecommendation
);

/**
 * @swagger
 * /api/analytics/recommendations/{id}:
 *   get:
 *     summary: Get recommendation by ID
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recommendation ID
 *     responses:
 *       200:
 *         description: Get recommendation by ID endpoint is not yet implemented
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get recommendation by ID endpoint is not yet implemented"
 */

router.get(
  "/recommendations/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  analyticsController.getRecommendationById
);

module.exports = router;
