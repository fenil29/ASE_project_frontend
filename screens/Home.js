import React from 'react'
import * as eva from '@eva-design/eva';
import { StyleSheet, View} from 'react-native';
import { Layout, Text, RangeDatepicker } from '@ui-kitten/components';
import { FlatGrid } from 'react-native-super-grid';


import { BottomNavigationTab } from '@ui-kitten/components';
import Graph from '../components/Graph';

function Home(){
    const [range, setRange] = React.useState({});
    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
      ]);

    return (
        <Layout style={styles.container}>
            {/* <Layout style={styles.dateBar} > */}
                
                <Layout style={styles.datePicker}>
                <Text style={{
                    fontWeight: 'bold',
                    paddingTop: 10
                }}>October 13, 2021</Text>
                    <RangeDatepicker 
                        style={styles.date}
                        placeholder = "Time Domain"
                        range={range}
                        onSelect={nextRange => setRange(nextRange)}
                    />
                </Layout>
            {/* </Layout> */}
            <Layout style={styles.layout} level='2'>
                <Text style={{
                    fontWeight: 'bold',
                    paddingTop: 15
                    
                }}>Recently Detected Faces</Text>
                <FlatGrid
                    itemDimension={110}
                    data={items}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item }) => (
                        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemCode}>{item.code}</Text>
                        </View>
                    )}
                />
            </Layout>

            <Layout style={styles.layout} level='2'>
                <Text style={{
                    fontWeight: 'bold',   
                    paddingTop: 15                 
                }}>Activity Log</Text>
                <Graph />
            </Layout>          
        </Layout>
        
        );    
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    date:{
        width: 130,
        alignItems: 'center',
        position: 'relative',
        left: 110,
        
    },
    datePicker: {
        flex: 0.3,  
        flexDirection: 'row',  
        position: 'relative',
        top: 45,
        left: 15,

    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  });