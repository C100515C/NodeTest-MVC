const fs = require('fs');

function addControllers(router, dir){
    // try {
        var files = fs.readdirSync(__dirname + '/' + dir);
        var js_files = files.filter((f) =>{
            return f.endsWith('.js');
        });
    
        for (const f of js_files) {
            console.log(`process controller: ${f}...`);
            let mapping = require(__dirname + `/${dir}/` + f);
            addMapping(router,mapping);
        }
    // } catch (error) {
    //    console.log(error); 
    // }
    
}

function addMapping(router,mapping) {
    for (const url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
        }else{
            console.log(`无效url:${url}`);
        }
    }
}

module.exports = function (dir){
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
        addControllers(router,controllers_dir);
    return router.routes();
};