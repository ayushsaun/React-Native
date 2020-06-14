import React , { Component } from 'react'
import { View , Text , ScrollView , FlatList , StyleSheet , Button , Modal } from 'react-native'
import { Card , Icon , Rating , Input } from 'react-native-elements'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import { postFavorite , addComment, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))

});


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
                <View style = {styles.fontRow}>
                    <Icon 
                        style = {{ flex: 1 }}
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type="font-awesome"
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress() } />
                    <Icon 
                        style = {{ flex: 1 }}
                        raised
                        reverse
                        name= 'pencil'
                        type="font-awesome"
                        color='#9400D3'
                        onPress = {() => { props.toggleModal() }} 
                            />
                </View> 
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
        super(props);
        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.ratingCompleted = this.ratingCompleted.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
        this.resetForm();
    }

    handleReservation(dishId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
        this.resetForm();
    }    

    resetForm () {
        this.setState({
            Rating: 1, 
            Author: '',
            Comment: ''
        })
    }

    ratingCompleted(rating) {
        this.setState({
          'rating': rating
        });
    }

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
                    onPress={()=>this.markFavorite(dishId)} toggleModal={()=>this.toggleModal()}
                />
                <Modal
                    animationType = {'slide'}
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm()}}
                    >
                        <View style = {styles.modal}>
                            <Rating
                                showRating
                                ratingCount={5}
                                style={{ paddingVertical: 10 }}
                                startingValue={this.state.rating}
                                onFinishRating={this.ratingCompleted}
                            />
                            <Input
                                placeholder='Author'
                                value={this.state.author}
                                onChangeText={(text) => this.setState({author: text})}
                                leftIcon={
                                <Icon
                                    name='user'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                    containerStyle={{margin: 10}}
                                />
                                }
                            />
                            <Input
                                placeholder='Comment'
                                value={this.state.comment}
                                onChangeText={(text) => this.setState({comment: text})}
                                leftIcon={
                                <Icon
                                    name='comments'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                    containerStyle={{margin: 10}}
                                />
                                }
                            />
                            <Button
                                onPress={() => { this.handleReservation(dishId); } }
                                color='#512DA8'
                                raised
                                title='Submit'
                            />
                            <Button
                            onPress={() => { this.toggleModal(); } }
                            title='Cancel'
                            />
                        </View>
                </Modal>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )   
    }
}

const styles = StyleSheet.create({  
    fontRow: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        margin: 20
    },
    modal: {
        justifyContent: "center",
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);