import { Typography } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Button } from '@material-ui/core';
import Colors from '../app/colors';

const BehaviorDietary = ({hidden, onClick, onChange}) => {
    const styles = style();

    return(
        <div className={hidden ? styles.hide : styles.container}>
            <div>
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
            </div>
            <div>
                <Typography variant="h4" className={styles.info}>
                    Behavioral
                </Typography>
                <div>
                    {behaviors.map(behavior => {
                        return(
                            <div>
                                <Typography>
                                    behavior
                                </Typography>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <Typography variant="h4" className={styles.info}>
                    Dietary & Digestional
                </Typography>
                <Typography gutterBottom>
                    Appetite
                </Typography>
                <Slider 
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    step={10}
                    marks
                    min={0}
                    max={6}
                />
                <Typography gutterBottom>
                    Water
                </Typography>
                <Slider 
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    step={10}
                    marks
                    min={0}
                    max={6}
                />
                <Typography gutterBottom>
                    Restroom
                </Typography>
                <Slider 
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    step={10}
                    marks
                    min={0}
                    max={6}
                />
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

export default BehaviorDietary;

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

const behaviors = [
    'Barking', 
    'Chewing', 
    'Aggression', 
    'Food Guarding', 
    'Howling', 
    'Nibbling', 
    'Seperation Anxiety', 
    'Whining'
]