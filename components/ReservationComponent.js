import React , { Component } from 'react'
import { Text , View , ScrollView , StyleSheet , Picker , Switch , Button , Modal , Alert } from 'react-native'
import { Card } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    
    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleReservation() {
        return (
            console.log(JSON.stringify(this.state)),
            this.toggleModal()
        )   
    }
 
    resetForm() {
        return (
            this.setState({
                guests: 1,
                smoking: false,
                date: ''
            })
        )
    }

    // this function basically ecapsulates the obtaining of the permission for putting the notifications
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show calendar');
            }
        }
        return permission;
    }

    // this is the date we used for reservation using reservation form
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        // inside this we will configure the local notification to be presented
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                channelId: "notify",
                color: '#512DA8'
            }
        })
    }

    async obtainCalendarPermission(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        
        if(permission.status !== 'granted'){
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            
            if(permission.status !== 'granted'){
                Alert.alert('Permission not granted to access calendar');
            }
        }
        return permission;
    }
    
    async addReservationToCalendar(date){
        await this.obtainCalendarPermission();

        console.log(new Date(Date.parse(date)) + 2*60*60*1000);
        
        Calendar.createEventAsync(Calendar.DEFAULT, {
            title: "Con Fusion Table Reservation",
            color: '#512DA8',
            name: 'Your Reservation',
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date)+2*60*60*1000),
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Kowloon, Hong Kong'
        });
    } 

    render() {

        return (

            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000} >
                    <View style = {styles.formRow}>
                        <Text style = {styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style = {styles.formItem}
                            selectedValue = {this.state.guests}
                            onValueChange = {( itemValue , itemIndex ) => this.setState({ guests: itemValue })}
                            >
                                <Picker.Item label='1' value='1' />
                                <Picker.Item label='2' value='2' />
                                <Picker.Item label='3' value='3' />
                                <Picker.Item label='4' value='4' />
                                <Picker.Item label='5' value='5' />
                                <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style = {styles.formRow}>
                        <Text style = {styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style = {styles.formItem}
                            value = {this.state.smoking}
                            onTintColor = '#512DA8'
                            onValueChange = {(value) => this.setState({ smoking: value })}
                            >

                        </Switch>
                    </View>
                    <View style = {styles.formRow}>
                        <Text style = {styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style = {{ flex: 2 }}
                            date = {this.state.date}
                            format = ''
                            mode = 'datetime'
                            placeholder = 'select date and time'
                            minDate = '2020-01-01'
                            confirmBtnText = 'Confirm'
                            cancelBtnText = 'Cancel'
                            customStyles = {{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange = {(date) => {this.setState({date: date})}}
                            />    
                    </View>
                    <View style = {styles.formRow}>
                        <Button
                            title = 'Reserve'
                            color = "#512DA8"
                            onPress = {() => {
                                Alert.alert(
                                    'Your Reservation OK?',
                                    'Number of Guests: '+ this.state.guests + "\n" + ' Smoking?: ' + this.state.smoking + "\n" +  'Date and Time: ' + this.state.date,
                                    [
                                         {
                                            text: 'Cancel' ,
                                             onPress: () => this.resetForm(),
                                             style: 'cancel'
                                         },
                                         {
                                             text: 'OK',
                                             onPress: () => { 
                                                this.addReservationToCalendar(this.state.date);
                                                this.presentLocalNotification(this.state.date)
                                                this.resetForm() 
                                            }                                         
                                        }
                                     ],
                                     {cancelable: false}
                                     // this means user need to select out of cancel or ok otherwise they cannot cancel the alert
                                )                      
                             }}
                            accessibilityLabel = 'Learn more about this purple button'
                        />
                    </View>
                </Animatable.View>
                <Modal
                    animationType = {'slide'}
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose = {() => {this.toggleModal(); this.resetForm()}}
                    >
                        <View style = {styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>smoking? : {this.state.smoking? 'Yes':'No'}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                            <Button
                                onPress = {() => {this.toggleModal(); this.resetForm()}}
                                color = '#512DA8'
                                title = "Close"
                                />
                        </View>
                </Modal>
            </ScrollView>

        )
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: '#512DA8',
        textAlign: "center",
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation