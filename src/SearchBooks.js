import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import DisplayBook from './DisplayBook'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  render () {
    const { books, onUpdateShelf } = this.props
    const { query } = this.state

    let displayedBooks
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      displayedBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
      displayedBooks.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {query !== '' && (
          <div className="search-books-results">
            <ol className="books-grid">
              {displayedBooks.map((book) => (
                <DisplayBook
                  key={book.id}
                  book={book}
                  onUpdateShelf={onUpdateShelf}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks
