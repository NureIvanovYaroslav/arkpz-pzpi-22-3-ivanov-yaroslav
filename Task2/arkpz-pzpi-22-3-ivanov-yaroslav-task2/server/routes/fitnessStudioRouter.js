const Router = require("express");
const router = new Router();
const fitnessStudioController = require("../controllers/fitnessStudioController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: FitnessStudio
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FitnessStudio:
 *       type: object
 *       required:
 *         - id
 *         - studioName
 *         - address
 *         - email
 *       properties:
 *         id:
 *           type: string
 *         studioName:
 *           type: string
 *         address:
 *           type: string
 *         email:
 *           type: string
 *         userFitnessStudios:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/fitness-studios:
 *   post:
 *     summary: Create a new fitness studio
 *     tags: [FitnessStudio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studioName:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fitness studio successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FitnessStudio'
 */

// Define specific routes first
router.post("/", authMiddleware, fitnessStudioController.createFitnessStudio);

/**
 * @swagger
 * /api/fitness-studios/add-user:
 *   post:
 *     summary: Add user to fitness studio
 *     tags: [FitnessStudio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               fitnessStudioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully added to fitness studio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserFitnessStudio'
 */
router.post(
  "/add-user",
  authMiddleware,
  fitnessStudioController.addUserToFitnessStudio
);

/**
 * @swagger
 * /api/fitness-studios/remove-user:
 *   delete:
 *     summary: Remove user from fitness studio
 *     tags: [FitnessStudio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               fitnessStudioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully removed from fitness studio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
  "/remove-user",
  authMiddleware,
  fitnessStudioController.removeUserFromFitnessStudio
);

/**
 * @swagger
 * /api/fitness-studios/user-fitness-studio-combinations:
 *   get:
 *     summary: Get all unique user-fitness studio combinations
 *     tags: [FitnessStudio]
 *     responses:
 *       200:
 *         description: List of unique user-fitness studio combinations successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *                   fitnessStudio:
 *                     $ref: '#/components/schemas/FitnessStudio'
 */
router.get(
  "/user-fitness-studio-combinations",
  authMiddleware,
  fitnessStudioController.getAllUniqueUserFitnessStudioCombinations
);

/**
 * @swagger
 * /api/fitness-studios/{fitnessStudioId}/users:
 *   get:
 *     summary: Get all users for a specific fitness studio
 *     tags: [FitnessStudio]
 *     parameters:
 *       - in: path
 *         name: fitnessStudioId
 *         schema:
 *           type: string
 *         required: true
 *         description: Fitness studio ID
 *     responses:
 *       200:
 *         description: List of users for the fitness studio successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get(
  "/:fitnessStudioId/users",
  authMiddleware,
  fitnessStudioController.getUsersByFitnessStudioId
);

// Define dynamic routes after specific routes
/**
 * @swagger
 * /api/fitness-studios/{id}:
 *   get:
 *     summary: Get fitness studio by ID
 *     tags: [FitnessStudio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Fitness studio ID
 *     responses:
 *       200:
 *         description: Fitness studio successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FitnessStudio'
 */
router.get(
  "/:id",
  authMiddleware,
  fitnessStudioController.getFitnessStudioById
);

/**
 * @swagger
 * /api/fitness-studios/{id}:
 *   put:
 *     summary: Update fitness studio by ID
 *     tags: [FitnessStudio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Fitness studio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studioName:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fitness studio successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FitnessStudio'
 */
router.put(
  "/:id",
  authMiddleware,
  fitnessStudioController.updateFitnessStudioById
);

/**
 * @swagger
 * /api/fitness-studios/{id}:
 *   delete:
 *     summary: Delete fitness studio by ID
 *     tags: [FitnessStudio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Fitness studio ID
 *     responses:
 *       200:
 *         description: Fitness studio successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete(
  "/:id",
  authMiddleware,
  fitnessStudioController.deleteFitnessStudioById
);

/**
 * @swagger
 * /api/fitness-studios:
 *   get:
 *     summary: Get all fitness studios
 *     tags: [FitnessStudio]
 *     responses:
 *       200:
 *         description: Fitness studios successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FitnessStudio'
 */
router.get("/", authMiddleware, fitnessStudioController.getAllFitnessStudios);

module.exports = router;
