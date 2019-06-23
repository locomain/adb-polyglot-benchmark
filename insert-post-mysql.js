const Utils = require('./helpers/utils');

(async ()=>{
    await Utils.benchmark(()=>{
        for(let x = 0; x<50000; x++){
            Utils.mysql(`REPLACE INTO post(post_id, location_id, email, title, description, date, image) 
            VALUES (111111${x}, 293827, 'Ferd.Duffy@hotmail.com', 'title${x}', 'degegefz${x}', '2011-12-18 13:17:17', '')`
            )
        }
    });
})();


