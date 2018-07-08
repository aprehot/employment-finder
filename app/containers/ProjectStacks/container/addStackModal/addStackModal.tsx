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
            background: `linear-gradient(to bottom, rgba(141, 131, 255, 1) rgba(0,0,0,0),10%)`
            // background: `linear-gradient(336deg, rgba(0, 0, 255, .8), rgba(0, 0, 255, 0) 70.71%),
            //             linear-gradient(127deg, rgba(202, 197, 255, 1), rgba(0, 255, 0, 0) 70.71%),
            //             linear-gradient(217deg, rgba(255, 0, 0, .8), rgba(255, 0, 0, 0) 70.71%)`
        },
        config: config.default
    },
    // close is how the btn starts off and how animations from open will transition to when close btn is clicked
    close: async (call: any) => {
        await delay(400)
        await call({
            to: {
                x: 0,
                y: 0,
                height: '10px',
                width: '15vw',
                scale: .5,
                rotate: '180deg',
                borderRadius: 15,
                backgroundColor: '#565284',
                background: `linear-gradient(to bottom, rgba(0,0,0,0) rgba(0,0,0,0), 0)`
                // background: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 70.71%),
                //             linear-gradient(127deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 70.71%),
                //             linear-gradient(217deg, rgba(255, 108, 128, 0), rgba(0, 0, 0, 0) 70.71%)`
            },
            config: config.default
        })
    }
})

// Creates a keyframed trail for the ANi content within the modal
const Content = keyframes.Trail({
    open: { delay: 100, to: { x: 0, opacity: 1 } },
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
            <button className="cell large-2 button secondary" children="Add" style={{ background: 'rgba(106, 157, 255, 1)' }} />
        </div>
        <textarea />
        <button className="shrink button" children="Create" style={{ background: 'rgba(106, 157, 255, 1)' }} />
    </Fragment>
]


class AddStackModal extends React.PureComponent {
    state = { open: false }
    toggle = () => this.setState((state: any) => ({ open: !state.open }))
    render() {
        const state = this.state.open ? 'open' : 'close'
        return (
            <Fragment>
                <Sidebar native state={state}>
                    {({ x, y, rotate, backgroundColor, background, borderRadius, height, width, scale }: any) => (
                        <a.div
                            id='absoluteModal'
                            style={{
                                background,
                                zIndex: this.state.open ? 175 : 55
                            }}
                        >
                            <a.div
                                className="sidebar"
                                style={{
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
                                <h6 style={{ color: this.state.open ? 'transparent' : 'white', transform: 'rotate3d(0, 1, 0, 180deg)' }}>Create Stack</h6>
                                <Fragment>
                                    <Content native keys={items.map((_, i) => i)} config={{ tension: 90, friction: 9 }} state={state}>
                                        {items.map((item, i) => ({ x, ...props }: { x: any }) => (
                                            <a.div
                                                style={{
                                                    transform: x.interpolate((x: number) => `translate3d(${x}%,0,0)`),
                                                    ...props
                                                }}>
                                                <button
                                                    type="normal"
                                                    className="projectBackBtn closeBtn button projectViewBtn "
                                                    onClick={() => this.state.open && this.toggle()}
                                                />
                                                <form className="middle">{item}</form>
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
