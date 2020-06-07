import React , { Component } from 'react'
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent'
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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

class Main extends Component {
    
    render() {
        return (
            // by using Expo.Constants.statusBarHeight we will get enough space on the top for status bar to be displayed
            // Expo.Constants.statusBarHeight will show error on web after compilation so just observe that on mobile app instead
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MenuNavigator />
            </View>
        )
    }
}

export default Main;