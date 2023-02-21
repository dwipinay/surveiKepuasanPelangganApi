import { DataTypes, QueryTypes } from "sequelize"
import { databaseSURVEI } from "../config/Database.js"


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
