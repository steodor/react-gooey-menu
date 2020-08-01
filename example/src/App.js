import React, { useState } from 'react';

import { GooeyMenu } from 'react-gooey-menu';

const allItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const App = () => {
    const [items, setItems] = useState([]);

    return <>
        <GooeyMenu>
            {items.map((item, index) => <span key={index}>{item}</span>)}
        </GooeyMenu>
        <button onClick={() => setItems(items => [...items, allItems[items.length % 10]])}>+ Add menu item</button>
        <button onClick={() => setItems(items => items.slice(0, items.length - 1))}>- Remove menu item</button>
    </>;
};

export default App;
