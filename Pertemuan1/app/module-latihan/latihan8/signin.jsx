import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        <Text style={styles.title}>Readly+</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username (e.g. mor_2314)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password (e.g. 83r5^_)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

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

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/module-latihan/latihan8/signup")}>
            <Text style={styles.registerLink}>Sign Up</Text>
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
  forgotPassword: {
    textAlign: "right",
    color: "gray",
    fontSize: 12,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "#49745e",
    padding: 15,
    borderRadius: 8,
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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
