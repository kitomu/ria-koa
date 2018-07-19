//Функция для чтения тела
function readBody (ctx) {
  return new Promise((resolve , reject) => {
    try{
      ctx.req.on('data' , data => {
        resolve(data.toString());
      });
    }catch(err){
      reject(err);
    }
  })
}

module.exports  = readBody;
