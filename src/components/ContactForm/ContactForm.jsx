import React from 'react';
import {TextField, Typography, createStyles, Grid, Card, Button} from "@mui/material";
import {useFormik} from 'formik';
import {getContactModalSchema} from './schema';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            paddingTop: theme.spacing(2),
            '& textarea': {
                width: '390px',
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                }
            },
        },
        mainContainer: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        mainForm: {
            maxWidth: '600px',
            padding: '32px'
        }
    })
);

export default function ContactForm() {
    const classes = useStyles();
    const [isSent, setIsSent] = React.useState(false);
    const [isNotExistEmail, setNotExistEmail] = React.useState(false);
    const notExistEmail = 'neexistujici@email.cz'

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
            email: '',
            phone: '',
        },
        validateOnChange: true,
        validationSchema: getContactModalSchema(),
        onSubmit: (values, {resetForm}) => {
            setNotExistEmail(false)
            setIsSent(false);
            setTimeout(function () {
                if (values.email === notExistEmail) {
                    setIsSent(false);
                    setNotExistEmail(true)
                    return;
                }
                setIsSent(true);
                resetForm();
            }, 3000);
        },
    });

    React.useEffect(() => {
        if (Object.keys(formik.errors).length !== 0) {
            setNotExistEmail(false)
            setIsSent(false);
        }
    }, [formik.errors]);

    return (
        <div className={classes.mainContainer}>
            <Card className={classes.mainForm}>
                <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" component="h2">
                    Kontakt
                </Typography>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <TextField
                            label="Meno"
                            variant="standard"
                            name='name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            label="Mobil"
                            variant="standard"
                            required
                            name='phone'
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.phone ? formik.errors.phone : ''}
                            error={Boolean(
                                formik.touched.phone && formik.errors.phone
                            )}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            label="Email"
                            variant="standard"
                            required
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.email ? formik.errors.email : ''}
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                        />
                    </Grid>
                    <Grid item sm={12} className={classes.textArea}>
                        <TextField
                            required
                            placeholder='Dobrý deň, ...'
                            name='message'
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.message ? formik.errors.message : ''}
                            error={Boolean(
                                formik.touched.message && formik.errors.message
                            )}
                            fullWidth
                            rows={3}
                            multiline={true}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        { isSent
                            ?
                            <p>Správa úspešne odoslaná.</p>
                            :
                            <></>
                        }
                        { isNotExistEmail
                            ?
                            <p>Neexistujíci emailová adresa.</p>
                            :
                            <></>
                        }
                    </Grid>
                    <Grid item sm={12}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Odoslať
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Card>
        </div>
    )
}