import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import map from 'lodash/map';
import { destination, goodsType, origin, distanceUnits, weightUnits, distanceToPort, percentageVal, distanceToBuyer } from '../components/selectItems'
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Button from '@material-ui/core/Button';
import LandedCostCard from "./LandedCostPage/LandedCostCard";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class LandedCost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            origin: 'ghana',
            destination: 'us',
            number: '',
            weight: '',
            pricePerCommodity: '',
            id: '',
            distanceUnits: '',
            weightUnits: '',
            distanceToPort: 'Location to port',
            distanceToBuyer: '',
            goodsType: '',
            percentageVal: '',
            result: false,
            route: { origin: {
                    vehicle:[{
                        weightLimit: '',
                        capacity: '',
                        pricePerKm: '',
                        name: '',
                        vehicleType: ''
                    }] },
                destination: {
                    vehicle:[{
                        weightLimit: '',
                        capacity: '',
                        pricePerKm: '',
                        name: '',
                        vehicleType: ''
                    }] }}
        }
    }

    async componentDidMount(){
        try {
            const res = await axios.get(`https://76d1lny6hl.execute-api.us-west-2.amazonaws.com/v1/route/ghana_us`);
            this.setState({ route: res.data });
        } catch (err) {
            return err
        }
    }

    async componentDidUpdate(prevProps, prevState){
        try{
            const {origin, destination} = this.state;
            if (prevState.origin !== this.state.origin ){
                const res = await axios.get(`https://76d1lny6hl.execute-api.us-west-2.amazonaws.com/v1/route/${origin}_${destination}`);
                this.setState({ route: res.data });
            }
        }catch (error) {
            return error
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleOrigin = event => {
        this.setState({
            origin: event.target.value,
        });
    };

    handlePercentageVal = event => {
        this.setState({
            percentageVal: event.target.value,
        });
    };

    handleDestination = event => {
        this.setState({
            destination: event.target.value,
        });
    };

    handleGoodsType = event => {
        this.setState({
            goodsType: event.target.value,
        });
    };

    handleDistanceUnits = event => {
        this.setState({
            distanceUnits: event.target.value,
        });
    };

    handleWeightUnits = event => {
        this.setState({
            weightUnits: event.target.value,
        });
    };

    handleSelect = (event) => {
        this.setState({
            weightUnits: event.target.value,
        });
    };

    handleDistanceToPort = event => {
        this.setState({
            distanceToPort: event.target.value,
        });
    };

    handleDistanceToBuyer = event => {
        this.setState({
            distanceToBuyer: event.target.value,
        });
    };

    commodityPrice(){
        try {
            return this.state.pricePerCommodity * this.state.number
        } catch (err) {
            return err
        }
    }

    transportToPort() {
        try {
            const {route, distanceToPort, distanceUnits} = this.state;

            //sort vehicle by size in ascending order
            const trip = map(route.origin.vehicle, (type) => type);
            const tripSort = trip.sort(function(a, b) {
                return a.capacity - b.capacity;
            });

            const largestTruckSize = tripSort.slice(-1)[0];
            let tripCost = tripSort.find(value => {
                return this.state.weight < value.weightLimit &&  value.type === this.state.goodsType
            });

            //Total number of trips required
            const requiredTrips = (Math.round((this.state.weight/largestTruckSize.weightLimit) * 100)/100);
            const largeTrips = Math.floor(requiredTrips);
            const largeTripCost = largeTrips * largestTruckSize.pricePerKm * distanceToPort;
            const weightFraction = (requiredTrips % 1) * largestTruckSize.weightLimit;
            const requiredTruck = tripSort.find((value) => {
                return weightFraction < value.capacity &&  value.vehicleType === this.state.goodsType
            });
            const smallTripCost = requiredTruck.pricePerKm  * distanceToPort * distanceUnits;
            const totalCostTrip = largeTripCost + smallTripCost;
            return tripCost ? tripCost : totalCostTrip
        } catch (err) {
            return err
        }
    }

    originFuelSurcharge(){
        try {
            return this.state.route.origin.percentageSurcharge * this.transportToPort()
        } catch (err) {
            return err
        }
    }

    exportDuties(){
        const { route } = this.state;
        // note that flat fee and percentage duty varies per country
        try {
            return route.origin.percentageExportDuty * this.commodityPrice() + route.origin.exportFlatFee
        } catch (err) {
            return err
        }
    }

    originExcessFee(){
        const {route, number} = this.state;
        try {
            if(number < route.origin.allowedExportQty) return 0;
            if(number > route.origin.allowedExportQty) return ((number - route.origin.allowedExportQty) * route.origin.comExcessFee + 200)
        } catch (err) {
            return err
        }
    }

    originFreightFee(){
        try {
            return this.state.route.origin.forwarderFee
        } catch (err) {
            return err
        }
    }

    shippingCost(){
        const {weight} = this.state;
        try {
            return 1.65 * weight
        } catch (err) {
            return err
        }
    }

    cargoInsurance(){
        try {
            return this.state.percentageVal * this.shippingCost()
        } catch (err) {
            return err
        }
    }

    destinationExcessFee(){
        const {number, route} = this.state;
        try {
            if(number < route.destination.allowedImportQty) return 0;
            if(number > route.destination.allowedImportQty)
                return (
                    (number - route.destination.allowedImportQty) * route.destination.comExcessFee + route.destination.importFlatFee
                )
        } catch (err) {
            return err
        }
    }

    destinationFreightFee() {
        try {
            return this.state.route.destination.importFlatFee
        } catch (err) {
            return err
        }
    }

    transportToBuyer(){
        try {
            const { route, distanceToBuyer, distanceUnits } = this.state;

            //sort vehicle by size in ascending order
            const trip = map(route.destination.vehicle, (type) => type);
            const tripSort = trip.sort(function(a, b) {
                return a.capacity - b.capacity;
            });

            const largestTruckSize = tripSort.slice(-1)[0];
            let tripCost = tripSort.find(value => {
                return this.state.weight < value.weightLimit &&  value.type === this.state.goodsType
            });

            //Total number of trips required
            const requiredTrips = (Math.round((this.state.weight/largestTruckSize.weightLimit) * 100)/100);
            const largeTrips = Math.floor(requiredTrips);
            const largeTripCost = largeTrips * largestTruckSize.pricePerKm * distanceToBuyer * distanceUnits ;
            const weightFraction =  (requiredTrips % 1) * largestTruckSize.weightLimit;
            const requiredTruck = tripSort.find((value) => {
                return weightFraction < value.capacity &&  value.vehicleType === this.state.goodsType
            });
            const smallTripCost = requiredTruck.pricePerKm;
            const totalTripCost = largeTripCost + smallTripCost;
            return tripCost ? tripCost : totalTripCost
        } catch (err) {
            return err
        }
    }

    destinationFuelSurchage(){
        try {
            return this.state.route.destination.percentageSurcharge * this.transportToBuyer()
        } catch (err) {
            return err
        }
    }

    importDuties(){
        const {route} = this.state;
        try {
            return route.destination.percentageImportDuty * this.commodityPrice() + route.destination.importFlatFee
        } catch (err) {
            return err
        }
    }

    landedCost (){
        try {
            const total = [
                this.commodityPrice(),
                this.transportToPort(),
                this.originFuelSurcharge(),
                this.exportDuties(),
                this.originExcessFee(),
                this.originFreightFee(),
                this.cargoInsurance(),
                this.shippingCost(),
                this.destinationFreightFee(),
                this.destinationExcessFee(),
                this.transportToBuyer(),
                this.destinationFuelSurchage(),
                this.importDuties()
            ];
            return (total.reduce((a, b) => a + b, 0)/10).toFixed(3);

        } catch (err) {
            return "Please check to ensure that all input are filled"
        }
    };
    
    calculateCost = () => {
        // return this.landedCost()
        this.setState({landedCost: this.landedCost()})
    };

    render(){
        const { classes } = this.props;
        return(
            <div>
                <h2>Jetstream Landed Cost Calculator</h2>
                <br/>

                <Grid >
                    <GridContainer>
                        <GridItem xs={12} sm={8} md={8}>
                            <form className={classes.container} noValidate autoComplete="off">
                                <GridItem xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-origin"
                                        select
                                        label="Product Type"
                                        className={classes.textField}
                                        value={this.state.percentageVal}
                                        onChange={this.handlePercentageVal}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="select your product"
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {percentageVal.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-number"
                                        label="Number of items"
                                        value={this.state.number}
                                        onChange={this.handleChange('number')}
                                        type="number"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText="input number of items"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-number"
                                        label="Price per Commodity"
                                        value={this.state.pricePerCommodity}
                                        onChange={this.handleChange('pricePerCommodity')}
                                        type="number"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText="input price of commodity"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-destination"
                                        select
                                        label="Distance to Buyer"
                                        className={classes.textField}
                                        value={this.state.distanceToBuyer}
                                        onChange={this.handleDistanceToBuyer}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {distanceToBuyer.map(option => (
                                            <MenuItem key={option.value} value={option.value} >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-number"
                                        label="Weight of item"
                                        value={this.state.weight}
                                        onChange={this.handleChange('weight')}
                                        type="number"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText="input unit weight of item"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        select
                                        label={this.state.distanceToPort}
                                        className={classes.textField}
                                        value={this.state.distanceToPort}
                                        onChange={this.handleDistanceToPort}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {distanceToPort.map(option => (
                                            <MenuItem key={option.value} value={option.value} >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        select
                                        label="Weight Units"
                                        className={classes.textField}
                                        value={this.state.weightUnits}
                                        onChange={this.handleWeightUnits}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {weightUnits.map(option => (
                                            <MenuItem key={option.value} value={option.value} onChange={this.handleSelect} data={option.label}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-destination"
                                        select
                                        label="Distance Units"
                                        className={classes.textField}
                                        value={this.state.distanceUnits}
                                        onChange={this.handleDistanceUnits}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {distanceUnits.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-origin"
                                        select
                                        label="Origin"
                                        className={classes.textField}
                                        value={this.state.origin}
                                        onChange={this.handleOrigin}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="Please select your country of origin"
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {origin.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-destination"
                                        select
                                        label="Destination"
                                        className={classes.textField}
                                        value={this.state.destination}
                                        onChange={this.handleDestination}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="Please select your country of destination"
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {destination.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-destination"
                                        select
                                        label="Goods Type"
                                        className={classes.textField}
                                        value={this.state.goodsType}
                                        onChange={this.handleGoodsType}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="Please select your the nature of goods"
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {goodsType.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </GridItem>
                            </form>
                        </GridItem>

                        {/*Cost Card*/}
                        <GridItem xs={12} sm={4} md={4}>
                            <LandedCostCard
                                landedCost={this.state.landedCost}
                                weightUnits={this.state.weightUnits}
                                origin={this.state.origin}
                                destination={this.state.destination}
                            />
                        </GridItem>
                    </GridContainer>

                    {/*Calculate Button*/}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.calculateCost}
                            size="large">
                            Calculate
                        </Button>
                    </div>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(LandedCost);
