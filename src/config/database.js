import Sequelize from 'sequelize';
import Logger from './logger';

const LOG = new Logger('database.js');
const {
  DB_HOST = 'localhost',
  DB_PORT = '33306',
  DB_SCHEMA = 'school-administration-system',
  DB_USER = 'root',
  DB_PW = 'password',
  DB_POOL_ACQUIRE = '30000',
  DB_POOL_IDLE = '10000',
  DB_POOL_MAX_CONN = '10',
  DB_POOL_MIN_CONN = '1',
  DB_LOG_LEVEL = 'info',
} = process.env

const sequelize = new Sequelize(DB_SCHEMA, DB_USER, DB_PW, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  pool: {
    acquire: parseInt(DB_POOL_ACQUIRE),
    idle: parseInt(DB_POOL_IDLE),
    max: parseInt(DB_POOL_MAX_CONN),
    min: parseInt(DB_POOL_MIN_CONN)
  },
  timezone: '+08:00',
  logging: (msg) => {
    LOG[DB_LOG_LEVEL](msg);
  }
});

const queryInterface = sequelize.getQueryInterface();
queryInterface.createTable('Teachers', {
  email: { 
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});

queryInterface.createTable('Students', {
  email: { 
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});

queryInterface.createTable('Subjects', {
  subjectCode: { 
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});

queryInterface.createTable('Classes', {
  classCode: { 
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  name: Sequelize.STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});

queryInterface.createTable('Classrooms', { 
  classCode: { 
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  subjectCode: { 
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  tEmail1: { 
    type: Sequelize.STRING,
    allowNull: false,
    foreignKey: true
  },
  tEmail2: { 
    type: Sequelize.STRING,
    allowNull: true, 
  },
  sEmail: { 
    type: Sequelize.STRING,
    allowNull: false, 
    primaryKey: true
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});

export default sequelize;

