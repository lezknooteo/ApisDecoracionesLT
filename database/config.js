const {Sequelize}= require('sequelize') ;

const sequelize = new Sequelize(
	process.env.postgres_url,
	{
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: {
				require: 'true',
			},
		}
	}
);

module.exports={
  sequelize
}

