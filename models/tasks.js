const Task = require('./task')

class Tasks {
  _list = {}

  get listArr () {
    const list = []
    Object.keys(this._list).forEach(key => {
      const task = this._list[key]
      list.push(task)
    })
    return list
  }

  constructor () {
    this._list = {}
  }

  loadTasksFromArray (tasks = []) {
    tasks.forEach(task => {
      this._list[task.id] = task
    })
  }

  createTask (desc = '') {
    const task = new Task(desc)
    this._list[task.id] = task
  }

  completeList () {
    this.listArr.forEach((task, i) => {
      const { description, completedAt } = task
      const status = (completedAt)
        ? 'Completed'.green
        : 'Pending'.red
      const idx = (completedAt)
        ? `${i + 1}.`.green
        : `${i + 1}.`.red
      console.log(`${idx} ${description} :: ${status}`)
    })
  }

  listCompletedPending (completed = true) {
    let counter = 0
    this.listArr.forEach(task => {
      const { description, completedAt } = task
      const status = (completedAt)
        ? 'Completed'.green
        : 'Pending'.red
      if (completed) {
        if (completedAt) {
          counter += 1
          console.log(`${(counter.toString() + '.').green} ${description} :: ${completedAt.green}`)
        }
      } else {
        if (!completedAt) {
          counter += 1
          console.log(`${(counter.toString() + '.').red} ${description} :: ${status}`)
        }
      }
    })
  }

  deleteTask (id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }

  toggleCompleted (ids = []) {
    ids.forEach(id => {
      const task = this._list[id]
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString()
      }
    })
    this.listArr.forEach(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null
      }
    })
  }
}

module.exports = Tasks
