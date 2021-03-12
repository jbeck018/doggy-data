import { Container, Typography, Button } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../app/colors';
import { Link } from 'react-router-dom';
import DogList from '../components/dogList';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";

const Home = ({ user, dogs, windowSize }) => {
    const history = useHistory();

    //Styling for the component
    const style = makeStyles((theme) => ({
        home: {
            display: 'flex',
            marginTop: 90,
            flexDirection: 'column',
            width: windowSize.width < 600? '100%' : '80%',
        },
        summary: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
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
        fabContainer: {
            width: 300,
            height: 180,
            margin: 15,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
        },
        fab: {
            marginTop: 15,
            backgroundColor: Colors.dark,
            width: windowSize.width < 600 ? 100 : 150,
            height: windowSize.width < 600 ? 100 : 150,
        },
        icon: {
            fontSize: 75,
        }
    }));

    //create the stylesheets:
    const styles=style();

    return (
        <div className={styles.home}>
            <Container maxWidth="lg" className={styles.summary}> 
                {Object.keys(dogs).length === 0 ? (
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
                    <>
                        <DogList dogs={dogs} />
                        <div className={styles.fabContainer}>
                            {Object.keys(dogs).length === 0 ? null : (
                                <Fab color="primary" 
                                    className={styles.fab}
                                    onClick={() => {history.push('/new-dog')}}
                                >
                                    <AddIcon className={styles.icon} />
                                </Fab>
                            )}
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Home;