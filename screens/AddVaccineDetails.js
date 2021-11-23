import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import axios from "axios";

const AddVaccineDetails = (props) => {
  return (
    <Layout style={{ flex: 1, alignItems: "center" }}>
      <Layout style={{ width: "80%" }}>
        <Text
          category="h1"
          style={{ textAlign: "center", marginBottom: 40, marginTop: 120 }}
        >
          Add Your Vaccine Details
        </Text>
        <Input placeholder="First Name" style={{ marginBottom: 20 }} />
        <Input placeholder="Last Name" style={{ marginBottom: 20 }} />
        <Input placeholder="Address" style={{ marginBottom: 20 }} />
        <Input placeholder="Dose 1 " style={{ marginBottom: 20 }} />
        <Input placeholder="Dose 2" style={{ marginBottom: 20 }} />

        <Button type="Submit">Submit</Button>
      </Layout>
    </Layout>
  );
};

export default AddVaccineDetails;

const styles = StyleSheet.create({
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8F9BB3",
  },
});
