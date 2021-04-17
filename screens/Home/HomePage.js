import React from 'react';
import {View, Text, Platform} from 'react-native';

const companies = [
  {
    name: 'Company 1',
    cagr: '15%',
  },
  {
    name: 'Company 2',
    cagr: '15%',
  },
  {
    name: 'Company 3',
    cagr: '15%',
  },
  {
    name: 'Company 4',
    cagr: '15%',
  },
  {
    name: 'Company 5',
    cagr: '15%',
  },
];

export default class HomePage extends React.Component {
  render() {
    return (
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 50 : 0}}>
        <Text style={{alignSelf: 'center'}}>List of companies</Text>
        <View style={{flex: 1}}>
          {companies.map((company, index) => {
            return <CompanyItem company={company} key={index} />;
          })}
        </View>
      </View>
    );
  }
}

const CompanyItem = props => {
  return (
    <View style={{padding: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Text>Name: </Text>
        <Text>{props.company.name}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>CAGR: </Text>
        <Text>{props.company.cagr}</Text>
      </View>
    </View>
  );
};
