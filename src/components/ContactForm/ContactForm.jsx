import React from 'react';
import {TextField, Typography, createStyles, Grid, Card, Button} from "@mui/material";
import {useFormik} from 'formik';
import {getContactModalSchema} from './schema';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() =>
    createStyles({
        mainContainer: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        mainForm: {
            maxWidth: '600px',
            minWidth: '250px',
            padding: '32px'
        }
    })
);

export default function ContactForm() {
    const classes = useStyles();
    const [isSent, setIsSent] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isNotExistEmail, setNotExistEmail] = React.useState(false);
    const notExistEmail = 'neexistujici@email.cz'

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
            email: '',
            mobile: '',
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
        if (formik.values.message === '' ) {
            setIsDisabled(true);
            return;
        }
        if (formik.errors.hasOwnProperty('email') && formik.errors.hasOwnProperty('mobile')) {
            setIsDisabled(true);
            return;
        }

        if (formik.errors.hasOwnProperty('email') && formik.values.mobile === '') {
            setIsDisabled(true);
            return;
        }
        if (formik.errors.hasOwnProperty('mobile') && formik.values.email === '') {
            setIsDisabled(true);
            return;
        }

        setIsDisabled(false);
    }, [formik.errors, formik.values.email, formik.values.mobile, formik.values.message]);

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
                            name='mobile'
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.mobile ? formik.errors.mobile : ''}
                            error={Boolean(
                                formik.touched.mobile && formik.errors.mobile
                            )}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            label="Email"
                            variant="standard"
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
                    <Grid item sm={12}>
                        <TextField
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
                            disabled={isDisabled}
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