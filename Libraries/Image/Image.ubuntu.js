/**
 * @providesModule Image
 */
'use strict';

var React = require('React');
var PropTypes = React.PropTypes;

var NativeModules = require('NativeModules');
var ImageResizeMode = require('ImageResizeMode');
var ImageStylePropTypes = require('ImageStylePropTypes');
var StyleSheetPropType = require('StyleSheetPropType');
var NativeMethodsMixin = require('NativeMethodsMixin');
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');

var requireNativeComponent = require('requireNativeComponent');
var resolveAssetSource = require('resolveAssetSource');

var {
  ImageLoader,
} = NativeModules;

var Image = React.createClass({
  propTypes: {
    style: StyleSheetPropType(ImageStylePropTypes),
    source: PropTypes.shape({uri: PropTypes.string}),
  },

  statics: {
    resizeMode: ImageResizeMode,
    prefetch(url: string) {
      return ImageLoader.prefetchImage(url);
    },
  },

  mixins: [NativeMethodsMixin],

  viewConfig: {
    uiViewClassName: 'UIView',
    validAttributes: ReactNativeViewAttributes.UIView
  },

  render: function() {
    var source = resolveAssetSource(this.props.source) || {};

    return (
      <RCTImageView
        { ...this.props }
        source={source.uri}
        >
      </RCTImageView>
    );
  }
});

var RCTImageView = requireNativeComponent('RCTImageView', Image);

module.exports = Image;
