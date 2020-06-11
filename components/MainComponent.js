import React , { Component } from 'react'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent'
import { View , Platform , Image , StyleSheet , ScrollView , Text } from 'react-native';
import { createStackNavigator , createDrawerNavigator , DrawerItems , SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchComments , fetchDishes , fetchLeaders , fetchPromos } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name='menu' size={24} color = 'white'
                onPress = {() => navigation.toggleDrawer()} />
            }) },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
); 
// when navigationOptions is applied here it is applicable to all screens
// mentioned above so if we have common config for screens we can specify them init there
const HomeNavigator = createStackNavigator({
        Home: { screen: Home }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft: <Icon name='menu' size={24} color = 'white'
                onPress = {() => navigation.toggleDrawer()} />
        })
    }
); 

const AboutNavigator = createStackNavigator({
        About: { screen: About }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft: <Icon name='menu' size={24} color = 'white'
                onPress = {() => navigation.toggleDrawer()} />
        })
    }
);

const ContactNavigator = createStackNavigator({
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft: <Icon name='menu' size={24} color = 'white'
                onPress = {() => navigation.toggleDrawer()} />
        })
    }
);

// The SafeAreaView is specifically for the iPhone X,
// that defines a part of the area as a safe area where nothing else will be laid out. 
// <View style={styles.drawerHeader}> is is the design or logo which we we will observe above the menu in drawer
// <DrawerItems {...props} /> is the way of assigning whatever the props just pass them to DrawerItems as such
// <DrawerItems {...props} /> basicall contains all the menu item we made so far which was passed to custom drawer content component
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style = {styles.container}
            forceInset={{ top: 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>      
                    <View style={{flex: 1}}>
                        <Image source = {require('./images/logo.png')}
                            style = {styles.drawerImage} />
                    </View>
                    <View style = {{flex: 2}}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItems {...props} />
            </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator({
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="home"
                        type='font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="info-circle"
                        type='font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="list"
                        type='font-awesome'
                        size = {24}
                        color = {tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon name="address-card"
                        type='font-awesome'
                        size = {22}
                        color = {tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent
    }
)

class Main extends Component {

    // So what does means is that when the main component mounts, then at that time when it is mounted,
    // I will issue the dispatch for all these four. Each of these, when you see the action creator,
    // Corresponding to this. Each of them will issue a fetch to the server using the fetch,
    // to obtain the data from our JSON server.
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
    }
    
    render() {
        return (
            // by using Expo.Constants.statusBarHeight we will get enough space on the top for status bar to be displayed
            // Expo.Constants.statusBarHeight will show error on web after compilation so just observe that on mobile app instead
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect( mapDispatchToProps , mapDispatchToProps )(Main);