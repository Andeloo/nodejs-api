"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var RegisterController = _express["default"].Router();

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
Classrooms.removeAttribute('updatedAt');

var registerHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var insertTeacher, insertStudent, insertSubject, insertClass, insertClassroom, i;
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
            if (!(typeof req.body.teacher == 'undefined' && typeof req.body.teachers == 'undefined')) {
              _context.next = 13;
              break;
            }

            console.log("undefined");
            return _context.abrupt("return", res.status(400).send("Missing Teacher"));

          case 13:
            if (!(typeof req.body.student == 'undefined' && typeof req.body.students == 'undefined')) {
              _context.next = 16;
              break;
            }

            console.log("undefined");
            return _context.abrupt("return", res.status(400).send("Missing Student"));

          case 16:
            if (!(typeof req.body["class"] == 'undefined' && typeof req.body.classes == 'undefined')) {
              _context.next = 19;
              break;
            }

            console.log("undefined");
            return _context.abrupt("return", res.status(400).send("Missing Class"));

          case 19:
            if (!(typeof req.body.subject == 'undefined')) {
              _context.next = 22;
              break;
            }

            console.log("undefined");
            return _context.abrupt("return", res.status(400).send("Missing Subject"));

          case 22:
            // TO Drop tables
            // await Teachers.drop();
            // await Students.drop();
            // await Classes.drop();
            // await Subjects.drop(); 
            // Adding into database 
            insertTeacher = null;

            if (!(typeof req.body.teacher == 'undefined')) {
              _context.next = 30;
              break;
            }

            _context.next = 26;
            return Teachers.bulkCreate(req.body.teachers).then(function () {
              console.log("teacher added");
              return '2';
            })["catch"](function (err) {
              // return res.status(400).send(err.parent.sqlMessage);
              return err.parent.sqlMessage;
            });

          case 26:
            insertTeacher = _context.sent;
            ;
            _context.next = 33;
            break;

          case 30:
            _context.next = 32;
            return Teachers.create(req.body.teacher).then(function () {
              console.log("teachers added");
              return '1';
            })["catch"](function (err) {
              // return res.status(400).send(err.parent.sqlMessage);
              return err.parent.sqlMessage;
            });

          case 32:
            insertTeacher = _context.sent;

          case 33:
            if (insertTeacher.length > 1) {
              console.log(insertTeacher);
            }

            insertStudent = null;

            if (!(typeof req.body.student == 'undefined')) {
              _context.next = 41;
              break;
            }

            _context.next = 38;
            return Students.bulkCreate(req.body.students).then(function () {
              console.log("students added");
              return '2';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 38:
            insertStudent = _context.sent;
            _context.next = 44;
            break;

          case 41:
            _context.next = 43;
            return Students.create(req.body.student).then(function () {
              console.log("student added");
              return '1';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 43:
            insertStudent = _context.sent;

          case 44:
            if (insertStudent.length > 1) {
              console.log(insertStudent);
            }

            insertSubject = null;
            _context.next = 48;
            return Subjects.create(req.body.subject).then(function () {
              console.log("subject added");
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 48:
            insertSubject = _context.sent;

            if (insertSubject != null) {
              console.log(insertSubject);
            }

            insertClass = null;
            insertClassroom = null;

            if (!(typeof req.body["class"] == 'undefined')) {
              _context.next = 59;
              break;
            }

            console.log("reached");
            _context.next = 56;
            return Classes.bulkCreate(req.body.classes).then(function () {
              console.log("classes added");
              return '2';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 56:
            insertClass = _context.sent;
            _context.next = 93;
            break;

          case 59:
            _context.next = 61;
            return Classes.create(req.body["class"]).then(function () {
              console.log("class added");
              return '1';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 61:
            insertClass = _context.sent;

            if (!(insertTeacher != '2')) {
              _context.next = 79;
              break;
            }

            if (!(insertStudent != '1')) {
              _context.next = 74;
              break;
            }

            i = 0;

          case 65:
            if (!(i < req.body.students.length)) {
              _context.next = 72;
              break;
            }

            _context.next = 68;
            return Classrooms.create({
              classCode: req.body["class"].classCode,
              subjectCode: req.body.subject.subjectCode,
              tEmail1: req.body.teacher.email,
              tEmail2: null,
              sEmail: req.body.students[i].email
            }).then(function () {
              console.log("classroom added");
              return '2';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 68:
            insertClassroom = _context.sent;

          case 69:
            i++;
            _context.next = 65;
            break;

          case 72:
            _context.next = 77;
            break;

          case 74:
            _context.next = 76;
            return Classrooms.create({
              classCode: req.body["class"].classCode,
              subjectCode: req.body.subject.subjectCode,
              tEmail1: req.body.teacher.email,
              tEmail2: null,
              sEmail: req.body.student.email
            }).then(function () {
              console.log("classroom added");
              return '1';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 76:
            insertClassroom = _context.sent;

          case 77:
            _context.next = 93;
            break;

          case 79:
            if (!(insertStudent != '1')) {
              _context.next = 90;
              break;
            }

            i = 0;

          case 81:
            if (!(i < req.body.students.length)) {
              _context.next = 88;
              break;
            }

            _context.next = 84;
            return Classrooms.create({
              classCode: req.body["class"].classCode,
              subjectCode: req.body.subject.subjectCode,
              tEmail1: req.body.teachers[0].email,
              tEmail2: req.body.teachers[1].email,
              sEmail: req.body.students[i].email
            }).then(function () {
              console.log("classroom added");
              return '2';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 84:
            insertClassroom = _context.sent;

          case 85:
            i++;
            _context.next = 81;
            break;

          case 88:
            _context.next = 93;
            break;

          case 90:
            _context.next = 92;
            return Classrooms.create({
              classCode: req.body["class"].classCode,
              subjectCode: req.body.subject.subjectCode,
              tEmail1: req.body.teachers[0].email,
              tEmail2: req.body.teachers[1].email,
              sEmail: req.body.students[i].email
            }).then(function () {
              console.log("classroom added");
              return '1';
            })["catch"](function (err) {
              return err.parent.sqlMessage;
            });

          case 92:
            insertClassroom = _context.sent;

          case 93:
            if (insertClass.length > 1) {
              console.log(insertClass);
            }

            if (!(insertClassroom.length > 1)) {
              _context.next = 96;
              break;
            }

            return _context.abrupt("return", res.status(400).send(insertClassroom));

          case 96:
            return _context.abrupt("return", res.sendStatus(204));

          case 97:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function registerHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

RegisterController.post('/register', registerHandler);
var _default = RegisterController;
exports["default"] = _default;