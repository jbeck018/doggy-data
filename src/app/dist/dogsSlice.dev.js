"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dogsArray = exports["default"] = exports.getDogs = exports.fetchDogs = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _api = require("../utils/api");

//supabase call to get Dogs Array from DB
var fetchDogs = (0, _toolkit.createAsyncThunk)('getDogs', function _callee(user) {
  var _ref, dogs, error;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_api.supabase.from('dogs').select('*').eq('user', user.id));

        case 2:
          _ref = _context.sent;
          dogs = _ref.data;
          error = _ref.error;

          if (!error) {
            _context.next = 9;
            break;
          }

          console.log("error", error);
          _context.next = 10;
          break;

        case 9:
          return _context.abrupt("return", dogs ? dogs : []);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.fetchDogs = fetchDogs;
var dogsSlice = (0, _toolkit.createSlice)({
  name: 'dogs',
  initialState: {
    dogs: [],
    status: 'idle'
  },
  reducers: {
    getDogs: function getDogs(state, action) {
      var dogs = fetchDogs(action.payload);
      state.dogs = dogs;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchDogs.pending, function (state, action) {
      state.status = 'loading';
    }).addCase(fetchDogs.fulfilled, function (state, action) {
      var newDogs = [];
      action.payload.forEach(function (dog) {
        newDogs[dog.id] = dog;
      });
      state.dogs = newDogs;
      state.status = 'idle';
    });
  }
});
var getDogs = dogsSlice.actions.getDogs;
exports.getDogs = getDogs;
var _default = dogsSlice.reducer;
exports["default"] = _default;

var dogsArray = function dogsArray(state) {
  return state.dogs.dogs;
}; // const deleteTodo = async (id) => {
//     try {
//         await supabase.from("todos").delete().eq("id", id);
//         setTodos(todos.filter((x) => x.id !== id));
//     } catch (error) {
//         console.log("error", error);
//     }
// };
// const addTodo = async () => {
//     let taskText = newTaskTextRef.current.value;
//     let task = taskText.trim();
//     if (task.length <= 3) {
//         setError("Task length should be more than 3!");
//     } else {
//         let { data: todo, error } = await supabase
//             .from("todos")
//             .insert({ task, user_id: user.id })
//             .single();
//         if (error) setError(error.message);
//         else {
//             setTodos([todo, ...todos]);
//             setError(null);
//             newTaskTextRef.current.value = "";
//         }
//     }
// };


exports.dogsArray = dogsArray;