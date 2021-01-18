import React, { PureComponent, useState } from "react";
import { useSpring, animated } from "react-spring";

// images
import img1 from "../img/2019-9-4-workshop.jpg";

export default class ActivitiesSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activities: [
                {
                    title: "[Workshop/Presentation] Deep Learning with Keras",
                    location:
                        "University of Illinois Urbana-Champaign (UIUC), Illinois, USA",
                    time: "Sep 4, 2019",
                    description: "",
                    image: img1,
                },
            ],
            activeIdx: null,
        };
    }

    render() {
        return (
            <div id="activities" className="section">
                <h2 className="header">Activities</h2>
                <div className="content">
                    {this.state.activities.map((state, key) => {
                        return this.renderActivitiesBlock(state);
                    })}
                </div>
            </div>
        );
    }

    renderActivitiesBlock(state) {
        return (
            <ActivitiesBlock
                title={state.title}
                time={state.time}
                location={state.location}
                description={state.description}
                image={state.image}
            ></ActivitiesBlock>
        );
    }
}

function ActivitiesBlock(props) {
    const [showing, setShowing] = useState(false);
    const showImgProps = useSpring({
        config: { friction: 32, tension: 320 },
        height: showing ? "20em" : "0em",
    });

    return (
        <div
            className={showing ? "item showing" : "item"}
            onClick={() => setShowing((val) => !val)}
        >
            <div className="title">{props.title}</div>
            <div className="info">
                <div>
                    <i className="fa fa-map-marker-alt icon"></i>
                    {props.location}
                </div>
                <i>{props.time}</i>
            </div>

            <animated.div style={showImgProps} className="img-container">
                <img src={props.image} alt="" style={{ height: "20em" }}></img>
            </animated.div>
        </div>
    );
}
