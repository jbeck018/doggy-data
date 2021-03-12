// This handles logging in/signing up for Supabase.io
import { useState } from "react";
import { supabase } from "../utils/api";
import { Container, 
         TextField, 
         Button, 
         Typography, 
         Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../app/colors';

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const styles = style();

    const handleLogin = async (type) => {
        const { user, error } =
            type === "LOGIN"
                ? await supabase.auth.signIn({ email, password })
                : await supabase.auth.signUp({ email, password });

        if (error) {
            setHelperText({ error: true, text: error.message });
        } else if (!user && !error) {
            setHelperText({
                error: false,
                text: "An email has been sent to you for verification!",
            });
        }
    };

    const forgotPassword = async (e) => {
        // Read more on https://supabase.io/docs/client/reset-password-email#notes
        e.preventDefault();
        const email = prompt("Please enter your email:");

        if (email === null || email === "") {
            setHelperText({ error: true, text: "You must enter your email." });
        } else {
            let { error } = await supabase.auth.api.resetPasswordForEmail(
                email
            );
            if (error) {
                console.error("Error: ", error.message);
            } else {
                setHelperText({
                    error: false,
                    text: "Password recovery email has been sent.",
                });
            }
        }
    };

    return (
        <Container maxWidth="lg" className={styles.main}>
            <Typography variant="h3" className={styles.title}>
                {showLogin ? 'Login' : 'Sign Up'}
            </Typography>
            <Typography variant="body2" className={styles.subhead}>
                { showLogin ? <>Need to create an account? <Link href='#' onClick={() => setShowLogin(false)}>Sign up here</Link></> : 
                <>Already have an account? <Link href='#' onClick={() => setShowLogin(true)}>Login here.</Link></>
                
                }
            </Typography>
            <TextField 
                id="email"
                label="Email" 
                type="email"
                name="email"
                onChange={event => setEmail(event.target.value)}
                required={true}
            />
            <TextField 
                id="password"
                label="Password" 
                type="password"
                name="password"
                onChange={event => setPassword(event.target.value)}
                required={true}
            />
            <Typography variant="body2" gutterBottom>
                <Link href="#" onClick={forgotPassword}>
                    Forgot Password?
                </Link>
            </Typography>
            {!!helperText.text && (
                <Alert
                    severity={helperText.error ? "error" : "success"}
                    variant="filled"
                >
                    {helperText.text}
                </Alert>
            )}
            <div>
                {showLogin ? (
                    <Button
                        onClick={() => handleLogin("LOGIN")}
                        type="button"
                        variant="contained"
                        size="large"
                        className={styles.button}
                    >
                        Sign In
                    </Button> ) : (
                    <Button
                        type="submit"
                        onClick={() =>
                            handleLogin("REGISTER").catch(console.error)
                        }
                        variant="contained"
                        size="large"
                        className={styles.button}
                    >
                        Sign Up
                    </Button>)
                }
            </div>
        </Container>
    );
};

export default Auth;

const style = makeStyles({
    main: {
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        flexDirection: 'column',
        width: 500,
    },
    title: {
        paddingBottom: 5,
    },
    subhead: {
        paddingBottom: 20,
    },
    button: {
        backgroundColor: Colors.dark,
        color: Colors.primary,
        float: 'right',
        heigth: '56px',
        marginTop: 10,
    }
})