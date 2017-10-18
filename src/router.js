const UserService = require('./services/UserService');
const AuthService = require('./services/AuthService');
const router = require('express').Router();
const { catchErrors } = require('./helpers/errorHandler.js');

router.get('/', (req, res) => res.json({ data: 'DataPoint API' }));

router.post('/register', catchErrors(UserService.register));
router.post('/login', AuthService.loginAuth, AuthService.provideToken);

module.exports = router;
