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
        this.fetchAllTodos()
        this.resetForm()
      })
      .catch(err => {
        this.setResponseError()
      })
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
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, td) => {
              if (this.state.displayCompleteds || !td.completed) return acc.concat(
                <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? ' -done-' : ''}</div>
              )
              return acc

            }, [])
          }
        </div>
        <div>
          <form id="todoForm" onSubmit={this.onSubmit}>
            <input value={this.state.textInput} onChange={this.textInputChange} type="text" placeholder="type todo"></input>
            <input type="submit"></input>
          </form>
          <button onClick={this.toggleDisplayCompleteds}>{this.state.displayCompleteds ? "hide" : "show"} comleteds</button>
        </div>
      </div>
    )
  }
}








