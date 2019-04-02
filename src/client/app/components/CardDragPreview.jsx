import React, { Component } from "react";
import { DragLayer } from "react-dnd";
import Card from "./Card";
import { STACKS } from "../utils/constants";

const collect = monitor => {
  return {
    sourceOffset: monitor.getSourceClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
    initialSourceClientOffset: monitor.getInitialSourceClientOffset()
  };
};

class CardDragPreview extends Component {
  getLayerStyles() {
    const { sourceOffset } = this.props,
      { initialSourceClientOffset } = this.props,
      { initialClientOffset } = this.props;

    if (sourceOffset && initialSourceClientOffset) {
      let xTrans = sourceOffset.x - initialClientOffset.x,
        yTrans = sourceOffset.y - initialClientOffset.y;
      let returnObj = {
        transform: `translate(${xTrans}px, ${yTrans}px)`
      };
      if (this.props.stack !== STACKS.PLAY) {
        returnObj.position = "absolute";
      }
      return returnObj;
    }
    return {};
  }

  render() {
    const { isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div className="draggedPreview" style={this.getLayerStyles()}>
        <Card value="empty" suite="none" />
      </div>
    );
  }
}

export default DragLayer(collect)(CardDragPreview);
