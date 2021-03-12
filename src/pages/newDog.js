import { useState } from "react";
import { supabase } from "../utils/api";
import { useHistory } from "react-router-dom";
import BasicInfo from '../components/basicInfo';
import Profile from '../components/profile';
import BehaviorDietary from '../components/behaviorDietary';
import { makeStyles } from '@material-ui/core/styles';

import dayjs from 'dayjs';

dayjs().format();
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

const NewDog = ({user, windowSize, fetchDogs}) => {
    const styles = style();
    const history = useHistory();
    const [count, setCount] = useState(0);
    const [submitDogReturn, setSubmitDogReturn] = useState('');
    const [dog, setDog] = useState({
        name: '',
        breed: '',
        birthdate: ''
    });
    const [birthday, setBirthday] = useState({
        month: '',
        day: '',
        year: ''
    })
    const [details, setDetails] = useState({
        date: '',
        weight: 0,
        behavioral: '',
        appetite: 3,
        water: 3,
        restroom: 3
    });

    const handleDogChange = (event, value, state) => {
        event.preventDefault()
        // console.log(value);
        setDog({
            ...dog,
            [state]: value
        })
    }

    const handleDetailsChange = (event, value, state) => {
        event.preventDefault()
        setDetails({
            ...details,
            [state]: value
        })
    }

    const handleBirthdayChange = (event, value, state) => {
        event.preventDefault();
        setBirthday({
            ...birthday,
            [state]: value,
        })
    }

    const handleClick = () => {
        setCount(count + 1)
    }

    //handle for creating birthday datetime object
    const createBirthDate = () => {
        const date = dayjs(`${birthday.month} ${birthday.day}, ${birthday.year}`, 'MMMM D, YYYY')
        return date
    };

    const addDogToDB = async () => {
        const { data: newDog, error } = await supabase
            .from('dogs')
            .insert([{...dog, user: user.id, birthdate: createBirthDate()}])
        if (error) console.log("error", error);
        else { 
            setSubmitDogReturn(newDog);
            handleClick(); 
            fetchDogs();
        };
    }

    const addDetailsToDB = async(event) => {
        event.preventDefault();
        const { data: response, error } = await supabase
            .from('dog-details')
            .insert([{...details, dog: submitDogReturn[0].id}])
        if (error) console.log("error", error);
        else {
            console.log(response);
            history.push('/')
        }
    }

    return(
        <div className={styles.view} >
            <Profile 
                hidden={count === 0 ? false : true} 
                onClick={addDogToDB}
                onChange={handleDogChange}
                onBirthdayChange={handleBirthdayChange}
                dates={dates}
                windowSize={windowSize}
            />
            <BasicInfo 
                hidden={count === 1 ? false : true} 
                onClick={handleClick}
                onChange={handleDetailsChange}
                dates={dates}
                windowSize={windowSize}
            />
            <BehaviorDietary 
                hidden={count === 2 ? false : true} 
                onClick={addDetailsToDB}
                onChange={handleDetailsChange}
                windowSize={windowSize}
            />
        </div>
    )
}

export default NewDog;

const style = makeStyles({
    view: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    }
})

const dates = [
    {'month': 'January', 'days': 31},
    {'month': 'February', 'days': 29},
    {'month': 'March', 'days': 31},
    {'month': 'April', 'days': 30},
    {'month': 'May', 'days': 31},
    {'month': 'June', 'days': 30},
    {'month': 'July', 'days': 31},
    {'month': 'August', 'days': 31},
    {'month': 'September', 'days': 30},
    {'month': 'October', 'days': 31},
    {'month': 'November', 'days': 30},
    {'month': 'December', 'days': 31},
]