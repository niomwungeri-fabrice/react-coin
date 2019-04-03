import React, { Component } from "react";
import Loading from "../common/Loading";
import Table from "../list/Table";
import Pagination from "./Pagination";
import { responseHandler } from "../../helpers/helpers";
import { ROOT_URL } from "../../helpers/config";
class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
      perPage: 10
    };
    this.handlePaginationBtn = this.handlePaginationBtn.bind(this);
    this.handleChildInput = this.handleChildInput.bind(this);
  }
  componentDidMount() {
    this.fetchCurrency();
  }
  fetchCurrency() {
    const { page, perPage } = this.state;
    this.setState({ loading: true, perPage });
    fetch(`${ROOT_URL}/cryptocurrencies?page=${page}&perPage=${perPage}`)
      .then(responseHandler)
      .then(data => {
        const { currencies, totalPages } = data;
        this.setState({
          currencies,
          loading: false,
          totalPages
        });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage });
      });
  }

  handlePaginationBtn(direction) {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({ page: nextPage }, () => {
      this.fetchCurrency();
    });
  }
  handleChildInput(dataFromChild) {
    this.setState(
      {
        perPage: dataFromChild
      },
      () => {
        this.fetchCurrency();
      }
    );
  }
  render() {
    const {
      error,
      loading,
      currencies,
      totalPages,
      page,
      perPage
    } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div>
        <Table currencies={currencies} />
        <Pagination
          page={page}
          totalPages={totalPages}
          perPage={perPage}
          handlePaginationBtn={this.handlePaginationBtn}
          action={this.handleChildInput}
        />
      </div>
    );
  }
}

export default List;
