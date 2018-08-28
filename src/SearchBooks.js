import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DisplayBook from './DisplayBook'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState(state => ({
        searchResults: books
      }))
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if(query.length > 0) {
      this.searchBooks(query)
    }
  }

  render () {
    const { onUpdateShelf } = this.props
    const { query, searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to={{
              pathname: "/"
            }}>
            Close
            </Link>
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
        {/* Display books that match the queery*/}
        {query !== '' && (
          <div className="search-books-results">
            <ol className="books-grid">
              {searchResults.length > 0 && searchResults.map((book) => (
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
