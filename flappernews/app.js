angular.module('flapperNews', ['ui.router']) /*global angular*/ //???


.factory('posts', [function() {
  var o = {
    posts: [
      /*{
            title: 'hello',
            link: '',
            upvotes: 0
          }*/
    ]
  };
  return o;
}])

.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts) {

    //$scope.posts = posts.posts;
    $scope.test = 'Hello world!';

    // $scope.posts = [{
    //   title: 'post 1',
    //   link: '',
    //   upvotes: 4,
    //   comments: [{
    //     author: 'Fred',
    //     body: 'Goodly post!',
    //     upvotes: 0
    //   }]
    // }, {
    //   title: 'post 2',
    //   link: '',
    //   upvotes: 25,
    //   comments: [{
    //     author: 'Fred',
    //     body: 'Goodly post!',
    //     upvotes: 0
    //   }]
    // }, {
    //   title: 'post 3',
    //   link: '',
    //   upvotes: 14,
    //   comments: [{
    //     author: 'Fred',
    //     body: 'Goodly post!',
    //     upvotes: 0
    //   }]
    // }];



    $scope.addPost = function() {
      if (!$scope.title || $scope.title === '') {
        alert("add a title silly!");
        return;
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [{
          author: 'Joe',
          body: 'Cool post!',
          upvotes: 0
        }, {
          author: 'Bob',
          body: 'Great idea but everything is wrong!',
          upvotes: 0
        }]
      });
      $scope.title = '';
      $scope.link = '';
    };


    $scope.posts = posts.posts;

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };

    $scope.decrementUpvotes = function(post) {
      post.upvotes -= 1;
    };

  }
])

.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id]; // changed to scope.posts?


    $scope.addComment = function() {
      if ($scope.body === '') {
        console.log("no body in addComment");
        return;

      }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };


  }
])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('/home'); // tut says without the slash /?
  }
]);
