const router = require("express").Router();

const { catchErrors } = require("./helpers/errorHandler.js");
const UserService = require("./services/UserService");
const AuthService = require("./services/AuthService");

router.get("/", (req, res) => res.json({ data: "API" }));

router.post("/register", catchErrors(UserService.register));
router.post("/login", AuthService.loginAuth, AuthService.provideToken);
router.get("/secure", AuthService.jwtAuth, (req, res) =>
  res.json({ data: "Secure" })
);

module.exports = router;
