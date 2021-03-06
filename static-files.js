const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

/// url  类似 /static/
/// dir 类似 __dirname + static
function staticFiles(url,dir){
    return async (ctx, next)=>{
        let rpath = ctx.request.path;
        ///判断是否是以 url 为开头
        if (rpath.startsWith(url)) {
            /// 获取完整路径
            let fp = path.join(dir,rpath.substring(url.length));
            ///判断文件是否存在
            if(await fs.exists(fp)){
                ///查找文件的mime
                ctx.response.type = mime.lookup(fp);
                ///读取内容给body
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }
        } else {
            ///不是指定 url前缀，执行下一个middleware
            await next();
        }
    };
}

module.exports = staticFiles;