// in src/MyLoginPage.js
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'admin-on-rest';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Logo from './image/glassbox_logo.svg';
import { bgImages } from './constants.js';
const images = [...bgImages];
const styles = theme => ({
  label: {
    width: "4rem",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  input: {
    display: 'none',
    padding: '8px',
  },
  backgroundStyle: {
    // backgroundImage: `url(${images[0]})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    transition: "all 2s",
    backgroundSize: 'cover',
    backgroundColor: '#80CCFF',
    backgroundBlendMode: 'luminosity',
    backgroundRepeat: 'no-repeat',
  }
}); 


class MyLoginPage extends Component { 
  state = {
    email: '',
    password: '',
    bgIndex: 0,
  };

  componentDidMount() {
    this.handleChangeBg()
  }
  handleChangeBg= () => { setInterval(() => {
    this.setState({
      bgIndex: this.state.bgIndex === images.length - 1 ? 0 : this.state.bgIndex + 1
      });
    }, 4000);
  }
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  submit = async (e) => {
    e.preventDefault();
    // gather your data/credentials here
    const { email, password } = this.state;
    const credentials = {
      username: email,
      password: password,
    };

    // Dispatch the userLogin action (injected by connect)
    const { authProvider, userLogin  } = this.props; 
    // this.props.userLogin(credentials);
    await authProvider("AUTH_LOGIN", credentials);
    if(localStorage.getItem("token")) {
      this.props.history.push("/#/clients");
    }
  }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.backgroundStyle} style={{backgroundImage: `url(${images[this.state.bgIndex]})`}}>
          <div className="login-bg">
            <img src={Logo} width="240" />
            <form onSubmit={this.submit}>
              <div className="input_section">
                <InputLabel className={classes.label}>Email</InputLabel>
                <Input
                  // className={classes.input}
                  name="email"
                  type={'email'}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input_section">
                <InputLabel className={classes.label}>Password</InputLabel>
                <Input
                  name="password"
                  type={'password'}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
              </Button>
            </form>
          </div>
        </div>
      );
    }
};

export default withStyles(styles)(withRouter(connect(undefined, { userLogin })(MyLoginPage)));
