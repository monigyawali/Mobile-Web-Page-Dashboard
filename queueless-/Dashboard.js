import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// Uses the correct import for your existing "@expo/vector-icons" package
import { Ionicons } from '@expo/vector-icons'; 
import styles from './DashboardStyles';

// Mock Data Structure
const initialServiceData = [
  { id: 1, name: "Library Check-Out", prefix: "L", length: 5, serving: 101, status: "Active" },
  { id: 2, name: "Administration & Registrations", prefix: "A", length: 12, serving: 205, status: "Active" },
  { id: 3, name: "Fee Payment Counter", prefix: "F", length: 3, serving: 310, status: "Low Traffic" },
  { id: 4, name: "Technical Support", prefix: "T", length: 25, serving: 400, status: "High Traffic" },
];

const initialMyToken = 'A206'; 
const updateInterval = 5000; 

// --- Helper Functions (Defined OUTSIDE the component to ensure Hooks safety) ---

const calculateWaitTime = (serviceData) => {
    const totalQueueLength = serviceData.reduce((sum, service) => sum + service.length, 0);
    const waitTimeMinutes = totalQueueLength * 5; 
    
    if (waitTimeMinutes < 60) {
      return totalQueueLength > 0 ? `${waitTimeMinutes} min` : 'No Wait';
    } else {
      const hours = Math.floor(waitTimeMinutes / 60);
      const minutes = waitTimeMinutes % 60;
      return `${hours} hr ${minutes} min`;
    }
};

const getStatusStyle = (status) => {
    if (status.includes('High')) {
      return styles.statusHigh;
    } else if (status.includes('Low')) {
      return styles.statusLow;
    }
    return styles.statusNormal;
};

const renderMetricCard = (title, value, subtitle, iconName, color) => (
  <View style={[styles.metricCard, { borderTopColor: color }]}>
    <View style={styles.metricHeader}>
      <Ionicons 
          name={iconName}
          size={24} 
          color={color} 
          style={{ marginRight: 8 }} 
      />
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
    <Text style={[styles.metricValue, { color: color }]}>{value}</Text>
    <Text style={styles.metricSubtitle}>{subtitle}</Text>
  </View>
);


export default function Dashboard() {
  // --- Hooks must be defined here at the top level ---
  const [serviceData, setServiceData] = useState(initialServiceData);
  const [myToken, setMyToken] = useState(initialMyToken);
  const [nextToken, setNextToken] = useState('A207');
  const [totalServed, setTotalServed] = useState(512);

  // --- Real-time Data Simulation Logic (Hook) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceData(prevData => {
        const newData = prevData.map(service => {
          if (service.serving < 999) {
            service.serving += 1;
          }
          if (service.length > 0) {
            service.length -= 1;
          }
          return service;
        });

        // Update user's 'Next Token' status based on the Administration queue
        const adminQueue = newData.find(s => s.prefix === 'A');
        if (adminQueue) {
          const userTokenNumber = parseInt(myToken.substring(1));
          if (userTokenNumber === adminQueue.serving + 1) {
            setNextToken('You are next!');
          } else if (userTokenNumber === adminQueue.serving) {
            setNextToken('NOW SERVING YOU!');
          } else {
            setNextToken(`${adminQueue.prefix}${adminQueue.serving + 1}`);
          }
        }
        
        return [...newData];
      });

      setTotalServed(prevCount => prevCount + Math.floor(Math.random() * 3));

    }, updateInterval);

    return () => clearInterval(interval);
  }, [myToken]);


  // --- Event Handler ---
  const handleJoinQueue = () => {
    const adminIndex = serviceData.findIndex(s => s.id === 2);
    if (adminIndex !== -1) {
      const adminQueue = serviceData[adminIndex];
      const newTokenNumber = adminQueue.serving + adminQueue.length + 1;
      const newToken = `A${newTokenNumber}`;
      
      setMyToken(newToken);
      
      setServiceData(prevData => {
        const newData = [...prevData];
        newData[adminIndex].length += 1;
        return newData;
      });

      Alert.alert(
        "Token Generated",
        `You have joined the Administration queue. Your token is ${newToken}.`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header with Logo and Action Button */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Queueless Dashboard</Text>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinQueue}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.joinButtonText}>Join New Queue</Text>
        </TouchableOpacity>
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        {renderMetricCard(
          "Estimated Wait Time",
          calculateWaitTime(serviceData), // Pass serviceData as argument
          "Across all active services.",
          "time-outline",
          '#d9534f'
        )}
        {renderMetricCard(
          "Your Current Token",
          myToken,
          `Next up: ${nextToken}`,
          "ticket-outline",
          '#007bff'
        )}
        {renderMetricCard(
          "Total Served Today",
          totalServed.toString(),
          "Data resets at midnight.",
          "checkmark-done-circle-outline",
          '#5cb85c'
        )}
      </View>

      {/* Services Status Table/List */}
      <View style={styles.queueListContainer}>
        <Text style={styles.sectionTitle}>Active Service Queues</Text>
        
        {/* Table Header */}
        <View style={[styles.queueRow, styles.queueHeader]}>
            <Text style={[styles.queueCell, styles.headerText, { flex: 3 }]}>Service Name</Text>
            <Text style={[styles.queueCell, styles.headerText, { flex: 1.5 }]}>Queue</Text>
            <Text style={[styles.queueCell, styles.headerText, { flex: 2.5, textAlign: 'center' }]}>Serving</Text>
            <Text style={[styles.queueCell, styles.headerText, { flex: 2, textAlign: 'right' }]}>Status</Text>
        </View>

        {/* Table Rows */}
        {serviceData.map((service) => (
          <View key={service.id} style={styles.queueRow}>
            <Text style={[styles.queueCell, styles.rowText, { flex: 3 }]}>{service.name}</Text>
            <Text style={[styles.queueCell, styles.rowText, { flex: 1.5 }]}>{service.length}</Text>
            <Text style={[styles.queueCell, styles.rowText, styles.servingToken, { flex: 2.5, textAlign: 'center' }]}>{service.prefix}{service.serving}</Text>
            <View style={[styles.queueCell, { flex: 2, alignItems: 'flex-end' }]}>
              <View style={getStatusStyle(service.status)}>
                <Text style={styles.statusText}>{service.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}