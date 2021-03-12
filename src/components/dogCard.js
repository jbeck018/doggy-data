import DogPlaceHolder from './dogPlaceHolder';
import { useHistory } from "react-router-dom";
import { makeStyles, 
         Card, 
         CardHeader,
         CardActions,
         CardContent,
         Button,
         Typography } from '@material-ui/core';
import dayjs from 'dayjs';
dayjs().format();
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

const DogCard = ({dog}) => {
    const styles = style();
    const history = useHistory();

    const handleClick = (button) => {
        if (button === 'details') {
            history.push(`/new-details/${dog.id}/${dog.name}`)
        } else {
            history.push(`/summary/${dog.id}`)
        }
    }

    return (
        <Card className={styles.card}>
            <CardHeader
                subheader={dog.breed}
            />
            <CardContent className={styles.main}>
                <DogPlaceHolder 
                    diameter={44}
                    svgTop={10.5}
                    svgLeft={9}
                    svgHeight={22.845}
                    svgWidth={26.13}
                />
                <Typography variant="h4" className={styles.name}>
                    {dog.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleClick('details')}>Add Details</Button>
                <Button size="small" onClick={() => handleClick('summary')}>See progress</Button>
            </CardActions>
        </Card>
    )
}

export default DogCard;

const style=makeStyles({
    card: {
        width: 300,
        height: 180,
        margin: 15,
    },
    main: {
        display: 'flex',
        alignContent: 'center',
    },
    name: {
        paddingLeft: 15
    }
})