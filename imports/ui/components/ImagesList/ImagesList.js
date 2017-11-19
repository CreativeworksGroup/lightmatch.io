import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Images from '../../../api/images/images';
import Image from '../Image';
import WidthProvider from './WidthProvider';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = {
  layout: {
    margin: '0 -8px',
  },
  item: {
    boxSizing: 'border-box',
    padding: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '@media (max-width: 768px)': {
    item: {
      padding: '10px 0',
    },
  },
};

const ImagesList = ({ classes, images }) => (
  <ResponsiveReactGridLayout
    className={classes.layout}
    isDraggable={false}
    isResizable={false}
    breakpoints={{
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
    }}
    cols={{
      lg: 3,
      md: 3,
      sm: 2,
      xs: 1,
      xxs: 1,
    }}
    margin={[0, 0]}
    {...{ images, classes }}
  />
);

ImagesList.propTypes = {
  images: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withTracker((props) => {
    const handle = Meteor.subscribe('files.images.all');
    return {
      currentUser: Meteor.user(),
      listLoading: !handle.ready(),
      images: Images.find().each(),
    };
  }),
);

export default enhance(ImagesList);
