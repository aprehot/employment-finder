import * as React from 'react';

// this Component controls Draggability of a stack
class DraggableStack extends React.PureComponent<any> {

    state: any = {
        hasCapture: false,
        stackLeft: 0,
        stackTop: 0,
        originalX: 0,
        originalY: 0,
        tranStyle: "",
        stackInFront: 150
    };
    // may need getBounding... to capture position  of dropzone box for when cursor enters zone and stack being moved reacts accordingly

    //     let rect = ReactDOM.findDOMNode(this)
    //         .getBoundingClientRect()
    //     if (this.state.stackLeft === 0) {
    //         this.setState({
    //             stackLeft: rect.left,
    //             stackTop: rect.top
    //         })
    //     }
    // }

    previousLeft = 0;
    previousTop = 0;
    isDragging = false;


    onDown = (event: any) => {
        this.setState({ tranStyle: "" });
        this.state.originalX === 0 &&
            this.setState({
                originalX: this.state.stackLeft,
                originalY: this.state.stackTop
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

        this.setState(({ stackLeft, stackTop }: any) => ({
            stackLeft: stackLeft + left,
            stackTop: stackTop + top
        }));
    };

    onUp = (event: any) => {
        this.isDragging = false;
        this.setState({
            stackLeft: this.state.originalX,
            stackTop: this.state.originalY,
            tranStyle: "all 1s",
            stackInFront: 150
        });
    };
    onGotCapture = (event: any) => {
        const { handleActiveState, fetchFolderContents, category } = this.props;
        const { id } = event.target;
        handleActiveState(id)
        fetchFolderContents(id, category)
        this.setState({ hasCapture: true, stackInFront: 165 });
    }

    onLostCapture = () => this.setState({ hasCapture: false });

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
        const { hasCapture, stackLeft, stackTop, tranStyle, stackInFront } = this.state;

        const { stack } = this.props
        return (
            <div
                style={{
                    position: "relative",
                    left: stackLeft,
                    top: stackTop,
                    transition: tranStyle,
                    cursor: 'pointer',
                    zIndex: stackInFront
                }}
                touch-action="none"
                id={stack.folderName}
                onPointerUp={this.onUp}
                onPointerMove={this.onMove}
                onPointerCancel={this.onUp}
                onPointerDown={this.onDown}
                className="stack cell large-2"
                onGotPointerCapture={this.onGotCapture}
                onLostPointerCapture={this.onLostCapture}
            >
                <h6 style={{
                    pointerEvents: 'none'
                }}>
                    {stack.folderName}
                </h6>
            </div>
        );
    }
}

export default DraggableStack;