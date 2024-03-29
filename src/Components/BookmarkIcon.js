import React from 'react';
import { ReactComponent as BookmarkFilled} from './icon-bookmark-full.svg'
import { ReactComponent as BookmarkOutline } from './icon-bookmark.svg';

const BookmarkIcon = ({ filled, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      {filled ? <BookmarkFilled /> : <BookmarkOutline />}
    </div>
  );
};

export default BookmarkIcon;