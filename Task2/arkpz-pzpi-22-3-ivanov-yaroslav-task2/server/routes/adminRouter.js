const Router = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /api/admin/backup:
 *   post:
 *     summary: Backup the database
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Backup endpoint is not yet implemented
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Backup endpoint is not yet implemented"
 */

router.post(
  "/backup",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  adminController.backupDatabase
);

/**
 * @swagger
 * /api/admin/restore:
 *   post:
 *     summary: Restore the database
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Restore endpoint is not yet implemented
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Restore endpoint is not yet implemented"
 */

router.post(
  "/restore",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  adminController.restoreDatabase
);

module.exports = router;
