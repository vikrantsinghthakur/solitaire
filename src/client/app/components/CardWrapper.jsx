import React,{Component} from 'react';
import { DragSource,DropTarget } from 'react-dnd';
import {connect} from 'react-redux';
import Card from './Card';
import * as actions from '../actions/stackActions';
import { STACKS,SUITE_COLOR,SUITE,CARD_VALUES } from '../utils/constants';

const types = "Card";
const dragSpec = {
  beginDrag(props, monitor, component){
    console.log("CARDPROPS")
    console.log(props);
    return {
      dragValue: props.value,
      dragSuite: props.suite
    };
  },
  endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if(dropResult.stack == STACKS.SUITE) {

    } else if (dropResult.stack == STACKS.play) {
      
    }
	},
  canDrag(props,monitor) {
    return props.suite != SUITE.NONE;
  }
};
const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const dropSpec = {
  canDrop(props,monitor){
    const item = monitor.getItem();
    if(monitor.didDrop())
      return false;

    if(props.cardsToRender && props.cardsToRender.length>0)
      return false;

    if(props.stack == STACKS.PLAY){
      if(SUITE_COLOR[item.dragSuite] != SUITE_COLOR[props.suite] &&
      CARD_VALUES[props.value] - CARD_VALUES[item.dragValue] == 1)
        return true;
    }

    if(props.stack == STACKS.SUITE){
      if(item.dragSuite == props.suite &&
      CARD_VALUES[item.dragValue] - CARD_VALUES[props.value] == 1)
        return true;
    }

    return false;
  },
  drop(props, monitor, component){
    return {stack: props.stack,
            dropIndex: props.key,
            parentSuite: props.parentSuite};
  }
};

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
	   isOver: monitor.isOver(),
	    canDrop: monitor.canDrop(),
  };
}

class CardWrapper extends Component {
  render(){
  const {dragValue, dragSuite, connectDragSource, connectDropTarget} = this.props;
  let cardWrapperClass = "cardWrapper";
  if(this.props.stack == STACKS.PLAY)
    cardWrapperClass = `${cardWrapperClass} playStack`;
  return <div className={cardWrapperClass}>
            <Card {...this.props}/>
          </div>
  }
}

CardWrapper = DragSource(types, dragSpec, dragCollect)(CardWrapper);
CardWrapper = DropTarget(types, dropSpec, dropCollect)(CardWrapper);

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions,dispatch)
  }
}

export default connect(null,mapDispatchToProps)(CardWrapper);
