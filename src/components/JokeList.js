import React, { Component } from "react";
import jokess from "../apis/jokes";
import "./JokeList.scss";
import Joke from "./Joke";
import uuid from "uuid/v4";

export default class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  componentDidMount = async () => {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await jokess.get();
      jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
  };

  handleVote = (id, delta) => {
    this.setState(currState => ({
      jokes: currState.jokes.map(joke => {
        return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke;
      })
    }));
  };

  renderJokes = () => {
    return this.state.jokes.map(joke => {
      return (
        <Joke
          key={joke.id}
          text={joke.text}
          votes={joke.votes}
          upVote={() => this.handleVote(joke.id, 1)}
          downVote={() => this.handleVote(joke.id, -1)}
        />
      );
    });
  };
  render() {
    return (
      <div className="jokes">
        {console.log("joki", this.state.jokes.text)}
        <div className="jokes__sidebar">
          <h1 className="jokes__title">Jokes</h1>
        </div>
        <ul className="jokes__list">{this.renderJokes()}</ul>
      </div>
    );
  }
}
