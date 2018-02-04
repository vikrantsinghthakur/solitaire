import React,{Component} from 'react';
import Card from './Card';
import CardWrapper from './CardWrapper';
import Box from './Box';
import Separator from './Separator';
import Stack from './Stack';
import * as actions from '../actions/stackActions';
import * as Constants from '../utils/constants'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateState} from '../utils/helper';
import {STACKS,SUITE} from '../utils/constants';


class Game extends Component{
  componentDidMount(){
    this.props.actions.newGame();
  }
  render(){
    console.log(`PROPS = ${JSON.stringify(this.props)}`);
    let drawStackProps = null,suiteStackProps = null,playStackProps=null;
    if(this.props.drawStack)
      drawStackProps = this.props.drawStack.toJS();
    if(this.props.suiteStack)
      suiteStackProps = this.props.suiteStack.toJS();
    if(this.props.playStack)
      playStackProps = this.props.playStack.toJS();
    return (
    <div>
      <div>
        <Stack stack={STACKS.DRAW} {...drawStackProps}
            difficulty={this.props.difficulty}/>
        <Stack stack={STACKS.SUITE} suiteStackProps={suiteStackProps}/>
      </div>
      <div className="playAreaSeparator" />
      <Stack stack={STACKS.PLAY} playStackProps={playStackProps}/>
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    drawStack: state.get(STACKS.DRAW),
    suiteStack: state.get(STACKS.SUITE),
    playStack: state.get(STACKS.PLAY),
    difficulty: state.get('difficulty')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);
