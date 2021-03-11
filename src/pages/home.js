import { useEffect } from "react";
// import { supabase } from "../utils/api";
// import ResetPassword from "../components/resetPassword";
import { Container, Typography, Button } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../app/colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDogs, dogsArray } from '../app/dogsSlice';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
    // const [todos, setTodos] = useState([]);
    // const newTaskTextRef = useRef();
    const styles=style();
    const dispatch = useDispatch()
    const dogs = useSelector(dogsArray)

    useEffect(() => {
        dispatch(fetchDogs(user));
        // fetchTodos().catch(console.error);
    }, [dispatch, user]);

    return (
        <div className={styles.home}>
            <Container maxWidth="lg" className={styles.summary}> 
                {dogs.length === 0 ? (
                    <Link
                        to={`/new-dog`}
                        className={styles.link}
                    >
                        <DogPlaceHolder 
                            diameter={202}
                            svgTop={49}
                            svgLeft={41}
                            svgHeight={104.89}
                            svgWidth={119.96}
                        />
                        <Typography variant="h4" className={styles.text}>
                            We're excited to meet Fido!
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            className={styles.button}
                        >
                            Start Logging
                        </Button>
                    </Link>
                ) : (
                    <h2>Things will go here</h2>
                )}
            </Container>
            {/* Add Dog button will go here */}
        </div>
    );
};

export default Home;

const style=makeStyles({
    home: {
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        flexDirection: 'column',
        width: 500,
    },
    summary: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        flexDirection: 'column',
    },
    text: {
        textAlign: 'center',
        color: Colors.lightText,
        paddingTop: 38,
        paddingBottom: 38
    },
    button: {
        backgroundColor: Colors.dark,
        color: Colors.primary,
        heigth: 56,
        width: 180,
        alignSelf: 'center',
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
    },
})