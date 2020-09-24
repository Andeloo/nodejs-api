"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var HealthcheckController = _express["default"].Router();

var healthcheckHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var Teachers, Students, Subjects, Classes, Classrooms, classrooms;
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
            // const db = require("../models");
            // const Teachers = db.teachers;
            Teachers = _database["default"].define("Teachers", {
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
            Students = _database["default"].define("Students", {
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
            Subjects = _database["default"].define("Subjects", {
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
            Classes = _database["default"].define("Classes", {
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
            Classrooms = _database["default"].define("Classrooms", {
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
            Classrooms.removeAttribute('updatedAt'); // sequelize.query('show tables').then(function(rows) {
            //   console.log(JSON.stringify(rows));
            // });
            // await Teachers.drop();
            // try {
            //   const jane = await Teachers.bulkCreate([{ email: "Gare@sss.com", name: "Jane"}, 
            //   {email: "Ease@sss.com", name: "Jane"}]);
            //   console.log(jane);
            //   return res.status(204).send(jane);
            // } catch (e) {
            //   console.log(e);
            //   return res.status(400).send(e.parent.sqlMessage);
            // }
            // check table content
            // const teachers = await Teachers.findAll();  
            // const students = await Students.findAll();  
            // const classes = await Classes.findAll();  
            // const subject = await Subjects.findAll();
            // const classrooms = await Classrooms.findAll();
            // console.log(JSON.stringify(teachers, null, 2),JSON.stringify(classes, null, 2),
            // JSON.stringify(students, null, 2), JSON.stringify(subject, null, 2);

            _context.next = 32;
            return Classrooms.findAll();

          case 32:
            classrooms = _context.sent;
            // await Classrooms.create( {classCode: "P1-2", 
            //   subjectCode: "Sci", tEmail1: "teacher1@gmail.com"
            //   , tEmail2: null, sEmail: "student3@gmail.com"}  )
            //   .then(function () {
            //     console.log("classroom added");
            //   }).catch(function (err) {
            //     return res.status(400).send(err);
            //   });
            res.send(classrooms); // drop tables
            // await Teachers.drop();
            // await Students.drop();
            // await Classes.drop();
            // await Subjects.drop(); 
            // await Classrooms.drop();

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function healthcheckHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

HealthcheckController.get('/healthcheck', healthcheckHandler);
var _default = HealthcheckController;
exports["default"] = _default;