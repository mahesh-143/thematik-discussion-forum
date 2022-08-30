import router from "./auth/auth.routes.js"
import auth from "./auth/auth.routes.js"
import user from "./users/users.routes.js"
import post from "./post/post.routes.js"
import theme from "./theme/theme.routes.js"

router.use('/auth', auth)
router.use('/user', user)
router.use('/post', post)
router.use('/theme', theme)
export default router