# nodejs-api
 Practice project built using NodeJs, Sequelize and Express.

NodeJS version : v13.9.0
NPM version: 6.13.7

Instructions for running the server:
1) npm install
2) npm start
3) Run Post to insert data.

APIs:

GET: http://localhost:3000/api/reports/workload

SAMPLE OUTPUT : 
```
{
    "Teacher 1": [
        {
            "subjectCode": "Eng",
            "subjectName": "English",
            "numberOfClasses": 1
        }
    ],
    "Teacher 2": [
        {
            "subjectCode": "Eng",
            "subjectName": "English",
            "numberOfClasses": 1
        },
        {
            "subjectCode": "Sci",
            "subjectName": "Science",
            "numberOfClasses": 2
        }
    ]
}
```

POST: http://localhost:3000/api/register

SAMPLE INPUT : 
```
{
   "teacher": {
      "name": "Teacher 1",
      "email": "teacher1@gmail.com"
   },
   "students": [
      {
         "name": "Student 1",
         "email": "student1@gmail.com"
      },
      {
         "name": "Student 2",
         "email": "student2@gmail.com"
      }
   ],
   "subject": {
      "subjectCode": "Eng",
      "name": "English"
   },
   "class": {
      "classCode": "P1-2",
      "name": "P1 Integrity"
   }
}
```


Exposed Port:
1) database: 33306
2) application: 3000

Libraries needed:
a. Framework: ExpressJS

b. ORM: Sequelize

c. Database: MySql 8.0

d. Logger: WinstonJS

e. Test Runner: Jest

f. Docker
