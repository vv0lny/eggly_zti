angular.module('Eggly', [
  'ui.router',
  'categories',
  'bookmarks',
  'firebase'
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
  
 