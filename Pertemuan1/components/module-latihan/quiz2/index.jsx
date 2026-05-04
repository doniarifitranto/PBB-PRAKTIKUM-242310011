import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ImageBackground } from 'react-native';
import { useState } from 'react';
export default function index() {

    const [name, setName] = useState("Doni Arifitranto");
    const [nim, setNim] = useState("2423203");
    const [address, setAddress] = useState("Bogoror");
    const [email, setEmail] = useState("antonsukamto@gmail.com");
    const [phone, setPhone] = useState("08476464");
    const [hobbies, setHobbies] = useState("Makan, Tidur, Nonton");
    const [univ, setUniv] = useState("IBIK");

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
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.sub_title}>{phone}</Text>
        <Text style={styles.sub_title}>{email}</Text>
        <Text style={styles.sub_title}>{hobbies}</Text>
        <Text style={styles.sub_title}>{univ}</Text>
        <Text style={styles.sub_title}>{address}</Text>

        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.identity.input_text}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.identity.input_text}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.identity.input_text}
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Hobbies</Text>
            <TextInput
              value={hobbies}
              onChangeText={setHobbies}
              style={styles.identity.input_text}
            />
          </View>
        </View>
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>University</Text>
            <TextInput
              value={univ}
              style={styles.identity.input_text}
              onChangeText={setUniv}
            />
          </View>
        </View>
        
        <View style={styles.identity.container}>
          <View style={styles.identity.card_input}>
            <Text style={styles.identity.title}>Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              style={styles.identity.input_text}
            />
          </View>
        </View>
        <View style={{marginTop : 10, width : "99%"}}>
          <TouchableOpacity
            style={styles.identity.button}
          >
            <Text
              style={styles.identity.button_text}>
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