import delay from 'delay';
import React, { Fragment } from 'react'
import { Keyframes, config, interpolate, Spring, animated as a } from 'react-spring'

import './style.scss'

const keyframes: any = Keyframes
const Sidebar = keyframes.Spring({
    open: {
        to: {
            x: -50,
            y: 50,
            height: '600px',
            width: '50vw',
            rotate: '0deg',
            scale: 1,
            borderRadius: 30,
            backgroundColor: 'white',
            background: 'rgba(86, 82, 132, .8)'
        },
        config: config.slow
    },
    // close is how the btn starts off and how animations from open will transition to when close btn is clicked
    close: {
        to: {
            zIndex: 0,
            x: 0,
            y: 0,
            height: '10px',
            width: '15vw',
            scale: .5,
            rotate: '180deg',
            borderRadius: 15,
            backgroundColor: '#565284',
            background: 'rgba(0, 0, 0, 0)'
        },
        config: config.slow
    }
})

// Creates a keyframed trail for the ANi content within the modal
const Content = keyframes.Trail({
    open: { delay: 300, to: { x: 0, opacity: 1 } },
    close: { to: { x: -100, opacity: 0 } }
})

// All the stack items within the modal
const items = [
    <Fragment>
        <h3>New Stack</h3>
        <h4>Project</h4>
        <input type="text" placeholder="Stack title" />
        <div className='grid-x grid-padding-x' >
            <input type="text" placeholder="Search Project" className='cell large-9' />
            <button
                onClick={(e) => e.preventDefault()}
                className="cell large-2 button secondary" children="Add" style={{ background: 'rgba(106, 157, 255, 1)' }} />
        </div>
        <textarea />
        <button
            onClick={(e) => e.preventDefault()}
            className="shrink button" children="Create" style={{ background: 'rgba(106, 157, 255, 1)' }} />
    </Fragment>
]


class AddStackModal extends React.Component {
    state = { open: false, zInd: 175 }
    toggle = () => this.setState((state: any) => ({ open: !state.open }))
    render() {
        const state = this.state.open ? 'open' : 'close'
        return (
            <Fragment>
                <Sidebar native state={state}>
                    {({ x, y, rotate, backgroundColor, background, borderRadius, height, width, scale, zIndex }: any) => (
                        <a.div
                            id='absoluteModal'
                            style={{
                                background,
                                zIndex: this.state.open ? this.state.zInd : zIndex,
                            }}
                        >
                            <a.div
                                className="sidebar"
                                style={{
                                    display: !this.state.open && 'flex',
                                    width,
                                    height,
                                    borderRadius,
                                    backgroundColor,
                                    transform: interpolate(
                                        [x, y, rotate, scale],
                                        (x, y, rotate, scale) =>
                                            `rotate3d(0,1,0,${rotate}) scale(${scale}) translate(${x}%, ${y}%)`
                                    )
                                }}
                                onClick={() => !this.state.open && this.toggle()}
                            >
                                <h6
                                    id='createStackBtn'
                                    style={{
                                        display: this.state.open ? 'none' : 'inherit',
                                    }}>
                                    Create Stack
                                </h6>
                                <Fragment>
                                    <Content native keys={items.map((_, i) => i)} config={{ tension: 90, friction: 9 }} state={state}>
                                        {items.map((item, i) => ({ x, ...props }: { x: any }) => (
                                            <a.div
                                                style={{
                                                    transform: x.interpolate((x: number) => `translate(${x}%,0)`),
                                                    ...props
                                                }}>
                                                <button
                                                    type="normal"
                                                    className="projectBackBtn closeBtn button projectViewBtn "
                                                    onClick={() => this.state.open && this.toggle()}
                                                />
                                                <form style={{ display: !this.state.open && 'none' }} className="middle">{item}</form>
                                            </a.div>
                                        ))}
                                    </Content>
                                </Fragment>
                            </a.div>
                        </a.div>
                    )}
                </Sidebar>
            </Fragment>
        )
    }
}

export default AddStackModal
