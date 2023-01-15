const inquirer = require('inquirer')
require('colors')

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`
      },
      {
        value: '2',
        name: `${'2.'.green} List tasks`
      },
      {
        value: '3',
        name: `${'3.'.green} List completed tasks`
      },
      {
        value: '4',
        name: `${'4.'.green} List pending tasks`
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`
      },
      {
        value: '0',
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('==========================='.green)
  console.log('   Select an option'.white)
  console.log('===========================\n'.green)

  const { option } = await inquirer.prompt(questions)
  return option
}

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue`
    }
  ]
  console.log('\n')
  await inquirer.prompt(question)
}

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        if (value.length === 0) {
          return 'Please enter a value'
        }
        return true
      }
    }
  ]
  const { desc } = await inquirer.prompt(question)
  return desc
}

const deleteTaskList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green
    return {
      value: task.id,
      name: `${idx} ${task.description}`
    }
  })
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  })
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ]
  const { id } = await inquirer.prompt(questions)
  return id
}

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]
  const { ok } = await inquirer.prompt(question)
  return ok
}

const showChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: !!task.completedAt
    }
  })
  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(question)
  return ids
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showChecklist
}
