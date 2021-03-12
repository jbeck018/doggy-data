import {useState} from 'react';
import { Typography } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Button } from '@material-ui/core';
import Colors from '../app/colors';

const BehaviorDietary = ({hidden, onClick, onChange, windowSize}) => {
    const [activeButton, setActiveButton] = useState('')

    //styles: 
    const style = makeStyles({
        container: {
            width: '90%',
            margin: '0 auto',
        },
        inputs: {
            display: 'flex',
            width: windowSize.width < 600 ? '87.5' : '100%',
            alignSelf: 'center',
            justifySelf: 'center',
            alignContent: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginTop: windowSize.width < 600 ? 80 : 0,
            paddingBottom: windowSize.width < 600 ? 100: 0,
        },
        fido: {
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexBasis: '100%',
        },
        info: {
            color: Colors.lightText,
            paddingTop: 38,
            paddingBottom: 46,
            fontSize: 35,
        },
        smallName: {
            color: Colors.lightText,
            textAlign: 'center',
            fontSize: 16,
            textTransform: 'uppercase',
            paddingTop: 10,
        },
        hide: {
            display: 'none'
        },
        behaviorContainer: {
            display: 'flex',
            width: 344,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        },
        active: {
            height: 80,
            width: 80,
            backgroundColor: Colors.dark, 
            color: Colors.primary,
            lineHeight: 12,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            textAlign: 'center',
            marginBottom: 8,
            cursor: 'pointer',
            '&:hover': {
                opacity: .8
            }
        },
        behaviors: {
            height: 80,
            width: 80,
            backgroundColor: Colors.gray, 
            color: Colors.primary,
            lineHeight: 12,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            textAlign: 'center',
            marginBottom: 8,
            cursor: 'pointer',
            '&:hover': {
                opacity: .8
            }
        },
        sliderExplanation: {
            color: Colors.gray
        },
        buttonContainer: {
            display: 'flex',
            flexBasis: '100%',
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
        },
        button: {
            backgroundColor: Colors.dark,
            color: Colors.primary,
            heigth: 56,
            width: 180,
            flexDirection: 'row',
            marginTop: windowSize.width < 600 ? 50 : 100,
        },
    })
    const styles = style();

    return(
        <div className={hidden ? styles.hide : styles.container}>
            <div className={styles.inputs}>
                    <div className={styles.fido}>
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
                    <div className={styles.behaviorContainer}>
                        {behaviors.map(behavior => {
                            return(
                                <div
                                    onClick={(event) => {
                                        onChange(event, behavior, 'behavioral');
                                        setActiveButton(behavior)
                                    }}
                                    key={behavior}
                                    className={activeButton === behavior ? styles.active : styles.behaviors}    
                                >
                                    <Typography variant="body2">
                                        {behavior}
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
                    <Typography className={styles.sliderExplanation} gutterBottom>
                        Appetite
                    </Typography>
                    <Slider 
                        defaultValue={3}
                        aria-labelledby="discrete-slider"
                        step={1}
                        marks
                        min={0}
                        max={6}
                        onChange={(event, value) => onChange(event, value, 'appetite')}
                    />
                    <Typography className={styles.sliderExplanation} gutterBottom>
                        Water
                    </Typography>
                    <Slider 
                        defaultValue={3}
                        aria-labelledby="discrete-slider"
                        step={1}
                        marks
                        min={0}
                        max={6}
                        onChange={(event, value) => onChange(event, value, 'water')}
                    />
                    <Typography className={styles.sliderExplanation} gutterBottom>
                        Restroom
                    </Typography>
                    <Slider 
                        defaultValue={3}
                        aria-labelledby="discrete-slider"
                        step={1}
                        marks
                        min={0}
                        max={6}
                        onChange={(event, value) => onChange(event, value, 'restroom')}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        size="large"
                        className={styles.button}
                        onClick={(event) => onClick(event)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BehaviorDietary;

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