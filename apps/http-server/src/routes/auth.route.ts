import { Router } from "express"

const router:Router = Router();

router.route('/register').post(validateUser, register);
router.route('/login').post(validateLoginUser, login);

export default router;