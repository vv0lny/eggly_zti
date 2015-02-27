angular.module('Eggly', [
  'ui.router',
  'categories',
  'bookmarks',
  'firebase',
  'firebaseFactory'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('eggly', {
        url: '',
        abstract: true
      })
    ;
    $urlRouterProvider.otherwise('/');
  });
  
 