class Todo {
  constructor(text = "", isComplete = false) {
    this.text = text
    this.isComplete = isComplete

    this.$el = document.createElement('div')
    this.$checkbox = document.createElement('input')
    this.$label = document.createElement('label')

    this.toggleCallbacks = []

    this.initialize()
  }

  initialize() {
    this.$el.classList.add('todo')

    this.$checkbox.setAttribute('type', 'checkbox')
    this.$el.appendChild(this.$checkbox)

    this.$label.innerText = this.text
    // this.$label.htmlFor = 'todo'+this.id
    this.$el.appendChild(this.$label)

    this.$el.addEventListener('click', e => this.toggle())
    this.update()
  }

  toggle() {
    this.isComplete = !this.isComplete
    this.toggleCallbacks.forEach(cb => cb())
    this.update()
  }

  update() {
    this.$el.classList.toggle('complete', this.isComplete)
    this.$checkbox.checked = this.isComplete
  }

  setText(text) {
    this.text = text
  }

  onToggle(cb) {
    if (cb && typeof cb === 'function') {
      this.toggleCallbacks.push(cb)
    } else {
      throw new Error("callback must be a function")
    }
  }
}

class TodoForm {
  constructor() {
    this.events = { submit: [] }

    this.$form = document.querySelector('#todoForm')
    this.$input = document.querySelector('#todoNewText')
    this.$btn = this.$form.querySelector('button')

    this.initialize()
  }

  initialize() {
    this.$form.addEventListener('submit', e => {
      e.preventDefault()
      const todo = new Todo(this.$input.value)
      this.events.submit.forEach(cb => cb(todo))
    })
  }

  addEventListener(eventType, cb) {
    if (this.events[eventType]) {
      this.events[eventType].push(cb)
    } else {
      this.events[eventType] = [cb]
    }
  }
}

class TodoList {
  constructor() {
    this.todos = []

    this.$list = document.querySelector('#todos')

    this.initialize()
  }

  initialize() {
    this.loadFromLocalStorage()
  }

  addTodo(todo) {
    this.todos.push(todo)
    this.$list.appendChild(todo.$el)

    todo.onToggle(this.updateLocalStorage.bind(this))

    if (this.$list.classList.contains('empty')) {
      this.$list.classList.toggle('empty', false)
    }

    this.updateLocalStorage()
  }

  updateLocalStorage() {
    const todos = this.todos.map(todo => ({ text: todo.text, isComplete: todo.isComplete }))
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  loadFromLocalStorage() {
    const storedTodos = JSON.parse(localStorage.getItem("todos"))
    if (storedTodos && storedTodos instanceof Array) {
      storedTodos.forEach(todo => this.addTodo(new Todo(todo.text, todo.isComplete)))
    }
  }
}

const todoForm = new TodoForm()
const todoList = new TodoList()
todoForm.addEventListener('submit', todoList.addTodo.bind(todoList))