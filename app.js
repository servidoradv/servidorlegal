var app = angular.module('Servidor', ['ngRoute', 'ngSanitize']);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/post/:url', {
            templateUrl: 'app/views/BlogServidorLegal/post.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/buscar/:nome', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/buscar/:nome/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/interesse/:campo', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/interesse/:campo/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/autor/:autor', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/autor/:autor/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/categoria/:categoria', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/categoria/:categoria/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/tags/:tags', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/posts/tags/:tags/page/:page/:ultimoitem', {
            templateUrl: 'app/views/BlogServidorLegal/posts.html',
            controller: 'PostsServidorLegalCtrl'
        })
        .when('/interesses', {
            templateUrl: 'app/views/Site/CamposdeInteresse/interesses.html',
            controller: 'CamposdeInteresseCtrl'
        })
        .when('/interesses/:nome', {
            templateUrl: 'app/views/Site/CamposdeInteresse/interesses.html',
            controller: 'CamposdeInteresseCtrl'
        })
        .when('/contato', {
            templateUrl: 'app/views/Contact/contato-novo.html',
        })
        .when('/sobre-nos', {
            templateUrl: 'app/views/Sobre/sobre-nos.html',
        })
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
});

app.handleSuccess =
    function (response) {
        return (response.data);
    };

app.handleError =
    function (response) {
        return response.data.message;
    };