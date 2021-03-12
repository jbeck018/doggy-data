import { makeStyles } from '@material-ui/core';
import Colors from '../app/colors';
import dogSVG from '../assets/dog-outline.svg';

const DogPlaceHolder = ({diameter, svgHeight, svgWidth, svgTop, svgLeft}) => {
    const style = makeStyles({
        svg: {
            position: 'relative',
            top: svgTop,
            left: svgLeft,
            height: svgHeight,
            width: svgWidth,
        },
        ellipses: {
            width: diameter,
            height: diameter,
            borderRadius: '100%',
            backgroundColor: Colors.secondary,
            alignSelf: 'center'
        }
    });
    
    const styles = style();

    return(
        <div className={styles.ellipses}>
            <img src={dogSVG} alt="Doggo" className={styles.svg} />
        </div>
    )
}

export default DogPlaceHolder;