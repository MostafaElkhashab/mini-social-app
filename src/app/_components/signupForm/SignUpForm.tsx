'use client'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThreeCircles } from 'react-loader-spinner'
import Link from 'next/link'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useSignUpForm } from './useSignUpForm'
const SignUpForm = () => {
    const {
        showPassword,
        showPassword2,
        isLoading,
        error,
        handleClickShowPassword,
        handleClickShowPassword2,
        handleMouseDownPassword,
        handleMouseDownPassword2,
        handleMouseUpPassword,
        handleMouseUpPassword2,
        formikObj
    } = useSignUpForm();

    return (<>
        <Box component={"form"} sx={{ paddingX: "20px", display: "flex", flexDirection: "column", gap: "30px" }} onSubmit={formikObj.handleSubmit}>
            <Box>
                <TextField sx={{ marginBottom: "5px" }} id="name" fullWidth label="Name" variant="outlined" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.name} />
                {formikObj.errors.name && formikObj.touched.name ? <Alert severity="error">{formikObj.errors.name}</Alert> : ""}
            </Box>
            <Box>
                <TextField sx={{ marginBottom: "5px" }} id="email" fullWidth label="Email" variant="outlined" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} />
                {formikObj.errors.email && formikObj.touched.email ? <Alert severity="error">{formikObj.errors.email}</Alert> : ""}
            </Box>
            <Box component={"div"} sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                width: "100%",
                gap: "20px",
            }}>
                <FormControl variant="outlined" sx={{ width: { xs: "100%", md: "48%" } }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.password}
                        type={showPassword2 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword2 ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword2}
                                    onMouseUp={handleMouseUpPassword2}
                                    edge="end"
                                >
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    {formikObj.errors.password && formikObj.touched.password ? <Alert severity="error">{formikObj.errors.password}</Alert> : ""}
                </FormControl>
                <FormControl variant="outlined" sx={{ width: { xs: "100%", md: "48%" } }}>
                    <InputLabel htmlFor="outlined-adornment-rePassword">Re-Password</InputLabel>
                    <OutlinedInput
                        id="rePassword"
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.rePassword}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    {formikObj.errors.rePassword && formikObj.touched.rePassword ? <Alert severity="error">{formikObj.errors.rePassword}</Alert> : ""}
                </FormControl>
            </Box>
            <Box component={"div"} sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                width: "100%",
                gap: "20px",
            }}>
                <Box sx={{ width: { xs: "100%", md: "48%" } }}>
                    <TextField type='date' sx={{ marginBottom: "5px" }} id="dateOfBirth" fullWidth label="Date of Birth" variant="outlined" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.dateOfBirth} />
                    {formikObj.errors.dateOfBirth && formikObj.touched.dateOfBirth ? <Alert severity="error">{formikObj.errors.dateOfBirth}</Alert> : ""}

                </Box>
                <Box sx={{ width: { xs: "100%", md: "48%" } }}>

                    <FormControl fullWidth>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                            labelId="gender"
                            id="gender"
                            name="gender"
                            value={formikObj.values.gender}
                            label="Gender"
                            onChange={(event) => formikObj.setFieldValue('gender', event.target.value)}
                            onBlur={formikObj.handleBlur}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>

                        </Select>
                    </FormControl>
                    {formikObj.errors.gender && formikObj.touched.gender ? <Alert severity="error">{formikObj.errors.gender}</Alert> : ""}
                </Box>
            </Box>

            <Button variant="contained" size="large" fullWidth type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false}>
                {isLoading ? <ThreeCircles
                    visible={true}
                    height="30"
                    width="60"
                    color="#fff"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Sign Up"}
            </Button>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Typography sx={{
                textAlign: "center",
            }} component={'span'} >Already have an account?
                <Typography component={'span'} sx={{ color: '#1976D2', marginLeft: "5px", cursor: "pointer", textDecoration: "underline" }}>

                    <Link href={`/login`}>
                        Login
                    </Link>
                </Typography>
            </Typography>
        </Box>
    </>
    )
}

export default SignUpForm