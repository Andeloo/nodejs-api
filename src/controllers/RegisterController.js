import Express from 'express';
import sequelize from '../config/database';
import Sequelize from 'sequelize';

const RegisterController = Express.Router();

const Teachers = sequelize.define("Teachers", {
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
Teachers.removeAttribute('id');
Teachers.removeAttribute('createdAt');
Teachers.removeAttribute('updatedAt');

const Students = sequelize.define("Students", {
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
Students.removeAttribute('id');
Students.removeAttribute('createdAt');
Students.removeAttribute('updatedAt');

const Subjects = sequelize.define("Subjects", {
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
Subjects.removeAttribute('id');
Subjects.removeAttribute('createdAt');
Subjects.removeAttribute('updatedAt');

const Classes = sequelize.define("Classes", {
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
Classes.removeAttribute('id');
Classes.removeAttribute('createdAt');
Classes.removeAttribute('updatedAt');

const Classrooms = sequelize.define("Classrooms", {
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
Classrooms.removeAttribute('id');
Classrooms.removeAttribute('createdAt');
Classrooms.removeAttribute('updatedAt');


const registerHandler = async (req, res) => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return res.sendStatus(500);
  }
  
  // Validation Json
  if ((typeof req.body.teacher == 'undefined') && (typeof req.body.teachers == 'undefined')) {
    console.log("undefined");
    return res.status(400).send("Missing Teacher");
  }
  if ((typeof req.body.student == 'undefined') && (typeof req.body.students == 'undefined')) {
    console.log("undefined");
    return res.status(400).send("Missing Student");
  }
  if ((typeof req.body.class == 'undefined') && (typeof req.body.classes == 'undefined')) {
    console.log("undefined");
    return res.status(400).send("Missing Class");
  }
  if (typeof req.body.subject == 'undefined') {
    console.log("undefined");
    return res.status(400).send("Missing Subject");
  }

  // TO Drop tables
  // await Teachers.drop();
  // await Students.drop();
  // await Classes.drop();
  // await Subjects.drop(); 

  
  // Adding into database 
  var insertTeacher = null;
  if (typeof req.body.teacher == 'undefined') {
    insertTeacher = await Teachers.bulkCreate(req.body.teachers).then(function () {
      console.log("teacher added");
      return '2';
    }).catch(function (err) {
      // return res.status(400).send(err.parent.sqlMessage);
      return err.parent.sqlMessage;
    });;
  } else {
    insertTeacher = await Teachers.create(req.body.teacher).then(function () {
      console.log("teachers added");
      return '1';
    }).catch(function (err) {
      // return res.status(400).send(err.parent.sqlMessage);
      return err.parent.sqlMessage;
    });
  } 
  if (insertTeacher.length > 1) {
    console.log(insertTeacher);
  }
  
  var insertStudent = null;
  if (typeof req.body.student == 'undefined') {
    insertStudent = await Students.bulkCreate(req.body.students).then(function () {
      console.log("students added");
      return '2';
    }).catch(function (err) {
      return err.parent.sqlMessage;
    });
  } else {
    insertStudent = await Students.create(req.body.student).then(function () {
      console.log("student added");
      return '1';
    }).catch(function (err) {
      return err.parent.sqlMessage;
    });
  }
  if (insertStudent.length > 1) {
    console.log(insertStudent);
  }
  
  var insertSubject = null;
  insertSubject = await Subjects.create(req.body.subject).then(function () {
    console.log("subject added"); 
  }).catch(function (err) {
    return (err.parent.sqlMessage);
  }); 
  if (insertSubject !=  null) {
    console.log(insertSubject);
  }

  var insertClass = null;
  var insertClassroom = null;
  if (typeof req.body.class == 'undefined') {
    
    console.log("reached");
    insertClass = await Classes.bulkCreate(req.body.classes).then(function () {
      console.log("classes added");
      return '2';
    }).catch(function (err) {
      return err.parent.sqlMessage;
    });
  } else {
    insertClass = await Classes.create(req.body.class).then(function () {
      console.log("class added");
      return '1';
    }).catch(function (err) {
      return err.parent.sqlMessage;
    });

    
    // CLASSROOM
    if (insertTeacher != '2') {
      if (insertStudent != '1') {
        for (var i = 0; i < req.body.students.length; i++) {
          insertClassroom = await Classrooms.create( {classCode: req.body.class.classCode, 
            subjectCode: req.body.subject.subjectCode, tEmail1: req.body.teacher.email
            , tEmail2: null, sEmail: req.body.students[i].email}  )
            .then(function () {
              console.log("classroom added");
              return '2';
            }).catch(function (err) {
              return err.parent.sqlMessage;
            });
        }
      } else {
        insertClassroom = await Classrooms.create( {classCode: req.body.class.classCode, 
          subjectCode: req.body.subject.subjectCode, tEmail1: req.body.teacher.email
          , tEmail2: null, sEmail: req.body.student.email}  )
          .then(function () {
            console.log("classroom added");
            return '1';
          }).catch(function (err) {
            return err.parent.sqlMessage;
          });
      }
    } 
    else {
      if (insertStudent != '1') {
        for (var i = 0; i < req.body.students.length; i++) {
          insertClassroom = await Classrooms.create( {classCode: req.body.class.classCode, 
            subjectCode: req.body.subject.subjectCode, tEmail1: req.body.teachers[0].email
            , tEmail2: req.body.teachers[1].email, sEmail: req.body.students[i].email}  )
            .then(function () {
              console.log("classroom added");
              return '2';
            }).catch(function (err) {
              return err.parent.sqlMessage;
            });
        }
      } else {
        insertClassroom =  await Classrooms.create( {classCode: req.body.class.classCode, 
          subjectCode: req.body.subject.subjectCode, tEmail1: req.body.teachers[0].email
          , tEmail2: req.body.teachers[1].email, sEmail: req.body.students[i].email}  )
          .then(function () {
            console.log("classroom added");
            return '1';
          }).catch(function (err) {
            return err.parent.sqlMessage;
          });
      }
    }
    
  }
  if (insertClass.length > 1) { 
    console.log(insertClass);
  }

  if (insertClassroom.length > 1) { 
    return res.status(400).send(insertClassroom);
  }
  

  return res.sendStatus(204);
 
}

RegisterController.post('/register', registerHandler);

export default RegisterController;
