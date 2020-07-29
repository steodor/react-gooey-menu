let alreadyInserted = false;

export default () => {
    if (alreadyInserted) { return; }

    try {
        const svgNode = document.createElement('svg');
        svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgNode.setAttribute('version', '1.1');
        svgNode.innerHTML = `<defs>
                <filter id="react-gooey-menu-shadowed-goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                    <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                    <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                    <feComposite in2="shadow" in="goo" result="goo" />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
                <filter id="react-gooey-menu-goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
            </defs>`;

        document.body.append(svgNode);
        alreadyInserted = true;
    } catch (e) {
        window.console && console.error('[react-gooey-menu] Error inserting SVG filters in DOM', e);
    }
};
