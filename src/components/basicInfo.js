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

const BasicInfo = ({hidden, onClick, onChange, dates, windowSize, name}) => {
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null);

    //styles:
    const style = makeStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            paddingBottom: windowSize.width < 600 ? 100 : 0,
            paddingTop: windowSize.width < 600 ? 275 : 0,
            alignSelf: 'center',
            justifySelf: 'center',
            alignContent: 'center',
        },
        inputs: {
            display: 'flex',
            flexDirection: 'column',
            width: windowSize.width < 600 ? '87.5%' : 436,
            alignSelf: 'center',
            justifySelf: 'center',
            alignContent: 'center',
            marginTop: windowSize.width < 600 ? 80 : 0,
        },
        info: {
            color: Colors.lightText,
            paddingBottom: windowSize.width < 600 ? 15 : 46,
            fontSize: 35,
        },
        smallName: {
            color: Colors.lightText,
            textAlign: 'center',
            fontSize: 16,
            paddingBottom: windowSize.width < 600 ? 15 : 53,
            textTransform: 'uppercase',
        },
        hide: {
            display: 'none'
        },
        button: {
            backgroundColor: Colors.dark,
            color: Colors.primary,
            heigth: 56,
            width: 180,
            marginTop: windowSize.width < 600 ? 50 : 100,
            alignSelf: 'center',
        },
        date:{
            paddingBottom: 19,
            color: Colors.gray,
        },
        weight:{
            paddingBottom: windowSize.width < 600 ? 8.5 : 19,
            paddingTop: 30,
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

    //handle for creating datetime object from inputs
    const createDate = (year) => {
        const date = dayjs(`${month} ${day}, ${year}`, 'MMMM D, YYYY')
        return date
    }

    //These are lists for the autocomplete boxes:
    const days = range(1, month ? dates.filter(item => item.month === month)[0].days : 31);
    const years = range(dayjs().year() - 25, dayjs().year());

    return(
        <div className={hidden ? styles.hide : styles.container}>
            <div className={styles.inputs}>
                <DogPlaceHolder 
                    diameter={88}
                    svgTop={21}
                    svgLeft={18}
                    svgHeight={45.69}
                    svgWidth={52.26}
                />
                <Typography variant="body2" className={styles.smallName}>
                    {name}
                </Typography>
                <Typography variant="h4" className={styles.info}>
                    Basic Info
                </Typography>
                <Typography variant="body1" className={styles.date}>
                    DATE
                </Typography>
                <div className={styles.stacked}>
                    <Autocomplete 
                        id="month"
                        options={dates.filter(item => item.days >= day)}
                        getOptionLabel={(option) => option.month}
                        classes={selectStyles}
                        className={styles.month}
                        onChange={(event,value) => {value?.month ? setMonth(value.month) : setMonth(null)}}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                    <Autocomplete 
                        id="day"
                        options={days}
                        getOptionLabel={(option) => option}
                        classes={selectStyles}
                        className={styles.select}
                        onChange={(event, value) => setDay(value)}
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
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </div>
                <Typography variant="body1" className={styles.weight}>
                    WEIGHT
                </Typography>
                <TextField 
                    id="weight"
                    label="" 
                    type="weight"
                    name="weight"
                    onChange={event => {
                        onChange(event, event.target.value, 'weight');
                    }}
                    required={true}
                />
                <Button
                    variant="contained"
                    size="large"
                    className={styles.button}
                    onClick={(event) => {
                        onChange(event, createDate(year), 'date');
                        onClick()
                    }}
                >
                Next
            </Button>
            </div>
        </div>
    )
}

export default BasicInfo;

