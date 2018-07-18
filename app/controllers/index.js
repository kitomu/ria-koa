// Забираем промисы для мэмкэша
const {getItem , setItem , deleteItem} = require('../managers/mem');

//переменная для записи рандомных ключей, по ней будем проверять не существует ли ключ
var keys = [];


// контроллеры
module.exports = {
  
  // выдача строки по ключу 
  getRecord: async (ctx , next)=>{
    //проверяем существует ли значение
    if(await getItem(parseInt(ctx.params.id))){

      //если существует отдаем 200 статус и строку значения
      ctx.res.writeHead(200 , {"Content-type":"text/plain"});
      ctx.body = await getItem(parseInt(ctx.params.id));
      await next();

    }else{
      //если не существует даем 404 статус и 404 в body
      ctx.res.writeHead(404 , {"Content-type":"text/plain"});
      ctx.body = 404;
    }

  },

  newRecord: async (ctx , next) =>{
    //отлавливем ошибки
    try{
      //рандомный и не повторяющийся id для записи
      let id;
      do{
        id = Math.round(Math.random() * 200);
      }
      while(keys.some( val => val == id));
      //если есть уникальный ключ пушим в keys
      keys.push(id);

      //даем 201 статус и id в виде строки
      ctx.res.writeHead(201 , {"Content-Type" : "text/plain"});
      //не использовал body parser потому что есть обект query в ctx
      ctx.body = await setItem(ctx.query.data , id);

      await next();
    }catch(err){
      //если ошибка даем 400 статус
      ctx.res.writeHead(400 , {"Content-Type" : "text/plain"});
      ctx.body = 400 ;

    }
  },
  //удаление по id
  deleteRecord: async (ctx , next) =>{
    try{
      // даем 204 статус и передаем пустую строку
      ctx.res.writeHead(204, {"Content-Type" : "text/plain"});
      await deleteItem(parseInt(ctx.params.id));

      //удаляем ключ из списка уникальных ключей
      keys = keys.map(val => {
        if(val == parseInt(ctx.params.id));
        else return val;
      })

      ctx.body = '';
      await next();
    }catch(err){
      //ошибка ошибка берегитесь
      ctx.res.writeHead(400, {"Content-Type" : "text/plain"});
      ctx.body = '';
    }
  }
}