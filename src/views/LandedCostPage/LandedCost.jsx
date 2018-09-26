import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import classNames from 'classnames';
// @material-ui/icons
import PropTypes from 'prop-types';

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

import featuresStyle from "../../assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.jsx";

import LandedCostCard from "./LandedCostCard";
import LandedCost from "../LandedCostCalc";


class SectionFeatures extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes, ...rest } = this.props;

        return (
            <div className="cd-section" {...rest}>
                <div className={classes.container}>

                    {/* Feature 3 START */}
                    <div className={classes.features3}>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={8}>
                                <LandedCost/>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4}>
                                <LandedCostCard/>
                            </GridItem>
                        </GridContainer>
                    </div>
                    {/* Feature 3 END */}

                </div>

            </div>
        );
    }
}

SectionFeatures.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(featuresStyle)(SectionFeatures);
