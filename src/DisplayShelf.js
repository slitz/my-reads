import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DisplayBook from './DisplayBook'

class DisplayShelf extends Component {
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render () {
    const { shelf, books, onUpdateShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* Display books with the matching shelf value */}
            {books.filter((book) => {
              return book.shelf === shelf.value
              }).map((book) => (
                <DisplayBook
                  key={book.id}
                  book={book}
                  onUpdateShelf={onUpdateShelf}
                />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default DisplayShelf
