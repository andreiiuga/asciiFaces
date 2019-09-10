import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import { Loader } from '../../components/loader';
import { ProductCard } from '../../components/productCard';
import { AdCard } from '../../components/adCard';
import { PageHeader } from '../../components/pageHeader';

import { fetchProducts, fetchNextProducts } from '../../actions/products';

import './style.css';


/**
 * <ProductPageComponent />
 * Component used to encapsulate all functionalities of the page,
 * triger the redux actions and to distribute store date to other Components
 *
 * @return {JSXElement}
 */
export class ProductPageComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      loadedPages: 2,
      sortBy: null
    }

    this.sortItems = this.sortItems.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
  }

  componentDidMount() {
    const { getProducts, getNextProducts } = this.props;
    getProducts();
    getNextProducts(2);

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        this.checkScroll();
      });
    });
  }

  sortItems(sortBy) {
    const { getProducts, getNextProducts } = this.props;
    const sortProductsBy = sortBy === 'null' ? null : sortBy;

    getProducts(sortProductsBy);
    getNextProducts(2,sortProductsBy);

    this.setState({
      loadedPages: 2,
      sortBy: sortProductsBy
    })
  }

  checkScroll() {
    const { loading, error, finished } = this.props.products;
    const { getNextProducts } = this.props;
    const { loadedPages, sortBy } = this.state;

    if($(window).scrollTop() + $(window).height() > $(document).height() - 400 && !loading && !error && !finished) {
       this.setState({
        loadedPages: loadedPages + 1
       }, () => getNextProducts(loadedPages + 1, sortBy));
    }
  }

  renderCards() {
    const { displayedItems } = this.props.products;
    let cards = [];

    for(let i = 0 ; i < displayedItems.length; i++) {
      cards.push(
        <Col xs="12" sm="12" md="6" lg="4" xl="4" key={i}>
          <ProductCard
            {...displayedItems[i]}
          />
        </Col>
      )

      if( i > 0 && i % 20 === 0 ) {
        let adId = Math.floor(Math.random()*1000);
        const prevId = localStorage.getItem("adId");
        while ( adId === prevId ) {
          adId = Math.floor(Math.random()*1000);
        }
        localStorage.setItem("adId", adId);

        cards.push(
          <Col xs="12" sm="12" md="6" lg="4" xl="4" key={i+1000}>
            <AdCard
              adId={adId}
            />
          </Col>
        );
      }
    }

    return (
      <Row>
        {cards}
      </Row>
    )
  }

  render() {
    const { loading, finished } = this.props.products;

    return (
      <div className="productsPage">
        <PageHeader sortBy={this.sortItems}/>
        <div className="pageContent">
          { this.renderCards() }
          { loading && <Loader/> }
          { finished && <h3> ~ end of catalogue ~ </h3>}
        </div>
      </div>
    );
  }
}

/**
 * Include data from store
 */
const mapStateToProps = state => ({
  products: state.products
});

/**
 * Map dispatcher to sore actions
 */
const mapDispatchToProps = dispatch => ({
  getProducts: (sortBy) => dispatch(fetchProducts(sortBy)),
  getNextProducts: (page,sortBy) => dispatch(fetchNextProducts(page,sortBy))
});

ProductPageComponent.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getNextProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

export const ProductPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPageComponent);
