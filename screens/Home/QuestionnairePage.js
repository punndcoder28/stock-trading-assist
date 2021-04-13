import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../components/basic/Button';
import userServiceController from '../../controllers/userServiceController';

export default class QuestionnairePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      answers: [],
    };
  }
  submitAnswer(answer) {
    if (this.state.question === 3) {
      // submit to backend
      let answers = this.state.answers;
      answers.push(answer);
      let success = data => {
        console.log(data);
      };
      let failure = data => {
        console.log('GETTING ERROR');
        console.log(data);
      };
      let requestBody = {
        userId: '5797ffa0-7919-4940-a5a0-55a132b18650',
        answer1: answers[0],
        answer2: answers[1],
        answer3: answers[2],
        answer4: answer,
      };
      userServiceController.postAnswer(requestBody, success, failure);
    } else {
      let answers = this.state.answers;
      answers.push(answer);
      this.setState({
        question: this.state.question + 1,
        answers: answers,
      });
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.question === 0 && (
          <View style={styles.questionContainer}>
            <Text>Question 1</Text>
            <Text>Answer 1</Text>
            <Button mode="contained" onPress={() => this.submitAnswer(1)}>
              Next
            </Button>
          </View>
        )}
        {this.state.question === 1 && (
          <View style={styles.questionContainer}>
            <Text>Question 2</Text>
            <Text>Answer 2</Text>
            <Button mode="contained" onPress={() => this.submitAnswer(2)}>
              Next
            </Button>
          </View>
        )}
        {this.state.question === 2 && (
          <View style={styles.questionContainer}>
            <Text>Question 3</Text>
            <Text>Answer 3</Text>
            <Button mode="contained" onPress={() => this.submitAnswer(3)}>
              Next
            </Button>
          </View>
        )}
        {this.state.question === 3 && (
          <View style={styles.questionContainer}>
            <Text>Question 4</Text>
            <Text>Answer 4</Text>
            <Button mode="contained" onPress={() => this.submitAnswer(4)}>
              Submit
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
});
