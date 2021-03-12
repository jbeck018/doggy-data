import {useState} from 'react';
import { Typography } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Colors from '../app/colors';
import dayjs from 'dayjs';

dayjs().format();
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

const Profile = ({hidden, onClick, onChange, dates, windowSize}) => {
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null)
    const [name, setName] = useState('Name');
    const [breed, setBreed] = useState('Breed');
    const [age, setAge] = useState('Age')

    //Styles:
    const style = makeStyles({
        container: {
            width: '90%',
            margin: '0 auto',
        },
        inputs: {
            display: 'flex',
            paddingTop: 155,
            width: windowSize.width < 876 ? '87.5%' : '100%',
            alignSelf: 'center',
            justifySelf: 'center',
            alignContent: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            paddingBottom: windowSize.width < 876 ? 100:0,
        },
        title: {
            color: Colors.lightText,
            paddingBottom: windowSize.width < 876 ? 40:60,
            fontSize: 35,
            alignSelf: 'flexStart'
        },
        smallName: {
            color: Colors.lightText,
            textAlign: 'center',
            fontSize: 20,
            paddingBottom: 16
        },
        smallNameUpper: {
            color: Colors.lightText,
            textAlign: 'center',
            fontSize: 24,
            textTransform: 'uppercase',
            paddingBottom: 16,
            paddingTop: 49
        },
        hide: {
            display: 'none'
        },
        button: {
            backgroundColor: Colors.dark,
            color: Colors.primary,
            heigth: 56,
            width: 180,
            flexDirection: 'row',
            marginTop: windowSize.width < 876 ? 50 : 25
        },
        textField: {
            color: Colors.primary,
            paddingBottom: windowSize.width < 876 ? 40:80,
            width: windowSize.width ? '100%' : 520
        },
        textFieldRoot: {
            color: Colors.gray,
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: windowSize.width < 876 ? '100%':'70%'
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            width: windowSize.width < 876 ? '100%':'30%',
            marginTop: windowSize.width < 876 ? 40:0,
        },
        centered: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
        },
        birthdate:{
            paddingBottom: 19,
            color: Colors.gray,
        },
        selectRoot: {
            color: Colors.dark,
            border: 'none',
        },
        selectLabel: {
            color: Colors.dark
        },
        stacked: {
            display: 'flex',
            flexDirection: windowSize.width < 600 ? 'column' : 'row',
            marginBottom: windowSize.width < 600 ? 0 : 50,
        },
        month: {
            width: windowSize.width < 600 ? '100%' : 151,
            height: windowSize.width < 600 ? 10 : 30,
            marginBottom: windowSize.width < 600 ? 60 : 0,
        },
        select: {
            width: windowSize.width < 600 ? '100%' :  134,
            height: windowSize.width < 600 ? 10 : 30,
            marginLeft: windowSize.width < 600 ? 0 : 8,
            marginBottom: windowSize.width < 600 ? 60 : 0,
        },
    })

    const styles = style();

    //Range function for gettings years (since we don't need 100 years for possible dogs)
    //Note these return strings since the autocomplete & dayjs both req str
    const range = (start,end) => {
        return Array(end - start + 1).fill().map((_, idx) => String(start + idx))
    }

    //These are lists for the autocomplete boxes:
    const days = range(1, month ? dates.filter(item => item.month === month)[0].days : 31);
    const years = range(dayjs().year() - 25, dayjs().year());

    //handle for creating birthday datetime object
    const createBirthDate = (year) => {
        const date = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY')
        return date
    }

    //handler for calculating age of dog
    const getAge = (value) => {
        if (day && month) {
            const now=dayjs();
            const ageInYears = now.diff(createBirthDate(value), 'year')
            if (ageInYears === 1){
                setAge('1 year old')
            }else if (ageInYears > 1) {
                setAge(`${ageInYears} years old`) 
            }else{
                const ageInMonths = now.diff(createBirthDate(value), 'month')
                setAge(`${ageInMonths} months old`);
            }
        }
    }

    return(
        <div className={hidden ? styles.hide : styles.container}>
            <div className={styles.inputs}>
                <div className={styles.left}>
                    <div className={styles.centered}>
                        <Typography variant="h4" className={styles.title}>
                            Your Doggy Profile
                        </Typography>
                        <TextField 
                            id="name"
                            label="NAME" 
                            type="name"
                            name="name"
                            className={styles.textField}
                            onChange={event => {
                                onChange(event, event.target.value, 'name');
                                setName(event.target.value);
                            }}
                            required={true}
                        />
                        <TextField 
                            id="breed"
                            label="BREED" 
                            type="breed"
                            name="breed"
                            className={styles.textField}
                            onChange={event => {
                                onChange(event, event.target.value, 'breed');
                                setBreed(event.target.value)
                            }}
                            required={true}
                        />
                        <Typography variant="body1" className={styles.birthdate}>
                            BIRTHDATE
                        </Typography>
                        <div className={styles.stacked}>
                            <Autocomplete 
                                id="month"
                                options={dates.filter(item => item.days >= day)}
                                getOptionLabel={(option) => option.month}
                                classes={{root: styles.selectRoot, endAdornment: styles.selectLabel}}
                                className={styles.month}
                                onChange={(event,value) => {value?.month ? setMonth(value.month) : setMonth(null)}}
                                renderInput={(params) => <TextField {...params} label="MONTH" variant="outlined" />}
                            />
                            <Autocomplete 
                                id="day"
                                options={days}
                                getOptionLabel={(option) => option}
                                classes={{root: styles.selectRoot, inputRoot: styles.selectLabel}}
                                className={styles.select}
                                onChange={(event, value) => setDay(value)}
                                renderInput={(params) => <TextField {...params} label="DAY" variant="outlined" />}
                            />
                            <Autocomplete 
                                id="year"
                                options={years}
                                getOptionLabel={(option) => option}
                                classes={{root: styles.selectRoot, inputRoot: styles.selectLabel}}
                                className={styles.select}
                                onChange={(event, value) => {
                                    onChange(event, createBirthDate(year), 'birthdate');
                                    setYear(value);
                                    getAge(value);
                                }}
                                renderInput={(params) => <TextField {...params} label="YEAR" variant="outlined" />}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <DogPlaceHolder 
                        diameter={202}
                        svgTop={49}
                        svgLeft={41}
                        svgHeight={104.89}
                        svgWidth={119.96}
                    />
                    <Typography variant="body2" className={styles.smallNameUpper}>
                        {name}
                    </Typography>
                    <Typography variant="body2" className={styles.smallName}>
                        {breed}
                    </Typography>
                    <Typography variant="body2" className={styles.smallName}>
                        {age}
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    size="large"
                    className={styles.button}
                    onClick={(event) => {
                        onClick()
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Profile;