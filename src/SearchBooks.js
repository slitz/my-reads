import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  render () {
    const { books } = this.props
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
                <li key={book.title}>
                  <div className='book'>
                    <div className='book-top'>
                      <div className='book-cover' style={{
                        width: `128px`,
                        height: `188px`,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}/>
                    </div>
                    <div className='book-title'>
                      {book.title}
                    </div>
                    <div className='book-authors'>
                      {book.authors}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks
