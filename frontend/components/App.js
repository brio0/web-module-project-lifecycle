import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    textInput: '',
    displayCompleteds: true,
  }

  textInputChange = e => {
    const { value } = e.target
    this.setState({ ...this.state, textInput: value })
  }

  resetForm = () => this.setState({ ...this.state, textInput: '' })

  setResponseError = err => this.setState({ ...this.state, error: err.response.data.message })

  addTodo = () => {
    axios.post(URL, { name: this.state.textInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setResponseError)
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setResponseError)
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(item => {
            if (item.id !== id) return item
            return res.data.data
          })
        })
      })
  }

  onSubmit = e => {
    e.preventDefault()
    this.addTodo()
  }

  toggleDisplayCompleteds = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }

  componentDidMount() {
    this.fetchAllTodos()
  }


  render() {
    return (
      <div>
        <div id="error"> Error: {this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          onSubmit={this.onSubmit}
          textInputChange={this.textInputChange}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          textInput={this.state.textInput}
          displayCompleteds={this.state.displayCompleteds}
        />
      </div>
    )
  }
}








