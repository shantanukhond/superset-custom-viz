/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { SupersetPluginChartEmail1Props } from './types';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Define styles for the PDF
const Styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: '1px solid #ccc',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
});

// Sample JSON data
const jsonData = [
  { id: 1, name: 'John Doe', age: 28, occupation: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', age: 34, occupation: 'Product Manager' },
  { id: 3, name: 'Sam Johnson', age: 25, occupation: 'Designer' },
];

// Define the document structure
const MyDocument = () => (
  <Document>
    <Page size="A4" style={Styles.page}>
      <Text style={Styles.title}>User Information</Text>
      {jsonData.map(user => (
        <View key={user.id} style={Styles.section}>
          <Text style={Styles.text}>ID: {user.id}</Text>
          <Text style={Styles.text}>Name: {user.name}</Text>
          <Text style={Styles.text}>Age: {user.age}</Text>
          <Text style={Styles.text}>Occupation: {user.occupation}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default function SupersetPluginChartEmail1(
  props: SupersetPluginChartEmail1Props,
) {
  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  // Function to handle PDF download
  const handleDownload = async () => {
    const blob = await pdf(<MyDocument />).toBlob();
    saveAs(blob, 'user_information.pdf');
  };

  return (
    <div style={{ height: '100%!important'}} ref={rootElem}>
      <button
        onClick={handleDownload}
        style={{
          margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download PDF
      </button>
      <PDFViewer style={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
