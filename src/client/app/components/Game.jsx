import React,{Component} from 'react';
import Card from './Card';
import CardWrapper from './CardWrapper';
import Box from './Box';
import * as actions from '../actions/stackActions';
import * as Constants from '../utils/constants'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';



class Game extends Component{
  componentDidMount(){
      console.log(this.props);
      this.props.actions.actionThrower();
  }

  render(){
    console.log(`PROPS = ${JSON.stringify(this.props)}`);
    return (
    <div>
      <div>
        <div className="stack">
          <Card value="2" suite="hearts"/>
          <h1>{`Value is ${this.props.count}`}</h1>
        </div>
        <div className="stack suite">
          <Card value="card" suite="down"/>
          <div style={{"display":"inline-block", "width":Constants.SUITE_SEPARATOR_WIDTH}}/>
          <Card value="2" suite="hearts"/>
          <div style={{"display":"inline-block", "width":Constants.SUITE_SEPARATOR_WIDTH}}/>
          <Card value="2" suite="hearts"/>
          <div style={{"display":"inline-block", "width":Constants.SUITE_SEPARATOR_WIDTH}}/>
          <Card value="2" suite="hearts"/>
          <div style={{"display":"inline-block", "width":Constants.SUITE_SEPARATOR_WIDTH}}/>
        </div>
      </div>
      <div style={{"height":Constants.PLAY_AREA_SEPARATOR}} />
      <div style={{"display":"flex", "width":"100%", "justifyContent":"space-between" }}>
        {/* <Box /> */}
        <CardWrapper value="card" suite="down" nest={true}/>
        {/* <div style={{"display":"inline-block", "width":Constants.STACK_SEPARATOR_WIDTH}}/> */}
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/>
        <Card value="2" suite="hearts"/>
      </div>
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.get('value')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);
