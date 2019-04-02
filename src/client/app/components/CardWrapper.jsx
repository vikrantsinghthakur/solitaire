import React, { Component } from "react";
import {
  DragSource,
  DropTarget,
  ConnectDragPreview,
  ConnectDragSource,
  DragLayer
} from "react-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Card from "./Card";
import CardDragPreview from "./CardDragPreview";
import * as actions from "../actions/stackActions";
import {
  STACKS,
  SUITE_COLOR,
  SUITE,
  CARD_VALUES,
  CARD_FACE,
  URL
} from "../utils/constants";

const types = "Card";
const dragSpec = {
  beginDrag(props, monitor, component) {
    let dragValue, dragSuite;
    if (props.cardsToRender && props.cardsToRender.length > 0) {
      dragValue = props.cardsToRender[0].value;
      dragSuite = props.cardsToRender[0].suite;
    }
    return {
      dragValue,
      dragSuite
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      let cardsArray =
        props.stack == STACKS.PLAY
          ? props.cardsToRender
          : props.cardsToRender.slice(0, 1);
      let actionObject = {
        dropStack: dropResult.stack,
        dropIndex: dropResult.dropIndex,
        dropParentSuite: dropResult.parentSuite,
        cardsArray: cardsArray,
        sourceStack: props.stack,
        sourceStackIndex: props.stackKey,
        sourceParentSuite: props.parentSuite
      };
      props.actions.moveCard(actionObject);
      if (props.stack == STACKS.PLAY)
        props.actions.openCardFace(props.stackKey);
      if (props.stack == STACKS.DRAW) props.actions.reduceActiveDrawCount();
    }
  },
  canDrag(props, monitor) {
    if (props.stack == STACKS.DRAW) {
      return props.isLastCard;
    }
    if (props.stack == STACKS.PLAY) {
      if (props.cardsToRender && props.cardsToRender.length > 0) {
        let card = props.cardsToRender[0];
        if (card.face != CARD_FACE.CLOSED) return true;
      }
      return false;
    }
    return props.suite != SUITE.NONE;
  }
};
const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

const dropSpec = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    if (monitor.didDrop()) return false;

    let cardsArray = props.cardsToRender;
    if (cardsArray && cardsArray.length > 1) return false;

    const currentCard =
      cardsArray && cardsArray.length > 0 ? cardsArray[0] : {};
    if (props.stack == STACKS.PLAY) {
      if (
        SUITE_COLOR[item.dragSuite] != SUITE_COLOR[currentCard.suite] &&
        CARD_VALUES[currentCard.value] - CARD_VALUES[item.dragValue] == 1
      )
        return true;

      if (props.emptyStack && CARD_VALUES[item.dragValue] == CARD_VALUES.KING)
        return true;
    }

    if (props.stack == STACKS.SUITE) {
      if (item.dragSuite == props.parentSuite) {
        if (
          cardsArray.length == 0 &&
          CARD_VALUES[item.dragValue] == CARD_VALUES.ACE
        )
          return true;
        let topCard = cardsArray.length > 0 ? cardsArray[0] : {};
        if (CARD_VALUES[item.dragValue] - CARD_VALUES[topCard.value] == 1)
          return true;
      }
    }

    return false;
  },
  drop(props, monitor, component) {
    return {
      stack: props.stack,
      dropIndex: props.stackKey,
      parentSuite: props.parentSuite
    };
  }
};

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

const previewCollect = monitor => {
  return {
    sourceOffset: monitor.getSourceClientOffset(),
    initialClientOffset: monitor.getInitialSourceClientOffset()
  };
};

class CardWrapper extends Component {
  render() {
    const {
      dragValue,
      dragSuite,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;
    let cardWrapperClass = "cardWrapper";
    if (this.props.stack == STACKS.PLAY)
      cardWrapperClass = `${cardWrapperClass} playStack`;
    else if (this.props.stack == STACKS.SUITE)
      cardWrapperClass = `${cardWrapperClass} suiteStack`;
    const opacity = isDragging ? { display: "none" } : {};
    if (isDragging) {
      return <CardDragPreview stack={this.props.stack} isDragging />;
    }
    return connectDragSource(
      connectDropTarget(
        <div className={cardWrapperClass}>
          <Card {...this.props} />
        </div>
      )
    );
  }
}

CardWrapper = DragSource(types, dragSpec, dragCollect)(CardWrapper);
CardWrapper = DropTarget(types, dropSpec, dropCollect)(CardWrapper);

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CardWrapper);
