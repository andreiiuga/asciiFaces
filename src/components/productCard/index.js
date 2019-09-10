import React from 'react';
import { Card, CardText, CardBody, Button, Badge, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { formatDate } from './dateFormater';
import './style.css';

/**
 * <ProductCard />
 * Component used to render the product cards in the main page
 *
 * @return {JSXElement}
 */
export class ProductCard extends React.Component {

  render() {
    const { id, size, price, face, date } = this.props;

    return (
      <div>
        <Card className="prodCard">
          <CardBody className="faceContainer">
            <CardTitle><span style={{fontSize: `${size}px`}}>{face}</span></CardTitle>
          </CardBody>
          <CardBody>
            <h4>
              <CardText>
                <Badge color="success" pill>{`$${price/100}`}</Badge>
              </CardText>
            </h4>
            <Button color="primary" className="buttonClolor">
              <FontAwesomeIcon icon={faCartPlus} />
              {' '}
              Buy
            </Button>
            <CardText>
              <small className="text-muted">
                <FontAwesomeIcon className="calendarIcon" icon={faCalendarAlt}/>
                {'  Added '}{formatDate(date)}
              </small>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
