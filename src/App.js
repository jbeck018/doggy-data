import { useState, useEffect } from "react";
import { supabase } from "./utils/api";
import Auth from "./pages/auth";
import Home from "./pages/home";
import NewDog from "./pages/newDog";
import Summary from './pages/summary';
import Header from "./components/header";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth, updateUser, userState } from './app/usersSlice';

function App() {
    const dispatch = useDispatch()
    const styles = style();
    const user = useSelector(userState);

    useEffect(() => {
        dispatch(isAuth);
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                dispatch(updateUser(currentUser ?? null));
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <Header user={user} />
            <Router>
                <Switch>
                    <Route exact path="/">
                        {!user ? <Auth /> : <Home user={user} />}
                    </Route>
                    <Route exact path="/new-dog">
                        <NewDog user={user} />
                    </Route>
                    <Route path="/summary/:dogId">
                        <Summary user={user} />
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