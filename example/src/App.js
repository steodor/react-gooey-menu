import React, { useState } from 'react';

import { GooeyMenu } from 'react-gooey-menu';
import 'react-gooey-menu/dist/index.css';

const allItems = ['unos', 'dos', 'tres', 'quatros', 'quintos', 'seiz', 'siete', 'uocho', 'nuovo', 'dici'];

const App = () => {
    const [items, setItems] = useState([]);

    return <>
        <GooeyMenu text="Create React Library Example 😄">
            {items.map((item, index) => <span key={index}>{item}</span>)}
        </GooeyMenu>
        <button onClick={() => setItems(items => [...items, 'Menu ' + allItems[items.length]])}>+ Add menu item</button>
    </>;
};

export default App;
