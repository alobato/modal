"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _useKeyPress = _interopRequireDefault(require("@alobato/use-key-press"));

var _useLockBodyScroll = _interopRequireDefault(require("@alobato/use-lock-body-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Portal = function Portal(_ref) {
  var children = _ref.children;
  return (0, _reactDom.createPortal)(children, document.getElementById('modal-root'));
};

var Backdrop = (0, _react.forwardRef)(function (_ref2, ref) {
  var onClick = _ref2.onClick,
      _ref2$zIndex = _ref2.zIndex,
      zIndex = _ref2$zIndex === void 0 ? 1000 : _ref2$zIndex,
      style = _ref2.style;
  return _react["default"].createElement("div", {
    ref: ref,
    style: _objectSpread({
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'black',
      opacity: 0,
      zIndex: zIndex,
      outline: 'none',
      tabIndex: -1
    }, style),
    onClick: onClick
  });
});

var _default = function _default(_ref3) {
  var render = _ref3.render,
      className = _ref3.className,
      _ref3$onCloseComplete = _ref3.onCloseCompleted,
      onCloseCompleted = _ref3$onCloseComplete === void 0 ? function () {} : _ref3$onCloseComplete,
      _ref3$zIndex = _ref3.zIndex,
      zIndex = _ref3$zIndex === void 0 ? 1001 : _ref3$zIndex,
      _ref3$hasBackdrop = _ref3.hasBackdrop,
      hasBackdrop = _ref3$hasBackdrop === void 0 ? true : _ref3$hasBackdrop,
      _ref3$clickOutsideDis = _ref3.clickOutsideDisabled,
      clickOutsideDisabled = _ref3$clickOutsideDis === void 0 ? false : _ref3$clickOutsideDis,
      _ref3$backdropOpacity = _ref3.backdropOpacity,
      backdropOpacity = _ref3$backdropOpacity === void 0 ? 0.6 : _ref3$backdropOpacity,
      exitAnimation = _ref3.exitAnimation,
      enterAnimation = _ref3.enterAnimation,
      backdropStyle = _ref3.backdropStyle;
  if (hasBackdrop) (0, _useLockBodyScroll["default"])();
  var modal = (0, _react.useRef)();
  var backdrop = (0, _react.useRef)();
  var initialOpacity = 0;

  var handleExit = function handleExit() {
    if (exitAnimation) {
      exitAnimation(modal, backdrop, backdropOpacity, onCloseCompleted);
    } else {
      onCloseCompleted();
    }
  };

  (0, _react.useEffect)(function () {
    if (enterAnimation) {
      enterAnimation(modal, backdrop, backdropOpacity);
    } else {
      modal.current.style.opacity = 1;
      modal.current.style.transform = 'translateY(0)';
      backdrop.current.style.opacity = backdropOpacity;
    }
  }, [backdropOpacity, enterAnimation]);
  var escPress = (0, _useKeyPress["default"])('Escape');
  if (escPress) handleExit();
  return _react["default"].createElement(Portal, null, _react["default"].createElement("div", {
    className: className,
    ref: modal,
    tabIndex: "-1",
    style: {
      opacity: initialOpacity,
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: zIndex,
      overflow: 'hidden',
      pointerEvents: 'none',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, _react["default"].createElement("div", null, render({
    onRequestClose: handleExit
  }))), hasBackdrop && _react["default"].createElement(Backdrop, {
    style: backdropStyle,
    ref: backdrop,
    onClick: function onClick() {
      if (clickOutsideDisabled) return false;
      handleExit();
    }
  }));
};

exports["default"] = _default;
