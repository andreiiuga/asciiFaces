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
import './style.css';

import {
  fetchProducts
} from '../../actions/products';

export class ProductPageComponent extends React.Component {
  constructor() {
    super();

    this.renderRows = this.renderRows.bind(this);
  }

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  renderRows() {
    const { displayedItems } = this.props.products;
    let rows = [];

    for(let i = 0 ; i < displayedItems.length; i += 3) {
      let cols = [];

      for(let j = i ; j < i+3; j++) {
        cols.push(
          <Col md={4} lg={4} key={j}>
            <ProductCard
              {...displayedItems[j]}
            />
          </Col>
        )
      }
      rows.push(
        <Row key={i}>
          {cols}
        </Row>
      )
    }

    return rows;
  }

  render() {
    const { displayedItems, loading, error } = this.props.products;
    console.log(displayedItems, loading, error);

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
  getProducts: (page, count) => dispatch(fetchProducts(page, count))
});

ProductPageComponent.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

export const ProductPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPageComponent);
