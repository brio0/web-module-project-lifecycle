import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form id="todoForm" onSubmit={this.props.onSubmit}>
          <input
            value={this.props.textInput}
            onChange={this.props.textInputChange}
            type="text"
            placeholder="type todo">
          </input>
          <input type="submit"></input>
        </form>
        <button
          onClick={this.props.toggleDisplayCompleteds}
        >
          {this.props.displayCompleteds ? "hide" : "show"} comleted
        </button>
      </div>
    )
  }
}
