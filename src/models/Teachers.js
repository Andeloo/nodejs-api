
// module.exports = (sequelize, Sequelize) => {
//     const Teachers = sequelize.define("Teachers", {
//       email: { 
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//       },
//       name: Sequelize.STRING,
//       createdAt: {
//         type: 'TIMESTAMP',
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//         allowNull: false
//       },
//       updatedAt: {
//         type: 'TIMESTAMP',
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//         allowNull: false
//       }
//     });
    
//     Teachers.removeAttribute('id');
//     Teachers.removeAttribute('createdAt');
//     Teachers.removeAttribute('updatedAt');
//     return Teachers
//   };