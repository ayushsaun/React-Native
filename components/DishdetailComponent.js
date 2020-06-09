import React , { Component } from 'react'
import { View , Text , ScrollView , FlatList } from 'react-native'
import { Card , Icon } from 'react-native-elements'
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'

// here we passed the full info of dish which we clicked on
function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return (
            // Now, In Icon if I use the prop or attribute as raised for the Icon,
            // what this does is it displays the Icon in the form of a button, a rounded button.
            <Card
                featuredTitle = {dish.name}
                image = {require('./images/uthappizza.png')}
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
    
    constructor(props) {
        super(props)
        this.state = {
            dishes : DISHES,
            comments : COMMENTS,
            favorites : [] // thats an empty array for storing list of favourite dishes
        }
    }

    markFavorite(dishId) {
        this.setState({
            favorites : this.state.favorites.concat(dishId)
        })
    }

    static navigationOptions = {
        title: 'Dish Details' // this will show title as Dish Details when ever it is configured
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId' , '')
        return(
            // In {this.state.dishes[+dishId]} dishId is a string so putting a "+" will turn it into a number
            <ScrollView>
                <RenderDish dish= {this.state.dishes[+dishId]} 
                    favorite = {this.state.favorites.some(el => el == dishId)}
                    onPress = {() => this.markFavorite(dishId)}
                /> 
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )   
    }
}

export default Dishdetail