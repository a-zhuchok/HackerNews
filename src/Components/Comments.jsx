import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetComments } from '../redux/CommentsSlice';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  useEffect(() => {  
      dispatch(fetchGetComments(comments)); 
  }, [comments, dispatch, ]);
  
  const { status, data } = useSelector((state) => state.comments);

 console.log('dataaaaaaaaaa', data)
  const formatText = (text) => {
    text = text.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
    text = text.replace(/<[^>]*>/g, '');
    return text.trim();
  };
  const [openComments, setOpenComments] = useState({});

  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className=''>
     
     {status==='loading' && <p>Loding...</p>}
        {status==='succeeded' && 
        <ul>
        {data.map((item) => (
          <li key={item.id} className='news'>
            <div className='news_info'>
              <p>{formatText(item.text)}</p>
              {item.kids && item.kids.length > 0 && (
                <button onClick={() => toggleComments(item.id)}>
                  {openComments[item.id] ? 'Hide Comments' : `Show (${item.kids.length})`}
                </button>
              )}
            </div>
            {openComments[item.id] && item.kids && <Comments comments={item.kids} />}
          </li>
        ))}
      </ul>
} 
    </div>
  );
}

export default Comments;