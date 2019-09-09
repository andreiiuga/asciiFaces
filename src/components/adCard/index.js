import React from 'react';
import { Card, CardText, CardBody, CardImg } from 'reactstrap';

export class AdCard extends React.Component {

  render() {
    const { adId } = this.props;

    return (
      <div>
        <Card>
          <CardImg top height="100%" src={'/ads/?r=' + adId} alt="This is an ad" />
          <CardBody>
            <CardText>
              <small className="text-muted">This is an ad</small>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
