// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import type { ComponentType as ReactComponentType } from 'react';

type Props = {
  className?: string,
  measureBeforeMount: boolean,
  style?: Object,
  breakpoints: Object,
  cols: Object,
  images: Array<Object>,
  classes: Object,
};

type State = {
  width: number,
  rowHeight: number,
  layouts: Object,
};

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
type ProviderT = (ComposedComponent: ReactComponentType<any>) => ReactComponentType<any>;
const WidthProvider: ProviderT = ComposedComponent =>
  class extends React.Component<Props, State> {
    static defaultProps = {
      measureBeforeMount: false,
    };

    static propTypes = {
      // If true, will not render children until mounted. Useful for getting the exact width before
      // rendering, to prevent any unsightly resizing.
      measureBeforeMount: PropTypes.bool,
    };

    state: State = {
      width: 1280,
      rowHeight: 150,
      layouts: {},
    };

    mounted: boolean = false;

    componentDidMount() {
      this.mounted = true;

      window.addEventListener('resize', this.onWindowResize);
      // Call to properly set the breakpoint and resize the elements.
      // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
      // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.
      this.onWindowResize();
    }

    componentWillReceiveProps(props) {
      console.log(props.images);
      if (props.images.length) {
        this.setState({
          layouts: this.generateLayouts(props.images),
        });
      }
    }

    componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('resize', this.onWindowResize);
    }

    colToInsert = cols => cols.reduce((min, val, i, arr) => (val < arr[min] ? i : min), 0);

    generateLayouts = (images) => {
      const layouts = { lg: [], sm: [], xs: [] };
      const cols = { lg: [0, 0, 0], sm: [0, 0], xs: 0 };

      for (let index = 0; index < images.length; index += 1) {
        layouts.lg[index] = {};
        layouts.lg[index].i = index.toString();
        layouts.lg[index].x = this.colToInsert(cols.lg);
        layouts.lg[index].y = cols.lg[layouts.lg[index].x];
        layouts.lg[index].w = 1;
        layouts.lg[index].h = 1 / images[index].meta.AspectRatio;
        layouts.lg[index].minH = 0;
        cols.lg[layouts.lg[index].x] += layouts.lg[index].h;

        layouts.sm[index] = {};
        layouts.sm[index].i = index.toString();
        layouts.sm[index].x = this.colToInsert(cols.sm);
        layouts.sm[index].y = cols.sm[layouts.sm[index].x];
        layouts.sm[index].w = 1;
        layouts.sm[index].h = 1 / images[index].meta.AspectRatio;
        layouts.sm[index].minH = 0;
        cols.sm[layouts.sm[index].x] += layouts.sm[index].h;

        layouts.xs[index] = {};
        layouts.xs[index].i = index.toString();
        layouts.xs[index].x = 0;
        layouts.xs[index].y = cols.xs;
        layouts.xs[index].w = 1;
        layouts.xs[index].h = 1 / images[index].meta.AspectRatio;
        layouts.xs[index].minH = 0;
        cols.xs += layouts.xs[index].h;
      }

      return layouts;
    };

    getRowHeight = (width) => {
      if (width > this.props.breakpoints.lg) return width / this.props.cols.lg;
      else if (width > this.props.breakpoints.md) return width / this.props.cols.md;
      else if (width > this.props.breakpoints.sm) return width / this.props.cols.sm;
      else if (width > this.props.breakpoints.xs) return width / this.props.cols.xs;
      return width / this.props.cols.xxs;
    };

    onWindowResize = (_event: ?Event) => {
      if (!this.mounted) return;
      const node = ReactDOM.findDOMNode(this); // Flow casts this to Text | Element
      if (node instanceof HTMLElement) {
        this.setState({
          width: node.offsetWidth,
          rowHeight: this.getRowHeight(node.offsetWidth),
        });
      }
    };

    render() {
      if (
        (this.props.measureBeforeMount && !this.mounted) ||
        Object.keys(this.state.layouts).length === 0
      ) {
        return <div className={this.props.className} style={this.props.style} />;
      }

      return (
        <ComposedComponent {...this.props} {...this.state}>
          {this.props.images.map((image, i) => (
            <div className={this.props.classes.item} key={i}>
              <img className={this.props.classes.image} src={image.link()} alt={image.name} />
            </div>
          ))}
        </ComposedComponent>
      );
    }
  };

export default WidthProvider;
