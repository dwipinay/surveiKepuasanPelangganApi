import express from 'express'
import {  login } from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

import { insertDataSurveiKepuasan, getDataSurveiKepuasan, getDataSurveiKepuasanDetail, getSurveiKepuasanPelanggan, getDataPendidikanTerakhir, getDataPekerjaanUtama, getDataJenisKelamin, getDataDebitur, getDataRekomendasi, getDataPertanyaan } from '../controllers/SurveiKepuasanController.js'
const router = express.Router()

// User
// router.get('/apisirs/users', verifyToken, getDataUser)
// router.post('/apisirs/users', insertDataUser)

// Token
// router.post('/apisirs/login', login)
router.post('/apisurveikepuasanmasyarakat/login', login)
// router.delete('/apisirs/logout', logout)
router.get('/apisurveikepuasanmasyarakat/token', refreshToken)

//Survei Kepuasan
router.post('/apisurveikepuasanmasyarakat/surveikepuasanpelanggan',verifyToken, insertDataSurveiKepuasan)
router.get('/apisurveikepuasanmasyarakat/surveikepuasanpelanggan', verifyToken, getDataSurveiKepuasan)
router.get('/apisurveikepuasanmasyarakat/surveikepuasanpelanggandetail', getDataSurveiKepuasanDetail)

router.get('/apisurveikepuasanmasyarakat/getmasterpendidikan', verifyToken, getDataPendidikanTerakhir)
router.get('/apisurveikepuasanmasyarakat/getmasterpekerjaan', verifyToken, getDataPekerjaanUtama)
router.get('/apisurveikepuasanmasyarakat/getmasterjeniskelamin', verifyToken, getDataJenisKelamin)
router.get('/apisurveikepuasanmasyarakat/getmasterdebitur', verifyToken, getDataDebitur)
router.get('/apisurveikepuasanmasyarakat/getmasterrekomendasi', verifyToken, getDataRekomendasi)
router.get('/apisurveikepuasanmasyarakat/getmasterpertanyaan', verifyToken, getDataPertanyaan)
router.get('/apisurveikepuasanmasyarakat/getdatasurveikepuasanpelanggan',verifyToken, getSurveiKepuasanPelanggan)
export default router