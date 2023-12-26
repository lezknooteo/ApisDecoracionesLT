const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

// const cookieParser = require('cookie-parser');

const {sequelize}= require('../database/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
 
    this.productosPath = '/api/products';
    this.usersPath = '/api/user';
    this.authPath = '/api/auth' //Ruta pública de la API
    this.rolesPath = '/api/roles';
    this.categoryPath= '/api/category';
    this.foodsPath = '/api/foods';
    this.servicesPath = '/api/services';
    this.decorationsPath= '/api/decorations'
    this.statusPath= '/api/status'
    this.eventPath= '/api/events'
    this.modulePath= '/api/modules'
    this.privilegesPath= '/api/privileges'
    this.pricePath= '/api/price'

    

    this.middlewares();
    this.routes();
    this.dbconectar();
  }

  middlewares() {
    this.app.use(cookieParser()); 
    this.app.use(express.static(__dirname + '/'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
    // this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'));
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.rolesPath, require('../routes/roles'));
    this.app.use(this.foodsPath, require('../routes/foods'));
    this.app.use(this.categoryPath, require('../routes/category'));
    this.app.use(this.servicesPath, require('../routes/services'));
    this.app.use(this.decorationsPath, require('../routes/decorations'));
    this.app.use(this.productosPath, require('../routes/products'));
    this.app.use(this.statusPath, require('../routes/status'));
    this.app.use(this.eventPath, require('../routes/event'));
    this.app.use(this.privilegesPath, require('../routes/privileges'));
    this.app.use(this.modulePath, require('../routes/module'));
    this.app.use(this.pricePath, require('../routes/price'));

  }

  async dbconectar() {
    try {
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
