export const getSavedBookmarks = () => {
    const saved = localStorage.getItem('bookmarkedItems');
    return saved ? JSON.parse(saved) : [];
};

export const saveBookmarks = (bookmarks) => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarks));
};

export const isProductBookmarked = (productId) => {
    const savedBookmarks = getSavedBookmarks();
    return savedBookmarks.includes(productId);
};
