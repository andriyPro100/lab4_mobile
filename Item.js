import React, {Component} from 'react'
import {Text, View, Image, StyleSheet} from "react-native";

class ItemFilm extends Component {
    constructor(props) {
        super();
        this.state = {
            title: props.title,
            year: props.year,
            type: props.type,
            poster: "",
        }
        this.setImage(props.poster)
    }
    setImage=(poster)=>{
        switch(poster) {
            case "Poster_01.jpg":
                this.state.poster = require("../src/Posters/Poster_01.jpg");
                break;
            case "Poster_02.jpg":
                this.state.poster = require("../src/Posters/Poster_02.jpg");
                break;
            case "Poster_03.jpg":
                this.state.poster = require("../src/Posters/Poster_03.jpg");
                break;

            case "Poster_05.jpg":
                this.state.poster = require("../src/Posters/Poster_05.jpg");
                break;
            case "Poster_06.jpg":
                this.state.poster = require("../src/Posters/Poster_06.jpg");
                break;
            case "Poster_07.jpg":
                this.state.poster = require("../src/Posters/Poster_07.jpg");
                break;
            case "Poster_08.jpg":
                this.state.poster = require("../src/Posters/Poster_08.jpg");
                break;
            case "Poster_10.jpg":
                this.state.poster = require("../src/Posters/Poster_10.jpg");
                break;
            default:
                this.state.poster = require("../src/Posters/Poster_nan.jpg");;
        }
    }

    render() {
        return (
            <View style={styles.item}>
                <Image style={styles.logo} source={this.state.poster}/>
                <View style={styles.information}>
                    <Text style={{fontSize: 14}}>{this.state.title}</Text>
                    <Text style={{marginVertical: 10, fontSize: 12}}>{this.state.year}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        borderRadius: 20,
        backgroundColor: '#ccfcf6',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: "6%",
        flexDirection: "row",
        borderColor: 'gray',
        borderWidth: 1,
    },
    logo: {
        borderRadius: 10,
        width: 150,
        height: 233,
    },
    information: {
        margin: "3%",
        width: "50%",
    },
});

export default ItemFilm
