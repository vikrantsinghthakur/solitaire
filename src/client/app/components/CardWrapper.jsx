import React,{Component} from 'react';
import { DragSource } from 'react-dnd';
import Card from './Card';

const types = "Card";
const spec = {
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

		if (dropResult) {
			alert(dropResult.dropped + item.dragValue) // eslint-disable-line no-alert
		}
	},
};
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class CardWrapper extends Component {
  render(){
  const {dragValue, dragSuite, connectDragSource} = this.props;
  return connectDragSource(<div><Card {...this.props}/></div>)
  }
}

export default DragSource(types, spec, collect)(CardWrapper);
