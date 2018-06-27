import React from "react";
import '../style.scss';

// const CIRCLE_SIZE = 85;

export class Gucci extends React.Component {
  render() {
    return (
      <div id="prada" {...this.props}>
        Hello World
            </div>
    )
  }
}

const WithDrag: any = (Component: any) => {
  class DragBox extends React.Component<any> {
    state = {
      hasCapture: false,
      circleLeft: 80,
      circleTop: 80,
      originalX: 0,
      originalY: 0,
      tranStyle: ""
    };
    isDragging = false;
    previousLeft = 0;
    previousTop = 0;

    onDown = (event: any) => {
      this.setState({ tranStyle: "" });
      this.state.originalX === 0 &&
        this.setState({
          originalX: this.state.circleLeft,
          originalY: this.state.circleTop
        });
      this.isDragging = true;
      (event).target.setPointerCapture((event).pointerId);
      // We store the initial coordinates to be able to calculate the changes
      // later on.
      this.extractPositionDelta(event);
    };

    onMove = (event: any) => {
      if (!this.isDragging) {
        return;
      }
      const { left, top } = this.extractPositionDelta(event);

      this.setState(({ circleLeft, circleTop }: any) => ({
        circleLeft: circleLeft + left,
        circleTop: circleTop + top
      }));
    };

    onUp = (event: any) => {
      this.isDragging = false;
      this.setState({ tranStyle: "all 1s" });
      this.setState({
        circleLeft: this.state.originalX,
        circleTop: this.state.originalY
      });
    };
    onGotCapture = (event: any) => this.setState({ hasCapture: true });
    onLostCapture = (event: any) => this.setState({ hasCapture: false });

    extractPositionDelta = (event: any) => {
      const left = event.pageX;
      const top = event.pageY;
      const delta = {
        left: left - this.previousLeft,
        top: top - this.previousTop
      };
      this.previousLeft = left;
      this.previousTop = top;
      return delta;
    };

    render() {
      const { hasCapture, circleLeft, circleTop, tranStyle } = this.state;

      let circleStyle = {
        // width: CIRCLE_SIZE,
        // height: CIRCLE_SIZE,
        // borderRadius: CIRCLE_SIZE / 2,
        position: "absolute",
        left: circleLeft,
        cursor: "grab",
        top: circleTop,
        transition: tranStyle,
        backgroundColor: hasCapture ? "blue" : "green"
      };

      return (
        <div style={{
          border: "1px solid #d9d9d9",
          margin: "10px 0 20px",
          minHeight: 400,
          width: "100%",
          position: "relative"
        }}>
          <Component
            style={circleStyle}
            touch-action="none"
            onPointerDown={this.onDown}
            onPointerMove={this.onMove}
            onPointerUp={this.onUp}
            onPointerCancel={this.onUp}
            onGotPointerCapture={this.onGotCapture}
            onLostPointerCapture={this.onLostCapture}
          />
        </div>
      );
    }
  }
  return DragBox;
}
export default WithDrag
