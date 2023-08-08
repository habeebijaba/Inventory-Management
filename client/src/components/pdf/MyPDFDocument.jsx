import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Table from '../table/Table';

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const columns = [
  { field: "id", header: "ID" },
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
  { field: "mobile", header: "Mobile" },
  { field: "address", header: "Address" },
];

// Create MyPDFDocument component
const MyPDFDocument = ({ dataToPrint }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        {/* <Text style={styles.title}>User List</Text>
        {dataToPrint.map(user => (
          <View key={user._id} style={styles.text}>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text> */}
            {/* Add more fields as needed */}
          {/* </View> */}
        {/* ))} */}
      <Table data={dataToPrint} columns={columns} slug="users" />

      </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
