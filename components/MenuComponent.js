import React , { Component } from 'react'
import { View , FlatList } from 'react-native'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import { Loading } from './LoadingComponent'
import * as Animatable from 'react-native-animatable'

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
                <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000} >
                    <Tile 
                        key = {index}
                        title = {item.name}
                        caption = {item.description}
                        featured
                        onPress = {() => navigate('Dishdetail' , { dishId : item.id })}
                        // what this means is that on clicking move to dishdetail and it is also passing value to dishdetail component
                        imageSrc = {{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            )
        }

        // So what we're doing here is that this.props, the props that come from this component will contain
        // one property which is navigation, and I am just extracting it out like this here.
        // Now, I'm going to need this in order to pass the information from menu component when I press on an item in the menu component.
        const { navigate } = this.props.navigation; 

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>
                        {this.props.dishes.errMess}
                    </Text>
                </View>
            )
        }
        else {
            return (
                <FlatList 
                    data = {this.props.dishes.dishes}
                    renderItem = {renderMenuItem}
                    keyExtractor = {item => item.id.toString()}
                />
            )            
        }

    }
}

export default connect(mapStateToProps)(Menu);