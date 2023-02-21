import { databaseSURVEI } from '../config/Database.js'
import { dataResponden, dataPendapatResponden1, dataPendidikanTerakhir, dataPekerjaanUtama, dataDebitur, dataJawaban,  dataPertanyaan, dataJenisKelamin, dataRekomendasi, getDataSurveiKepuasanJoin } from '../models/SurveiKepuasan.js'
import Joi from 'joi'
import { createHash } from "crypto"


export const getDataSurveiKepuasan = (req, res) => {
    dataResponden.findAll({
        attributes: ['rs_id','no_rekam_medis','nama','tanggal_lahir','umur', 'no_hp','kritik_saran'],
        where:{
            rs_id: req.user.rsId,
        },
        include:[
            {
            model: dataPendidikanTerakhir,
            attributes: ['pendidikan'],
            }, 
            {
                model: dataPekerjaanUtama,
                attributes: ['pekerjaan'],
            },
            {
                model: dataDebitur,
                attributes: ['debitur'],
            },
            {
                model: dataJenisKelamin,
                attributes: ['nama'],
            },
            {
                model: dataRekomendasi,
                attributes: ['rekomendasi'],
            },
            {
                model: dataPendapatResponden1,
                include: [{
                    model: dataPertanyaan,
                    
                },{
                    model:dataJawaban,
                    
                }]
            },
           
        ],
      
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}
export const getDataPendidikanTerakhir = (req, res) => {
    dataPendidikanTerakhir.findAll({
        attributes: ['id_pendidikan','pendidikan'],
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}
export const getDataSurveiKepuasanDetail = (req, res) => {
    dataPendapatResponden1.findAll({
        attributes: ['id','data_responden_id'],
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}

export const getKegiatan = (req, res) => {
    const data = [
        req.body.id,
        req.body.rs_id,
        req.body.nama
    ]
      getDataSurveiKepuasanJoin(data, (err, results) => {
        if (err) {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        }
        res.status(201).send({
            status: true,
            message: "data Get",
            data: {
                id: results[0]
            }
        })
    })
}
// WHERE `data_responden`.`rs_id` = 1603085
export const getSurveiKepuasanById = async(req,res)=>{
    dataPendapatResponden1.findOne({
       
        where:{
            // rs_id: req.user.rsId,
            // tahun: req.query.tahun
            id:req.params.id
        },
        
    })
    .then((results) => {
        res.status(200).send({
            status: true,
            message: "data found",
            data: results
        })
    })
    .catch((err) => {
        res.status(422).send({
            status: false,
            message: err
        })
        return
    })
}

export const updateDataSurveiKepuasan = async(req,res)=>{
    try{
        await dataPendapatResponden1.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({message: "Survei Updated"});
    }catch(error){
        console.log(error.message);
    }
}

export const deleteDataSurveiKepuasan = async(req,res)=>{
    try{
        await dataPendapatResponden1.destroy({
            where:{
                id: req.params.id
            }
        });
        
        res.status(200).json({message: "Survei Deleted"});
    }catch(error){
        console.log(error.message);
    }
}

export const insertDataSurveiKepuasan =  async (req, res) => {
    const schema = Joi.object({
        
        noRekamMedis: Joi.string(),
        nama: Joi.string().required(),
        tanggalLahir: Joi.date().required(),
        umur: Joi.number().required(),
        jenisKelamin: Joi.string().required(),
        pendidikanTerakhir: Joi.string().required(),
        pekerjaanUtama: Joi.string().required(),
        debitur: Joi.string().required(),
        noHp: Joi.string(),
        rekomendasi: Joi.string(),
        kritikSaran: Joi.string(),
        data: Joi.array()
            .items(
                Joi.object().keys({
                    pertanyaanId: Joi.number().required(),
                    jawabanId: Joi.string().required()
   
                })
            ).required()
    })
console.log(req);
    const { error, value } =  schema.validate(req.body)
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message,
        })
        return
    }

    let transaction;
    try {
        transaction = await databaseSURVEI.transaction();
        const resultInsertHeader = await dataResponden.create({
            rs_id: req.user.rsId,
            no_rekam_medis: req.body.noRekamMedis,
            nama: req.body.nama,
            tanggal_lahir: req.body.tanggalLahir,
            umur: req.body.umur,
            jenis_kelamin_id: req.body.jenisKelamin,
            pendidikan_terakhir_id: req.body.pendidikanTerakhir,
            pekerjaan_utama_id: req.body.pekerjaanUtama,
            debitur_id: req.body.debitur,
            no_hp: req.body.noHp,
            rekomendasi_id: value.rekomendasi,
            kritik_saran: value.kritikSaran,
           
        }, { transaction })

        const dataDetail = req.body.data.map((value, index) => {
            const password = value.jawabanId
                const salt = 'saltshshsh'
                const passhash = createHash("sha256")
                    .update(password)
                    .update(createHash("sha256").update(salt, "utf8").digest("hex"))
                    .digest("hex")
                    console.log(passhash)
                
            return {
                
                data_responden_id: resultInsertHeader.id,
                pertanyaan_id: value.pertanyaanId,
                jawaban_id: value.jawabanId
                
            }
        })

        const resultInsertDetail = await dataPendapatResponden1.bulkCreate(dataDetail, { 
            
            transaction,
            
        })
        
            await transaction.commit()
        res.status(201).send({
            status: true,
            message: "data created",
            data: {
                id: resultInsertHeader.id
            }
        })
    } catch (error) {
        console.log(error)
        if (transaction) {
            await transaction.rollback()
            if(error.name === 'SequelizeUniqueConstraintError'){
                res.status(400).send({
                    status: false,
                    message: "Fail Duplicate Entry"
                    // reason: 'Duplicate Entry'
                })
            } else {
                res.status(400).send({
                    status: false,
                    message: "error"
                })
            }
        }
    }
}