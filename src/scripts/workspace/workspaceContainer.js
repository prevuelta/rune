import React from 'react';

// Panels
import { Data } from '../data';

// import { MODE, MODE_TAG } from '../util/constants';

const AppStatus = props => (
    <div id="rune-status">
        <span className="tag">{MODE_TAG[props.app.mode]} mode</span>
    </div>
);

const Workspace = props => {
    return (
        <div id="rune-workspace">
            <AppStatus />
            <CodeInspector />
            <Canvas />
        </div>
    );
};

// <div id="rune-workspace">
//     <div id="rune-panels">
//         {panels.map((panel, i) => (
//             <PanelContainer title={panel.title} key={i}>
//                 <panel.panel />
//             </PanelContainer>
//         ))}
//     </div>
//     <div id="rune-tools" />
//     <div id="runes" onClick={props.deselectAllPoints}>
//         {props.runes.map((r, i) => {
//             return <Rune rune={r} key={i} />;
//         })}
//     </div>
// </div>

export default WorkSpace;
