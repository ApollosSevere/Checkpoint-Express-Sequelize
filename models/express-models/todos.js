let tasks = {}; //

/*
  tasks (defined above) will be a place to store tasks by person;
  example:
  {
    person1: [{task object 1}, {task object 2}, etc.],
    person2: [{task object 1}, {task object 2}, etc.],
    etc.
  }
*/

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },

  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },

  add: function (name, task) {
    // saves a task for a given person
    if (task) {
      if (task.complete === undefined) task.complete = false;
    }
    if (!tasks[name]) {tasks[name] = [task]}
    else {tasks[name].push(task)}
    console.log("should have: ",tasks)
  },

  list: function (name) {
    // returns tasks for specified person
    return tasks[name];
  },

  complete: function (name, idx) {
    // marks a task complete
    if (!tasks[name]) return;
    if (!tasks[name][idx]) return;
    tasks[name][idx].complete = true;
  },

  remove: function (name, idx) {
    // removes a tasks
    if (!tasks[name]) return;
    if (!tasks[name][idx]) return;
    let retTasks = [];
    tasks[name].forEach(function (task, index) {
      if (index !== idx) retTasks.push(task);
    });
    tasks[name] = retTasks;
  },
};
