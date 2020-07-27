const config = {
    Port: 5400,
    ApiBaseUrl: "https://ambienteprueba.puntos.com",
    JwtSecretKey: "856ED746F97360B36E4BA820EB5A848206D5B40EA5D2D5BE0A5392E8BBD2A16C",
    JwtExpiresToken: 18000, // seconds
    LoginInfo: {
        User: "acamica",
        Password: "acamica123",
    },
  MysqlConfig: {
        Db: 'delihay2',
        User: 'root',
        Password: 'root123*',
        Host: "localhost",
        Port: 3308,
        Dialect: 'mysql'
    }
};
// https://www.grc.com/passwords.htm
module.exports = { config };