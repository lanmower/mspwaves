import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';


class Navigation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  state = {
    anchorEl: null
  };

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, history, options) => {
    history.push(options[index].url);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { match, location, history, options } = this.props;
    const { anchorEl } = this.state;
    const url = match.path.split("/")[1];
    return (
      <div>
        <IconButton className="raised"  color="primary" style={{color:"white"}}  aria-label="Menu" onClick={this.handleClickMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => {
            console.log(url==option.url)
            return (
            <MenuItem
              key={option.url}
              selected={url==option.url}
              onClick={event => this.handleMenuItemClick(event, index, history, options)}
            >
              {option.title}
            </MenuItem>
          )})}
          <MenuItem onClick={()=>{Meteor.logout()}}>Sign out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navigation);
