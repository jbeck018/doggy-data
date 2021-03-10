import { Typography } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Colors from '../app/colors';

const BasicInfo = ({hidden, onClick, onChange}) => {
    const styles = style();

    return(
        <div className={hidden ? styles.hide : styles.container}>
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
            <div>
                <Autocomplete />
                <Autocomplete />
                <Autocomplete />
            </div>
            <TextField />
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

export default BasicInfo;

const style = makeStyles({
    container: {
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        flexDirection: 'column',
        width: 436,
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
        alignSelf: 'center',
    },
})
