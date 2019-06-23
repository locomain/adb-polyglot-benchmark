const Utils = require('./helpers/utils');

(async ()=>{
    await Utils.benchmark(()=>{
        for(let x = 0; x<50000; x++){
            Utils.mysql(`REPLACE INTO post(post_id, location_id, email, title, description, date) 
                        VALUES ('111111${x}', '111111${x}', 'mail${x}', 'title{$x}', 'degegefz${x}', '0000-00-00')`
            )
        }
    });
})();


