
import LoginForm from '@/app/_components/loginForm/LoginForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const LoginPage = () => {
    return <Box sx={{ height: "100vh" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: "center", paddingTop: "30px", color: "#1976D2" }}>
            Login Page
        </Typography>
        <Box sx={{
            marginTop: "30px", padding: "20px", paddingBlock: "80px", width: {
                xs: "90%", sm: "70%", md: "50%", borderRadius: "10px"
            },
            marginX: "auto", boxShadow: "10px 10px 30px rgba(0,0,0,0.1) , -10px -10px 30px rgba(0,0,0,0.1) ",
        }}>
            <LoginForm />

        </Box >
    </Box>
};

export default LoginPage;