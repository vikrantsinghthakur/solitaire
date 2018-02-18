import React,{Component} from 'react';
import { DropTarget } from 'react-dnd';


class Box extends Component{
  render(){
    const {dropped,dragValue,dragSuite, connectDropTarget} = this.props
    console.log(dropped,dragValue,dragSuite);
    return connectDropTarget(<div style={{"height":"300px"}}>
            {dropped}
          </div>);
  }
}

const types = "Card";
const spec = {
  drop(props, monitor, component){
    console.log("DROPPROPS")
    console.log(props)
    console.log("monitor");
    console.log(monitor.getItem());
    return {
    dropped: "working!!!!!!!"
  };
 },
};
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
	   isOver: monitor.isOver(),
	    canDrop: monitor.canDrop(),
  };
}

export default DropTarget(types, spec, collect)(Box);
