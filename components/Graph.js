import React from 'react';
import {View,Dimensions, ScrollView} from 'react-native';
import {VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryAxis} from 'victory-native'

function Graph(){
    const data = {
        vaccinated: [
            {x:'10',y:90},
            {x:'11',y:50},
            {x:'12',y:100},
            {x:'1',y:70},
            {x:'2',y:55},
            {x:'3',y:42},
            {x:'4',y:70},
            {x:'5',y:55},
            {x:'6',y:42}
        ],
        unvaccinated:[
            {x:'10',y:10},
            {x:'11',y:20},
            {x:'12',y:10},
            {x:'1',y:5},
            {x:'2',y:18},
            {x:'3',y:33},
            {x:'4',y:5},
            {x:'5',y:18},
            {x:'6',y:4}
        ]
    }

    return(
        <ScrollView>
            <VictoryChart>
                <VictoryAxis label="Time" style={{
                    axisLabel:{
                        padding: 35
                    }
                }}/>
                <VictoryAxis dependentAxis label="People" style={{
                    axisLabel:{
                        padding: 30
                    }
                }}/>
                <VictoryGroup offset={data.vaccinated.length*2-6} >
                    <VictoryBar alignment="start"  data={data.vaccinated} style={{
                        data:{
                            fill: '#3679FF'
                        } 
                    }}/>
                    <VictoryBar data={data.unvaccinated} style={{
                        data:{
                            fill: '#bebebe'
                        }
                    }} />
                </VictoryGroup>
                <VictoryLegend 
                x = {Dimensions.get('screen').width/2-100}
                orientation= 'horizontal'
                gutter={20}
                data={[
                    {
                        name: 'Vaccinated',
                        symbol: {
                            fill: '#3679FF'
                        }
                    },
                    {
                        name: 'Unvaccinated',
                        symbol: {
                            fill: '#bebebe'
                        }
                    },
                ]}/>
            </VictoryChart>
        </ScrollView>
    );
};

export default Graph;