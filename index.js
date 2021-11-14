import React, { Component } from "react";
import {
  Button,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default class RegistrationScreen extends Component {
  emailInputRef = React.createRef();
  passwordInputRef = React.createRef();
  firstnameInputRef = React.createRef();
  lastnameInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",

      showEmailError: false,
      showPasswordError: false,
      showFirstnameError: false,
      showLastnameError: false,
    };
    this.submitPressed = this.submitPressed.bind(this);
  }

  inputs = () => {
    return [
      this.emailInputRef,
      this.passwordInputRef,
      this.firstnameInputRef,
      this.lastnameInputRef,
    ];
  };

  editNextInput = () => {
    console.log("editNextInput");
    const activeIndex = this.getActiveInputIndex();
    if (activeIndex === -1) {
      return;
    }

    const nextIndex = activeIndex + 1;
    if (
      nextIndex < this.inputs().length &&
      this.inputs()[nextIndex].current != null
    ) {
      this.setFocus(this.inputs()[nextIndex], true);
    } else {
      this.finishEditing();
    }
  };

  onInputFocus = () => {
    this.setState({
      activeIndex: this.getActiveInputIndex(),
    });
  };

  onChangeInputHandler = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  getActiveInputIndex = () => {
    const activeIndex = this.inputs().findIndex((input) => {
      if (input.current == null) {
        return false;
      }
      console.log("input: ", input);
      return input.current.isFocused();
    });
    console.log("activeIndex: ", activeIndex);
    return activeIndex;
  };

  finishEditing = () => {
    const activeIndex = this.getActiveInputIndex();
    if (activeIndex === -1) {
      return;
    }
    this.setFocus(this.inputs()[activeIndex], false);
  };

  setFocus(textInputRef, shouldFocus) {
    if (shouldFocus) {
      setTimeout(() => {
        textInputRef.current.focus();
      }, 100);
    } else {
      textInputRef.current.blur();
    }
  }

  submitPressed() {
    console.log("submitPressed this.state: ", this.state);
    this.setState({
      showEmailError: this.state.email.length < 4,
      showPasswordError: this.state.password.length < 4,
      showFirstnameError: this.state.firstname.length < 4,
      showLastnameError: this.state.lastname.length < 4,
    });
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.title}</Text>

        {this.props.email && (
          <View style={styles.inputTextWrapper}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              returnKeyType="next"
              onSubmitEditing={this.editNextInput}
              onFocus={this.onInputFocus}
              onChangeText={this.onChangeInputHandler}
              ref={this.emailInputRef}
            />
            {this.state.showEmailError && (
              <Text style={styles.errorText}>
                Please enter your email address.
              </Text>
            )}
          </View>
        )}
        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            returnKeyType="next"
            onSubmitEditing={this.editNextInput}
            onFocus={this.onInputFocus}
            onChangeText={this.onChangeInputHandler}
            ref={this.passwordInputRef}
          />
          {this.state.showPasswordError && (
            <Text style={styles.errorText}>Please enter a password.</Text>
          )}
        </View>

        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={this.editNextInput}
            onFocus={this.onInputFocus}
            onChangeText={this.onChangeInputHandler}
            ref={this.firstnameInputRef}
          />
          {this.state.showFirstnameError && (
            <Text style={styles.errorText}>Please enter your first name.</Text>
          )}
        </View>

        <View style={styles.inputTextWrapper}>
          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            returnKeyType="next"
            onSubmitEditing={this.editNextInput}
            onFocus={this.onInputFocus}
            onChangeText={this.onChangeInputHandler}
            ref={this.lastnameInputRef}
          />
          {this.state.showLastnameError && (
            <Text style={styles.errorText}>Please enter your last name.</Text>
          )}
        </View>

        <View style={styles.btnContainer}>
          <Button title="Submit" onPress={this.submitPressed} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 36,
    padding: 24,
    margin: 12,
    textAlign: "center",
  },
  inputTextWrapper: {
    marginBottom: 24,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    paddingRight: 30,
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 36,
  },
});
