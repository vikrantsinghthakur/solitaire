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
        {/* <div className="stack draw"> */}
          {/* <CardWrapper value="card" suite="down"/>
          <Separator/> */}
          <Stack stack={STACKS.DRAW} {...drawStackProps}
            difficulty={this.props.difficulty}/>
          {/* <CardWrapper value="card" suite="down"/> */}
          {/* <h1>{`Value is ${this.props.count}`}</h1> */}
        {/* </div> */}
        <Stack stack={STACKS.SUITE} suiteStackProps={suiteStackProps}/>
        {/* <Stack parentSuite={SUITE.HEARTS} stack={STACKS.SUITE} {...suiteStack}/>
        <Stack parentSuite={SUITE.SPADES} stack={STACKS.SUITE} {...suiteStack}/>
        <Stack parentSuite={SUITE.DIAMONDS} stack={STACKS.SUITE} {...suiteStack}/>
        <Stack parentSuite={SUITE.CLUBS} stack={STACKS.SUITE} {...suiteStack}/> */}
        {/* <div className="stack suite">
          <Card value="card" suite="down"/>
          <Separator/>
          <Card value="2" suite="hearts"/>
          <Separator/>
          <Card value="2" suite="hearts"/>
          <Separator/>
          <Card value="2" suite="hearts"/>
          <Separator/>
        </div> */}
      </div>
      <div className="playAreaSeparator" />
      {/* <div style={{"display":"flex", "width":"100%", "justifyContent":"space-between" }}> */}
      <Stack stack={STACKS.PLAY} playStackProps={playStackProps}/>
      {/* <div className="stack play">
        {/* <Box /> */}

        {/* <CardWrapper value="card" suite="down" nest={true}/>
        <CardWrapper value="2" suite="HEARTS" stack='PLAY'/>
        <CardWrapper value="3" suite="CLUBS" stack='PLAY'/>
        <CardWrapper value="4" suite="DIAMONDS" stack='PLAY'/>
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/> */}
      {/* </div> */}
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    drawStack: state.get('drawStack'),
    suiteStack: state.get('suiteStack'),
    playStack: state.get('playStack'),
    difficulty: state.get('difficulty')
  }
}

export default connect(mapStateToProps,null)(Game);
