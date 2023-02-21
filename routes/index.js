import express from 'express'
import {  logina } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

import { insertDataSurveiKepuasan, getDataSurveiKepuasan, getSurveiKepuasanById, getDataSurveiKepuasanDetail, updateDataSurveiKepuasan, deleteDataSurveiKepuasan } from '../controllers/SurveiKepuasanController.js'
const router = express.Router()

// User
// router.get('/apisirs/users', verifyToken, getDataUser)
// router.post('/apisirs/users', insertDataUser)

// Token
// router.post('/apisirs/login', login)
router.post('/apisirs/logina', logina)
// router.delete('/apisirs/logout', logout)
router.get('/apisirs/token', refreshToken)

//Survei Kepuasan
router.post('/apisirs/surveikepuasan',verifyToken, insertDataSurveiKepuasan)
router.get('/apisirs/surveikepuasan', verifyToken, getDataSurveiKepuasan)
router.get('/apisirs/surveikepuasandetail', getDataSurveiKepuasanDetail)
router.get('/apisirs/surveikepuasandetail/:id', getSurveiKepuasanById)
router.patch('/apisirs/surveikepuasandetail/:id', updateDataSurveiKepuasan);
router.delete('/apisirs/surveikepuasandetail/:id', deleteDataSurveiKepuasan);
export default router