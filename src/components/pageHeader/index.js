import React from 'react';
import { Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
import './style.css';


/**
 * <PageHeader />
 * Component used to encapsulate the header content and functionality of the page
 *
 * @return {JSXElement}
 */
export class PageHeader extends React.Component {
  constructor() {
    super();

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(e) {
    const { sortBy } = this.props;
    sortBy(e.target.value);
  }

  render() {
    const { id, size, price, face, date } = this.props;

    return (
      <div className="header">
        <div className="logoContainer">
          <FontAwesomeIcon size="3x" icon={faLaugh} />
          <div className="logoFont">ASCII Faces</div>
        </div>
        <div className="sortContainer">
          <Label className="customLabel">Sort by:</Label>
          <Input type="select" onChange={this.handleSortChange}>
            <option value="null">None</option>
            <option value="price">Price</option>
            <option value="size">Size</option>
            <option value="id">Id</option>
          </Input>
        </div>
      </div>
    );
  }
}
