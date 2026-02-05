
import SignUpForm from '@/app/_components/signupForm/SignUpForm'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const SignUpPage = () => {
    return (
        <Box sx={{}}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: "center", paddingTop: "30px", color: "#1976D2" }}>
                SignUp Now
            </Typography>
            <Box sx={{
                marginTop: "30px", padding: "30px 20px", width: {
                    xs: "90%", sm: "70%", md: "50%", borderRadius: "10px"
                },
                marginX: "auto", boxShadow: "10px 10px 30px rgba(0,0,0,0.1) , -10px -10px 30px rgba(0,0,0,0.1) ",
            }}>
                <SignUpForm />
            </Box >
        </Box>
    )
}

export default SignUpPage