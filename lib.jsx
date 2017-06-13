import "babel-polyfill";
import React from 'react';
import cloner from "cloner";
import ReactDOM from 'react-dom';
import * as d3 from "d3";

function convertToPixels(width, value) {
    if (typeof(value) == "string") {
        return (parseFloat(value.substr(0, value.length - 1)) / 100.0) * width;
    }
    return value;
}

function create_nodes(nodes, base_increment) {
    var divs = [];
    var node_stats = {};
    var base_size = 22;
    var counter = 0;
    var offset_top = 0;
    for (var i = 0; i < nodes.length; i++) {
        var level = nodes[i];
        var group_height = base_increment + base_size;

        for (var j = 0; j < level.length;j++) {
            if ("height" in level[j]) {
                group_height = Math.max(group_height, level[j]["height"] * base_increment + base_size);
            }
        }
        var level_divs = [];
        var level_counter = 0;

        for (var j = 0; j < level.length;j++) {
            var left = (((j + 1)/ (level.length + 1)) * 100.0) + "%";
            var style = {
                top: "50%",
                left: left
            };
            var className = "node";
            for (var k = 0; k < level[j].type.length;k++) {
                className += " node-" + level[j].type[k];
            }
            var height, width;
            if ("width" in level[j]) {
                style["width"] = level[j]["width"];
                width = level[j]["width"];
            } else {
                width = base_size;
            }
            
            if ("height" in level[j]) {
                style["paddingTop"] = (level[j]["height"] / 2) * base_increment;
                style["paddingBottom"] = (level[j]["height"] / 2) * base_increment;
                height = level[j]["height"] * base_increment + base_size;
            } else {
                height = base_size;
            }
            var div = <div key={level_counter++}
                           style={style}
                           className={className}>{level[j].text}</div>;
            level_divs.push(div);
            if ("name" in level[j]) {
                node_stats[level[j]["name"]] = {
                    "style": style,
                    "height": height,
                    "width": width,
                    "top": offset_top + group_height / 2,
                    "left": left
                };
            }
        }
        offset_top += group_height;
        divs.push(
            <div key={counter++} className="node-group"
                 style={{height: group_height}}>{level_divs}</div>
        );
    }

    function paths_fun(clientWidth) {
        var paths = [];
        var path_counter = 0;
        var lineFunction = d3.line().x(function(d) { return d.x;})
                                    .y(function(d) { return d.y;})
                                    .curve(d3.curveBasis);

        
        for (var i = 0; i < nodes.length; i++) {
            var level = nodes[i];
            for (var j = 0; j < level.length;j++) {
                if ("parent" in level[j]) {
                    
                    var current_node = node_stats[level[j]["name"]];
                    for (var k = 0; k < level[j]["parent"].length; k++) {
                        var parent_node = node_stats[level[j]["parent"][k]];
                        var kink = 15;

                        var start_x = convertToPixels(clientWidth, current_node.left);
                        var start_y = current_node.top - current_node.height / 2;
                        var end_y = (parent_node.top + parent_node.height / 2);
                        var end_x = convertToPixels(clientWidth, parent_node.left);
                        var width = convertToPixels(clientWidth, current_node.width);
                        var height = convertToPixels(clientWidth, current_node.height);

                        if (start_x - width / 2 <= end_x && end_x <= start_x + width / 2) {
                            start_x = end_x;
                        }

                        var positions = [
                            {
                                x: start_x,
                                y: start_y
                            },
                            {
                                x: start_x,
                                y: start_y - kink
                            },
                            {
                                x: end_x,
                                y: end_y + 8 + kink
                            },
                            {
                                x: end_x,
                                y: end_y + 8
                            }
                        ];
                        paths.push(
                            <path d={lineFunction(positions)} key={path_counter++}
                                  className="network-edge"
                                  style={{"markerEnd": "url(#arrow)"}}/>
                        );
                    }
                }
            }
        }
        return paths
    }

    return {"divs": divs, "paths": paths_fun };
}

class Diagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientWidth: 100
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    render() {
        var outcome = create_nodes(this.props.nodes, this.props.increment);
        return (
            <div className="network-diagram-nodes sans-serif" id="diagram" ref="diagram">
                <div className="network-diagram">
                    <svg>
                        <marker id="arrow" refX="2" refY="2.5"
                                markerWidth="5" markerHeight="5"
                                orient="auto">
                            <path d="M0,0 L5,2.5 L0,5 Z" className="arrow"/>
                        </marker>
                        {outcome.paths(this.state.clientWidth)}
                    </svg>
                </div>
                {outcome.divs}
            </div>
        );
    }

    updateDimensions() {
        this.setState(
            {clientWidth: this.refs.diagram.clientWidth}
        );
    }
    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

}

window.render_diagram = function (nodes, increment, canvas) {
    ReactDOM.render(<Diagram nodes={nodes}
                             increment={increment}/>, canvas);
}
