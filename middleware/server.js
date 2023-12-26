const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const {sequelize}= require('../database/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
 
    this.productosPath = '/api/products';
    this.usersPath = '/api/user';
    this.rolesPath = '/api/roles';
    this.ingredientsPath = '/api/ingredients';
    this.categoryPath= '/api/category';
    this.foodsPath = '/api/foods';
    this.salesPath = '/api/sales';
    this.servicesPath = '/api/services';
    this.decorationsPath= '/api/decorations'
    this.statusPath= '/api/status'
    this.customerPath= '/api/customer'
    

    this.middlewares();
    this.routes();
    this.dbconectar();
  }

  middlewares() {
    delete require.cache[require.resolve(__filename)];
    this.app.use(express.static(__dirname + '/'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    // this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'));
    this.app.use(this.rolesPath, require('../routes/roles'));
    this.app.use(this.ingredientsPath, require('../routes/ingredient'));
    this.app.use(this.foodsPath, require('../routes/foods'));
    this.app.use(this.categoryPath, require('../routes/category'));
    this.app.use(this.salesPath, require('../routes/sales'));
    this.app.use(this.servicesPath, require('../routes/services'));
    this.app.use(this.decorationsPath, require('../routes/decorations'));
    this.app.use(this.productosPath, require('../routes/products'));
    this.app.use(this.statusPath, require('../routes/status'));
    this.app.use(this.customerPath, require('../routes/customer'));

  }

  async dbconectar() {
    try {
      console.log('Valor de force:', sequelize.options.force);
      await sequelize.sync({force:false})
      console.log('Conexión exitosa')
    } catch (error) {
      console.log('no se puede conectar')
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando por el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
