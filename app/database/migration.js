const pool = require("./pool");
pool.on("connect", () => {
  console.log("connected to db");
});

function createAlumniTable() {
  const query = `CREATE TABLE IF NOT EXISTS alumni
    (id SERIAL PRIMARY KEY, 
    id_pelajar NUMERIC(15) UNIQUE NOT NULL, 
    id_sd VARCHAR(15) NOT NULL, 
    tahun_sd VARCHAR(4) NOT NULL, 
    id_smp VARCHAR(15) NOT NULL, 
    tahun_smp VARCHAR(4) NOT NULL, 
    id_sma VARCHAR(15) NOT NULL, 
    tahun_sma VARCHAR(4) NOT NULL, 
    id_pt VARCHAR(15) NOT NULL, 
    tahun_pt VARCHAR(4) NOT NULL)
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
    status VARCHAR(15) NOT NULL, 
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
  createAllTables,
  dropAllTables,
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
