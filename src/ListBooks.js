import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DisplayShelf from './DisplayShelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render () {
    const { books, onUpdateShelf } = this.props
    const shelves = [
      { value:'currentlyReading', name:'Currently Reading'},
      { value:'wantToRead', name:'Want to Read'},
      { value:'read', name:'Read'}
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) =>
              <DisplayShelf
                key={shelf.value}
                shelf={shelf}
                books={books}
                onUpdateShelf={onUpdateShelf}
              />
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
