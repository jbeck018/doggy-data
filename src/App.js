import { useEffect } from "react";
import { supabase } from "./utils/api";
import Auth from "./pages/auth";
import Home from "./pages/home";
import NewDog from "./pages/newDog";
import NewDetails from "./pages/newDetails";
import Summary from "./pages/summary";
import Header from "./components/header";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth, updateUser, userState } from './app/usersSlice';
import { fetchDogs, dogsArray } from './app/dogsSlice';
import useWindowSize from './utils/windowResizeHook';

function App() {
    const dispatch = useDispatch()
    const styles = style();
    const user = useSelector(userState);
    const dogs = useSelector(dogsArray)
    const windowSize = useWindowSize();

    const reFetchDogs = () => {
        console.log('getting dogs again')
        dispatch(fetchDogs(user));
    }

    useEffect(() => {
        dispatch(isAuth);
        dispatch(fetchDogs(user));
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                dispatch(updateUser(currentUser ?? null));
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [dispatch, user]);

    return (
        <div className={styles.app}>
            <Router>
                <Header user={user} />
                <Switch>
                    <Route exact path="/">
                        {!user ? <Auth windowSize={windowSize} /> : <Home user={user} dogs={dogs} windowSize={windowSize}/>}
                    </Route>
                    <Route exact path="/new-dog">
                        <NewDog user={user} windowSize={windowSize} fetchDogs={reFetchDogs}/>
                    </Route>
                    <Route path="/new-details/:dog/:name">
                        <NewDetails user={user} windowSize={windowSize} />
                    </Route>
                    <Route path="/summary/:dog">
                        <Summary user={user} windowSize={windowSize} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

const style = makeStyles({
    app: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    }
})