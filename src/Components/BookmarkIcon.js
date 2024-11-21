import React from 'react';
import { ReactComponent as BookmarkOutline } from '../Images/icon-bookmark.svg';
import { ReactComponent as BookmarkFilled } from '../Images/icon-bookmark-full.svg';

const BookmarkIcon = ({ filled, onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer" }}>
            {filled ? <BookmarkFilled /> : <BookmarkOutline />}
        </div>
    );
};

export default BookmarkIcon;  
