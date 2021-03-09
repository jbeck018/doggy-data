import { useState, useEffect } from "react";
import { supabase } from "./utils/api";
import Auth from "./components/auth";
import Home from "./pages/home";
// import store from './app/store'
// import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [user]);

    return (
        <div>
            {!user ? <Auth /> : <Home user={user} />}
        </div>
    );
}

export default App;