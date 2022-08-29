import router from "./auth/auth.routes.js"
import auth from "./auth/auth.routes.js"
import user from "./users/users.routes.js"

router.use('/auth', auth)
router.use('/user', user)

export default router