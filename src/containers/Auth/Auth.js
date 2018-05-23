import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import InvisibleDiv from '../../hoc/InvisibleDiv/InvisibleDiv';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    isFormValid: false,
    isSignUp: false,
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      }
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }

    return isValid;
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    });
  }

  inputChangedHandler = (event, inputId) => {
    const updatedAuthForm = {
      ...this.state.authForm
    };

    const updatedFormElement = { ...this.state.authForm[inputId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedAuthForm[inputId] = updatedFormElement;

    let isFormValid = true;
    for (const element of Object.values(updatedAuthForm)) {
      isFormValid = isFormValid && element.valid;
    }

    this.setState({ authForm: updatedAuthForm, isFormValid });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

    const authElementsArray = [];
    for (const [key, value] of Object.entries(this.state.authForm)) {
      authElementsArray.push({
        id: key,
        config: value
      });
    }

    let form = <Spinner />

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p className={classes.Danger}>{this.props.error.message}</p>
      );
    }

    if (!this.props.loading) {
      form = (
        <InvisibleDiv>
          <h3>{this.state.isSignUp ? "REGISTER NEW USER:" : "LOGIN:"}</h3>
          <form onSubmit={this.submitHandler}>
            {
              authElementsArray.map(element => {
                return (
                  <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidade={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) => this.inputChangedHandler(event, element.id)}
                  />
                )
              })
            }
            <Button btnType="Success" disabled={!this.state.isFormValid}>
              {this.state.isSignUp ? "REGISTER" : "ENTER"}
          </Button>
          </form>
          <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
            SWITCH TO {this.state.isSignUp ? "SIGN-IN" : "REGISTER HERE"}
          </Button>
        </InvisibleDiv>
      );
    }

    return (
      <div className={classes.Auth}>
        {form}
        {errorMessage}
      </div>
    ); 
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    redirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);