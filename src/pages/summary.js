// This handles logging in/signing up for Supabase.io
import { useState, useEffect} from 'react';
import { supabase } from "../utils/api";
import { Container, 
         Button, 
         Card, 
         CardHeader,
         CardContent,
         Typography,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import Colors from '../app/colors';
import dayjs from 'dayjs';
dayjs().format();
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

const Summary = ({user, windowSize}) => {
    const { dog } = useParams();
    const history = useHistory();
    const [details, setDetails] = useState([]);


    //Styles:
    const style = makeStyles({
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
        main: {
            display: 'flex',
            alignContent: 'center',
            width: '100%'
        },
        name: {
            width: 270,
        },
        card: {
            width: 300,
            height: 180,
            margin: 15,
        },
        title: {
            paddingBottom: 5,
        },
        subhead: {
            paddingBottom: 20,
        },
        buttonDiv: {
            flexBasis: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        button: {
            backgroundColor: Colors.dark,
            color: Colors.primary,
            heigth: '56px',
            marginTop: 10,
            width: 150
        }
    })
    const styles = style();
    
    //supabase call to get Details Array from DB
    const getDetails = async (dog) => {
        let { data: dogDetails, error } = await supabase
            .from('dog-details')
            .select('*')
            .eq('dog', dog);
        if (error) console.log("error", error);
        else {
            const newDogDetails = Object.values(dogDetails).sort((a,b) => {
                return dayjs(b.date, "YYYY-MM-DD") - dayjs(a.date, "YYYY-MM-DD")
            });
            setDetails(newDogDetails);
        }
    };

    useEffect(() => {
        if (details.length === 0) getDetails(dog);
    }, [dog, details]);

    console.log(details)
    return (
        <div className={styles.home}>
            <Container maxWidth="lg" className={styles.summary}> 
                <div className={styles.buttonDiv}>
                    <Button
                        onClick={() => history.goBack()}
                        className={styles.button}
                    >
                        Go Back
                    </Button>
                </div>
                {
                    Object.values(details).length > 0 ? (
                        <>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="WEIGHT"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].weight} ({details[0].weight - details[1].weight})
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="LATEST BEHAVIOR"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].behavioral}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="APPETITE"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].appetite} ({details[0].appetite - details[1].appetite})
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="WATER"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].water} ({details[0].water - details[1].water})
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="RESTROOM"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].restroom} ({details[0].restroom - details[1].restroom})
                                    </Typography>
                                </CardContent>
                            </Card>
                        </>
                    ):(
                        <h2>Loading...</h2>
                    )
                }
            </Container>
        </div>
    );
};

export default Summary;

