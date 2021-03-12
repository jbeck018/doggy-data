// This handles reset password for Supabase.io
import { supabase } from "../utils/api";
import { useState } from "react";
import { Container, 
    TextField, 
    Button, 
    Typography,  } from '@material-ui/core';

const ResetPassword = ({ token, setRecoveryToken }) => {
    const [newPassword, setNewPassword] = useState('');

    const handleNewPassword = async () => {
        const { error } = await supabase.auth.api.updateUser(token, {
            password: newPassword,
        });

        if (!error) {
            // To render our Todo list again
            setRecoveryToken(null);
        } else {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom>
                Recover Password
            </Typography>
            <TextField 
                id="email"
                label="Enter new password" 
                type="password"
                name="email"
                onChange={event => setNewPassword(event.target.value)}
                required
            />
            <Button
                onClick={handleNewPassword}
                type="button"
            >
                Change Password
            </Button>
        </Container>
    );
};

export default ResetPassword;