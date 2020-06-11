import React , { Component } from 'react'
import { View , Text , ScrollView , FlatList } from 'react-native'
import { Card , Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import { postFavorite } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

// here we passed the full info of dish which we clicked on
function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return (
            // Now, In Icon if I use the prop or attribute as raised for the Icon,
            // what this does is it displays the Icon in the form of a button, a rounded button.
            <Card
                featuredTitle = {dish.name}
                image = {{ uri: baseUrl + dish.image }}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon 
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type="font-awesome"
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress() } /> 
            </Card>
            // So here, when I press that, I'm going to check to see if this is already my favorite dish,
            // if it is already my favorite dish, I will simply say 'Already favorite'.
            // Otherwise, I'm going to call props.onPress() and then we will close off the icon here.
            // So, again, using the props.favorite, if it is true, then I'm going to simply log out saying it's already in the favorites.
            // If it's false, then I'm going to call the onPress(), which will be passed in as a parameter here.
        );
    }
    else {
        return(
            <View></View>
        )
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item , index }) => {
        return (
            <View key = {index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return (
        <Card title="Comments">
            <FlatList
                data = {comments}
                renderItem = {renderCommentItem}
                keyExtractor = {item => item.id.toString()}
            />
        </Card> 
    )
}

class Dishdetail extends Component {

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details' // this will show title as Dish Details when ever it is configured
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId' , '')
        return(
            // In {this.state.dishes[+dishId]} dishId is a string so putting a "+" will turn it into a number
            <ScrollView>
                <RenderDish dish= {this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress = {() => this.markFavorite(dishId)}
                /> 
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);