import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from "../utils/api";
import { parse as uuidParse } from 'uuid';

//supabase call to get Dogs Array from DB
export const fetchDogs = createAsyncThunk( 'getDogs', async (user) => {
    console.log(user.id)
    let { data: dogs, error } = await supabase
        .from('dogs')
        .select('*')
        .is('user', uuidParse(user.id));
    console.log(`Dogs: ${dogs}`);
    if (error) console.log("error", error);
    else return dogs ? dogs : [];
});

const dogsSlice = createSlice({
    name: 'dogs',
    initialState: {
        dogs: [],
        status: 'idle'
    },
    reducers: {
        getDogs: (state, action) => {
                const dogs = fetchDogs(action.payload)
                state.dogs = dogs
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchDogs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDogs.fulfilled, (state, action) => {
                const newDogs = []
                action.payload.forEach(dog => {
                    newDogs[dog.id] = dog
            })
                state.dogs = newDogs
                state.status = 'idle'
            })
    }
})

export const { getDogs } = dogsSlice.actions;
export default dogsSlice.reducer;

export const dogsArray = state => state.dogs.dogs


// const deleteTodo = async (id) => {
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
