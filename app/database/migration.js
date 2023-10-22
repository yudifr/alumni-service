const pool = require("./pool");
pool.on("connect", () => {
  console.log("connected to db");
});

function createAlumniTable() {
  const query = `CREATE TABLE IF NOT EXISTS alumni
    (id SERIAL PRIMARY KEY, 
    nama VARCHAR(40),
    id_pelajar NUMERIC(15) UNIQUE NOT NULL,  
    mother_name VARCHAR(40) NOT NULL, 
    father_name VARCHAR(40) NOT NULL, 
    address VARCHAR(40) NOT NULL, 
    id_sd VARCHAR(15) NOT NULL, 
    tahun_sd VARCHAR(4) NOT NULL, 
    id_smp VARCHAR(15) NOT NULL, 
    tahun_smp VARCHAR(4) NOT NULL, 
    id_sma VARCHAR(15) NOT NULL, 
    tahun_sma VARCHAR(4) NOT NULL)
    `;

  pool
    .query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
function createRiwayatTable() {
  const query = `CREATE TABLE IF NOT EXISTS riwayat_kerja
    (id SERIAL PRIMARY KEY, 
    id_alumni NUMERIC(15) NOT NULL, 
    id_perusahaan NUMERIC(15) NOT NULL, 
    is_active Boolean, 
    tahun VARCHAR(4) NOT NULL)
    `;
  pool
    .query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
const dropAlumniTable = () => {
  const query = "drop table if exists alumni";
  pool
    .query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropRiwayatTable = () => {
  const query = "drop table if exists riwayat_kerja";
  pool
    .query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createAlumniTable();
  createRiwayatTable();
};

const dropAllTables = () => {
  dropAlumniTable();
  dropRiwayatTable();
};

pool.on("remove", () => {
  console.log("dced");
  process.exit(0);
});

module.exports = {
  createAlumniTable,
  createRiwayatTable,
  dropAllTables,
  dropRiwayatTable,
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
