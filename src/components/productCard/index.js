import React from 'react';
import './style.css';
import { Card, CardText, CardBody, Button, Badge, CardTitle, CardSubtitle } from 'reactstrap';

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
            <CardText>
              <h4><Badge color="success" pill>{`$${price/100}`}</Badge></h4>
            </CardText>
            <Button color="primary">Buy</Button>
            <CardText>
              <small className="text-muted">{date}</small>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
