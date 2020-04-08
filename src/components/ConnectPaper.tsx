import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {hideLoader, showLoader, setRegion} from "../redux/actions"

import Avatar from '@material-ui/core/Avatar'
import Button from "@material-ui/core/Button/Button"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import {getNewClientToken} from '../ovh/auth'
import Footer from "./Footer"

const styles = theme => ({
    paper: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up(500)]: {
            marginTop: theme.spacing(9),
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    avatar: {
        //marginBottom: theme.spacing(1) ,
        marginTop: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    formControl: {
        marginTop: theme.spacing(3),
    },
    disclaimer:{
        marginTop: theme.spacing(1)
    }
})

const mapDispatchToProps = {
    showLoader,
    hideLoader,
    setRegion
}

const mapStateToProps = (state) => {
    return {
        region: state.region
    }
}

//const Connect = props => {
class Connect extends React.Component {

    handleChange = (e) => {
        this.props.setRegion(e.target.value)
    }
    handleClick = async () => {
        // todo remove opts
        await getNewClientToken(this.props.region)
    }

    render() {
        const {classes} = this.props
        return (
            <React.Fragment>
                <Paper className={classes.paper} elevation={1}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <FormControl className={classes.formControl} fullWidth required>
                        <InputLabel htmlFor="select-region">Region</InputLabel>
                        <Select
                            native
                            value={this.props.region}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'region',
                                id: 'select-region',

                            }}
                        >
                            <option value={'ovh-eu'}>OVH Europe</option>
                            <option value={'ovh-us'}>OVH USA</option>
                            <option value={'ovh-ca'}>OVH Canada</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <Button variant="contained" color={"primary"}
                                onClick={this.handleClick}>
                            SIGN IN
                        </Button>
                    </FormControl>
                    <Typography className={classes.disclaimer} variant={"caption"}>
                        As this app runs only in your browser and interact only with OVH API, we
                        do not collect any personal data and we can't use yours tokens to interact with your OVH
                        account.</Typography>
                </Paper>
                <Footer/>
            </React.Fragment>
        )
    }
}

Connect.propTypes = {
    classes: PropTypes.object.isRequired,
}

//Connect.contextType = LoaderContext

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Connect))