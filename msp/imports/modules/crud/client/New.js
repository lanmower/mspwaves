import React from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';

const render = (props) => {
    return (
        <div className="New">
            <Editor {...props}/>
        </div>
    );
};

export default render;
