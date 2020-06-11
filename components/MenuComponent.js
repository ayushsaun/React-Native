import React , { Component } from 'react'
import { View , FlatList } from 'react-native'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}


class Menu extends Component {

    static navigationOptions = {
        title: 'Menu' // this will show title as menu when ever it is configured
    }

    render() {

        
        const renderMenuItem = ({item , index}) => {
            return (
                <Tile 
                    key = {index}
                    title = {item.name}
                    caption = {item.description}
                    featured
                    onPress = {() => navigate('Dishdetail' , { dishId : item.id })}
                    // what this means is that on clicking move to dishdetail and it is also passing value to dishdetail component
                    imageSrc = {{ uri: baseUrl + item.image }}
                />
            )
        }

        // So what we're doing here is that this.props, the props that come from this component will contain
        // one property which is navigation, and I am just extracting it out like this here.
        // Now, I'm going to need this in order to pass the information from menu component when I press on an item in the menu component.
        const { navigate } = this.props.navigation; 

        return (
            <FlatList 
                data = {this.props.dishes.dishes}
                renderItem = {renderMenuItem}
                keyExtractor = {item => item.id.toString()}
            />
        )
    }
}

export default connect(mapStateToProps)(Menu);