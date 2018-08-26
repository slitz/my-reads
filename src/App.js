import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  // Changes a book's shelf
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
