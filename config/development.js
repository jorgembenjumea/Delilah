//Variables de Entorno 
// const sequelize = new Sequelize('mysql://root:root123*@localhost:3308/delihay2');
const config = {
    Port: 5400,
    ApiBaseUrl: "https://ambienteprueba.puntos.com",
    JwtSecretKey: "856ED746F97360B36E4BA820EB5A848206D5B40EA5D2D5BE0A5392E8BBD2A16C",
    JwtExpiresToken: '1h', // seconds

  MysqlConfig: {
        Db: 'delilah',
        User: 'root',
        Password: 'root123*',
        Host: "localhost",
        Port: 3308,
        Dialect: 'mysql'
    }
};
// https://www.grc.com/passwords.htm
module.exports = { config };