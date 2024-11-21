const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../../Downloads/web_2_module_09_assignment/mongo_hbs_auth_starter/middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

module.exports = router;
