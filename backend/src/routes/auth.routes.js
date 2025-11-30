/* const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const { updateProfile, changePassword } = require('../controllers/auth.controller');

/**
 * @route POST /api/v1/auth/register
 */
//router.post('/register', authCtrl.register);

/**
 * @route POST /api/v1/auth/login

router.post('/login', authCtrl.login);

module.exports = router; */

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { updateProfile, changePassword, register, login } = require('../controllers/auth.controller');

// existing
router.post('/register', register);
router.post('/login', login);

// new
router.patch('/profile', auth, updateProfile);
router.patch('/password', auth, changePassword);

module.exports = router;