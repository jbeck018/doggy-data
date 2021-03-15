import {useState, useEffect, useCallback} from 'react';
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

const Profile = ({hidden, onClick, onChange, onBirthdayChange, dates, windowSize}) => {
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null)
    const [name, setName] = useState('Name');
    const [breed, setBreed] = useState('Breed');
    const [age, setAge] = useState('Age')

    //Styles:
    const style = makeStyles({
        container: {
            width: windowSize.width < 876 ? '100%' : '90%',
            margin: '0 auto',
        },
        inputs: {
            display: 'flex',
            paddingTop: 155,
            width: windowSize.width < 876 ? '100%' : '87.5%',
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
    });

    //Styling for overriding MUI defaults: 
    const selectStyle = makeStyles((theme) => ({
        root: {
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
              // Default transform is "translate(14px, 20px) scale(1)""
              // This lines up the label with the initial cursor position in the input
              // after changing its padding-left.
              transform: "translate(34px, 20px) scale(1);"
            }
          },
          inputRoot: {
            color: Colors.primary,
            backgroundColor: Colors.gray,
            '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
              // Default left padding is 6px
              paddingLeft: 6
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: Colors.gray,
              borderRadius: 0
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: Colors.gray,
              borderRadius: 0
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: Colors.gray,
              borderRadius: 0
            },
            endAdornment: {
                color: Colors.primary,
            },
            "& .MuiIconButton-label .MuiSvgIcon-root": {
                color: Colors.primary
            },
            option: {
                color: Colors.primary,
            },
          }
    }))

    const styles = style();
    const selectStyles = selectStyle();

    //Range function for gettings years (since we don't need 100 years for possible dogs)
    //Note these return strings since the autocomplete & dayjs both req str
    const range = (start,end) => {
        return Array(end - start + 1).fill().map((_, idx) => String(start + idx))
    }

    //These are lists for the autocomplete boxes:
    const days = range(1, month ? dates.filter(item => item.month === month)[0].days : 31);
    const years = range(dayjs().year() - 25, dayjs().year());

    //handle for creating birthday datetime object
    const createBirthDate = useCallback(() => {
        const date = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY')
        return date
    }, [month,day,year])

    //useEffect to update the age field when dates are changed in state
    useEffect(() => {

        //handler for calculating age of dog
        const getAge = () => {
            if (day && month && year) {
                const now=dayjs();
                const ageInYears = now.diff(createBirthDate(), 'year')
                if (ageInYears === 1){
                    setAge('1 year old')
                }else if (ageInYears > 1) {
                    setAge(`${ageInYears} years old`) 
                }else{
                    const ageInMonths = now.diff(createBirthDate(), 'month')
                    setAge(`${ageInMonths} months old`);
                }
            }
        }
        
        if (month && day && year) {
            getAge();
        }
    },[createBirthDate, day, month, year])

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
                                classes={selectStyles}
                                className={styles.month}
                                onChange={(event,value) => {
                                    if (value?.month) {
                                        setMonth(value.month);
                                        onBirthdayChange(event, value.month, 'month');
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                            <Autocomplete 
                                id="day"
                                options={days}
                                getOptionLabel={(option) => option}
                                classes={selectStyles}
                                className={styles.select}
                                onChange={(event, value) => {
                                    setDay(value);
                                    onBirthdayChange(event, value, 'day');
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                            <Autocomplete 
                                id="year"
                                options={years}
                                getOptionLabel={(option) => option}
                                classes={selectStyles}
                                className={styles.select}
                                onChange={(event, value) => {
                                    setYear(value);
                                    onBirthdayChange(event, value, 'year');
                                }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                    onClick={(event) => onClick()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Profile;