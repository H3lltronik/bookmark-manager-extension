import create from "zustand";

export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;
interface BookmarksStore {
    bookmarks: BookmarkTreeNode[],
    searchString: string,
    getFilteredBookmarks: () => BookmarkTreeNode[]
    setBookmarks: (bookmarks: BookmarkTreeNode[]) => void,
    setSearchString: (searchString: string) => void,
}

export const useBookmarksStore = create<BookmarksStore>((set, get) => ({
  bookmarks: [],
  searchString: "",
  getFilteredBookmarks: () => {
    const { bookmarks, searchString } = get();
    const flattenBookmarks = flattenBookmarkTree(bookmarks);
    const filteredBookmarks = flattenBookmarks.filter((bookmark) => {
        return bookmark.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1
    });

    return filteredBookmarks;
  },
  setBookmarks: (bookmarks: BookmarkTreeNode[]) =>
    set((state: BookmarksStore) => {
        return { bookmarks };
    }),
  setSearchString: (searchString: string) =>
    set((state: BookmarksStore) => {
        return { searchString };
    }),
}));

const flattenBookmarkTree = (bookmarkTrees: BookmarkTreeNode[]) => {
    let result:BookmarkTreeNode[] = [];
    for (const bookmarkTree of bookmarkTrees) {
        if ( bookmarkTree.children ) {
            result.push( ...flattenBookmarkTree( bookmarkTree.children ) );
        } else {
            result.push(bookmarkTree);
        }
    }
    return result;
}
