'use client'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { ThreeCircles } from 'react-loader-spinner'
import { useLoginForm } from './useLoginForm'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

const LoginForm = () => {
    const { showPassword, isLoading, handleClickShowPassword, handleMouseDownPassword, handleMouseUpPassword, formikObj } = useLoginForm();
    return (<>

        <Box component={"form"} sx={{ paddingX: "20px", display: "flex", flexDirection: "column", gap: "30px" }} onSubmit={formikObj.handleSubmit}>
            <Box>
                <TextField sx={{ marginBottom: "5px" }} id="email" fullWidth label="Email" variant="outlined" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} />
                {formikObj.errors.email && formikObj.touched.email ? <Alert severity="error">{formikObj.errors.email}</Alert> : ""}
            </Box>
            <FormControl fullWidth variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.password}
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
            </FormControl>
            <Button variant="contained" size="large" fullWidth type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false}>
                {isLoading ? <ThreeCircles
                    visible={true}
                    height="30"
                    width="60"
                    color="#fff"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Login"}
            </Button>
            <Typography sx={{
                textAlign: "center",
            }} component={'span'} >Don't have an account?
                <Typography component={'span'} sx={{ color: '#1976D2', marginLeft: "5px", cursor: "pointer", textDecoration: "underline" }}>

                    <Link href={`/signup`}>
                        Sign Up
                    </Link>
                </Typography>
            </Typography>
        </Box>
    </>
    )
}

export default LoginForm