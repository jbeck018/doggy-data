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

const BasicInfo = ({hidden, onClick, onChange, dates}) => {
    const styles = style();
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null)

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
                    <TextField 
                        id="weight"
                        label="WEIGHT" 
                        type="weight"
                        name="weight"
                        onChange={event => {
                            onChange(event, event.target.value, 'weight');
                        }}
                        required={true}
                    />
            </div>
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
    )
}

export default BasicInfo;

const style = makeStyles({
    container: {
        width: '90%',
        margin: '0 auto',
    },
    inputs: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifySelf: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
    },
    info: {
        color: Colors.lightText,
        paddingTop: 38,
        paddingBottom: 38,
        size: 35,
    },
    smallName: {
        color: Colors.lightText,
        textAlign: 'center',
        size: 16,
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
        position: 'relative',
        bottom: 100,
        left: '38%'
    },
    date:{
        paddingBottom: 19,
        color: Colors.gray,
    },
    stacked: {
        display: 'flex',
        flexDirection: 'row'
    }
})