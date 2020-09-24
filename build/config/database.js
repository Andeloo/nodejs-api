"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _logger = _interopRequireDefault(require("./logger"));

var LOG = new _logger["default"]('database.js');
var _process$env = process.env,
    _process$env$DB_HOST = _process$env.DB_HOST,
    DB_HOST = _process$env$DB_HOST === void 0 ? 'localhost' : _process$env$DB_HOST,
    _process$env$DB_PORT = _process$env.DB_PORT,
    DB_PORT = _process$env$DB_PORT === void 0 ? '33306' : _process$env$DB_PORT,
    _process$env$DB_SCHEM = _process$env.DB_SCHEMA,
    DB_SCHEMA = _process$env$DB_SCHEM === void 0 ? 'school-administration-system' : _process$env$DB_SCHEM,
    _process$env$DB_USER = _process$env.DB_USER,
    DB_USER = _process$env$DB_USER === void 0 ? 'root' : _process$env$DB_USER,
    _process$env$DB_PW = _process$env.DB_PW,
    DB_PW = _process$env$DB_PW === void 0 ? 'password' : _process$env$DB_PW,
    _process$env$DB_POOL_ = _process$env.DB_POOL_ACQUIRE,
    DB_POOL_ACQUIRE = _process$env$DB_POOL_ === void 0 ? '30000' : _process$env$DB_POOL_,
    _process$env$DB_POOL_2 = _process$env.DB_POOL_IDLE,
    DB_POOL_IDLE = _process$env$DB_POOL_2 === void 0 ? '10000' : _process$env$DB_POOL_2,
    _process$env$DB_POOL_3 = _process$env.DB_POOL_MAX_CONN,
    DB_POOL_MAX_CONN = _process$env$DB_POOL_3 === void 0 ? '10' : _process$env$DB_POOL_3,
    _process$env$DB_POOL_4 = _process$env.DB_POOL_MIN_CONN,
    DB_POOL_MIN_CONN = _process$env$DB_POOL_4 === void 0 ? '1' : _process$env$DB_POOL_4,
    _process$env$DB_LOG_L = _process$env.DB_LOG_LEVEL,
    DB_LOG_LEVEL = _process$env$DB_LOG_L === void 0 ? 'info' : _process$env$DB_LOG_L;
var sequelize = new _sequelize["default"](DB_SCHEMA, DB_USER, DB_PW, {
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
  logging: function logging(msg) {
    LOG[DB_LOG_LEVEL](msg);
  }
});
var queryInterface = sequelize.getQueryInterface();
queryInterface.createTable('Teachers', {
  email: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    unique: true
  },
  name: _sequelize["default"].STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});
queryInterface.createTable('Students', {
  email: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    unique: true
  },
  name: _sequelize["default"].STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});
queryInterface.createTable('Subjects', {
  subjectCode: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    unique: true
  },
  name: _sequelize["default"].STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});
queryInterface.createTable('Classes', {
  classCode: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    unique: true
  },
  name: _sequelize["default"].STRING,
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});
queryInterface.createTable('Classrooms', {
  classCode: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    primaryKey: true
  },
  subjectCode: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    primaryKey: true
  },
  tEmail1: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    foreignKey: true
  },
  tEmail2: {
    type: _sequelize["default"].STRING,
    allowNull: true
  },
  sEmail: {
    type: _sequelize["default"].STRING,
    allowNull: false,
    primaryKey: true
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: _sequelize["default"].literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});
var _default = sequelize;
exports["default"] = _default;