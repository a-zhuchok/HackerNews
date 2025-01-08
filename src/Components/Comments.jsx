import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetComments } from '../redux/CommentsSlice';
import ChildrenComments from './ChildrenComments';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetComments(comments))
  }, [comments, dispatch]);

  const { status, data } = useSelector((state) => state.comments);
  const [openComments, setOpenComments] = useState({});

  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }))
  };

  return (
    <div className='comments'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' &&
        <div>
          <h3>Comments ({data.length})</h3>
          <ul>
            {data.map((item) => (
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
                {openComments[item.id] && item.kids && <ChildrenComments childrenComments={item.children} toggleComments={toggleComments} openComments={openComments} />}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default Comments;