const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _extends3 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

const _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

const _react = require('react')

const _setDisplayName = _interopRequireDefault(require('./setDisplayName'))

const _wrapDisplayName = _interopRequireDefault(require('./wrapDisplayName'))

const noop = function noop() {}

const withReducer = function withReducer(
  stateName,
  dispatchName,
  reducer,
  initialState
) {
  return function(BaseComponent) {
    const factory = (0, _react.createFactory)(BaseComponent)

    const WithReducer =
      /* #__PURE__ */
      (function(_Component) {
        ;(0, _inheritsLoose2.default)(WithReducer, _Component)

        function WithReducer() {
          let _this

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }

          _this = _Component.call(...[this].concat(args)) || this
          _this.state = {
            stateValue: _this.initializeStateValue(),
          }

          _this.dispatch = function(action, callback) {
            if (callback === void 0) {
              callback = noop
            }

            return _this.setState(
              _ref => {
                const stateValue = _ref.stateValue
                return {
                  stateValue: reducer(stateValue, action),
                }
              },
              () => callback(_this.state.stateValue)
            )
          }

          return _this
        }

        const _proto = WithReducer.prototype

        _proto.initializeStateValue = function initializeStateValue() {
          if (initialState !== undefined) {
            return typeof initialState === 'function'
              ? initialState(this.props)
              : initialState
          }

          return reducer(undefined, {
            type: '@@recompose/INIT',
          })
        }

        _proto.render = function render() {
          let _extends2

          return factory(
            (0, _extends3.default)(
              {},
              this.props,
              (
                (_extends2 = {}),
                (_extends2[stateName] = this.state.stateValue),
                (_extends2[dispatchName] = this.dispatch),
                _extends2
              )
            )
          )
        }

        return WithReducer
      })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName.default)(
        (0, _wrapDisplayName.default)(BaseComponent, 'withReducer')
      )(WithReducer)
    }

    return WithReducer
  }
}

const _default = withReducer
exports.default = _default
