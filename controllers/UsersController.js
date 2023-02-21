import { users, insertData, usersSurvei } from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jsonWebToken from 'jsonwebtoken'
import Joi from 'joi'
import { createHash } from "crypto"

export const getDataUser = (req, res) => {
    users.findAll({
        attributes: ['id','nama','email','password','created_at', 'modified_at']
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

export const login = (req, res) => {
    const schema = Joi.object({
        userName: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    });

    const { error, value } =  schema.validate(req.body)
    
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    users.findAll({
        attributes: ['id','nama','email','password', 'rs_id','created_at', 'modified_at'],
        where: {
            email: req.body.userName
        }
    })
    .then((results) => {
        if (!results.length) {
            res.status(404).send({
                status: false,
                message: 'email not found'
            })
            return
        }
        bcrypt.compare(req.body.password, results[0].password, (error, compareResult) => {
            if (compareResult == false) {
                res.status(401).send({
                    status: false,
                    message: 'wrong password'
                })
                return
            }
            const payloadObject = {
                id: results[0].id,
                nama: results[0].nama,
                email: results[0].email,
                rsId: results[0].rs_id
            }

            const accessToken = jsonWebToken.sign(payloadObject, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN})
            jsonWebToken.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
                // console.log(result)
                const refreshToken = jsonWebToken.sign(payloadObject, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN})
                users.update({refresh_token: refreshToken},{
                    where: {
                        id: results[0].id
                    }
                })
                .then(() => {
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    res.status(201).send({
                        status: true,
                        message: "access token created",
                        data: {
                            access_token: accessToken
                        }
                    })
                })
                .catch((err) => {
                    res.status(404).send({
                        status: false,
                        message: err
                    })
                    return
                })
            })
        })
    })
    .catch((err) => {
        res.status(404).send({
            status: false,
            message: err
        })
        return
    })
}

export const logina = (req, res) => {
    const schema = Joi.object({
        userName: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    });

    const { error, value } =  schema.validate(req.body)
    
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    usersSurvei.findAll({
        
        attributes: ['id','nama','email','password', 'rs_id','created_at', 'modified_at'],
       
        where: {
            
            email: req.body.userName
           
        }
    })
    .then((results) => {
        if (!results.length) {
            res.status(404).send({
                status: false,
                message: 'email not found'
            })
            return
        }
    //     const password = req.body.password
    //     const salt = "1m_@_SaLT_f0R_r$_0nl1n3"

    //     const passhash = createHash("sha256")
    //         .update(password)
    //         .update(createHash("sha256").update(salt, "utf8").digest("hex"))
    //         .digest("hex")
    //         console.log(passhash)
        const salt = 10
    const plainPassword = req.body.password
    //console.log(hash(plainPassword))
    bcrypt.hash(plainPassword, salt, (err, hash) => {
        
        if (err) {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        }
            const payloadObject = {
                id: results[0].id,
                nama: results[0].nama,
                email: results[0].email,
                rsId: results[0].rs_id
            }

            const accessToken = jsonWebToken.sign(payloadObject, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN})
            jsonWebToken.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
                // console.log(result)
                const refreshToken = jsonWebToken.sign(payloadObject, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN})
                users.update({refresh_token: refreshToken},{
                    where: {
                        id: results[0].id
                    }
                })
                .then(() => {
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    res.status(201).send({
                        status: true,
                        message: "access token created",
                        data: {
                            access_token: accessToken
                        }
                    })
                })
                .catch((err) => {
                    res.status(404).send({
                        status: false,
                        message: err
                    })
                    return
                })
            })
        })
    })
    .catch((err) => {
        res.status(404).send({
            status: false,
            message: err
        })
        return
    })
}

export const logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) {
        res.status(204).send({
            status: false,
            message: 'No'
        })
        return
    }
    users.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    .then((results) => {
        users.update({refresh_token: null},{
            where: {
                id: results[0].id
            }
        })
        .then((resultsUpdate) => {
            res.clearCookie('refreshToken')
            res.sendStatus(200)
        })
    })
    .catch((err) => {
        res.status(404).send({
            status: false,
            message: err
        })
        return
    })

}

export const insertDataUser = (req, res) => {
    const schema = Joi.object({
        nama: Joi.string()
            .required(),
        email: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
        rsId: Joi.string()
            .required().allow(null)
    })

    const { error, value } =  schema.validate(req.body)
    
    if (error) {
        res.status(404).send({
            status: false,
            message: error.details[0].message
        })
        return
    }

    const saltRound = 10
    const plainPassword = req.body.password
    bcrypt.hash(plainPassword, saltRound, (err, hash) => {
        if (err) {
            res.status(422).send({
                status: false,
                message: err
            })
            return
        }
        
        const data = [
            req.body.nama,
            req.body.email,
            hash,
            req.body.rsId
        ]
        
        insertData(data, (err, results) => {
            if (err) {
                res.status(422).send({
                    status: false,
                    message: err
                })
                return
            }
            res.status(201).send({
                status: true,
                message: "data created",
                data: {
                    id: results[0]
                }
            })
        })
    })
}