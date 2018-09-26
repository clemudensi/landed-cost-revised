import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
// import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ListItem from "@material-ui/core/ListItem";
import Button from "../../components/CustomButtons/Button";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import profileImage from "../../assets/img/faces/rsz_uclem_1.jpg";
import JetStream from "../../assets/img/jetstream-web-light.png";
import List from "@material-ui/core/List";
import navbarsStyle from "../../assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle";

class Header extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge className={classes.margin} badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge className={classes.margin} badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            <Link to="/"><img
                                src={JetStream}
                                alt="profile"
                                />
                            </Link>
                        </Typography>
                        <List className={classes.list + " " + classes.mlAuto}>
                            <ListItem className={classes.listItem}>
                                <Button
                                    href="#"
                                    className={classes.navLink}
                                    onClick={e => e.preventDefault()}
                                    color="transparent"
                                >
                                    ORDERS
                                </Button>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Button
                                    href="#"
                                    className={classes.navLink}
                                    onClick={e => e.preventDefault()}
                                    color="transparent"
                                >
                                    TRACKING
                                </Button>
                            </ListItem>
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit">
                                    <Badge className={classes.margin} badgeContent={4} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                            </div>
                            <ListItem className={classes.listItem}>
                                <CustomDropdown
                                    left
                                    caret={false}
                                    hoverColor="dark"
                                    dropdownHeader="User Options"
                                    buttonText={
                                        <img
                                            src={profileImage}
                                            className={classes.img}
                                            alt="profile"
                                        />
                                    }
                                    buttonProps={{
                                        className:
                                            classes.navLink + " " + classes.imageDropdownButton,
                                        color: "transparent"
                                    }}
                                    dropdownList={[
                                        "Profile",
                                        "Sign out"
                                    ]}
                                />
                            </ListItem>
                        </List>
                        <div className={classes.grow} />

                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(navbarsStyle)(Header);