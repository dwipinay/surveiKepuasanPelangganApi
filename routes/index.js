import express from 'express'
import {  login } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

import { insertDataSurveiKepuasan, getDataSurveiKepuasan, getSurveiKepuasanById, getDataSurveiKepuasanDetail, updateDataSurveiKepuasan, deleteDataSurveiKepuasan, getKegiatan } from '../controllers/SurveiKepuasanController.js'
const router = express.Router()

// User
// router.get('/apisirs/users', verifyToken, getDataUser)
// router.post('/apisirs/users', insertDataUser)

// Token
// router.post('/apisirs/login', login)
router.post('/apisurveikepuasanpelanggan/login', login)
// router.delete('/apisirs/logout', logout)
router.get('/apisurveikepuasanpelanggan/token', refreshToken)

//Survei Kepuasan
router.post('/apisurveikepuasanpelanggan/surveikepuasan',verifyToken, insertDataSurveiKepuasan)
router.get('/apisurveikepuasanpelanggan/surveikepuasan', verifyToken, getDataSurveiKepuasan)
router.get('/apisurveikepuasanpelanggan/surveikepuasandetail', getDataSurveiKepuasanDetail)
router.get('/apisurveikepuasanpelanggan/surveikepuasandetail/:id', getSurveiKepuasanById)
router.patch('/apisurveikepuasanpelanggan/surveikepuasandetail/:id', updateDataSurveiKepuasan);
router.delete('/apisurveikepuasanpelanggan/surveikepuasandetail/:id', deleteDataSurveiKepuasan);

router.get('/apisurveikepuasanpelanggan/getkegiatan', getKegiatan)
export default router