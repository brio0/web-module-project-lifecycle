import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form  >
          <input
            type="text"
            name="item"

          />
        </form>
        <input type="submit" />
        <button>Clear</button>
      </div>
    )
  }
}
