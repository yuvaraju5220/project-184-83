import React,{Component} from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
    Image,
}
    from 'react-native';
import * as Permissions from 'expo-permissions';

import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Filter1 from 'lamapp/screens/Filter1.js';
import Filter2 from 'lamapp/screens/Filter2.js';
import Filter3 from 'screens/Filter3.js';
import Filter4 from 'screens/Filter4.js';
import Filter5 from 'screens/Filter5.js';
let data = {
 animals:[
    {
        id: '1',
        image: require("lamapp/assets/dog.png"),

    },],
 princess:[
    {
        id: '2',
        image: require("lamapp/assets/princess.png"),

    },],
 filters:[
    {
        id: '3',
        image: require("assets/crown-pic1.png"),

    },
    {
        id: '4',
        image: require("assets/crown-pic2.png"),

    },
    {
        id: '5',
        image: require("assets/crown-pic5.png"),

    },
 ]



}


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            faces: [],
            current_filter:"Filter_1",
            selected:"filters",
        };
            

            this.onFacesDetected = this.onFacesDetected.bind(this);
            this.onCameraPermission = this.onCameraPermission.bind(this);
            this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
           
      }
      componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
    }

    onCameraPermission({ status }) {
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces });
    }

    onFaceDetectionError(error) {
        console.log(error);
    }

    
    
    
    
    
    
    
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.titleText1}>lam</Text>
                        <Text style={styles.titleText2}>APP</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.subheading1}>Try Our</Text>
                        <Text style={styles.subheading2}> filters</Text>
                    </View>

                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {this.state.faces.map((face) => {
                        if (this.state.current_filter==="Filter_1"){
                        return <Filter1 key={face.faceID} face={face} />;}
                        else if (this.state.current_filter==="Filter_2"){
                            return <Filter2 key={face.faceID} face={face} /> }
                        else if (this.state.current_filter==="Filter_3"){
                            return <Filter2 key={face.faceID} face={face} /> }
                        else if (this.state.current_filter==="Filter_4"){
                            return <Filter2 key={face.faceID} face={face} /> }
                        else if (this.state.current_filter==="Filter_2"){
                            return <Filter2 key={face.faceID} face={face} /> }
                                      
                    
                    })}
                </View>
                <View style={styles.framesContainer}>
                <View style={styles.categoryContainer} >
                <TouchableOpacity  
				style={ this.state.selected == 'animals' ? styles.categoryBoxSelected : styles.categoryBox }
				onPress={() => this.setState({ selected: `animals` })}
				>
					<Text>animals</Text>
					
				</TouchableOpacity>
                <TouchableOpacity  
				style={ this.state.selected == 'princess' ? styles.categoryBoxSelected : styles.categoryBox }
				onPress={() => this.setState({ selected: `princess` })}
				>
					<Text>princess</Text>
					
				</TouchableOpacity>
                <TouchableOpacity  
				style={ this.state.selected == 'filters' ? styles.categoryBoxSelected : styles.categoryBox }
				onPress={() => this.setState({ selected: `filters` })}
				>
					<Text>filters</Text>
					
				</TouchableOpacity>


                </View>

                    <ScrollView
                        style={{ flexDirection: 'row' }}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {data.map((filter_data) => {
                            return (
                                <TouchableOpacity
                                    style={styles.filterImageContainer}
                                    onPress={() =>
                                        this.setState({ current_filter: `filter_${fltier_data.id}` })
                                    }>
                                    <Image source={filter_data.image} style={{ height: 32, width: 80 }} />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

            </View>
            
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headingContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6278e4',
    },
    titleText1: {
        fontSize: RFValue(30),
        fontWeight: 'bold',
        color: '#efb141',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1,
    },
    titleText2: {
        fontSize: RFValue(30),
        fontWeight: 'bold',
        color: 'white',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1,
    },
    subheading1: {
        fontSize: RFValue(20),
        color: '#efb141',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1,
    },
    subheading2: {
        fontSize: RFValue(20),
        color: 'white',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1,
    },
    cameraStyle: {
        flex: 0.65,
    },
    framesContainer: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: '#6278e4',
    },
    filterImageContainer: {
        height: RFPercentage(8),
        width: RFPercentage(15),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e7f8',
        borderRadius: 30,
        marginRight: 20,
    },
});

