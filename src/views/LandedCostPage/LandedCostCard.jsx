import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Money from "@material-ui/icons/MoneyOffTwoTone";

import Flight from "@material-ui/icons/FlightRounded";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import dashboardStyle from "../../assets/jss/dashboardStyle.jsx";

class LandedCostCard extends React.Component {
    state = {
        value: 0
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    weightUnit(){
        if (this.props.weightUnits === 1) return "kg";
        if (this.props.weightUnits === 1000) return "Mt.";
        if (this.props.weightUnits === 0.4535) return "lbs"
    }

    render() {
        console.log(this.props.landedCost, 'LC P')
        const { classes, landedCost } = this.props;
        return (
            <div>
                <Grid container>

                    <GridItem>
                        <Card className={classes.cardBody}>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Money />
                                </CardIcon>
                                <h4
                                    className={classes.cardTitle}
                                    align="center">Landing cost route: {this.props.origin.toUpperCase()} to {this.props.destination.toUpperCase()}
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <h1 className={classes.cardTitle} align="center">
                                    {landedCost ? `$${landedCost}` : "$0"}
                                    </h1>
                            </CardBody>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Flight />
                                    Estimated Landing Cost of shipping in {this.weightUnit()}
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>


                </Grid>
            </div>
        );
    }
}

LandedCostCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LandedCostCard);
