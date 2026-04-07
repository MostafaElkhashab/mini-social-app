import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

const notFound = () => {
    return (
        <Box component={"div"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Typography variant="h5" >
                404 | Page Not Found
            </Typography>
        </Box>
    )
}

export default notFound