import React , { Component } from 'react'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent'
import { View, Platform } from 'react-native';
import { createStackNavigator , createDrawerNavigator } from 'react-navigation';

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
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

const AboutNavigator = createStackNavigator({
        About: { screen: About }
    },
    {
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

const ContactNavigator = createStackNavigator({
        Contact: { screen: Contact }
    },
    {
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

const MainNavigator = createDrawerNavigator({
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home'
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us'
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu'
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us'
            }
        }
    },
    {
        drawerBackgroundColor: '#D1C4E9'
    }
)

class Main extends Component {
    
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

export default Main;