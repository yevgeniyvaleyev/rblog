import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton } from 'material-ui';
import {Row, Col} from 'react-flexbox-grid'

const validFields = ['title', 'body', 'category'];

export class EditComment extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      body: props.body || ''
    };
  }

  handleChange = (type, value) => {
    if (!validFields.includes(type)) {
      return;
    }
    this.setState({
      [type]: value,
    });
  };

  hasInvalidFields () {
    return !this.state.body;
  }

  render () {
    return (
      <Row>
        <Col md={12}>
          <TextField
            fullWidth={true}
            multiLine={true}
            row={5}
            value={this.state.body}
            floatingLabelText="Body"
            onChange={(event) => this.handleChange('body', event.target.value)}
          />
          <RaisedButton 
            disabled={this.hasInvalidFields()}
            onClick={() => this.props.onUpdate(this.state)}>
            Save
          </RaisedButton>
          <RaisedButton 
            onClick={() => this.props.onCancel()}>
            Cancel
          </RaisedButton>
        </Col>
      </Row>
    )
  }
}

EditComment.propTypes = {
  body: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};