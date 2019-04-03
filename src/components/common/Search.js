import React, { Component } from "react";
import { responseHandler } from "../../helpers/helpers";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";
import { ROOT_URL } from "../../helpers/config";

import "./Search.css";
class Search extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.redirectHandler = this.redirectHandler.bind(this);

    this.state = {
      searchResults: [],
      error: null,
      searchQuery: "",
      loading: false
    };
  }
  handleSearch(e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
    if (!searchQuery) {
      return "";
    }
    this.setState({ loading: true });
    fetch(`${ROOT_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(responseHandler)
      .then(data => {
        this.setState({ loading: false, searchResults: data });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }
  handleSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;
    if (!searchQuery) {
      return "";
    }
    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(currency => (
            <div
              key={currency.id}
              className="Search-result"
              onClick={() => this.redirectHandler(currency.id)}
            >
              {currency.name} ({currency.symbol})
            </div>
          ))}
        </div>
      );
    }
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No results found.</div>
        </div>
      );
    }
  }
  redirectHandler(currencyId) {
    // clear search results and search query
    this.setState({
      searchQuery: "",
      searchResults: []
    });

    // Redirect to currency page
    this.props.history.push(`/currency/${currencyId}`);
  }
  render() {
    const { error, loading, searchQuery } = this.state;
    if (error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          placeholder="Search"
          name="searchQuery"
          onChange={this.handleSearch}
          value={searchQuery}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.handleSearchResults()}
      </div>
    );
  }
}
export default withRouter(Search);
