import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us' // this will show title as menu when ever it is configured
    }

    render() {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                <Card
                    title='Contact Information'
                >
                    <Text style={{ margin: 5 }}>121, Clear Water Bay Road</Text>
                    <Text style={{ margin: 5 }}>Clear Water Bay, Kowloon</Text>
                    <Text style={{ margin: 5 }}>HONG KONG</Text>
                    <Text style={{ margin: 5 }}>Tel: +852 1234 5678</Text>
                    <Text style={{ margin: 5 }}>Fax: +852 8765 4321</Text>
                    <Text style={{ margin: 5 }}>Email:confusion@food.net</Text>
                </Card>
            </Animatable.View>
        )
    }
}

export default Contact