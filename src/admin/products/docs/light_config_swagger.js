/**
 * @swagger
 * components:
 *   schemas:
 *     LightConfig:
 *       type: object
 *       required:
 *         - name
 *         - config
 *         - user_id
 *       properties:
 *         name:
 *           type: string
 *           example: "Living Room Light"
 *           description: Name of the light configuration
 *         thumbnail:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               format: uri
 *               example: "https://example.com/images/light1.jpg"
 *             public_id:
 *               type: string
 *               example: "light1_thumbnail"
 *         config:
 *           type: object
 *           description: Configuration object for the light
 *           example:
 *             brightness: 80
 *             color: "#FF5733"
 *             mode: "warm"
 *         iframe:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of iframe URLs
 *           example: ["<iframe1>", "<iframe2>"]
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "60d21b4667d0d8992e610c85"
 */

/**
 * @swagger
 * tags:
 *   - name: "Web Configurator (Light Configurations)"
 *     description: "Light configuration management and CRUD operations"
 */

/**
 * @swagger
 * /admin/products/light-configs:
 *   post:
 *     summary: Create a new light configuration
 *     tags: ["Web Configurator (Light Configurations)"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LightConfig'
 *     responses:
 *       201:
 *         description: Light configuration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightConfig'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/products/light-configs/{id}:
 *   get:
 *     summary: Get a light configuration by ID
 *     tags: ["Web Configurator (Light Configurations)"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Light configuration ID
 *     responses:
 *       200:
 *         description: Light configuration found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightConfig'
 *       404:
 *         description: Light configuration not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/products/light-configs/{id}:
 *   put:
 *     summary: Update a light configuration
 *     tags: ["Web Configurator (Light Configurations)"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Light configuration ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LightConfig'
 *     responses:
 *       200:
 *         description: Light configuration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LightConfig'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Light configuration not found
 */

/**
 * @swagger
 * /admin/products/light-configs/{id}:
 *   delete:
 *     summary: Delete a light configuration
 *     tags: ["Web Configurator (Light Configurations)"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Light configuration ID
 *     responses:
 *       200:
 *         description: Light configuration deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Light configuration not found
 */

/**
 * @swagger
 * /admin/products/users/light-configs:
 *   post:
 *     summary: Get light configurations for a specific user
 *     tags: ["Web Configurator (Light Configurations)"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: List of user's light configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LightConfig'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/products/all-light-configs:
 *   get:
 *     summary: Get all light configurations
 *     tags: ["Web Configurator (Light Configurations)"]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all light configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LightConfig'
 *       401:
 *         description: Unauthorized
 */
