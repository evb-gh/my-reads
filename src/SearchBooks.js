import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book'
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
  state = {
    query: "",
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({query: query})
    this.updateSearchResults(query)
  }

  updateSearchResults = (q) => {
    if (q) {
      BooksAPI.search(q).then(results => {
        results.error ?
          this.setState({searchResults: []}) :
          this.setState({searchResults: results})
        }
      )
    } else {
      this.setState({ searchResults: []})
    }
  }

  render() {

    return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={ e => this.updateQuery(e.target.value)}
                 />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.searchResults.map(data => (
                      <li key={data.id}>
                        <Book
                          book={data}
                          changeShelf={this.props.changeShelf}
                          />
                      </li>
                    ))
                }
              </ol>
            </div>
          </div>
    );
  }
}

export default SearchBook
