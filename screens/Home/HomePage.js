/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {icons} from '../../constanst/images';
import {colors} from '../../components/basic/theme';
import stockDataServiceController from '../../controllers/stockDataController';

export default class HomePage extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: null,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.profileButton}>
        <Image
          resizeMode={'contain'}
          style={styles.profileIcon}
          source={icons.userIcon}
        />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      stockData: [],
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    let success = data => {
      const stockData = this.state.stockData;
      stockData.push(data);
      this.setState({loading: false, stockData: stockData});
    };
    let failure = data => {
      console.log('GETTING ERROR');
      console.log(data);
    };
    stockDataServiceController.getStockData(success, failure);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator
            size={'large'}
            color={'black'}
            style={styles.loader}
          />
        ) : (
          <>
            <Text style={styles.companyText}>List of companies</Text>
            <View style={styles.companyList}>
              {this.state.stockData.map((item, index) => (
                <CompanyItem
                  key={index}
                  fundamentalAnalysis={item.fa}
                  predictedPrice={item.lstm}
                  sentimentalAnalysis={item.sa}
                />
              ))}
            </View>
          </>
        )}
      </View>
    );
  }
}

const CompanyItem = ({
  fundamentalAnalysis,
  predictedPrice,
  sentimentalAnalysis,
}) => {
  return (
    <View style={styles.companyContainer}>
      <View style={styles.subcontainer}>
        <Text style={styles.name}>Name: </Text>
        <Text style={styles.name}>{fundamentalAnalysis.quotes.name}</Text>
      </View>
      <View style={styles.break} />
      <View style={styles.subcontainer}>
        <Text style={styles.name}>Next day price: </Text>
        <Text style={[styles.name, {color: '#78e08f'}]}>{predictedPrice}</Text>
      </View>
      <View style={styles.break} />
      <View style={{marginVertical: 5}}>
        <Text style={styles.name}>Sentiment Analysis </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          {sentimentalAnalysis['Headlines Sentiment']} sentiment value of{' '}
          {sentimentalAnalysis['Sentiment Value']}
        </Text>
      </View>
      <View style={styles.break} />
      <View style={{marginVertical: 5}}>
        <Text style={styles.name}>Fundamental Analysis </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          DCF {fundamentalAnalysis.ratios['DCF Score']}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          DE {fundamentalAnalysis.ratios['DE Score']}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          PB {fundamentalAnalysis.ratios['PB Score']}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          PE {fundamentalAnalysis.ratios['PE Score']}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          ROA {fundamentalAnalysis.ratios['ROA Score']}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          ROE {fundamentalAnalysis.ratios['ROE Score']}
        </Text>
      </View>
      <View style={styles.break} />
      <View style={{marginVertical: 5}}>
        <Text style={styles.name}>Price quotes for the day </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          Day high: {fundamentalAnalysis.quotes.dayHigh}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          Day low {fundamentalAnalysis.quotes.dayLow}
        </Text>
        <Text style={[styles.name, {fontSize: 14}]}>
          Price {fundamentalAnalysis.quotes.price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileButton: {marginRight: Platform.OS === 'android' ? 16 : 4},
  profileIcon: {
    width: 25,
    height: 25,
  },
  container: {flex: 1, backgroundColor: colors.white, paddingVertical: 10},
  companyText: {alignSelf: 'center', fontSize: 22, fontWeight: '700'},
  companyList: {flex: 1},
  companyContainer: {
    padding: 10,
    elevation: 10,
    backgroundColor: '#3498db',
    margin: 10,
    borderRadius: 5,
  },
  subcontainer: {flexDirection: 'row', marginVertical: 5},
  loader: {alignSelf: 'center'},
  name: {fontSize: 18, fontWeight: '700', color: '#ecf0f1'},
  break: {height: 2, backgroundColor: '#2c3e50'},
});
