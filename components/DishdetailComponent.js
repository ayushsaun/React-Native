import React , { Component } from 'react'
import { View , Text } from 'react-native'
import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes'

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return (
            <Card
                featuredTitle = {dish.name}
                image = {require('./images/uthappizza.png')}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
            </Card>
        );
    }
    else {
        return(
            <View></View>
        )
    }
}

class Dishdetail extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            dishes : DISHES
        }
    }

    static navigationOptions = {
        title: 'Dish Details' // this will show title as Dish Details when ever it is configured
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId' , '')
        return(
            <RenderDish dish= {this.state.dishes[+dishId]} /> // dishId is a string so putting a + will turn it into a number
        )   
    }
}

export default Dishdetail