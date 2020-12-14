module.exports = {
    url: process.env.DATABASE_URL ||  
        "postgres://postgres:bcd127@localhost:5432/transcorp", 
    config: { 
    dialect: "postgres", 
    logging: console.log, 
    define: { 
        timestamp: true, 
        underscored: true, 
    },
  }, 
};



    // dialect: "mysql",
    // host: "localhost",
    // username: "root",
    // password: "bcd127",
    // database: process.env.NODE_ENV === "test" ? "TransCorp_test" : "TransCorp",
    // logging: true,
    // define:{
    //     timestamp: true,
    //     underscored: true
    // }

//timestamp coloca created_at e updated_at nas tabelas
//underscored coloca os nomes de tabelas e atributos como snake_case
