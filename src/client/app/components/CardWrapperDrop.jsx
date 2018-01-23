import React,{Component} from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import { STACKS, SUITE_COLOR } from '../utils/constants';

const types = "Card";
const spec = {
  canDrop(props,monitor){
    const item = monitor.getItem();
    if(monitor.didDrop())
      return false;

    if(props.stack == STACKS.PLAY){
      if(SUITE_COLOR[item.dragSuite] != SUITE_COLOR[props.suite] &&
      props.value - item.dragValue == 1)
        return true;
      return false;
    }

    if(props.stack == STACKS.SUITE){
      if(SUITE_COLOR[item.dragSuite] == SUITE_COLOR[props.suite] &&
      item.dragValue - props.value == 1)
        return true;
      return false;
    }

    return false;
  },
  drop(props, monitor, component){
    return props.stackDetails;
  }
};
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class CardWrapperDrop extends Component {
  render(){
  const {connectDragSource} = this.props;
    return connectDragSource(<div><Card {...this.props}/></div>)
  }
}

export default DropTarget(types, spec, collect)(CardWrapperDrop);
