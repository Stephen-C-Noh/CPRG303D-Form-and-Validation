import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your account details below.</Text>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInValidationSchema}
        onSubmit={(values, { resetForm }) => {
          Alert.alert("Success", "Signed in successfully!");
          console.log(values);
          resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                touched.email && errors.email ? styles.inputError : null,
              ]}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  touched.password && errors.password ? styles.inputError : null,
                ]}
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                !(isValid && dirty) ? styles.buttonDisabled : null,
              ]}
              onPress={() => handleSubmit()}
              disabled={!(isValid && dirty)}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f7f8fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  toggleText: {
    color: "#000000",
    fontWeight: "600",
  },
  inputError: {
    borderColor: "#d9534f",
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});