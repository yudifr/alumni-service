const db = require("../database/pool");
const response = require("../helper/responses");
const updateAllRiwayat = (id_alumni) => {
  let query = "update riwayat_kerja set is_active = 'false'";
  console.log(id_alumni, "xxx");
  if (id_alumni) {
    query += `where id_alumni = ${id_alumni}`;
  }
  return query;
};
exports.getAlumni = async (req, res) => {
  var query = "select * from alumni ";
  try {
    const result = await db.query(query);

    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, error, res);
  }
};

exports.getAlumniKuisionerByInstitution = async (req, res) => {
  const { institution_id, institution_type } = req.body;
  const typeFields = [
    { value: 1, key: "id_sd" },
    { value: 2, key: "id_smp" },
    { value: 3, key: "id_sma" },
    { value: 4, key: "id_pt" },
  ];
  const selectedTypeField = typeFields?.find(
    (x) => x.value == institution_type
  )?.key;
  console.log(selectedTypeField);
  var query = `
         select id from alumni where ${selectedTypeField} = '${institution_id}'`;
  try {
    const result = await db.query(query);
    const mappedResults = result.rows?.map((x) => x.id);
    return response.ok("ok", mappedResults, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};
exports.getConsumerKuisionerByInstitutionBasedOnAlumni = async (req, res) => {
  const { institution_id, institution_type } = req.body;
  const typeFields = [
    { value: 1, key: "id_sd" },
    { value: 2, key: "id_smp" },
    { value: 3, key: "id_sma" },
  ];
  const selectedTypeField = typeFields?.find(
    (x) => x.value == institution_type
  )?.key;
  var query = `
         select id from alumni where ${selectedTypeField} = '${institution_id}'`;
  try {
    const result = await db.query(query);
    const mappedResults = result.rows?.map((x) => x.id);
    console.log(
      mappedResults,
      "huha",
      selectedTypeField,
      institution_id,
      institution_type
    );
    // let workPlaceIdQueries =
    //   "select distinct id_perusahaan from riwayat_kerja where id_alumni IN (" +
    //   mappedResults +
    //   ")";
    // const workplaceResult = await db.query(workPlaceIdQueries);
    // const workplaceMappedResults = workplaceResult.rows?.map(
    //   (x) => x.id_perusahaan
    // );
    // console.log(workplaceMappedResults, workplaceResult);
    return response.ok("ok", mappedResults, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};
exports.getConsumerIdFromWorkingHistory = async (req, res) => {
  const { ids } = req.body;
  try {
    let workPlaceIdQueries =
      "select distinct id_perusahaan from riwayat_kerja where id_alumni IN (" +
      ids +
      ")";
    console.log("ids", ids, workPlaceIdQueries);
    const workplaceResult = await db.query(workPlaceIdQueries);
    const workplaceMappedResults = workplaceResult.rows?.map(
      (x) => x.id_perusahaan
    );
    console.log(workplaceMappedResults, workplaceResult);
    return response.ok("ok", workplaceMappedResults, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};
exports.getConsumerIdFromWorkingHistoryWithAlumni = async (req, res) => {
  const { ids } = req.body;
  try {
    let workPlaceIdQueries =
      "select * from riwayat_kerja where id_alumni IN (" + ids + ")";
    console.log("ids", ids, workPlaceIdQueries);
    const workplaceResult = await db.query(workPlaceIdQueries);
    const workplaceMappedResults = workplaceResult.rows?.map((x) => {
      return {
        id_perusahaan: x.id_perusahaan,
        id_alumni: x.id_alumni,
        ...x,
      };
    });
    console.log(workplaceMappedResults, workplaceResult);
    return response.ok("ok", workplaceMappedResults, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};
exports.getAlumniFromConsumerId = async (req, res) => {
  const { consumerId } = req.body;
  try {
    let workPlaceIdQueries = `select * from riwayat_kerja rk INNER JOIN alumni al on rk.id_alumni = al.id WHERE rk.id_perusahaan = '${consumerId}'`;
    console.log("consumerId", consumerId, workPlaceIdQueries);
    const workplaceResult = await db.query(workPlaceIdQueries);
    const workplaceMappedResults = workplaceResult.rows?.map((x) => {
      return {
        id_perusahaan: x.id_perusahaan,
        id_alumni: x.id_alumni,
        ...x,
      };
    });
    console.log(workplaceMappedResults, workplaceResult);
    return response.ok("ok", workplaceMappedResults, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};
exports.alumniDataOfInstitution = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);
  try {
    let alumniIdQuery = "select * from alumni where id IN (" + ids + ")";
    console.log("ids", ids, alumniIdQuery);
    const alumniResult = await db.query(alumniIdQuery);
    return response.ok("ok", alumniResult.rows, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, res);
  }
};
exports.getAlumniId = async (req, res) => {
  var query = "select * from alumni where id = " + req.params.id;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest([], res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.getAlumniRiwayatId = async (req, res) => {
  // var query =
  //   "select * from alumni inner join riwayat_kerja on alumni.id = riwayat_kerja.id_alumni where alumni.id = " +
  //   req.params.id;
  var query =
    "select * from riwayat_kerja where id_alumni   = " + req.params.id;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest([], res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, res);
  }
};
exports.getWorkerDataWithConsumerId = async (req, res) => {
  console.log("asd");
  var query =
    "select * from riwayat_kerja  where id_perusahaan =   '" +
    req.params.consumer_id +
    "'";
  try {
    const result = await db.query(query);
    console.log(result);
    if (result.rowCount == 0) {
      return response.badRequest([], res);
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
    motherName,
    fatherName,
    address,
    nama,
  } = req.body;
  console.log(
    idPelajar,
    id_sd,
    tahunSd,
    id_smp,
    tahunSmp,
    id_sma,
    tahunSma,
    id_pt,
    tahunPt,
    motherName,
    fatherName,
    address,
    nama
  );
  var query = `
        INSERT INTO ALUMNI (id_pelajar,nama,mother_name,father_name,address,id_sd,tahun_sd,id_smp,tahun_smp,id_sma,tahun_sma,id_pt,tahun_pt) 
        VALUES('${idPelajar}','${nama}','${motherName}','${fatherName}','${address}','${id_sd}','${tahunSd}','${id_smp}','${tahunSmp}'
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
  const { id_alumni, id_perusahaan, is_active, tahun } = req.body;
  console.log(req.body);
  // insert into riwayat_kerja (id_alumni,id_perusahaan,status,tahun) values ('3','2','bekerja','2021')
  let isValActive = is_active && is_active?.toLowerCase() == "true";
  var query = `
        INSERT INTO RIWAYAT_KERJA (id_alumni,id_perusahaan,is_active,tahun)
        VALUES('${id_alumni}','${id_perusahaan}','${isValActive}','${tahun}') RETURNING id
        `;
  console.log(query);
  try {
    const updateAllRiwayatQuery = await db.query(updateAllRiwayat(id_alumni));
    console.log(updateAllRiwayatQuery.rows);
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
    console.log(id);
    const updateAllRiwayatQuery = await db.query(updateAllRiwayat(id));
    console.log(updateAllRiwayatQuery.rows);
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
