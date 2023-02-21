import { DataTypes, QueryTypes } from "sequelize"
import { databaseSIRS, databaseSURVEI } from "../config/Database.js"

export const users = databaseSIRS.define('users', {
    nama: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    rs_id: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    modified_at: {
        type: DataTypes.DATE
    }

})

export const usersSurvei = databaseSURVEI.define('users', {
    nama: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    rs_id: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    modified_at: {
        type: DataTypes.DATE
    }

})

export const insertData = (data, callback) => {
    const sqlInsert = 'INSERT INTO users (nama,email,password,rs_id) VALUES ( ? )'
    databaseSIRS.query(sqlInsert, {
        type: QueryTypes.INSERT,
        replacements: [data]
    })
    .then((res) => {
        callback(null, res)
    })
    .catch((error) => {
        callback(error, null)
    })
}