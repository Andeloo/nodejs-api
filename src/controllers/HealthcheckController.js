import Express from 'express';
import { OK } from 'http-status-codes';
import sequelize from '../config/database';
import Sequelize from 'sequelize';

const HealthcheckController = Express.Router();

const healthcheckHandler = async (req, res) => {
  // console.log("hi");
  // return res.sendStatus(OK);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return res.sendStatus(500);
  }
  
  // const db = require("../models");
  // const Teachers = db.teachers;

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
  Classrooms.removeAttribute('id'  );
  Classrooms.removeAttribute('createdAt');
  Classrooms.removeAttribute('updatedAt');

  // sequelize.query('show tables').then(function(rows) {
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

  const classrooms = await Classrooms.findAll();

  // await Classrooms.create( {classCode: "P1-2", 
  //   subjectCode: "Sci", tEmail1: "teacher1@gmail.com"
  //   , tEmail2: null, sEmail: "student3@gmail.com"}  )
  //   .then(function () {
  //     console.log("classroom added");
  //   }).catch(function (err) {
  //     return res.status(400).send(err);
  //   });

  res.send(classrooms);
   

  // drop tables
  // await Teachers.drop();
  // await Students.drop();
  // await Classes.drop();
  // await Subjects.drop(); 
  // await Classrooms.drop();
}

HealthcheckController.get('/healthcheck', healthcheckHandler);

export default HealthcheckController;
