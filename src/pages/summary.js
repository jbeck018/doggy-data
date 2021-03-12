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
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
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
        },
        change: {
            fontSize: 20,
            color: Colors.secondary
        },
        changeIcon: {
            fontSize: 15,
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

    //reducer for getting most common behavior
    const getWordCount = (arr) => {
        const byCount = arr.reduce((prev, nxt) => {
          prev[nxt.behavioral] = (prev[nxt.behavioral] + 1) || 1;
          return prev;
        }, {});

        return Object.keys(byCount).reduce(function(a, b){ return byCount[a] > byCount[b] ? a : b });
      }

    // Component for difference in weeks
    const ValueChange = (arr, value) => {
        if (arr.length > 1){
            const difference = arr[0][value] - arr[1][value];
            if (difference > 0) {
                return(
                    <span className={styles.change}>{difference}<ArrowUpward className={styles.changeIcon}/></span>
                )
            } else if (difference < 0) {
                return(
                    <span className={styles.change}>{difference}<ArrowDownward className={styles.changeIcon}/></span>
                )
            } else {
                return(
                    <span className={styles.change}>0</span>
                )
            }
        }else {
            return null
        }
    }

    useEffect(() => {
        if (details.length === 0) getDetails(dog);
    }, [dog, details]);

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
                                        {details[0].weight} {ValueChange(details, 'weight')}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="Typical Behavior"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {getWordCount(details)}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="APPETITE"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].appetite} {ValueChange(details, 'appetite')}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="WATER"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].water} {ValueChange(details, 'water')}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={styles.card}>
                                <CardHeader
                                    subheader="RESTROOM"
                                />
                                <CardContent className={styles.main}>
                                    <Typography variant="h4" align="center" className={styles.name}>
                                        {details[0].restroom} {ValueChange(details, 'restroom')}
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

