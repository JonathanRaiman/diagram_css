var nodes = [
    [
        {
            "text": "Type Axis 1",
            "type": ["yellow"],
            "name": "ta1"
        },
        {
            "text": "...",
            "type": ["etc"]
        },
        {
            "text": "Type Axis k",
            "type": ["yellow"],
            "name": "tak"
        },
        {
            "text": "Thing",
            "type": ["gray"],
            "name": "thing",
            "parent": ["tak"]
        }
    ],
    [
        {
            "text": "softmax",
            "type": ["green"],
            "name": "s1",
            "parent": ["ta1"]
        },
        {
            "text": "",
            "type": []
        },
        {
            "text": "softmax",
            "type": ["green"],
            "name": "s2",
            "parent": ["tak"]
        }
    ],
    [
        {
            "text": "FC",
            "type": ["purple", "circle"],
            "name": "fc1",
            "parent": ["s1"]
        },
        {
            "text": "",
            "type": []
        },
        {
            "text": "FC",
            "type": ["purple", "circle"],
            "name": "fc2",
            "parent": ["s2"]
        }
    ],
    [
        {
            "text": "Stacked Bi-LSTM",
            "type": ["blue"],
            "width": "75%",
            "height": 0.4,
            "name": "lstm",
            "parent": ["fc1", "fc2"]
        }
    ],
    [
        {
            "text": "dropout",
            "type": ["green"],
            "width": "75%",
            "name": "dropout",
            "parent": ["lstm"]
        }
    ],
    [
        {
            "text": "Word 1",
            "type": ["yellow"],
            "parent": ["dropout"],
            "name": "word1"
        },
        {
            "text": "...",
            "type": ["etc"],
            "parent": ["dropout"],
            "name": "wordetc"
        },
        {
            "text": "Word n",
            "type": ["yellow"],
            "parent": ["dropout"],
            "name": "wordn"
        }
    ]
];
render_diagram(nodes, 40, document.getElementById("diagram"));