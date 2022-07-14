import React from 'react';
import './messageTag.css';

const MessageTag = ({ children }) => {
    return <span className="message-tag">{children}</span>;
};

export default MessageTag;
