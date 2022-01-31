import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField } from '@material-ui/core';

import Alert from '@mui/material/Alert';
import { Box, Button, LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


declare const window: any;

const { ipcRenderer } = window.electron;

export default function TranslateGrid() {
    const [source, setSource] = useState("");
    const [dest, setDest] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const progressRef = React.useRef(() => { });


    const _handlerSourceInput = (s: string) => {
        setSource(s)
    }

    const _handlerTranslateSuc = (data: string) => {
        setDest(data)
        setError("")
    }

    const _handlerTranslateErr = (err: string) => {
        setDest("")
        setError(err)
    }

    const _handlerClean = () => {
        setDest("")
        setError("")
    }

    const _handlerTranslateButton = (direction: string) => {
        let data = {
            src: source,
            srcLanguage: '',
            destLanguage: ''
        }

        switch (direction) {
            case 'zh':
                data.srcLanguage = 'zh'
                data.destLanguage = 'en'
                break
            default:
                data.srcLanguage = 'auto'
                data.destLanguage = 'zh'
                break
        }

        setLoading(true)
        _handlerClean()
        ipcRenderer.send('translate', data)
        window.translate.on('translate-response', (d: string) => {
            setLoading(false)
            _handlerTranslateSuc(d)
        })
        window.translate.on('translate-error', (d: string) => {
            setLoading(false)
            _handlerTranslateErr(d)
        })
    }

    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <div >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {error
                        ? <Alert severity="error">{error}</Alert>
                        : <div />
                    }
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        id="outlined-multiline-static"
                        label="源内容"
                        multiline
                        fullWidth
                        value={source}
                        onChange={(event: any) => _handlerSourceInput(event.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => _handlerTranslateButton('zh')}>
                        <Typography variant="caption" display="block" gutterBottom>
                            汉语 {'-->>'} En
                        </Typography>
                    </Button>
                    <Button onClick={() => _handlerTranslateButton('auto')}>
                        <Typography variant="caption" display="block" gutterBottom>
                            其他 {'-->>'} 汉
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <div hidden={!loading}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="翻译内容"
                        multiline
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: true
                        }}
                        value={dest}
                    />
                </Grid>

            </Grid>
        </div>
    );
}
