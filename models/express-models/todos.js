let tasks = {}; //

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  listPeople: function () {
    return Object.keys(tasks);
  },

  add: function (name, task) {
    if (task) {
      if (task.complete === undefined) task.complete = false;
    }
    if (!tasks[name]) {
      tasks[name] = [task];
    } else {
      tasks[name].push(task);
    }
    console.log('should have: ', tasks);
  },

  list: function (name) {
    return tasks[name];
  },

  complete: function (name, idx) {
    if (!tasks[name]) return;
    if (!tasks[name][idx]) return;
    tasks[name][idx].complete = true;
  },

  remove: function (name, idx) {
    if (!tasks[name]) return;
    if (!tasks[name][idx]) return;
    let retTasks = [];
    tasks[name].forEach(function (task, index) {
      if (index !== idx) retTasks.push(task);
    });
    tasks[name] = retTasks;
  },
};
