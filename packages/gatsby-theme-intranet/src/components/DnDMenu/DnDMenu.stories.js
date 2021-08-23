import React from "react";

import { Bookmarks as BookmarkComponent } from "./";

export default {
  title: "Components/Navigation",
  component: Bookmarks,
};

export const Bookmarks = () => {
  let bookmarks = [
    {
      id: "1",
      label: "Ledighet och frånvaro",
      url: "/page-1",
    },
    {
      id: "2",
      label: "Stöd och verktyg",
      url: "/page-2",
    },
    {
      id: "3",
      label: "Tidsredovisning",
      url: "/page-2",
    },
    {
      id: "4",
      label: "Resor",
      url: "/page-2",
    },
    {
      id: "5",
      label: "Lorem ipsum",
      url: "/page-2",
    },
    {
      id: "6",
      label: "Lorem ipsum 2",
      url: "/page-5",
    },
    {
      id: "7",
      label: "Lorem ipsum 3",
      url: "/page-5",
    },
  ];

  return (
    <BookmarkComponent
      items={bookmarks}
      title="myBookmarksLabel"
      showMoreLabel="allBookmarksLabel"
      showLessLabel="hideBookmarksLabel"
    />
  );
};

// const [page, setPage] = useState({
//   id: 7,
//   label: "Lorem ipsum ny",
//   url: "/page-2",
// });

// {!page.bookmarked && (
//   <button
//     type="button"
//     onClick={(e) => {
//       const bookmarkExist = bookmarks.some(
//         (bookmark) => bookmark.id == page.id,
//       );

//       if (!bookmarkExist) {
//         setPage({ ...page, bookmarked: true });
//         setBookmarks([...bookmarks, page]);
//       }
//     }}
//   >
//     Click me to add a bookmark
//   </button>
// )}
