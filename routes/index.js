import express from 'express'
import {  login } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

import { insertDataSurveiKepuasan, getDataSurveiKepuasan, getSurveiKepuasanById, getDataSurveiKepuasanDetail, updateDataSurveiKepuasan, deleteDataSurveiKepuasan, getSurveiKepuasanPelanggan } from '../controllers/SurveiKepuasanController.js'
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
router.post('/apisurveikepuasanpelanggan/surveikepuasanpelanggan',verifyToken, insertDataSurveiKepuasan)
router.get('/apisurveikepuasanpelanggan/surveikepuasanpelanggan', verifyToken, getDataSurveiKepuasan)
router.get('/apisurveikepuasanpelanggan/surveikepuasanpelanggandetail', getDataSurveiKepuasanDetail)
router.get('/apisurveikepuasanpelanggan/surveikepuasanpelanggandetail/:id', getSurveiKepuasanById)
router.patch('/apisurveikepuasanpelanggan/surveikepuasanpelanggandetail/:id', updateDataSurveiKepuasan);
router.delete('/apisurveikepuasanpelanggan/surveikepuasanpelanggandetail/:id', deleteDataSurveiKepuasan);

router.get('/apisurveikepuasanpelanggan/getdatasurveikepuasanpelanggan',verifyToken, getSurveiKepuasanPelanggan)
export default router