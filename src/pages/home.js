import { useEffect, useState, useRef } from "react";
// import { supabase } from "../utils/api";
import ResetPassword from "../components/resetPassword";
import { Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Home = ({ user }) => {
    const [recoveryToken, setRecoveryToken] = useState(null);
    // const [todos, setTodos] = useState([]);
    // const newTaskTextRef = useRef();
    const [errorText, setError] = useState("");

    useEffect(() => {
        /* Recovery url is of the form
         * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
         * Read more on https://supabase.io/docs/client/reset-password-email#notes
         */
        let url = window.location.hash;
        let query = url.substr(1);
        let result = {};

        query.split("&").forEach((part) => {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });

        if (result.type === "recovery") {
            setRecoveryToken(result.access_token);
        }

        // fetchTodos().catch(console.error);
    }, []);

    // const fetchTodos = async () => {
    //     let { data: todos, error } = await supabase
    //         .from("todos")
    //         .select("*")
    //         .order("id", { ascending: false });
    //     if (error) console.log("error", error);
    //     else setTodos(todos);
    // };

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

    return recoveryToken ? (
        <ResetPassword
            token={recoveryToken}
            setRecoveryToken={setRecoveryToken}
        />
    ) : (
        <div>
            <Container maxWidth="lg">
                {/* <div>
                    {todos.length ? (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={() => deleteTodo(todo.id)}
                            />
                        ))
                    ) : (
                        <span
                            className={
                                "h-full flex justify-center items-center"
                            }
                        >
                            You do have any tasks yet!
                        </span>
                    )}
                </div> */}
                {!!errorText && (
                    <Alert severity="error" variant="filled">
                        {errorText}
                    </Alert>
                )}
                <h1>Hello World!</h1>
            </Container>
            {/* Add Dog button will go here */}
        </div>
    );
};

export default Home;