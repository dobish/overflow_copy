import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostComment from "./PostComment";
class Question extends Component {

    constructor(props) {
        super(props);
        this.handleVote = this.handleVote.bind(this);
    }

    handleVote(e) {
        let commentId = e.currentTarget.dataset.id;
        this.props.handleVote(this.props.id, commentId);
    }

    render() {
        const question = this.props.getQuestion(this.props.id);

        let content = <p>Loading</p>;
        if (question) {
            content = (
                <React.Fragment>
                    <h3>{question.question} </h3>

                    {/*<p>Comments</p>
                    {question.answers.map(h => <p key={h}>{h.answer} {h.votes}</p>)}*/}

                    <h4>Answers</h4>
                    <div className="answer">
                    {question.answers.map(a => (
                        <div className="answers" key={a}>
                            <p>{a.answer}</p>
                            <p>{a.votes}</p><button onClick={() => this.props.handleVote(this.props.id, a._id) }>+1</button>
                        </div>
                        ))}
                    </div>
                    <PostComment id={this.props.id}
                                 postComment={(id, text) => this.props.postComment(id, text)}
                    >

                    </PostComment>






                    <Link to="/">Back</Link>
                </React.Fragment>);
        }

        return content;
    }
}


export default Question;

