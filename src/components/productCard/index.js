import React from 'react';
import './style.css';
import { Card, CardText, CardBody, Button, Badge, CardTitle, CardSubtitle } from 'reactstrap';
import { formatDate } from './dateFormater';
export class ProductCard extends React.Component {

  render() {
    const { id, size, price, face, date } = this.props;

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle><span style={{fontSize: `${size}px`}}>{face}</span></CardTitle>
          </CardBody>
          <CardBody>
            <h4>
              <CardText>
                <Badge color="success" pill>{`$${price/100}`}</Badge>
              </CardText>
            </h4>
            <Button color="primary">Buy</Button>
            <CardText>
              <small className="text-muted">Added {formatDate(date)}</small>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
