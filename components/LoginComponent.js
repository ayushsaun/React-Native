import React , { Component } from 'react'
import { View , Button , StyleSheet } from 'react-native'
import { Card , Icon , Input , CheckBox } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        // SecureStore.getItemAsync('userinfo') returns a promise
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                // JSON.parse(userdata) will return in form of json string
                // so we need to convert it to string while storing
                // and to javascript in order to use it in app
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            // this key "USERINFO" must be same u cannot change it
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }

    static navigationOptions = {
        title: 'Login'
    }

    render() {
        return (
            <View style = {styles.container}>
                <Input 
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText = { (username) => this.setState({username}) }
                    value = {this.state.username}
                />
                <Input 
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText = { (password) => this.setState({ password }) }
                    value = {this.state.password}
                />
                <CheckBox
                    title = "Remember Me"
                    center
                    checked = {this.state.remember}
                    onPress = { () => this.setState({ remember: !this.state.remember }) }
                    containerStyle = {styles.formCheckbox}
                />
                <View style = {styles.formButton}>
                    <Button
                        onPress = { () => this.handleLogin() }
                        title = 'Login'
                        color = '#512DA8'
                    />
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        margin: 30
    },
    formCheckbox: {
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})


export default Login