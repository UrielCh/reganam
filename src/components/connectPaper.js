import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {showLoader, hideLoader} from "../redux/actions"

import Avatar from '@material-ui/core/Avatar'
import Button from "@material-ui/core/Button/Button"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    paper: {
        margin: theme.spacing.unit * 1,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up(400)]: {
            marginTop: theme.spacing.unit * 9,
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    avatar: {
        //marginBottom: theme.spacing.unit ,
        marginTop: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    formControl: {
        marginTop: theme.spacing.unit * 3,
    }
})


const mapDispatchToProps = {
    showLoader,
    hideLoader
}

//const Connect = props => {
class Connect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            region: 'ovh-eu',
        }
    }

    handleChange = (e) => {
        this.setState({
            region: e.target.value,
        })
    }
    handleClick = () => {
        this.props.showLoader('Requesting OVH for a "credentialToken"')
        setTimeout(() => this.props.showLoader('Hang your belt, you will be redirected to OVH to proceed authentication 🚀'), 3000)
        setTimeout(() => this.props.hideLoader(), 5000)
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
                            value={this.state['region']}
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
                </Paper>
            </React.Fragment>
        )
    }
}

Connect.propTypes = {
    classes: PropTypes.object.isRequired,
}

//Connect.contextType = LoaderContext

export default connect(null, mapDispatchToProps)(withStyles(styles)(Connect))