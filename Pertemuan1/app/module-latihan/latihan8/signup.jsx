import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Validasi sederhana
    if (!username.trim() || !email.trim() || !password.trim() || !retypePassword.trim()) {
      Alert.alert("Error", "Semua field harus diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Format email tidak valid");
      return;
    }

    if (password !== retypePassword) {
      Alert.alert("Error", "Password dan Re-Type Password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: "https://fakestoreapi.com/users",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          username: username,
          password: password,
          name: {
            firstname: "New",
            lastname: "User"
          },
          address: {
            city: "kilcoole",
            street: "7835 new road",
            number: 3,
            zipcode: "12926-3874",
            geolocation: {
              lat: "-37.3159",
              long: "81.1496"
            }
          },
          phone: "1-570-236-7033"
        },
        timeout: 5000,
      });

      console.log("Register response:", response.data);

      if (response.data) {
        Alert.alert("Success", "Akun berhasil dibuat!", [
          {
            text: "OK",
            onPress: () => {
              router.replace("/module-latihan/latihan8/signin");
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Gagal membuat akun");
      }
    } catch (error) {
      console.error("Register error:", error);
      Alert.alert("Error", "Gagal membuat akun");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Readly+</Text>
        <Text style={styles.subtitle}>Sign up to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Retype Password"
          value={retypePassword}
          onChangeText={setRetypePassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]} 
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signUpButtonText}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/module-latihan/latihan8/signin")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#49745e",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#49745e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signUpButtonDisabled: {
    backgroundColor: "#9cb4a6",
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "gray",
    fontSize: 14,
  },
  loginLink: {
    color: "#49745e",
    fontWeight: "bold",
    fontSize: 14,
  },
});
