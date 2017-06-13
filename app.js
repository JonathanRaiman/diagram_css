var nodes = [
    [
        {
            "text": "Type Axis 1",
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
            "text": "Type Axis k",
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
            "parent": ["tak", "thing2"]
        },
        {
            "text": "Thing",
            "class": ["node-gray", "node-comment", "node-comment2"],
            "name": "thing2"
        }
    ],
    [
        {
            "text": "softmax",
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
            "text": "softmax",
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
            "text": "FC",
            "class": ["node-purple", "node-circle"],
            "name": "fc1",
            "parent": ["s1"],
            "position": {
                "left": "25%"
            }
        },
        {
            "text": "FC",
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
            "text": "Stacked Bi-LSTM",
            "class": ["node-blue"],
            "width": "55%",
            "height": 0.4,
            "name": "lstm",
            "parent": ["fc1", "fc2"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "dropout",
            "class": ["node-green"],
            "width": "55%",
            "name": "dropout",
            "parent": ["lstm"],
            "position": {
                "left": "50%"
            }
        }
    ],
    [
        {
            "text": "Word 1",
            "class": ["node-yellow"],
            "parent": ["dropout"],
            "name": "word1",
            "position": {
                "left": "25%"
            }
        },
        {
            "text": "...",
            "class": ["node-etc"],
            "parent": ["dropout"],
            "name": "wordetc",
            "position": {
                "left": "50%"
            }
        },
        {
            "text": "Word n",
            "class": ["node-yellow"],
            "parent": ["dropout"],
            "name": "wordn",
            "position": {
                "left": "75%"
            }
        }
    ]
];
render_diagram(nodes, 40, document.getElementById("diagram"));
