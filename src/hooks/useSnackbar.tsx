import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { type AlertColor } from '@mui/material/Alert';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor;
}

interface SnackbarContextType {
    showSnackbar: (message: string, severity?: AlertColor) => void;
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showWarning: (message: string) => void;
    showInfo: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success'
    });

    const showSnackbar = (message: string, severity: AlertColor = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const hideSnackbar = () => {
        setSnackbar(prev => ({
            ...prev,
            open: false
        }));
    };

    const showSuccess = (message: string) => showSnackbar(message, 'success');
    const showError = (message: string) => showSnackbar(message, 'error');
    const showWarning = (message: string) => showSnackbar(message, 'warning');
    const showInfo = (message: string) => showSnackbar(message, 'info');

    const value = {
        showSnackbar,
        showSuccess,
        showError,
        showWarning,
        showInfo
    };

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={hideSnackbar}>
                <Alert onClose={hideSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
}; 