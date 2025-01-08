import React from 'react';

const ChildrenComments = ({ childrenComments, toggleComments, openComments }) => {
  return (
    <ul>
      {childrenComments.map((item) => (
        <li key={item.id} className='comments_item'>
          <div className='item_info'>
            <div className='item_by'>by {item.by}</div>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
          {item.kids && item.kids.length > 0 && (
            <p className='item_button' onClick={() => toggleComments(item.id)}>
              {openComments[item.id] ? 'Hide Comments' : `Show Comments (${item.children.length})`}
            </p>
          )}
          {openComments[item.id] && item.kids && (
            <ChildrenComments childrenComments={item.children} toggleComments={toggleComments} openComments={openComments} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default ChildrenComments;