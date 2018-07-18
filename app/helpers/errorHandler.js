module.exports = app => {
//серверные ошибки
  app.use(async (ctx, next)=>{
    
    try{
      
      await next()
    
    }catch(err){
      
      ctx.res.writeHead(500 , {"Content-Type" : "text/plain"});
      ctx.body = 500;
    
    }
  })
}