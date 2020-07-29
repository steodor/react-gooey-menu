import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import jss from 'jss';
import renderFilters from './lib/renderFilters';

const useStyles = createUseStyles({
    main: {
        color: 'blue',
    },
});

const sheet = jss.createStyleSheet({}, { link: true }).attach();

const createMenuItemRules = numberOfItems => {
    const rules = [];

    for (let i = 0; i < numberOfItems; i++) {
        rules.push(sheet.addRule('menuItem-' + i, {
            color: 'red',
        }));
    }

    return rules;
}

export const GooeyMenu = ({
    icon,
    closeIcon,
    className = 'react-gooey-menu',
    color = '#ff4081',
    children,
    text,
}) => {
    useEffect(renderFilters, []);

    const classes = useStyles();

    const [numberOfItems, setNumberOfItems] = useState(children && children.length || 0);

    const [itemRules, setItemRules] = useState(createMenuItemRules(numberOfItems));

    useEffect(() => {
        const newNumberOfItems = children && children.length || 0;

        if (numberOfItems != newNumberOfItems) {
            for (let i = 0; i < numberOfItems; i++) {
                sheet.deleteRule('menuItem-' + i);
            }
            setItemRules(createMenuItemRules(newNumberOfItems));
            setNumberOfItems(newNumberOfItems);
        }
    }, [children, numberOfItems, setItemRules, setNumberOfItems]);

    const renderedChildren = useMemo(() => children && children.map((child, index) => {
        console.warn('child', index, itemRules);
        const rule = itemRules[index] || {};
        return <div key={index} className={rule.id}>{child}</div>;
    }), [itemRules]);

    return <div>
        <div className={classes.main}>Example Component: {text}</div>
        {renderedChildren}
    </div>;
};
