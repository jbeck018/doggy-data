import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.svg';
import { supabase } from "../utils/api";
import { Button } from '@material-ui/core';
import Colors from '../app/colors';

const Header = (props) => {
    const styles = style();
    
    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
    };

    return(
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} />
            {props.user ? (
                <Button
                    onClick={handleLogout}
                    className={styles.button}
                    variant="text"
                >
                    Logout
            </Button>
            ) : null}
        </header>
    );
}

export default Header;

const style = makeStyles({
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    logo: {
        padding: 30,
        width: '157px',
        height: '12.05px'
    },
    button: {
        color: Colors.dark,
        height: '12.05px',
        float: 'right',
        padding: 30
    }
})