import React, {Component} from 'react';
import {Link} from "@reach/router";
class Question extends Component {



    render() {
        const question = this.props.getQuestion(this.props.id);

        let content = <p>Loading</p>;
        if (question) {
            content =
                <React.Fragment>
                    <h3>{question.question}</h3>

                    <p>Comments</p>
                    {question.answers.map(h => <p key={h}>{h.answer}, {h.votes}</p>)}




                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        return content;
    }
}


export default Question;

