import React, {Component} from 'react';
import { Router } from "@reach/router";
import Questions from "./Questions";
import Question from "./Question";
import './styles.css';



const mongoose = require('mongoose');


class App extends Component {

API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);

    // This is my state data initialized
    this.state = {
      data: []

    }
  }
    componentDidMount() {
        this.getData();
    }

  getData() {
      let url = `${this.API_URL}/kittens`; // URL of the API.
      console.log(url)
    fetch(url)
        .then(result => result.json()) // Convert to JSON
        .then(result => { // Put it in the state
          this.setState({
            data: result
          })
            console.log(this.state.data)
        })
        .catch((error) => { // Catch any errors and write them to the browser console
          console.error(error);
        });
  }
  getQuestion(id) {
      console.log(this.state.data)
    return this.state.data.find(q => q._id === id);

  }

    postData(question) {
        let url = `${this.API_URL}/kittens`; // URL of the API.;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                question: question.question,
                answers: question.answers
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new task:");
                console.log(json);
                this.getData();
            });


        // TODO: And then use getData again to update contents
    }
    askQuestion(text) {
        const question = {
            question: text,
            answers: []
        };

        this.setState({
            data: [...this.state.data, question]
        })
        this.postData(question);
    };



  render() {
    return (
        <React.Fragment>
          <h1>QA Website</h1>
          <Router>

            <Questions path="/" data={this.state.data}
                       askQuestion={(text) => this.askQuestion(text)}>
            </Questions>
            <Question path="/api/kittens/:id"
                      getQuestion={(_id) => this.getQuestion(_id)}>

            </Question>
          </Router>
        </React.Fragment>
    )
  }
}

export default App;

