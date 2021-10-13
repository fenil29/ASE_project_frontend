import React from 'react'
import { StyleSheet} from 'react-native';
import { Layout, Text, Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import { Icon } from '@ui-kitten/components';

function Account(){
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    return(
        <Layout style={styles.container}>
            <Layout style={styles.orgdetails} level='3'>
                <Icon style={styles.icon} name='person' fill='#3366ff' />
                <Text category='h4'>Organization Name</Text>
                <Text category='h6'>Organization Address</Text>
                <Text category='h6'>Organization Contact Details</Text>
            </Layout>

            <Layout style={styles.options} level='3'>
                <Drawer
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                    <DrawerItem title='Profile' />
                    <DrawerItem title='Dashboard'/>
                    <DrawerItem title='About'/>
                    <DrawerItem title='Logout'/>
                </Drawer>
            </Layout>   
        </Layout>
    )
}

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
      icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff'
      },
      options:{
        flex: 1,
        
      },
      orgdetails: {
        flex: 0.3,
        justifyContent: 'flex-start',
        justifyContent: 'center',
        paddingLeft:15,
        backgroundColor:'#FAFAFC'
      }
})