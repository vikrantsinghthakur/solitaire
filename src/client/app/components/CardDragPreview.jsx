import React, { Component } from "react";
import { DragLayer } from "react-dnd";
import Card from "./Card";

const collect = monitor => {
  return {
    sourceOffset: monitor.getSourceClientOffset(),
    initialClientOffset: monitor.getInitialSourceClientOffset()
  };
};

class CardDragPreview extends Component {
  getLayerStyles() {
    const { sourceOffset } = this.props,
      { initialClientOffset } = this.props;

    if (sourceOffset && initialClientOffset) {
      let xTrans = sourceOffset.x - initialClientOffset.x,
        yTrans = sourceOffset.y - initialClientOffset.y;
      return {
        transform: `translate(${xTrans}px, ${yTrans}px)`
      };
    }
    return {};
  }

  render() {
    const { isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div className="source-preview" style={this.getLayerStyles()}>
        <Card value="empty" suite="none" />
      </div>
    );
  }
}

export default DragLayer(collect)(CardDragPreview);
