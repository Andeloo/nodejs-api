"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("../../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var WorkloadController = _express["default"].Router();

var Teachers = _database["default"].define("Teachers", {
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

Teachers.removeAttribute('id');
Teachers.removeAttribute('createdAt');
Teachers.removeAttribute('updatedAt');

var Students = _database["default"].define("Students", {
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

Students.removeAttribute('id');
Students.removeAttribute('createdAt');
Students.removeAttribute('updatedAt');

var Subjects = _database["default"].define("Subjects", {
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

Subjects.removeAttribute('id');
Subjects.removeAttribute('createdAt');
Subjects.removeAttribute('updatedAt');

var Classes = _database["default"].define("Classes", {
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

Classes.removeAttribute('id');
Classes.removeAttribute('createdAt');
Classes.removeAttribute('updatedAt');

var Classrooms = _database["default"].define("Classrooms", {
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

Classrooms.removeAttribute('id');
Classrooms.removeAttribute('createdAt');
Classrooms.removeAttribute('updatedAt'); // Relationship

var workLoadHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var classrooms, dict, i, tName;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _database["default"].authenticate();

          case 3:
            console.log('Connection has been established successfully.');
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error('Unable to connect to the database:', _context.t0);
            return _context.abrupt("return", res.sendStatus(500));

          case 10:
            _context.next = 12;
            return Classrooms.findAll({
              attributes: [[_sequelize["default"].literal('(SELECT t.name FROM Teachers AS t WHERE t.email = Classrooms.tEmail1)'), 'teacherName'], 'subjectCode', [_sequelize["default"].literal('(SELECT s.name FROM Subjects AS s WHERE s.subjectCode = Classrooms.subjectCode)'), 'subjectName'], [_sequelize["default"].literal('COUNT(DISTINCT(classCode))'), 'numberOfClasses']],
              group: ['tEmail1', 'subjectCode']
            });

          case 12:
            classrooms = _context.sent;
            dict = {};

            for (i = 0; i < classrooms.length; i++) {
              tName = classrooms[i].dataValues.teacherName;

              if (!(tName in dict)) {
                dict[tName] = [];
              }

              delete classrooms[i].dataValues.teacherName;
              dict[tName].push(classrooms[i].dataValues);
            }

            res.status(200).send(dict); // return res.sendStatus(204);  

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function workLoadHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

WorkloadController.get('/workload', workLoadHandler);
var _default = WorkloadController;
exports["default"] = _default;