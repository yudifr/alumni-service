
const pool = require('./pool');
function query(query,params){
    return new Promise((resolve,reject)=>{
        pool.query(query,params).then((res)=>{
            resolve(res);
        })
        .catch((err)=>{
            reject(err);
        });
    });
}
module.exports = query;
