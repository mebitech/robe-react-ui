import React from "react";
import {ShallowComponent} from "robe-react-commons";
import ClassName from "../util/css/ClassName";
import "./ProgressBar.css"

export default class ProgressBar extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes:Map = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        loading: React.PropTypes.bool
    };

    /**
     * Default properties of the component
     *
     * @static
     */
    static defaultProps = {
        show: true
    };

    constructor(props:Object) {
        super(props);
    }

    render():Object {

        let progress = {className: "rb-progress"};
        let bar = {className: "rb-progress-bar"};

        if (this.props.loading) {
            ClassName.add(bar, "rb-progress-bar-start");
        }
        else {
            ClassName.add(bar, "rb-progress-bar-finish");
            ClassName.add(progress, "rb-progress-finish");
        }
        
        return (
            <div className={this.props.className} style={this.props.style}>
                <div className={progress.className}>
                    <div className="rb-progress-content">
                        <div className={bar.className}></div>
                    </div>
                </div>
            </div>
        );
    }
}
