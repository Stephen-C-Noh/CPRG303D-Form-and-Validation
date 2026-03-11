import { Formik } from "formik";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const employeeValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  employeeId: Yup.string()
    .length(5, "Employee ID must be exactly 5 characters")
    .required("Employee ID is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  department: Yup.string()
    .min(2, "Department must be at least 2 characters")
    .required("Department is required"),
});

export default function EmployeeFormScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Information Form</Text>
      <Text style={styles.subtitle}>
        Fill in all required employee details below.
      </Text>

      <Formik
        initialValues={{
          fullName: "",
          employeeId: "",
          email: "",
          phoneNumber: "",
          department: "",
        }}
        validationSchema={employeeValidationSchema}
        onSubmit={(values, { resetForm }) => {
          Alert.alert("Success", "Employee form submitted successfully!");
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
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                touched.fullName && errors.fullName ? styles.inputError : null,
              ]}
              placeholder="Enter full name"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <Text style={styles.label}>Employee ID</Text>
            <TextInput
              style={[
                styles.input,
                touched.employeeId && errors.employeeId ? styles.inputError : null,
              ]}
              placeholder="e.g. A1234"
              value={values.employeeId}
              onChangeText={handleChange("employeeId")}
              onBlur={handleBlur("employeeId")}
            />
            {touched.employeeId && errors.employeeId && (
              <Text style={styles.errorText}>{errors.employeeId}</Text>
            )}

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

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                touched.phoneNumber && errors.phoneNumber
                  ? styles.inputError
                  : null,
              ]}
              placeholder="Enter 10-digit phone number"
              keyboardType="number-pad"
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <Text style={styles.label}>Department</Text>
            <TextInput
              style={[
                styles.input,
                touched.department && errors.department
                  ? styles.inputError
                  : null,
              ]}
              placeholder="Enter department"
              value={values.department}
              onChangeText={handleChange("department")}
              onBlur={handleBlur("department")}
            />
            {touched.department && errors.department && (
              <Text style={styles.errorText}>{errors.department}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                !(isValid && dirty) ? styles.buttonDisabled : null,
              ]}
              onPress={() => handleSubmit()}
              disabled={!(isValid && dirty)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
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