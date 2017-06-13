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
render_diagram(nodes, 40, document.getElementById("diagram"));
