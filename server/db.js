const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/vibe', { logging: false })

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }

})

module.exports = {
  db,
  User
}