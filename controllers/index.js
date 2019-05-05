var fn_index = async (ctx, next) =>{
    // ctx.response.body = `<h1>Index</h1>
    // <form action ='/sigin' method = 'post'>
    //     <p>Name:<input name ='name' value = 'koa'></p>
    //     <p>Password:<input name ='password' type = 'password'></p>
    //     <p><input value ='Submit' type = 'submit'></p>
    // </form>`;
    ctx.render('index.html', {
        title: 'Welcome'
    });
};

var fn_sigin = async (ctx, next) =>{
    // var name = ctx.request.body.name || '',
    //     password = ctx.request.body.password || '';
    // console.log(`name:${name}, password:${password}`);
    // if (name === 'koa' && password === '12345'){
    //     ctx.response.body = `<h1>Welcome, ${name}</h1>`;
    // }else{
    //     ctx.response.body = '<h1>Login Failed</h1><p><a href = '/'>Try again</a></p>';
    // }
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        ctx.render('signIn-ok.html', {
            title: 'Sign In OK',
            name: 'Mr CC'
        });
    } else {
        // 登录失败:
        ctx.render('signIn-fail.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /sigin': fn_sigin
};