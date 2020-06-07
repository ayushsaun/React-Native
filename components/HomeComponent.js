import React , { Component } from 'react'
import { View , Text } from 'react-native'

class Home extends Component {
    
    static navigationOptions = {
        title: 'Home' // this will show title as Home when ever it is configured
    }
    
    render() {
        return (
            <View><Text>Home Component</Text></View>
        )
    }
}

export default Home