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
     * @returns {number}
     */
    static async benchmark(func){
        const timeBefore = performance.now();
        func();
        const timeAfter = performance.now();
        const cost = timeAfter-timeBefore;

        console.log(`Action took ${cost} milliseconds`);
        return cost;
    }

    /**
     *
     * @param query
     * @param func
     */
    static async mysql(query,func){
        return new Promise((resolve,reject)=>{
            mysqlConnection.query(query,(error,results,fields)=>{
                if(error)reject(error);
                resolve(results); //(results,fields);
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
