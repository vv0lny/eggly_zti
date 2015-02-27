angular.module("firebaseFactory",['firebase'])
.constant('FIREBASE_URI','https://eggly-zti.firebaseio.com/')
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
    
    var updateCategory = function(category){
        var c = categories.$getRecord(category.$id);
        c = category;
        categories.$save(c);
    }
    
    var updateBookmark = function(bookmark){
        var b = bookmarks.$getRecord(bookmark.$id);
        b = bookmark;
        bookmarks.$save(b);
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