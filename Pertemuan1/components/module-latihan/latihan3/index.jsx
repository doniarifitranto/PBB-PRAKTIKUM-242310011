import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ImageBackground } from 'react-native';
export default function index() {
 const biodata= {
    name: "Anton Sukamto",
    nim: "20200101",
    address: "Tajur",
    email: "anton@gmail.com",
    phone: "0856712283",
    hobbies : [
      "Makan",
      "Tidur",
      "Nonton"
    ],
    education : {
      univ : "IBIK",
      major : "Teknologi Informasi",
      year : 2024
    },
    gender : "Laki-laki",
  };

  return (
    <ImageBackground
      source={require("../../../assets/avatar/image.png")}
      style={{flex: 1,}}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../../assets/avatar/profile.png")}
          style={styles.img_avatar}
        />
        <Text style={styles.title}>{biodata.name}</Text>
        <Text style={styles.sub_title}>{biodata.nim}</Text>

        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Phone</Text>
            <TextInput
              value={biodata.phone}
              style={styles.identity.input_text}
              autoFocus
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Email</Text>
            <TextInput
              value={biodata.email}
              style={styles.identity.input_text}
              autoFocus
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Hobbies</Text>
            <TextInput
              value={biodata.hobbies}
              style={styles.identity.input_text}
              autoFocus
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>University</Text>
            <TextInput
              value={`${biodata.education.univ} - ${biodata.education.major} - ${biodata.education.year}`}
              style={styles.identity.input_text}
              autoFocus
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Gender</Text>
            <TextInput
              value={biodata.gender}
              style={styles.identity.input_text}
              autoFocus
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Address</Text>
            <TextInput
              value={biodata.address}
              style={styles.identity.input_text}
              autoFocus
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{marginTop : 10, width : "99%"}}>
          <TouchableOpacity
            style = {styles.identity.button}>
            <Text
              style = {styles.identity.button_text}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent : "center",
    paddingHorizontal: 15,
  },
  img_avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop : 50,
    borderColor: "#000000",
    borderWidth: 1,
    padding: 0,
    backgroundColor: "#f2f2f2",
    resizeMode: "cover"
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  sub_title: {
    fontSize: 15,
    marginBottom: 5,
  },
  identity: {
    container : {
      alignSelf : "stretch",
      padding : 5,
      marginTop : 10,
    },
    card_input : {
      borderWidth : 1,
      borderColor : "#9b9d9f",
      borderRadius : 10,
      paddingHorizontal : 10,
      paddingVertical : 5,
      marginBottom : 5,
    },
    title : {
      fontSize : 16,
      color : "#9b9d9f",
      marginBottom : 0,
    },
    input_text : {
      color : "#000",
      fontSize : 16,
      padding : 0,
    },
    button : {
      alignSelf : "stretch",
      padding : 15,
      borderRadius : 10,
      backgroundColor : "#fdae05",
    },
    button_text : {
      color : "white",
      textAlign : "center",
      fontSize : 18,
      fontWeight : "600",
    },
  },
});