module.exports = {
  port: 3004,
  environment: "dev",
  permissionLevels: {
    NORAML_USER: 1,
    PAID_USER: 4,
    ADMIN: 2048
  },
  mongodb:{
    uri:"mongodb://localhost:27017/couponDB",
    prodURL:"mongodb+srv://admin:admin@cluster0.vo4hu.gcp.mongodb.net/couponDB?retryWrites=true&w=majority",
    option:{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
};
