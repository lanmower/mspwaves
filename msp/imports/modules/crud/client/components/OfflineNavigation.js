// @flow weak

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';


const options = [
];

class Navigation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  render() {
    const { match, location, history } = this.props
const { anchorEl } = this.state;

    return (
      <div>
        <IconButton className="raised" color="primary" style={{color:"white"}} aria-label="Menu" onClick={this.handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option.name}
              disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option.title}
            </MenuItem>
          ))}
          <MenuItem onClick={()=>{Meteor.logout()}}>Sign out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navigation);
