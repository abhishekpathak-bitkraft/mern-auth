import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LanguageSwitcher from './LanguageSwitch';
import { AuthContext } from '../Context/userContext';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const Header = () => {

    const { token, setToken } = React.useContext(AuthContext);
    const {t} = useTranslation();

    return (
        <>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        <Link href="/">
                            Auth
                        </Link>
                    </Typography>
                    <nav>
                        <LanguageSwitcher />
                    </nav>
                    {
                        token ?
                            <Button onClick={() => {
                                setToken(null);
                                Cookies.remove("AUTH-TOKEN");
                                window.location.href = "/login"
                            }} variant="contained" sx={{ my: 1, mx: 1.5 }}>
                                {t("logout")}
                            </Button>
                            :
                            <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                                {t("login")}
                            </Button>

                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;