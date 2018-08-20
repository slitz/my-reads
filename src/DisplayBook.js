import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayBook extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render () {
    const { book } = this.props
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
            <div className='book-cover' style={{
              width: `128px`,
              height: `188px`,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}/>
            <div className="book-shelf-changer">
              <select>
                {moveBookOptions.map((option) => (
                  <option
                    value={option.value}
                    selected={book.shelf === option.value}
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
            {book.authors.map((author) =>
            <span key={author}>{author}<br/></span>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default DisplayBook
