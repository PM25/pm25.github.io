import React, { PureComponent, useState } from "react";
import { useSpring, animated } from "react-spring";
import LazyLoad from "react-lazyload";

// images
import uiuc2019_workshop from "../img/2019-9-4-workshop.webp";
import taai2020_talk from "../img/TAAI2020-talk.webp";

export default class TalksSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activities: [
                {
                    title: "Cost Learning Network for Imbalanced Classification",
                    location:
                        "Taiwanese Association for Artificial Intelligence",
                    time: "Dec 4, 2020",
                    description: "",
                    image: taai2020_talk,
                },
                {
                    title: "Deep Learning with Keras",
                    location:
                        "University of Illinois Urbana-Champaign, Prof. Stephen Boppart's Group",
                    time: "Sep 4, 2019",
                    description: "",
                    image: uiuc2019_workshop,
                },
            ],
            activeIdx: null,
        };
    }

    render() {
        return (
            <div id="talks" className="section">
                <div className="container">
                    <h2 className="header">Presentations / Talks</h2>
                    <div className="content">
                        {this.state.activities.map((state, key) => {
                            return this.renderActivitiesBlock(state);
                        })}
                    </div>
                </div>
            </div>
        );
    }

    renderActivitiesBlock(state) {
        return (
            <TalkBlock
                title={state.title}
                time={state.time}
                location={state.location}
                description={state.description}
                image={state.image}
            ></TalkBlock>
        );
    }
}

function TalkBlock(props) {
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
                <div className="subtitle">
                    <i className="fa fa-map-marker-alt icon"></i>
                    {props.location}
                </div>
                <i>{props.time}</i>
            </div>

            <animated.div style={showImgProps} className="img-container">
                <LazyLoad offset={100}>
                    <img
                        src={props.image}
                        alt=""
                        // style={{ height: "20em" }}
                    ></img>
                </LazyLoad>
            </animated.div>
        </div>
    );
}
