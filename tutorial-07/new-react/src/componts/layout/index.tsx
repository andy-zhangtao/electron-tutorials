import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
import { blue, grey } from '@mui/material/colors';
import { createTheme, FormControlLabel, FormGroup, Grid, Paper, Stack, Switch, ThemeProvider, useMediaQuery } from '@mui/material';
import TranslateGrid from '../translate/translate';

declare const window: any;

const drawerWidth = 240;
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const IndexType = {
    Translate: 1,
}

export default function MiniDrawer() {
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openIndex, setOpenIndex] = React.useState(true);
    const [openTranslate, setOpenTranslate] = React.useState(false);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () => createTheme({
            palette: {
                background: {
                    ...(!prefersDarkMode ?
                        {
                            default: '#ffffff',
                            paper: '#ffffff',
                        }
                        : {
                            default: '#303040',
                            paper: '#424252',
                        }),
                },

                text: {
                    ...(!prefersDarkMode ?
                        {
                            primary: grey[900],
                            secondary: grey[800],
                        }
                        : {
                            primary: '#ffffff',
                            secondary: '#707070',
                        }),
                },
                mode: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleIndexShow = (it: Number) => {
        // console.log(it)
        switch (it) {
            case IndexType.Translate:
                setOpenTranslate(!openTranslate)
                setOpenIndex(!openIndex)
                break
        }
    }

    const _handlerToggleTheme = (event: any) => {
        if (event.target.checked) {
            window.darkMode.dark()
        } else {
            window.darkMode.light()
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    {/* <Toolbar> */}
                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={2}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            MyAwesomeTools
                        </Typography>
                        <FormGroup >
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} onChange={(event: any) => _handlerToggleTheme(event)} />}
                                label=""
                            />
                        </FormGroup>
                    </Stack>
                    {/* </Toolbar> */}
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItem button key="index" onClick={() => handleIndexShow(IndexType.Translate)} >
                            <ListItemIcon>
                                <IconButton >
                                    <GTranslateOutlinedIcon sx={{ color: blue[700] }} />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="翻译" />
                        </ListItem>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                    <DrawerHeader />
                    <Paper>
                        <div style={{ margin: '15px' }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <div hidden={!openTranslate}>
                                        <TranslateGrid />
                                    </div>
                                </Grid>
                                <div hidden={!openIndex} style={{ margin: '5px' }}>
                                    <Typography paragraph>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                                        sapien faucibus et molestie ac.
                                    </Typography>
                                    <Typography paragraph>
                                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                                        posuere sollicitudin aliquam ultrices sagittis orci a.
                                    </Typography>
                                </div>
                            </Grid>
                        </div>
                    </Paper>
                </Box>
            </ThemeProvider>
        </Box>
    );
}
