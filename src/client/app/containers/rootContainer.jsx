import React, { Component } from "react";
import Game from "../components/Game";
import { DragDropContextProvider } from "react-dnd";
import { default as TouchBackend } from "react-dnd-touch-backend";

class Container extends Component {
  render() {
    return (
      <DragDropContextProvider
        backend={TouchBackend({
          enableMouseEvents: true,
          enableTouchEvents: true
        })}
      >
        <Game />
      </DragDropContextProvider>
    );
  }
}

export default Container;
