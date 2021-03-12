import { useState } from "react";
import { supabase } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import BasicInfo from '../components/basicInfo';
import BehaviorDietary from '../components/behaviorDietary';
import { makeStyles } from '@material-ui/core/styles';

const NewDetails = ({user, windowSize}) => {
    const styles = style();
    const history = useHistory();
    const {dog} = useParams();
    const [count, setCount] = useState(1);
    const [details, setDetails] = useState({
        date: '',
        weight: 0,
        behavioral: '',
        appetite: 3,
        water: 3,
        restroom: 3
    });

    const handleDetailsChange = (event, value, state) => {
        event.preventDefault()
        setDetails({
            ...details,
            [state]: value
        })
    }

    const handleClick = () => {
        setCount(count + 1)
    }

    const addDetailsToDB = async(event) => {
        event.preventDefault();
        console.log( dog )
        const { data, error } = await supabase
            .from('dog-details')
            .insert([{...details, dog: dog}])
        if (error) console.log("error", error);
        else {
            console.log(data);
            history.push('/');
        }
    }

    return(
        <div className={styles.view} >
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

export default NewDetails;

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