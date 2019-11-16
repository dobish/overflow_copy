import React, { Component } from "react";

class PostComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  onClick() {
    this.props.postComment(this.props.id, this.state.input);
    document.getElementById("input-comment").value = "";
  }

  render() {
    return (
      <>
        <div className="post">
          <textarea
            id="input-comment"
            rows="4"
            cols="50"
            onChange={this.onChange}
          ></textarea>
          <button onClick={this.onClick}>Post Comment</button>
        </div>
      </>
    );
  }
}

export default PostComment;
