import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString !== null) {
        // Already logged in
        router.replace("/module-latihan/latihan8/(drawer)");
      }
    } catch (error) {
      console.warn("Error checking login status:", error);
    }
  };

  const handleSignIn = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Password cannot be empty");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: "https://fakestoreapi.com/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: username,
          password: password,
        },
        timeout: 5000,
      });

      console.log("Login response:", response.data);

      if (response.data && response.data.token) {
        const userData = {
          username: username,
          token: response.data.token,
          loginTime: new Date().toISOString(),
        };

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await AsyncStorage.setItem("authToken", response.data.token);

        Alert.alert("Success", `Welcome back, ${username}!`, [
          {
            text: "OK",
            onPress: () => {
              router.replace("/module-latihan/latihan8/(drawer)");
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Invalid response from server");
      }
    } catch (error) {
      let errorMessage = "Failed to process request";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid username or password";
        } else {
          errorMessage = `Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Check your internet connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred";
      }
      Alert.alert("Error", errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="book" size={60} color="#49745e" style={styles.logoIcon} />
        <Text style={styles.title}>Readly+</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username (e.g. mor_2314)"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#a0aab2"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password (e.g. 83r5^_)"
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

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.signInButton, isLoading && styles.signInButtonDisabled]} 
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome5 name="google" size={18} color="#db4a39" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome5 name="facebook" size={18} color="#4267B2" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/module-latihan/latihan8/signup")}>
          <Text style={styles.registerLink}>Sign Up</Text>
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
  forgotPassword: {
    textAlign: "right",
    color: "gray",
    fontSize: 12,
    marginBottom: 25,
    fontWeight: "bold",
  },
  signInButton: {
    backgroundColor: "#49745e",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonDisabled: {
    backgroundColor: "#9cb4a6",
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    marginHorizontal: 10,
    color: "gray",
    fontSize: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    height: 55,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  socialIcon: {
    position: "absolute",
    left: 20,
  },
  socialButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  registerText: {
    color: "gray",
    fontSize: 14,
  },
  registerLink: {
    color: "#49745e",
    fontWeight: "bold",
    fontSize: 14,
  },
});
