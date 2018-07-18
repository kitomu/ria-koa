const Memcached = require('memcached');
const mem = new Memcached('localhost:11211');


//Работаем с мемкэш и делаем из колбэков промисы

module.exports = {
  //Забираем строку из кэша по id
  getItem: (id) => new Promise((resolve, reject) => {
    mem.get(`${id}` , (err , data) => {
      if(err) reject(err);
      resolve(data);
    })
  }),
  //Запись свойства в кэш
  //первый аргумент значение т.е. строка которую нужно записать, второй ключ
  setItem: (val , id) => new Promise((resolve , reject ) => {
    mem.add(`${id}`, val , 60 , (err) =>{
      if(err) reject(err);
      resolve(id);
    })
  }),
 
//Удаление по ключу 
  deleteItem: (id) => new Promise((resolve ,reject) => {
    mem.del(`${id}` , err => {
      if(err) reject(err);
      resolve(true);
    })
  })
}