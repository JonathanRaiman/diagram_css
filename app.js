var nodes = [
    [
        {
            "text": "Output 1",
            "class": ["node-yellow"],
            "name": "ta1",
            "position": {
                "left": "25%"
            }
        },
        {
            "text": "...",
            "class": ["node-etc"],
            "position": {
                "left": "50%"
            }
        },
        {
            "text": "Output k",
            "class": ["node-yellow"],
            "name": "tak",
            "position": {
                "left": "75%"
            }
        },
        {
            "text": "Here's a really long winded message about how you should do diagrams NOT with SVGs, but with React!",
            "class": ["node-gray", "node-comment", "node-comment1"],
            "name": "thing",
            "parent": ["tak", "thing2"],
            "edge-class": ["network-edge-subtle"]
        },
        {
            "text": "Side message",
            "class": ["node-gray", "node-comment", "node-comment2"],
            "name": "thing2"
        }
    ],
    [
        {
            "text": "operation",
            "class": ["node-green"],
            "name": "s1",
            "parent": ["ta1"],
            "position": {
                "left": "25%"
            }
        },
        {
            "text": "",
            "class": [],
            "position": {
                "left": "50%"
            }
        },
        {
            "text": "operation",
            "class": ["node-green"],
            "name": "s2",
            "parent": ["tak"],
            "position": {
                "left": "75%"
            }
        }
    ],
    [
        {
            "text": "+",
            "class": ["node-purple", "node-circle"],
            "name": "fc1",
            "parent": ["s1"],
            "position": {
                "left": "25%"
            }
        },
        {
            "text": "×",
            "class": ["node-purple", "node-circle"],
            "name": "fc2",
            "parent": ["s2"],
            "position": {
                "left": "75%"
            }
        }
    ],
    [
        {
            "text": "Big Pharma",
            "class": ["node-blue"],
            "width": "55%",
            "height": 0.4,
            "name": "pharma",
            "parent": ["fc1", "fc2"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "pensions",
            "class": ["node-green"],
            "width": "55%",
            "name": "pensions",
            "parent": ["pharma"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "Citizen 1",
            "class": ["node-yellow"],
            "parent": ["pensions"],
            "name": "word1",
            "position": {
                "left": "25%"
            }
        },
        {
            "text": "...",
            "class": ["node-etc"],
            "parent": ["pensions"],
            "name": "wordetc",
            "position": {
                "left": "50%"
            }
        },
        {
            "text": "Citizen n",
            "class": ["node-yellow"],
            "parent": ["pensions"],
            "name": "wordn",
            "position": {
                "left": "75%"
            }
        }
    ]
];
// render_diagram(nodes, {increment:40}, document.getElementById("diagram"));




var rotating_nodes = [
    [
        {
            "text": "IsAnimal?",
            "class": ["node-yellow"],
            "name": "IsAnimal",
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "softmax",
            "class": ["node-green"],
            "name": "softmax",
            "parent": ["IsAnimal"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "FC",
            "class": ["node-purple", "node-circle"],
            "name": "fc",
            "parent": ["softmax"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "concat",
            "class": ["node-green"],
            "name": "concat",
            "parent": ["fc"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "The",
            "class": ["node-yellow", "node-rotatable", "node-rotate1"],
            "parent": ["concat"],
            "name": "word1",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate1"]
        },
        {
            "text": "man",
            "class": ["node-yellow", "node-rotatable", "node-rotate2"],
            "parent": ["concat"],
            "name": "word2",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate2"]
        },
        {
            "text": "saw",
            "class": ["node-yellow", "node-rotatable", "node-rotate3"],
            "parent": ["concat"],
            "name": "word3",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate3"]
        },
        {
            "text": "the",
            "class": ["node-yellow", "node-rotatable", "node-rotate4"],
            "parent": ["concat"],
            "name": "word4",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate4"]
        },
        {
            "text": "jaguar",
            "class": ["node-yellow", "node-rotatable", "node-rotate5"],
            "parent": ["concat"],
            "name": "word5",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate5"]
        },
        {
            "text": "cross",
            "class": ["node-yellow", "node-rotatable", "node-rotate6"],
            "parent": ["concat"],
            "name": "word6",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate6"]
        },
        {
            "text": "the",
            "class": ["node-yellow", "node-rotatable", "node-rotate7"],
            "parent": ["concat"],
            "name": "word7",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate7"]
        },
        {
            "text": "jungle",
            "class": ["node-yellow", "node-rotatable", "node-rotate8"],
            "parent": ["concat"],
            "name": "word8",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate8"]
        },
        {
            "text": "fast",
            "class": ["node-yellow", "node-rotatable", "node-rotate9"],
            "parent": ["concat"],
            "name": "word9",
            "position": {},
            "edge-class": ["edge-rotatable", "edge-rotate9"]
        }
    ]
];

render_diagram(rotating_nodes, {increment:40, refresh: 30},
    document.getElementById("other-diagram"));
