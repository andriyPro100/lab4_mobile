import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    FlatList,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableHighlight, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Data from "./src/data";
import ItemFilm from "./src/Item";

import { AntDesign } from '@expo/vector-icons';
import {SearchBar} from "react-native-elements";


function DetailScreen({ route, navigation }) {
    const {item} = route.params
    const IF = new ItemFilm({title: item.Title, year: item.Year, type:item.Type, poster: item.Poster})
    const getDetail=({imdb})=>{
        switch(imdb) {
            case "tt0076759":
                return require('./src/Detail/tt0076759.json');
            case "tt0080684":
                return require('./src/Detail/tt0080684.json');
            case "tt0086190":
                return require('./src/Detail/tt0086190.json');
            case "tt0120915":
                return require('./src/Detail/tt0120915.json');
            case "tt0121765":
                return require('./src/Detail/tt0121765.json');
            case "tt0121766":
                return require('./src/Detail/tt0121766.json');
            case "tt0796366":
                return require('./src/Detail/tt0796366.json');
            case "tt2488496":
                return require('./src/Detail/tt2488496.json');
            case "tt2527336":
                return require('./src/Detail/tt2527336.json');
            case "tt3748528":
                return require('./src/Detail/tt3748528.json');
            default:
                return ""
        }
    }

    const HaveDetail = ({imdb}) => {
        const a = getDetail({imdb})
        const listItems = [<Image style={styles.logo} source={IF.state.poster}/>]
        for (var key in a) {
            if ((key === "Poster") || (key === "imdbID")){

            }else {
                listItems.push(
                    <Text style={styles.baseText}>
                        {key}: <Text style={styles.innerText}>{a[key]}</Text>
                    </Text>)
            }
        }
        if ( a !== ""){
            return listItems
        }else {
            return (
                <View>
                    <Image style={styles.logo} source={IF.state.poster}/>
                    <Text style={styles.baseText}>
                        Title: <Text style={styles.innerText}>{item.Title}</Text>
                    </Text>
                    <Text style={styles.baseText}>
                        Year: <Text style={styles.innerText}>{item.Year}</Text>
                    </Text>
                    <Text style={styles.baseText}>
                        Type: <Text style={styles.innerText}>{item.Type}</Text>
                    </Text>
                </View>
            )
        }
    }

    return (
      <View style={{ flex: 1}}>
          <ScrollView>
              <HaveDetail imdb={item.imdbID}/>
          </ScrollView>
      </View>
    )
}

function AddNewFilmScreen({navigation}) {

  function addNewFilm () {
    Data.push({Title: title,
      Year: year,
      Type:type})
    navigation.navigate('Home', {Data})
  }

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  return (
      <View>
        <Text style={{fontSize:20, marginHorizontal: 50, marginTop:10}}>Title</Text>
        <TextInput
            style={{fontSize:20, backgroundColor: "#ffffff", marginHorizontal: 50, marginVertical:10}}
            onChangeText={title => setTitle(title)}
            defaultValue={title}
        />
        <Text style={{fontSize:20, marginHorizontal: 50, marginTop:10}}>Type</Text>
        <TextInput
            style={{fontSize:20, backgroundColor: "#ffffff", marginHorizontal: 50, marginVertical:10}}
            onChangeText={type => setType(type)}
            defaultValue={type}
        />
        <Text style={{fontSize:20, marginHorizontal: 50, marginTop:10}}>Year</Text>
        <TextInput
            style={{fontSize:20, backgroundColor: "#ffffff", marginHorizontal: 50, marginVertical:10}}
            onChangeText={year => setYear(year)}
            defaultValue={year}
        />
        <View style={[{ width: "60%",backgroundColor: "#616161" , marginHorizontal: "20%", marginTop:20}, ]}>
          <Button
              onPress={addNewFilm}
              title="Add"
              color="#000000"
          />
        </View>
      </View>
  )
}

function OptionsScreen({route, navigation}) {
    const {item} = route.params

    const deleteItem = ({item}) => {
        const removedData = Data.splice(Data.indexOf(item), 1)
        navigation.navigate("Home")
    }
    return (
        <View>
            <View style={styles.twoButton}>
                <TouchableHighlight
                    style={styles.button1}
                    onPress={() => navigation.navigate("Detail", {item: item})}>
                    <Text>Details</Text>
                </TouchableHighlight>
                <View >
                    <TouchableHighlight
                        style={styles.button2}
                        onPress={() => deleteItem(item)}>
                        <Text>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

function HomeScreen({navigation}) {
    const [search, setSearch] = useState('');
    const [DataSource, setDataSource] = useState([]);

    const searchFunction = (text) => {
        const newData = []
        if (text) {
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].Title.includes(text)){
                    newData.push(Data[i])
                }
            }
            console.log(newData)
            setDataSource(newData)
            // setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setDataSource(Data)
            setSearch(text);
        }
    };
    let renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableHighlight onPress={() => navigation.navigate('Detail', {item: item})}
                                onLongPress={() => navigation.navigate("Options", {item: item, dataS: setDataSource})}>
                <View>
                    <ItemFilm title={item.Title} year={item.Year} type={item.Type} poster={item.Poster}/>
                </View>
            </TouchableHighlight>
        </View>
    )
    //writeData({Data})
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Search"
                onChangeText={(text) => searchFunction(text)}
                value={search}
                lightTheme={true}/>
            <FlatList
                data={DataSource}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

function NothingScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Nothing</Text>
      </View>
  );
}

const HStack = createStackNavigator();

function HomeStackScreen({navigation}){
  function LogoTitle({navigation}) {
    return (
        <View style={styles.addFilm}>
          <TouchableHighlight onPress={() => navigation.navigate("Add")}>
            <View>
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </TouchableHighlight>
        </View>

    );
  }

  return (

      <Stack.Navigator>
        <HStack.Screen name='Home'
                       component={HomeScreen}
                       options={{headerRight: props => LogoTitle({navigation})}}
        />
        <HStack.Screen name="Detail" component={DetailScreen}/>
        <HStack.Screen name="Add" component={AddNewFilmScreen}/>
          <HStack.Screen name="Options" component={OptionsScreen}/>
      </Stack.Navigator>
  )
}

const Stack = createStackNavigator();

function NothingStackScreen(){
  return (
      <Stack.Navigator>
        <Stack.Screen name="Nothing" component={NothingScreen}/>
      </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

function App() {
  return (
      <NavigationContainer initialRouteName="Home">
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen}/>
          <Tab.Screen name='Nothing' component={NothingStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  addFilm: {
    marginRight: 12 ,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    marginHorizontal: 20,
    marginTop: 0,
  },
  ImageStyle: {
    padding: 0,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
  containerStyle: {
      height: 25,
      width: 25,
      backgroundColor: "#000000"
  },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    logo: {
        flex:1,
        height:466,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    innerText: {
        fontWeight: 'normal',
        marginHorizontal: "120"
    },
    twoButton: {
        fontSize: 20,
        margin:20,
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    button1: {
        borderRadius: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#00ff00",
        padding: 10,
        margin: 20
    },
    button2: {
        borderRadius: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#ff0000",
        padding: 10,
        margin: 20
    }
});

export default App;
