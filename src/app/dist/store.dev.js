"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _usersSlice = _interopRequireDefault(require("./usersSlice"));

var _dogsSlice = _interopRequireDefault(require("./dogsSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _toolkit.configureStore)({
  reducer: {
    user: _usersSlice["default"],
    dogs: _dogsSlice["default"]
  }
}); //Layout of state needed for Gloabl use:
// User --> For authentication across the app and put/post ops. THis will also start the app in the correct state
// Dogs Array --> IF user is true, we could fetch this early on, and reolad when a new one is added.
// Dog traits will be loaded from the summary page on the Click event. This should save initial loadign time. Plus,
//if the db is indexed (it is) it should allow for fast get requests.


exports["default"] = _default;