import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Row, Col
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faSpinner, faPlusCircle, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../../components/loader';
import { ProductCard } from '../../components/productCard';
import { AdCard } from '../../components/adCard';

import './style.css';

import {
  fetchProducts, fetchNextProducts
} from '../../actions/products';

import $ from 'jquery';

export class ProductPageComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      loadedPages: 2,
      lastAddId: null
    }

    this.renderRows = this.renderRows.bind(this);
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

  checkScroll() {
    const { loading, error } = this.props.products;
    const { getNextProducts } = this.props;
    const { loadedPages, loadedAds } = this.state;

    if($(window).scrollTop() + $(window).height() > $(document).height() - 400 && !loading && !error) {
       this.setState({
        loadedPages: loadedPages + 1
       }, () => getNextProducts(loadedPages + 1));
    }
  }

  renderRows() {
    const { displayedItems } = this.props.products;
    const { lastAddId } = this.state;
    let cards = [];

    for(let i = 0 ; i < displayedItems.length; i++) {
      cards.push(
        <Col md={4} lg={4} key={i}>
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
          <Col md={4} lg={4} key={i+1000}>
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
    const { displayedItems, loading, error } = this.props.products;

    return (
      <div>
        { this.renderRows() }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getNextProducts: (page) => dispatch(fetchNextProducts(page))
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
