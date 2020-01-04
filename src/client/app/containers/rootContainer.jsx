import React, { Component } from "react";
import Game from "../components/Game";
import { DragDropContextProvider } from "react-dnd";
// import { default as TouchBackend } from "react-dnd-touch-backend";
import Backend from "react-dnd-html5-backend";

class Container extends Component {
  render() {
    return (
      <DragDropContextProvider backend={Backend}>
        <Game />
      </DragDropContextProvider>
    );
  }
}

export default Container;
