import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todo: [],
    text: ''
  }
  handleChange = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventdefault()

  }

  addTodos = () => {

  }

  componentDidmount() {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todo: res.data.data
        })
      })
      .catch(err => {
        console.log({ err })
      })
  }

  render() {
    return (
      <div>
        <TodoList />
        <Form />
      </div>
    )
  }
}
