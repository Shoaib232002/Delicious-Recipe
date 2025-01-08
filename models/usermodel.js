const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'shoaib'
});
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to mySql database');
});

const createUser =(UserData,callback) => {
    const {username,password,email,phone} = UserData;
    const query = 'INSERT INTO user(username,pwd,email,phone) VALUES(?,?,?,?)';
    connection.query(query,[username,password,email,phone],(err,results) =>{
        callback(err,results);
    });
};
const Recipe = {
    getAllRecipes: (callback) => {
        const sql = 'SELECT * FROM recipes order by  id desc';

        connection.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },
    addRecipe: (data, callback) => {
        const sql = 'INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)';
        connection.query(sql, [data.name, data.ingredients, data.instructions], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
};
module.exports = {
    createUser,connection,Recipe
};