import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayBook extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render () {
    const { book, onUpdateShelf } = this.props
    const moveBookOptions = [
      { value:'move', name:'Move to...'},
      { value:'currentlyReading', name:'Currently Reading'},
      { value:'wantToRead', name:'Want to Read'},
      { value:'read', name:'Read'},
      { value:'none', name:'None'}
    ]
    return (
      <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div className='book-cover' style={ book.imageLinks && {
              width: `128px`,
              height: `188px`,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}/>
            <div className="book-shelf-changer">
              <select onChange={(event) => onUpdateShelf(book, event.target.value)} defaultValue={book.shelf ? book.shelf : 'none'} >
              {/* Trigger the updateShelf method in app.js when value is changed*/}
                {moveBookOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.value === 'move'}
                  >
                  {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='book-title'>
            {book.title}
          </div>
          <div className='book-authors'>
            {book.authors &&
              book.authors.map((author) =>
                <span key={author}>{author}<br/></span>
              )
            }
          </div>
        </div>
      </li>
    )
  }
}

export default DisplayBook
