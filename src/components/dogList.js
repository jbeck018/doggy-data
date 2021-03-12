import DogCard from './dogCard';

const DogList = ({dogs}) => {

    return Object.values(dogs).map(dog => {
            return <DogCard dog={dog} key={dog.id}/>
        })

}

export default DogList;