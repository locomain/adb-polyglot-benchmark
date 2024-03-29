const Utils = require('./helpers/utils');

//run test
async function runQueries(){
    let baseQuery = 'INSERT INTO location (location_id, email, latitude, longitude, date) VALUES ';
    let batchQueries = [];
    const bulkLength = 1000;
    const totalInserts = 1000000;
    const batchCount = totalInserts / bulkLength;

    const nextID = (await Utils.mysql('SELECT MAX(location_id) from location'))[0]['MAX(location_id)'] + 1;

    //generate data
    for(let y = 0; y<batchCount; y++) {
        batchQueries[y] = baseQuery;
        for(let x = 0; x<bulkLength; x++){
            let id = nextID + (y * bulkLength) + x;
            batchQueries[y] += `(${id}, 'John.Rodriguez@hotmail.com', 123.12, 123.23, '2011-12-18 13:17:17')`;
            if(x < bulkLength - 1) batchQueries[y] += ',';
        }

    }
    await Utils.benchmark (async()=> {
            for (let q = 0; q < batchQueries.length; q++) {
                await Utils.mysql(batchQueries[q]);
            }
        },true);
}
runQueries();




