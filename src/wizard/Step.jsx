import React from "react";
import {ShallowComponent, Application, Assertions, Maps} from "robe-react-commons";

export default class Step extends ShallowComponent {
    static propTypes = {
        /**
         *
         */
        title: React.PropTypes.string,
        /**
         *
         */
        currentKey: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
        /**
         *
         */
        index: React.PropTypes.number
    };

    static defaultProps = {
        title: undefined,
        stepKey: undefined,
        index: 0
    };

    __components = [];
    __refs = {};

    constructor(props:Object) {
        super(props);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.__initComponents(nextProps);
    }

    render():Object {
        return <div>{this.__components}</div>
    }

    isValid() {
        let result = {message: undefined, status: true, type: "error"};
        for (let i in this.__refs) {
            let ref = this.__getRef(this.__refs[i]);
            if (ref && ref.isValid) {
                let componentResult = ref.isValid();
                if (componentResult === undefined) {
                    continue;
                }
                else if (typeof(componentResult) === "boolean") {
                    result.status = componentResult;
                } else {
                    result.message = componentResult.message || undefined;
                    result.type = componentResult.type || "error";
                    if (typeof(componentResult.status) === "boolean") {
                        result.status = componentResult.status;
                    }
                    else {
                        result.status = true;
                    }
                }
            }
        }
        return result;
    }

    __getStateOfStep() {
        let stateOfStep = {};
        for (let i in this.__refs) {
            let ref = this.__getRef(this.__refs[i]);
            let state = ref.state ? ref.state : {};
            stateOfStep = Maps.mergeDeep(stateOfStep, state)
        }
        return stateOfStep;
    }

    __stateOfSteps(stateOfSteps) {
        for (let i in this.__refs) {
            let ref = this.__getRef(this.__refs[i]);
            if (ref && ref.stateOfSteps) {
                ref.stateOfSteps(stateOfSteps);
            }
        }
    }

    __initComponents(props) {
        this.__components = React.Children.map(props.children,
            (child, idx) => {
                return React.cloneElement(child, {
                    ref: this.__setRef(idx, child.ref)
                });
            });
    }

    __getRef(idx) {
        return this.refs[idx];
    }

    __setRef(idx, ref) {
        if (!ref) {
            this.__refs[idx] = idx;
            return idx;
        }
        if (Assertions.isString(ref)) {
            this.__refs[idx] = ref;
            return ref;
        } else if (Assertions.isFunction(ref)) {
            return (el) => {
                ref(el);
                this.__refs[idx] = el
            };
        }
    }
}