import React , { Component } from 'react'
import { View , StyleSheet , Text , ScrollView , Image } from 'react-native'
import { Icon , Input , CheckBox , Button } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from 'react-navigation'
import { baseUrl } from '../shared/baseUrl'
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";

class LoginTab extends Component {

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
        title: 'Login',
        tabBarIcon: ({ tintColor }) => {
            <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ color: tintColor }}
            />
        }
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
                    buttonStyle = {{ backgroundColor: '#512DA8' }}
                    icon = { <Icon 
                            name="sign-in" 
                            type="font-awesome" 
                            color="white"
                            /> 
                    }
                />
                </View>
                <View style = {styles.formButton}>
                    <Button
                        onPress = { () => this.props.navigation.navigate('Register') }
                        title = 'Register'
                        clear
                        buttonStyle = {{ backgroundColor: 'none' }}
                        icon = { <Icon 
                                name="user-plus" 
                                type="font-awesome"
                                size = {24} 
                                color="blue"
                                /> 
                        }
                        titleStyle = {{ color: 'blue' }}
                    />
                </View>
            </View>
        )
    }

}

class RegisterTab extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async() => {
        const galleryPermission = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!galleryPermission.cancelled) {
            console.log(galleryPermission);
            this.processImage(galleryPermission.uri)
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => {
            <Icon
                name="user-plus"
                type="font-awesome"
                size={24}
                iconStyle={{ color: tintColor }}
            />
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
                )
                .catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style = {styles.imageContainer}>
                    <Image 
                        source = {{ uri: this.state.imageUrl }}
                        loadingIndicatorSource = { require('./images/logo.png') }
                        style = { styles.image }
                    />
                    <View style={{ padding: 10}}>
                        <Button
                            title="Camera"
                            onPress={this.getImageFromCamera}
                            />
                    </View>
                    <View style={{ padding: 10}}>
                        <Button
                            title="Gallery"
                            onPress={this.getImageFromGallery}
                            />
                    </View>
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
},{
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
})

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        margin: 30
    },
    button: {
    },
    imageContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formCheckbox: {
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})


export default Login