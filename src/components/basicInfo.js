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

const BasicInfo = ({hidden, onClick, onChange, dates, windowSize}) => {
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
    const styles = style();

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
                    Fido
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
                            setYear(value);
                        }}
                        renderInput={(params) => <TextField {...params} label="YEAR" variant="outlined" />}
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

