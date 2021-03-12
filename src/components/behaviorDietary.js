import {useState} from 'react';
import { Typography } from '@material-ui/core';
import DogPlaceHolder from '../components/dogPlaceHolder';
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Button } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Colors from '../app/colors';

const BehaviorDietary = ({hidden, onClick, onChange, windowSize, name}) => {
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
            marginTop: windowSize.width < 600 ? 80 : 100,
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
            color: Colors.gray,
            textTransform: 'uppercase',
            margin: '0 0 15px 28px',
            fontSize: 10,
            lineheight: 12
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
        filledCircleLeft: {
            color: Colors.lightGray,
            paddingRight: 10
        },
        filledCircleRight: {
            color: Colors.lightGray,
            paddingLeft: 10
        },
        sliderContainerWithSpace: {
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'space-between',
            marginBottom: 43,
        },
        sliderContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'space-between',
        },
        slider: {
            width: '90%',
        }
    })

        //CSS for hiding thumb in MUI Component
        const sliderStyle = makeStyles((theme) => ({
            thumb: {
                color: Colors.dark,
            }, 
            thumbSize: {
                height: 20,
                width: 20,
                marginLeft: -7,
                marginTop: 0,
            },
            rail: {
                backgroundColor: Colors.gray,
                opacity: 1,
                height: 1,
                marginTop: 1
            },
            track: {
                backgroundColor: Colors.gray,
                opacity: 1,
                height: 1,
                marginTop: 1
            },
            mark: {
                color: Colors.gray,
                height: 5,
                width: 5,
                marginTop: '-1.5px',
                marginLeft: -1,
                borderRadius: '100%',
                '&:active .MuiSlider-active': {
                    color:Colors.gray
                }
            },
            markActive: {
                color: Colors.gray,
                backgroundColor: Colors.gray,
                opacity:1
            },  
            root: {
                padding: '0 10px',
                '@media (pointer: coarse)': {
                    // Reach 42px touch target, about ~8mm on screen.
                    padding: '0 0',
                },
                marginLeft: -3,
                marginTop: ".5"
            }
        }));

    const styles = style();
    const sliderStyles = sliderStyle();

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
                            {name}
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
                    <p className={styles.sliderExplanation}>
                        Appetite
                    </p>
                    <div className={styles.sliderContainerWithSpace}>
                        <FiberManualRecordIcon className={styles.filledCircleLeft}/>
                        <Slider 
                            defaultValue={3}
                            aria-labelledby="discrete-slider"
                            step={1}
                            marks
                            min={0}
                            max={6}
                            classes={sliderStyles}
                            onChange={(event, value) => onChange(event, value, 'appetite')}
                        />
                        <FiberManualRecordIcon className={styles.filledCircleRight}/>
                    </div>
                    <p className={styles.sliderExplanation}>
                        Water
                    </p>
                    <div className={styles.sliderContainerWithSpace}>
                        <FiberManualRecordIcon className={styles.filledCircleLeft}/>
                        <Slider 
                            defaultValue={3}
                            aria-labelledby="discrete-slider"
                            step={1}
                            marks
                            min={0}
                            max={6}
                            classes={sliderStyles}
                            onChange={(event, value) => onChange(event, value, 'water')}
                        />
                        <FiberManualRecordIcon className={styles.filledCircleRight}/>
                    </div>
                    <p className={styles.sliderExplanation}>
                        Restroom
                    </p>
                    <div className={styles.sliderContainer}>
                        <FiberManualRecordIcon className={styles.filledCircleLeft}/>
                        <Slider 
                            defaultValue={3}
                            aria-labelledby="discrete-slider"
                            step={1}
                            marks
                            min={0}
                            max={6}
                            classes={sliderStyles}
                            onChange={(event, value) => onChange(event, value, 'restroom')}
                        />
                        <FiberManualRecordIcon className={styles.filledCircleRight}/>
                    </div>
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