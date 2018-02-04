import React,{Component} from 'react';
import { DragSource,DropTarget } from 'react-dnd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Card from './Card';
import * as actions from '../actions/stackActions';
import { STACKS,SUITE_COLOR,SUITE,CARD_VALUES } from '../utils/constants';

const types = "Card";
const dragSpec = {
  beginDrag(props, monitor, component){
    console.log("CARDPROPS")
    console.log(props);
    return {
      dragValue: props.cardsToRender[0].value,
      dragSuite: props.cardsToRender[0].suite
    };
  },
  endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if(dropResult && dropResult.stack == STACKS.SUITE) {
      //get source stack(type,index/suite), get cardsToRender array

    } else if ( dropResult && dropResult.stack == STACKS.PLAY) {
      props.actions.moveToPlayStack(dropResult.stack, dropResult.dropIndex,
        dropResult.parentSuite, props.cardsToRender,
        props.stack, props.stackKey);
      if(props.stack == STACKS.PLAY)
        props.actions.openCardFace(props.stackKey);
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

    if(props.cardsToRender && props.cardsToRender.length>1)
      return false;

    const currentCard = props.cardsToRender ? props.cardsToRender[0] : {};
    if(props.stack == STACKS.PLAY){
      if(SUITE_COLOR[item.dragSuite] != SUITE_COLOR[currentCard.suite] &&
      CARD_VALUES[currentCard.value] - CARD_VALUES[item.dragValue] == 1)
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
            dropIndex: props.stackKey,
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
  return connectDragSource(connectDropTarget(<div className={cardWrapperClass}>
            <Card {...this.props}/>
          </div>));
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
