import Express from 'express';
import sequelize from '../../config/database';
import Sequelize from 'sequelize';

const WorkloadController = Express.Router();

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

// Relationship

const workLoadHandler = async (req, res) => {
  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return res.sendStatus(500);
  }
  
  const classrooms = await Classrooms.findAll({ 
    attributes: [
      [Sequelize.literal('(SELECT t.name FROM Teachers AS t WHERE t.email = Classrooms.tEmail1)'), 'teacherName'],
      'subjectCode',
      [Sequelize.literal('(SELECT s.name FROM Subjects AS s WHERE s.subjectCode = Classrooms.subjectCode)'), 'subjectName'],
      [Sequelize.literal('COUNT(DISTINCT(classCode))'), 'numberOfClasses'],
    ],
    group: ['tEmail1', 'subjectCode']
  })

  var dict = {}; 
  
  for (var i=0; i < classrooms.length; i++) {
    var tName = classrooms[i].dataValues.teacherName;
    if (!(tName in dict)) {
      dict[tName] = [];
    } 
    delete classrooms[i].dataValues.teacherName;
    dict[tName].push(classrooms[i].dataValues);
    
  }

  res.status(200).send(dict);

  // return res.sendStatus(204);  
}

WorkloadController.get('/workload', workLoadHandler);

export default WorkloadController;
