const db = require("../database/pool");
const response = require("../helper/responses");
exports.getAlumni = async (req, res) => {
  var query = "select * from alumni ";
  try {
    const result = await db.query(query);

    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, error, res);
  }
};
exports.getAlumniId = async (req, res) => {
  var query = "select * from alumni where alumni.id = " + req.params.id;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no data", res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.getAlumniRiwayatId = async (req, res) => {
  var query =
    "select * from alumni inner join riwayat_kerja on alumni.id = riwayat_kerja.id_alumni where alumni.id = " +
    req.params.id;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no data", res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};

exports.newAlumni = async (req, res) => {
  const {
    idPelajar,
    id_sd,
    tahunSd,
    id_smp,
    tahunSmp,
    id_sma,
    tahunSma,
    id_pt,
    tahunPt,
  } = req.body;
  var query = `
        INSERT INTO ALUMNI (id_pelajar,id_sd,tahun_sd,id_smp,tahun_smp,id_sma,tahun_sma,id_pt,tahun_pt) 
        VALUES('${idPelajar}','${id_sd}','${tahunSd}','${id_smp}','${tahunSmp}'
        ,'${id_sma}','${tahunSma}','${id_pt}','${tahunPt}') RETURNING id
        `;
  console.log(query);
  try {
    const result = await db.query(query);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};

exports.newRiwayat = async (req, res) => {
  const { idAlumni, idPerusahaan, status, tahun } = req.body;
  // insert into riwayat_kerja (id_alumni,id_perusahaan,status,tahun) values ('3','2','bekerja','2021')
  var query = `
        INSERT INTO RIWAYAT_KERJA (id_alumni,id_perusahaan,status,tahun)
        VALUES('${idAlumni}','${idPerusahaan}','${status}','${tahun}') RETURNING id
        `;
  console.log(query);
  try {
    const result = await db.query(query);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};

exports.updateAlumni = async (req, res) => {
  const { id_sd, tahunSd, id_smp, tahunSmp, id_sma, tahunSma, id_pt, tahunPt } =
    req.body;
  const id = req.params.id;
  var query = `
        UPDATE ALUMNI SET
        id_sd = '${id_sd}',
        tahun_sd = '${tahunSd}',
        id_smp = '${id_smp}',
        tahun_smp = '${tahunSmp}',
        id_sma = '${id_sma}',
        tahun_sma = '${tahunSma}',
        id_pt = '${id_pt}',
        tahun_pt = '${tahunPt}'
        WHERE id = ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.updateRiwayat = async (req, res) => {
  const { idPerusahaan, status, tahun } = req.body;
  const id = req.params.id;
  var query = `
        UPDATE RIWAYAT_KERJA SET
        id_perusahaan = '${idPerusahaan}',
        status = '${status}',
        tahun = '${tahun}'
        
        WHERE id_alumni = ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};

exports.updateRiwayat = async (req, res) => {
  const { idPerusahaan, status, tahun } = req.body;
  const id = req.params.id;
  var query = `
        UPDATE RIWAYAT_KERJA SET
        id_perusahaan = '${idPerusahaan}',
        status = '${status}',
        tahun = '${tahun}'
        
        WHERE id_alumni = ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.deleteAlumni = async (req, res) => {
  const id = req.params.id;
  var query = `
        delete from alumni 
        WHERE id= ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.deleteRiwayat = async (req, res) => {
  const id = req.params.id;
  var query = `
        delete from riwayat_kerja 
        WHERE id= ${id}
        `;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no related data", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
