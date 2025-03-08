import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableComponent: React.FC<{ data: { quantity: string; packing: string; rate: string } }> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Quantity</Text>
          <Text style={styles.cell}>Packing</Text>
          <Text style={styles.cell}>Rate</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>{data.quantity}</Text>
          <Text style={styles.cell}>{data.packing}</Text>
          <Text style={styles.cell}>{data.rate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  table: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default TableComponent;
