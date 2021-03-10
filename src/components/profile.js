import { Typography } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Colors from '../app/colors';

const Profile = ({hidden, onClick, onChange}) => {
    const styles = style();

    return(
        <div className={hidden ? styles.hide : styles.container}>
            <div>
                <Typography variant="h4" className={styles.title}>
                    Your Doggy Profile
                </Typography>
                <TextField />
                <TextField />
                <div>
                    <Autocomplete />
                    <Autocomplete />
                    <Autocomplete />
                </div>
            </div>
            <div>
                <DogPlaceHolder 
                    diameter={202}
                    svgTop={49}
                    svgLeft={41}
                    svgHeight={104.89}
                    svgWidth={119.96}
                />
                <Typography variant="body2" className={styles.smallNameUpper}>
                    Fido
                </Typography>
                />
                <Typography variant="body2" className={styles.smallName}>
                    Golden Lab
                </Typography>
                />
                <Typography variant="body2" className={styles.smallName}>
                    5 years old
                </Typography>
            </div>
            <Button
                variant="contained"
                size="large"
                className={styles.button}
                onClick={onClick}
            >
                Next
            </Button>
        </div>
    )
}

export default Profile;

const style = makeStyles({
    container: {
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        flexDirection: 'column',
        width: 436,
    },
    title: {
        color: Colors.lightText,
        paddingTop: 38,
        paddingBottom: 38,
        size: 35,
    },
    smallName: {
        color: Colors.lightText,
        textAlign: 'center',
        size: 16,
    },
    smallNameUpper: {
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
        alignSelf: 'center',
    },
})