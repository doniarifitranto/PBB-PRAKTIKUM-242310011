import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
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
        <Ionicons name="book" size={60} color="#49745e" style={styles.logoIcon} />
        <Text style={styles.title}>Readly+</Text>
        <Text style={styles.subtitle}>Sign up to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#a0aab2"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#a0aab2"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor="#a0aab2"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Retype Password"
            value={retypePassword}
            onChangeText={setRetypePassword}
            secureTextEntry={!showRetypePassword}
            autoCapitalize="none"
            placeholderTextColor="#a0aab2"
          />
          <TouchableOpacity onPress={() => setShowRetypePassword(!showRetypePassword)} style={styles.eyeIcon}>
            <Ionicons name={showRetypePassword ? "eye-outline" : "eye-off-outline"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

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
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/module-latihan/latihan8/signin")}>
          <Text style={styles.loginLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logoIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
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
    flex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: "#fff",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  signUpButton: {
    backgroundColor: "#49745e",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
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
    marginBottom: 40,
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
