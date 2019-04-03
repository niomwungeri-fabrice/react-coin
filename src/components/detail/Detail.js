import React, { Component } from "react";
import { ROOT_URL } from "../../helpers/config";
import { responseHandler, onPercentChange } from "../../helpers/helpers";
import Loading from "../common/Loading";
import "./Detail.css";
class Detail extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: {},
      error: null
    };
    this.fetchCurrency = this.fetchCurrency.bind(this);
  }
  componentDidMount() {
    const { currencyId } = this.props.match.params;
    this.fetchCurrency(currencyId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { currencyId } = nextProps.match.params;
      this.fetchCurrency(currencyId);
    }
  }
  fetchCurrency(currencyId) {
    this.setState({ loading: true });
    fetch(`${ROOT_URL}/cryptocurrencies/${currencyId}`)
      .then(responseHandler)
      .then(data => {
        this.setState({ loading: false, data, error: null });
      })
      .catch(error => {
        this.setState({ loading: false, error: error.errorMessage });
      });
  }
  render() {
    const { loading, data, error } = this.state;
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
      <div className="Detail">
        <h1 className="Detail-heading">
          {data.name} ({data.symbol})
        </h1>

        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {data.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{data.rank}</span>
          </div>
          <div className="Detail-item">
            24H Change
            <span className="Detail-value">
              {onPercentChange(data.percentChange24h)}
            </span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {data.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {data.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>
            {data.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}
export default Detail;
