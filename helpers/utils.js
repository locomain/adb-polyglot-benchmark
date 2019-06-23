const { PerformanceObserver, performance } = require('perf_hooks');
const mongo = require('mongodb');
const mysql = require('mysql');
const config = require('../config');

const mysqlConnection = mysql.createConnection(config.MYSQL.CONNECTION_STRING);

module.exports = class Utils {

    /**
     * Prints the time elapsed by func
     *
     * @param func
     * @param async
     * @returns {number}
     */
    static async benchmark(func,async = false){
        const timeBefore = performance.now();
        if(async) await func(); else func();
        const timeAfter = performance.now();
        const cost = timeAfter-timeBefore;

        console.log(`Action took ${cost} milliseconds`);
        return cost;
    }

    /**
     *
     * @param query
     */
    static async mysql(query){
        return new Promise((resolve,reject)=>{
            mysqlConnection.query(query,(error,results)=>{
                if(error)reject(error);
                resolve(results);
            });
        });
    }

    /**
     * Executes mongo query from closure function
     *
     * @param func
     */
    static mongo(func){
        return new Promise((resolve,reject)=>{
            mongo.MongoClient.connect(config.MONGODB.url,async (error,mongo)=>{
                if(error)reject(error);
                const db = mongo.db(config.MONGODB.database);
                const result = await func(db,mongo);
                resolve(result);
            });
        });
    }

};
