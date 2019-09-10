import React from 'react';
import { Card, CardText, CardBody, CardImg } from 'reactstrap';
import './style.css';

/**
 * <AdCard />
 * Component used to render the ad in a Card
 *
 * @return {JSXElement}
 */
export function AdCard({ adId }) {
  return (
    <div>
      <Card className="adCard">
        <CardImg
          top
          className="adImmage"
          src={'/ads/?r=' + adId}
          alt="This is an ad"
        />
        <CardBody>
          <CardText>
            <small className="text-muted">This is an ad</small>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}
