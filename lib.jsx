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
            var node = level[j];
            var style = {};
            var left = 0;
            if ("position" in node) {
                if ("left" in node.position) {
                    style.left = node.position.left;
                    left = node.position.left;
                }
                if ("top" in node.position) {
                    style.top = node.position.top;
                }
            }
            var className = "node";
            for (var k = 0; k < node["class"].length;k++) {
                className += " " + node["class"][k];
            }
            var height, width;
            if ("width" in node) {
                style.width = node.width;
                width = node.width;
            } else {
                width = base_size;
            }

            if ("height" in node) {
                style["paddingTop"] = (node.height / 2) * base_increment;
                style["paddingBottom"] = (node.height / 2) * base_increment;
                height = node.height * base_increment + base_size;
            } else {
                height = base_size;
            }
            var div;
            if ("name" in node) {
                div = <div key={level_counter++}
                           style={style}
                           ref={"node-" + node.name}
                           className={className}>{node.text}</div>;
            } else {
                div = <div key={level_counter++}
                           style={style}
                           className={className}>{node.text}</div>;
            }
            level_divs.push(div);
            if ("name" in node) {
                node_stats[node.name] = {
                    "style": style,
                    "height": height,
                    "width": width,
                    "top": offset_top + group_height / 2,
                    "left": left,
                    "div": div
                };
            }
        }
        offset_top += group_height;
        divs.push(
            <div key={counter++} className="node-group"
                 ref={"node-group-" + i}
                 style={{height: group_height}}>{level_divs}</div>
        );
    }

    function paths_fun(clientWidth, nodesizes) {
        var paths = [];
        var path_counter = 0;
        var lineFunction = d3.line().x(function(d) { return d.x;})
                                    .y(function(d) { return d.y;})
                                    .curve(d3.curveBasis);


        for (var i = 0; i < nodes.length; i++) {
            var level = nodes[i];
            for (var j = 0; j < level.length;j++) {
                var node = level[j];
                if ("parent" in node) {
                    var current_node = node_stats[node.name];
                    var node_x, node_y, node_width, node_height;
                    if (node.name in nodesizes) {
                        node_width = nodesizes[node.name].width;
                        node_height = nodesizes[node.name].height;
                        node_x = nodesizes[node.name].left;
                        node_y = nodesizes[node.name].top;
                    } else {
                        node_width = convertToPixels(clientWidth, current_node.width);
                        node_height = convertToPixels(clientWidth, current_node.height);
                        node_x = convertToPixels(clientWidth, current_node.left);
                        node_y = convertToPixels(clientWidth, current_node.top);
                    }
                    for (var k = 0; k < node.parent.length; k++) {
                        var parent = node.parent[k];
                        var parent_node = node_stats[parent];
                        var kink = 15;
                        var parent_width, parent_x,
                            parent_y, parent_width, parent_height;
                        if (parent in nodesizes) {
                            parent_x = nodesizes[parent].left;
                            parent_y = nodesizes[parent].top;
                            parent_width = nodesizes[parent].width;
                            parent_height = nodesizes[parent].height;
                        } else {
                            parent_x = convertToPixels(clientWidth, parent_node.left);
                            parent_y = convertToPixels(clientWidth, parent_node.top);
                            parent_width = convertToPixels(clientWidth, parent_node.width);
                            parent_height = convertToPixels(clientWidth, parent_node.height);
                        }
                        var positions = [];
                        // horizontal:
                        if (node_y - node_height / 2 <= parent_y &&
                            parent_y <= node_y + node_height / 2) {
                            var start_x, end_x;
                            if (node_x > parent_x) {
                                // right to left
                                start_x = node_x - width / 2;
                                end_x = parent_x + parent_width / 2 + 8;
                            } else {
                                // left to right
                                start_x = node_x + width / 2;
                                end_x = parent_x - parent_width / 2 - 8;
                            }
                            // keep the vertical axis given by the smallest element:
                            var end_y = parent_height < node_height ? parent_y : node_y;

                            // sideways
                            positions = [
                                {
                                    x: start_x,
                                    y: end_y
                                },
                                {
                                    x: end_x,
                                    y: end_y
                                }
                            ];
                        } else {
                            // vertical
                            // upwards
                            if (node_y > parent_y) {
                                // downwards
                                positions = [
                                    {
                                        x: node_x,
                                        y: node_y - node_height / 2
                                    },
                                    {
                                        x: node_x,
                                        y: node_y - node_height / 2 - kink
                                    },
                                    {
                                        x: parent_x,
                                        y: parent_y + parent_height / 2 + 8 + kink
                                    },
                                    {
                                        x: parent_x,
                                        y: parent_y + parent_height / 2 + 8
                                    }
                                ];
                            } else {
                                positions = [
                                    {
                                        x: node_x,
                                        y: node_y + node_height / 2
                                    },
                                    {
                                        x: node_x,
                                        y: node_y + node_height / 2 + kink
                                    },
                                    {
                                        x: parent_x,
                                        y: parent_y - parent_height / 2 - 8 - kink
                                    },
                                    {
                                        x: parent_x,
                                        y: parent_y - parent_height / 2 - 8
                                    }
                                ];
                            }
                        }
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

    return {"divs": divs, "paths": paths_fun, "node_stats": node_stats};
}

class Diagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientWidth: 100,
            nodesizes: {}
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
                        {outcome.paths(this.state.clientWidth, this.state.nodesizes)}
                    </svg>
                </div>
                {outcome.divs}
            </div>
        );
    }

    updateDimensions() {

        var nodesizes = {};
        for (var i = 0; i < this.props.nodes.length;i++) {
            var group_el = this.refs["node-group-" + i];
            for (var j = 0; j < this.props.nodes[i].length;j++) {
                if ("name" in this.props.nodes[i][j]) {
                    var el = this.refs["node-" + this.props.nodes[i][j]["name"]];
                    nodesizes[this.props.nodes[i][j]["name"]] = {
                        width: el.clientWidth,
                        height: el.clientHeight,
                        top: el.offsetTop + group_el.offsetTop,
                        left: el.offsetLeft + group_el.offsetLeft
                    }
                }
            }
        }

        this.setState(
            {clientWidth: this.refs.diagram.clientWidth,
             nodesizes: nodesizes}
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
