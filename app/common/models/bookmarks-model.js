angular.module('eggly.models.bookmarks', [
  'firebaseFactory'
])
  .service('bookmarks', function BookmarksService($q, FirebaseOperations) {
    var bookmarks,
      bookmarksModel = this;

    function extract(result) {
      return result.data;
    }

    function cacheBookmarks(result) {
      bookmarks = extract(result);
      return bookmarks;
    }

    bookmarksModel.getBookmarks = function () {
      bookmarks = FirebaseOperations.getBookmarks()
      return bookmarks;
    };

    function findBookmark(bookmarkId) {
      return _.find(bookmarks, function (bookmark) {
        return bookmark.id === parseInt(bookmarkId, 10);
      })
    }

    bookmarksModel.getBookmarkById = function (bookmarkId) {
      var deferred = $q.defer();
      if (bookmarks) {
        deferred.resolve(findBookmark(bookmarkId))
      } else {
        bookmarksModel.getBookmarks().then(function () {
          deferred.resolve(findBookmark(bookmarkId))
        })
      }
      return deferred.promise;
    };

    bookmarksModel.createBookmark = function (bookmark) {
      bookmark.id = bookmarks.length;
      FirebaseOperations.addBookmark(bookmark);
    };

    bookmarksModel.updateBookmark = function (bookmark) {
      var index = _.findIndex(bookmarks, function (b) {
        return b.id == bookmark.id;
      });
      bookmarks[index] = bookmark;
      FirebaseOperations.updateBookmark(bookmark);
    };

    bookmarksModel.deleteBookmark = function (bookmark) {
      FirebaseOperations.removeBookmark(bookmark);
    };

    bookmarksModel.getBookmarksForCategory = function (category) {
      _.filter(bookmarks, function (b) {
        return b.category == category;
      });
    };
  })
;