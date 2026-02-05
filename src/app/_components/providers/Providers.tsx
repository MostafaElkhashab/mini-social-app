'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { myStore } from "@/lib/redux/reduxStore";
import { Provider } from "react-redux";
import theme from './../../theme';
import ToastProvider from './../toaster/ToastProvider';
const Providers = ({ children, }: {
    children: React.ReactNode;
}) => {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <Provider store={myStore}>
                    {children}
                    <ToastProvider />
                </Provider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}

export default Providers