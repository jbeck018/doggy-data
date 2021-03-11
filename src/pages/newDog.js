import { useState } from "react";
import { supabase } from "../utils/api";
import BasicInfo from '../components/basicInfo';
import Profile from '../components/profile';
import BehaviorDietary from '../components/behaviorDietary';
import { makeStyles } from '@material-ui/core/styles';
import { parse as uuidParse } from 'uuid';

const NewDog = ({user}) => {
    const styles = style();
    const [count, setCount] = useState(0);
    const [dog, setDog] = useState({
        user: user.id,
        name: '',
        breed: '',
        birthdate: ''
    });
    const [details, setDetails] = useState({
        date: '',
        weight: 0,
        behavioral: '',
        appetite: 0,
        water: 0,
        restroom: 0
    });

    const handleDogChange = (event, value, state) => {
        event.preventDefault()
        // console.log(event.target.value)
        setDog({
            ...dog,
            state: value
        })
    }

    const handleDetailsChange = (event, value, state) => {
        event.preventDefault()
        setDetails({
            ...details,
            state: value
        })
    }

    const handleClick = () => {
        setCount(count + 1)
    }

    return(
        <div className={styles.view} >
            <Profile 
                hidden={count === 0 ? false : true} 
                onClick={handleClick}
                onChange={handleDogChange}
                dates={dates}
            />
            <BasicInfo 
                hidden={count === 1 ? false : true} 
                onClick={handleClick}
                onChange={handleDetailsChange}
                dates={dates}
            />
            <BehaviorDietary 
                hidden={count === 2 ? false : true} 
                onClick={null}
                onChange={handleDetailsChange}
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