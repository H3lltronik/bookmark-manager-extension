import * as React from 'react'
import { useState, useEffect, ChangeEvent } from 'react'
import { BookmarkTreeNode, useBookmarksStore } from '../store';

export default function App() {
    const setBookmarks = useBookmarksStore(state => state.setBookmarks);
    const filteredBookmarks = useBookmarksStore(state => state.getFilteredBookmarks());
    const setSearchString = useBookmarksStore(state => state.setSearchString);
    const searchString = useBookmarksStore(state => state.searchString);

    useEffect(() => {
        (async () => {
            const bookmarks = await chrome.bookmarks.getTree();
            setBookmarks(bookmarks);
        })()
    }, [])


    const inputTest = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    }

    const openBookmark = (url: string | undefined) => {
        chrome.tabs.create({url, active: true});
    }

    return (
        <div>
            <h1>Bookmark Manager</h1>

            {
                searchString?
                <div>Searching for: {searchString}</div>
                :null
            }

            <input type="text" onChange={inputTest} autoFocus={true}/>

            
            <ul>
                {filteredBookmarks.map((bookmark: BookmarkTreeNode) => {
                    return (
                        <li key={bookmark.dateAdded}>
                            <a href={bookmark.url} onClick={() => openBookmark(bookmark.url)}>
                                {bookmark.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};