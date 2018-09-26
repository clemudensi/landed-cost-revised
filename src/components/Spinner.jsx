import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';
import withStyles from "@material-ui/core/styles/withStyles";


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

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    const center = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20%",
      marginBottom: "40%",
      width: "40%"
    };
    return (
      <div className='sweet-loading' style={center} >
        <ClipLoader
          align="center "
          className={override}
          sizeUnit={"px"}
          size={70}
          color="info"
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default (withStyles(styles)(AwesomeComponent))
