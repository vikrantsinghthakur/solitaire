import React,{Component} from 'react';
import { DragSource } from 'react-dnd';
import CardWrapper from './CardWrapper';


class Card extends Component{
  render(){
    // const {dragValue, dragSuite, connectDragSource} = this.props;
    //console.log(dragValue,dragSuite)
    return (//connectDragSource(
            <div style={{"display":"inline-block", "maxWidth" : "100px"}}>
              <img style={{"maxWidth" : "100%"}} src={`../assets/${this.props.value}_of_${this.props.suite}.png`}/>
              {this.props.nest ? <CardWrapper value="7" suite="hearts"/> : null}
           </div>
            );
  }
}
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
//export default DragSource(types, spec, collect)(Card);
export default Card
