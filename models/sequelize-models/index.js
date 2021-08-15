const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: {
    type: Sequelize.DATE,
    defaultValue: null,
  },

  /* -------- *Not Needy?------ */

  timeRemaining: {
    type: Sequelize.NUMERIC,
    get() {
      if (!this.getDataValue('due')) return Infinity;
      return this.getDataValue('due') - new Date();
    },
  },

  overdue: {
    type: Sequelize.BOOLEAN,
    get() {
      if (this.getDataValue('complete')) return false;
      if (this.timeRemaining < 0) return true;
      return false;
    },
  },
});

Task.clearCompleted = function () {
  return Task.destroy({ where: { complete: true } });
};

Task.completeAll = function () {
  return Task.update({ complete: true }, { where: { complete: false } });
};

Task.prototype.getTimeRemaining = function () {
  if (!this.getDataValue('due')) return Infinity;
  return this.getDataValue('due') - new Date();
};

Task.prototype.isOverdue = function () {
  if (this.getDataValue('complete')) return false;
  if (this.timeRemaining < 0) return true;
  return false;
};

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner, { as: 'Ow' });
Owner.hasMany(Task);

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
