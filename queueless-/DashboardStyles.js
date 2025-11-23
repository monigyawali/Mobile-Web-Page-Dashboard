import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 20,
  },
  
  // --- Header and Button ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e6ed',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#004aad',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 14,
  },
  
  // --- Metric Cards ---
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    borderTopWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 15, 
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  metricTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  metricValue: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: 5,
    marginBottom: 5,
  },
  metricSubtitle: {
    fontSize: 11,
    color: '#aaa',
  },

  // --- Queue List/Table ---
  queueListContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  queueRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  queueHeader: {
    backgroundColor: '#f5f7fa',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomWidth: 0,
  },
  queueCell: {
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#777',
    textTransform: 'uppercase',
  },
  rowText: {
    fontSize: 14,
    color: '#333',
  },
  servingToken: {
    fontWeight: 'bold',
    color: '#004aad', 
  },
  
  // --- Status Badges ---
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: 'hidden', 
  },
  statusNormal: {
    backgroundColor: '#5cb85c', // Active/Normal
  },
  statusLow: {
    backgroundColor: '#f0ad4e', // Low Traffic
  },
  statusHigh: {
    backgroundColor: '#d9534f', // High Traffic/Busy
  },
});