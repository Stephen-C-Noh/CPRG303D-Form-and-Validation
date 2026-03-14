import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ title: "Create Account" });
  }, [navigation]);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    Alert.alert(
      "Account Created",
      `Welcome, ${values.fullName}! Your account has been created successfully.`,
      [{ text: "OK", onPress: resetForm }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f8fa" }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
        validateOnBlur
      >
        {({
          handleChange,
          setFieldTouched,
          handleSubmit: formikSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
          dirty,
          resetForm,
        }) => (
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create your account below.</Text>

            <SimpleField
              label="Full Name"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onBlur={() => setFieldTouched("fullName", true)}
              error={errors.fullName}
              touched={touched.fullName}
              placeholder="Enter full name"
              autoCapitalize="words"
            />

            <SimpleField
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email", true)}
              error={errors.email}
              touched={touched.email}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <PasswordField
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password", true)}
              error={errors.password}
              touched={touched.password}
              hint="Min 8 chars, one uppercase letter, one number"
            />

            <PasswordField
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={() => setFieldTouched("confirmPassword", true)}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || !dirty || isSubmitting) && styles.buttonDisabled,
              ]}
              onPress={() => formikSubmit()}
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resetButton, !dirty && styles.resetButtonDisabled]}
              onPress={() => resetForm()}
              disabled={!dirty}
            >
              <Text
                style={[
                  styles.resetButtonText,
                  !dirty && styles.resetButtonTextDisabled,
                ]}
              >
                Clear Fields
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.back()}
            >
              <Text style={styles.linkText}>
                Already have an account?{" "}
                <Text style={styles.linkHighlight}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type SimpleFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
};

function SimpleField({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
}: SimpleFieldProps) {
  const [focused, setFocused] = useState(false);
  const showError = touched && !!error;
  const showSuccess = touched && !error && value.length > 0;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          showError && styles.inputError,
          showSuccess && styles.inputSuccess,
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => { setFocused(false); onBlur(); }}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
      {showSuccess && <Text style={styles.successText}>Looks good</Text>}
    </View>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  hint?: string;
};

function PasswordField({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  hint,
}: PasswordFieldProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const showError = touched && !!error;
  const showSuccess = touched && !error && value.length > 0;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.passwordContainer,
          focused && styles.inputFocused,
          showError && styles.inputError,
          showSuccess && styles.inputSuccess,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => { setFocused(false); onBlur(); }}
          onFocus={() => setFocused(true)}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          onPressIn={() => setShowPassword(true)}
          onPressOut={() => setShowPassword(false)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
        </Pressable>
      </View>
      {hint && !showError && <Text style={styles.hintText}>{hint}</Text>}
      {showError && <Text style={styles.errorText}>{error}</Text>}
      {showSuccess && <Text style={styles.successText}>Looks good</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
    justifyContent: "center",
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
  inputFocused: {
    borderColor: "#2563eb",
  },
  inputError: {
    borderColor: "#d9534f",
  },
  inputSuccess: {
    borderColor: "#16a34a",
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
  hintText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    fontSize: 12,
    color: "#16a34a",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  resetButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  resetButtonTextDisabled: {
    color: "#9ca3af",
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  linkHighlight: {
    color: "#2563eb",
    fontWeight: "700",
  },
});
