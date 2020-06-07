import React , { Component } from 'react'
import { View , FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { DISHES } from '../shared/dishes'

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: 'Menu' // this will show title as menu when ever it is configured
    }

    render() {

        
        const renderMenuItem = ({item , index}) => {
            return (
                <ListItem 
                    key = {index}
                    title = {item.name}
                    subtitle = {item.description}
                    hideChevron = {true}
                    onPress = {() => navigate('Dishdetail' , { dishId : item.id })}
                    // what this means is that on clicking move to dishdetail and it is also passing value to dishdetail component
                    leftAvatar = {{ source: require('./images/uthappizza.png')}}
                />
            )
        }

        // So what we're doing here is that this.props, the props that come from this component will contain
        // one property which is navigation, and I am just extracting it out like this here.
        // Now, I'm going to need this in order to pass the information from menu component when I press on an item in the menu component.
        const { navigate } = this.props.navigation; 

        return (
            <FlatList 
                data = {this.state.dishes}
                renderItem = {renderMenuItem}
                keyExtractor = {item => item.id.toString()}
            />
        )
    }
}

export default Menu;