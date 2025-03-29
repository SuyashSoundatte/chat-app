import { Router } from "express"
import { validateLoginUser, validateRegisterUser } from "../middlewares/auth.middleware";
import { login, register } from "../controllers/auth.controller";

const router:Router = Router();

router.route('/register').post(validateRegisterUser, register);
router.route('/login').post(validateLoginUser, login);

export default router;