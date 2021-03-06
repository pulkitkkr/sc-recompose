const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

const _setStatic = _interopRequireDefault(require('./setStatic'))

const setPropTypes = function setPropTypes(propTypes) {
  return (0, _setStatic.default)('propTypes', propTypes)
}

const _default = setPropTypes
exports.default = _default
