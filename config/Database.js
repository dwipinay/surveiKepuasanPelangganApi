import { Sequelize } from "sequelize"

export const databaseSURVEI = new Sequelize(process.env.DB_DATABASE_SURVEI, process.env.DB_USERNAME_SURVEI, process.env.DB_PASSWORD_SURVEI, {
    host: process.env.DB_HOST_SURVEI,
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false
    },
    dialectOptions: {
        // useUTC: false
    },
    timezone: '+07:00', //for writing to database
    logging: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
