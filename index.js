const { inquirerMenu, pause, readInput, deleteTaskList, confirm, showChecklist } = require('./helpers/inquirer')
const { readDb, saveDb } = require('./helpers/saveFile')
const Tasks = require('./models/tasks')

require('colors')

const main = async () => {
  let opt = ''
  const tasks = new Tasks()
  do {
    opt = await inquirerMenu()

    const tasksDb = readDb()

    if (tasksDb) {
      tasks.loadTasksFromArray(tasksDb)
    }

    switch (opt) {
      case '1':
        // eslint-disable-next-line no-case-declarations
        const desc = await readInput('Description: ')
        tasks.createTask(desc)
        break
      case '2':
        tasks.completeList()
        break
      case '3':
        tasks.listCompletedPending()
        break
      case '4':
        tasks.listCompletedPending(false)
        break
      case '5':
        // eslint-disable-next-line no-case-declarations
        const ids = await showChecklist(tasks.listArr)
        tasks.toggleCompleted(ids)
        break
      case '6':
        // eslint-disable-next-line no-case-declarations
        const id = await deleteTaskList(tasks.listArr)
        // eslint-disable-next-line no-case-declarations
        const ok = await confirm('Are you sure?')
        if (ok) {
          tasks.deleteTask(id)
          console.log('Task deleted')
        }
        break
    }
    saveDb(tasks.listArr)
    await pause()
  } while (opt !== '0')
}

main()
