angular.module("firebaseFactory",['firebase'])
.constant('FIREBASE_URI','')
.factory('FirebaseOperations',function($firebase,FIREBASE_URI){
    var ref = new Firebase(FIREBASE_URI);
    var refCategories = ref.child('categories');
    var refBookmarks = ref.child('bookmarks');
    
    var syncCategories = $firebase(refCategories);
    var syncBookmarks = $firebase(refBookmarks)
    var categories = syncCategories.$asArray();
    var bookmarks = syncBookmarks.$asArray();
    
    var getCategories = function(){
        return categories;
    }
    var getBookmarks = function(){
        return bookmarks
    }
    
    var addCategory = function(category){
        categories.$add(category);
    }
    
    var addBookmark = function(bookmark){
        bookmarks.$add(bookmark);
    }
    
    var removeCategory = function(category){
        categories.$remove(category);
    }
    
    var removeBookmark = function(bookmark){
        bookmarks.$remove(bookmark);
    }
    
    //FIX THIS
    
    var updateCategory = function(category){
        categories.$save(category);
    }
    
    var updateBookmark = function(bookmark){
        bookmarks.$save(bookmark)
    }
    
    
    return{
        getCategories: getCategories,
        addCategory: addCategory,
        removeCategory: removeCategory,
        updateCategory: updateCategory,
        getBookmarks: getBookmarks,
        addBookmark: addBookmark,
        removeBookmark: removeBookmark,
        updateBookmark: updateBookmark
    }
});