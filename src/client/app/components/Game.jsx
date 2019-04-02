import React, { Component } from "react";
import Card from "./Card";
import CardWrapper from "./CardWrapper";
import Box from "./Box";
import Separator from "./Separator";
import Stack from "./Stack";
import CustomModal from "./CustomModal";
import * as actions from "../actions/stackActions";
import * as Constants from "../utils/constants";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { generateState } from "../utils/helper";
import { STACKS, SUITE, GAME_STATE } from "../utils/constants";

class Game extends Component {
  constructor(props) {
    super(props);
    this.displayModal = null;
  }

  componentWillMount() {
    this.props.actions.newGame();
  }

  componentDidMount() {
    this.displayModal = (
      <CustomModal
        actions={this.props.actions}
        gameState={this.props.gameState}
      />
    );
  }

  componentWillUpdate(nextProps, nextState) {
    this.displayModal = (
      <CustomModal
        actions={this.props.actions}
        gameState={nextProps.gameState}
      />
    );
  }

  render() {
    console.log(`PROPS = ${JSON.stringify(this.props)}`);
    let drawStackProps = null,
      suiteStackProps = null,
      playStackProps = null;
    if (this.props.drawStack) drawStackProps = this.props.drawStack.toJS();
    if (this.props.suiteStack) suiteStackProps = this.props.suiteStack.toJS();
    if (this.props.playStack) playStackProps = this.props.playStack.toJS();
    return (
      <div>
        {this.displayModal}
        <div>
          <Stack
            stack={STACKS.DRAW}
            {...drawStackProps}
            difficulty={this.props.difficulty}
            activeDrawCount={this.props.activeDrawCount}
          />
          <Stack stack={STACKS.SUITE} suiteStackProps={suiteStackProps} />
        </div>
        <div className="playAreaSeparator" />
        <Stack stack={STACKS.PLAY} playStackProps={playStackProps} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drawStack: state.get(STACKS.DRAW),
    suiteStack: state.get(STACKS.SUITE),
    playStack: state.get(STACKS.PLAY),
    difficulty: state.get("difficulty"),
    activeDrawCount: state.get("activeDrawCount"),
    gameState: state.get("gameState")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
