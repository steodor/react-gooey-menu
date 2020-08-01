import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import jss from 'jss';
import { defaultMenuIcon, defaultCloseIcon } from './lib/icons';
import renderSVGFilters from './lib/renderSVGFilters';

const useStyles = createUseStyles({
    main: {
        color: 'blue',
    },
});

const sheet = jss.createStyleSheet({}, { link: true }).attach();

const createMenuItemRules = (numberOfItems, color, background) => {
    const rules = [];

    for (let i = 0; i < numberOfItems; i++) {
        rules.push(sheet.addRule('menuItem-' + i, {
            color,
            background,
        }));
    }

    return rules;
}

export const GooeyMenu = ({
    icon = defaultMenuIcon,
    closeIcon = defaultCloseIcon,
    className = '',
    background = '#ff4081',
    color = '#fff',
    children,
    initiallyOpen = false,
}) => {
    useEffect(renderSVGFilters, []); // renders SVG filters only once per page lifetime, rest of the calls are noops.

    const classes = useStyles();

    //--------- ITEMS RENDERING / STYLING

    const [numberOfItems, setNumberOfItems] = useState(children && children.length || 0);

    const [itemRules, setItemRules] = useState(createMenuItemRules(numberOfItems, color, background));

    useEffect(() => {
        const newNumberOfItems = children && children.length || 0;

        if (numberOfItems != newNumberOfItems) {
            for (let i = 0; i < numberOfItems; i++) {
                sheet.deleteRule('menuItem-' + i);
            }
            setItemRules(createMenuItemRules(newNumberOfItems, color, background));
            setNumberOfItems(newNumberOfItems);
        }
    }, [children, numberOfItems, color, background, setItemRules, setNumberOfItems]);

    const renderedChildren = useMemo(() => children && children.map((child, index) => {
        // console.warn('child', index, itemRules);
        const rule = itemRules[index] || {};
        return <span key={index} className={rule.id}>{child}</span>;
    }), [itemRules]);

    //--------- STATE MANAGEMENT

    const [isOpen, setIsOpen] = useState(initiallyOpen);

    return <div className={`react-gooey-menu${isOpen ? ' is-open' : ''} ${className}`}>
        <div className={classes.main, 'react-gooey-menu-main-button'} onClick={() => setIsOpen(open => !open)}>{icon}</div>
        {renderedChildren}
    </div>;
};
