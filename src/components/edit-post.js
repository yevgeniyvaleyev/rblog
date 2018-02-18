import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import {Row, Col} from 'react-flexbox-grid'
import { capitalize } from '../utils/text-formaters';

const validFields = ['title', 'body', 'category'];

export class EditPost extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      title: props.title || '',
      category: props.category || '',
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
    return !this.state.title || !this.state.body;
  }

  render () {
    return (
      <div>
      <Row>
          <Col md={6}>
            <TextField
              fullWidth={true}
              value={this.state.title}
              floatingLabelText="Title"
              onChange={(event) => this.handleChange('title', event.target.value)}
            />
          </Col>
          <Col md={6}>
            <SelectField 
              fullWidth={true}
              floatingLabelText="Category"
              value={this.state.category} 
              onChange={(event, index, value) => this.handleChange('category', value)}>
                {this.props.categories.map((category, index) => (
                  <MenuItem 
                    key={index}
                    value={category.name} 
                    primaryText={capitalize(category.name)} />
                ))}
            </SelectField>
          </Col>
      </Row>
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
      </div>
    )
  }
}

EditPost.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
  category: PropTypes.string,
  body: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};