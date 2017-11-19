import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import AccountsUIWrapper from '../components/AccountsUIWrapper';

const styles = theme => ({
  appBar: {
    backgroundColor: theme.palette.grey[900],
    marginBottom: theme.spacing.unit * 3,
  },
});

const enhance = compose(
  withStyles(styles),
  withState('state', 'setState', { anchorEl: null, open: false }),
);

const AppNavigation = ({ classes = props, state, setState }) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Grid container justify="center">
        <Hidden mdUp>
          <IconButton color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <IconButton>
          <Link to="/">
            <i className="lm-logo lg" />
          </Link>
        </IconButton>
        <Button color="contrast">My Photos</Button>
        <AccountsUIWrapper />
        <Button
          aria-owns={state.open ? 'language-menu' : null}
          aria-haspopup="true"
          onClick={e => setState({ open: true, anchorEl: e.currentTarget })}
        >
          Languages
        </Button>
        <Menu
          id="language-menu"
          anchorEl={state.anchorEl}
          open={state.open}
          onRequestClose={() => setState({ open: false })}
        >
          <MenuItem onClick={() => setState({ open: false })}>English</MenuItem>
          <MenuItem onClick={() => setState({ open: false })}>中文</MenuItem>
        </Menu>
      </Grid>
    </Toolbar>
  </AppBar>
);

AppNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default enhance(AppNavigation);
