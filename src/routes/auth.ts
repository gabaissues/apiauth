import { Router } from 'express'
const router = Router()

import Auth from '../controllers/Auth'
const AuthController = new Auth()

router.get('/users', AuthController.users)
router.get('/user/token', AuthController.token)
router.post('/user/login', AuthController.login)
router.post('/user/create', AuthController.create)
router.delete('/user/delete', AuthController.delete)

export default router;