import { Sequelize } from "sequelize"

export const databaseSIRS = new Sequelize(process.env.DB_DATABASE_SIRS, process.env.DB_USERNAME_SIRS, process.env.DB_PASSWORD_SIRS, {
    host: process.env.DB_HOST_SIRS,
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false
    },
    dialectOptions: {
        // useUTC: false
    },
    timezone: '+07:00', //for writing to database
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

export const databaseRSOnline = new Sequelize(process.env.DB_DATABASE_RSONLINE, process.env.DB_USERNAME_RSONLINE, process.env.DB_PASSWORD_RSONLINE, {
    host: process.env.DB_HOST_RSONLINE,
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false
    },
    dialectOptions: {
        // useUTC: false
    },
    timezone: '+07:00', //for writing to database
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

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
