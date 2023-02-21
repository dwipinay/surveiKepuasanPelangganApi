import { DataTypes, QueryTypes } from "sequelize";
import { databaseSURVEI } from "../config/Database.js";

export const dataResponden = databaseSURVEI.define("data_responden", {
  rs_id: {
    type: DataTypes.INTEGER,
  },
  no_rekam_medis: {
    type: DataTypes.STRING,
  },
  nama: {
    type: DataTypes.STRING,
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
  },
  umur: {
    type: DataTypes.INTEGER,
  },
  jenis_kelamin_id: {
    type: DataTypes.STRING,
  },
  pendidikan_terakhir_id: {
    type: DataTypes.STRING,
  },
  pekerjaan_utama_id: {
    type: DataTypes.STRING,
  },
  debitur_id: {
    type: DataTypes.STRING,
  },
  no_hp: {
    type: DataTypes.STRING,
  },
  rekomendasi_id: {
    type: DataTypes.STRING,
  },
  kritik_saran: {
    type: DataTypes.TEXT,
  },
});

export const dataPendapatResponden1 = databaseSURVEI.define(
  "data_pendapat_responden",
  {
    data_responden_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    pertanyaan_id: {
      type: DataTypes.INTEGER,
    },
    jawaban_id: {
      type: DataTypes.STRING,
    },
  }
);
export const dataPendapatResponden2 = databaseSURVEI.define(
  "data_pendapat_responden",
  {
    data_responden_id: {
      type: DataTypes.INTEGER,
    },
    pertanyaan1: {
      type: DataTypes.STRING,
    },
    pertanyaan2: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pertanyaan3: {
      type: DataTypes.STRING,
    },
    pertanyaan4: {
      type: DataTypes.STRING,
    },
    pertanyaan5: {
      type: DataTypes.STRING,
    },
    pertanyaan6: {
      type: DataTypes.STRING,
    },
    pertanyaan7: {
      type: DataTypes.STRING,
    },
    pertanyaan8: {
      type: DataTypes.STRING,
    },
    pertanyaan9: {
      type: DataTypes.STRING,
    },
    pertanyaan10: {
      type: DataTypes.STRING,
    },
    rekomendasi: {
      type: DataTypes.STRING,
    },
    kritik_saran: {
      type: DataTypes.TEXT,
    },
  }
);

export const dataPendidikanTerakhir = databaseSURVEI.define(
  "pendidikan_terakhir",
  {
    id: {
      type: DataTypes.INTEGER,
    },
    id_pendidikan: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pendidikan: {
      type: DataTypes.STRING,
    },
  }
);

export const dataPekerjaanUtama = databaseSURVEI.define("pekerjaan_utama", {
  id_pekerjaan: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  pekerjaan: {
    type: DataTypes.STRING,
  },
});

export const dataDebitur = databaseSURVEI.define("debitur", {
  id_debitur: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  debitur: {
    type: DataTypes.STRING,
  },
});

export const dataJenisKelamin = databaseSURVEI.define("jenis_kelamin", {
  id_jenis_kelamin: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
  },
});

export const dataRekomendasi = databaseSURVEI.define("rekomendasi", {
  id_rekomendasi: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  rekomendasi: {
    type: DataTypes.STRING,
  },
});

export const dataJawaban = databaseSURVEI.define("jawaban", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  jawaban: {
    type: DataTypes.STRING,
  },
});
export const dataPertanyaan = databaseSURVEI.define("pertanyaan", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  pertanyaan: {
    type: DataTypes.STRING,
  },
});

dataResponden.hasMany(dataPendapatResponden1, {
  foreignKey: "data_responden_id",
});
dataPendapatResponden1.belongsTo(dataResponden, { foreignKey: "id" });

dataPendidikanTerakhir.hasMany(dataResponden, { foreignKey: "id_pendidikan" });
dataResponden.belongsTo(dataPendidikanTerakhir, {
  foreignKey: "pendidikan_terakhir_id",
});

dataPekerjaanUtama.hasMany(dataResponden, { foreignKey: "id_pekerjaan" });
dataResponden.belongsTo(dataPekerjaanUtama, {
  foreignKey: "pekerjaan_utama_id",
});

dataDebitur.hasMany(dataResponden, { foreignKey: "id_debitur" });
dataResponden.belongsTo(dataDebitur, { foreignKey: "debitur_id" });

dataJenisKelamin.hasMany(dataResponden, { foreignKey: "id_jenis_kelamin" });
dataResponden.belongsTo(dataJenisKelamin, { foreignKey: "jenis_kelamin_id" });

dataRekomendasi.hasMany(dataResponden, { foreignKey: "id_rekomendasi" });
dataResponden.belongsTo(dataRekomendasi, { foreignKey: "rekomendasi_id" });

dataPertanyaan.hasMany(dataPendapatResponden1, {
  foreignKey: "id",
});
dataPendapatResponden1.belongsTo(dataPertanyaan, {
  foreignKey: "pertanyaan_id",
});

dataJawaban.hasMany(dataPendapatResponden1, {
  foreignKey: "id",
});
dataPendapatResponden1.belongsTo(dataJawaban, {
  foreignKey: "jawaban_id",
});

// export const getDataSurveiKepuasanJoin = (data, callback) => {
//   const sqlGet = 'SELECT `data_responden`.`id`, `data_responden`.`rs_id`, `data_responden`.`no_rekam_medis`, `data_responden`.`nama`, `data_responden`.`tanggal_lahir`, `data_responden`.`umur`, `data_responden`.`jenis_kelamin`, `data_responden`.`no_hp`,
//  `data_responden`.`rekomendasi`, `data_responden`.`kritik_saran`, `pendidikan_terakhir`.`id_pendidikan` AS `pendidikan_terakhir.id_pendidikan`,
//   `pendidikan_terakhir`.`pendidikan` AS `pendidikan_terakhir.pendidikan`, `pekerjaan_utama`.`id_pekerjaan` AS `pekerjaan_utama.id_pekerjaan`,
//   `pekerjaan_utama`.`pekerjaan` AS `pekerjaan_utama.pekerjaan`, `debitur`.`id_debitur` AS `debitur.id_debitur`, `debitur`.`debitur` AS `debitur.debitur`,
//   `data_pendapat_respondens`.`data_responden_id` AS `data_pendapat_respondens.data_responden_id`, `data_pendapat_respondens`.`pertanyaan_id` AS `data_pendapat_respondens.pertanyaan_id`,
//   `data_pendapat_respondens`.`jawaban_id` AS `data_pendapat_respondens.jawaban_id`, `data_pendapat_respondens`.`id` AS `data_pendapat_respondens.id`,
//   `data_pendapat_respondens->pertanyaan`.`id` AS `data_pendapat_respondens.pertanyaan.id`,
//   `data_pendapat_respondens->pertanyaan`.`pertanyaan` AS `data_pendapat_respondens.pertanyaan.pertanyaan`,
//   `data_pendapat_respondens->jawaban`.`id` AS `data_pendapat_respondens.jawaban.id`, `data_pendapat_respondens->jawaban`.`jawaban` AS `data_pendapat_respondens.jawaban.jawaban`
//   FROM `data_responden` AS `data_responden` LEFT OUTER JOIN `pendidikan_terakhir` AS `pendidikan_terakhir`
//   ON `data_responden`.`pendidikan_terakhir_id` = `pendidikan_terakhir`.`id_pendidikan` LEFT OUTER JOIN `pekerjaan_utama` AS `pekerjaan_utama`
//   ON `data_responden`.`pekerjaan_utama_id` = `pekerjaan_utama`.`id_pekerjaan` LEFT OUTER JOIN `debitur` AS `debitur` ON `data_responden`.`debitur_id` = `debitur`.`id_debitur`
//   LEFT OUTER JOIN `data_pendapat_responden` AS `data_pendapat_respondens` ON `data_responden`.`id` = `data_pendapat_respondens`.`data_responden_id`
//   LEFT OUTER JOIN `pertanyaan` AS `data_pendapat_respondens->pertanyaan` ON `data_pendapat_respondens`.`pertanyaan_id` = `data_pendapat_respondens->pertanyaan`.`id`
//   LEFT OUTER JOIN `jawaban` AS `data_pendapat_respondens->jawaban` ON `data_pendapat_respondens`.`jawaban_id` = `data_pendapat_respondens->jawaban`.`id`
//   WHERE `data_responden`.`rs_id` = '1603085'
//   databaseSURVEI.query(sqlGet, {
//       type: QueryTypes.GET,
//       replacements: [data]
//   })
//   .then((res) => {
//       callback(null, res)
//   })
//   .catch((error) => {
//       callback(error, null)
//   })
// }
