angular.module("Servidor").factory('postsServidorLegalAPI', function ($http, config) {

    delete $http.defaults.headers.common['X-Requested-With'];

    var _getLista = function (limit, ultimoid, page) {
        //return $http.get(config.baseUrl + "/PostagensdeBlog/todos?blogUrl=servidorlegal&limit=" + limit + "&ultimoid=" + ultimoid + "&page=" + page);
        return $http.get(config.baseUrl + "/PostagensdeBlog/todosJSON?blogUrl=servidorlegal&limit=" + limit + "&page=" + page );
    };

    var _getItem = function (url) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/porurl?blogUrl=servidorlegal&url=" + url);
    };
    
    var _getPostsRelacionados = function (assuntos, id) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/porPostRelacionado?blogUrl=servidorlegal&assuntos=" + assuntos + "&id=" + id);
    };

    var _getItemPesquisa = function (nome, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/pornome?blogUrl=servidorlegal&nome=" + nome + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };
    
    var _getCampoInteresse = function (campo, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorCampodeInteresse?blogUrl=servidorlegal&campodeInteresse=" + campo + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };
    
    var _getTags = function (tags, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorTags?blogUrl=servidorlegal&tags=" + tags + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };
    
    var _getAutor = function (autor, ultimoid, page) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorAutor?blogUrl=servidorlegal&nomeautor=" + autor + "&limit=10&ultimoid=" + ultimoid + "&page=" + page);
    };
    
    var _getItemTag = function (id) {
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorTagPost?blogUrl=servidorlegal&id=" + id);
    };
    
    var _getItemCategoria = function (categoria, ultimoid, page) {
        console.log(categoria);
        return $http.get(config.baseUrl + "/PostagensdeBlog/PorCategoria?blogUrl=servidorlegal&categoria=" + categoria + "&limit=200");
    };
    
    return {
        getLista: _getLista,
        getItemPesquisa: _getItemPesquisa,
        getItem: _getItem,
        getItemTag: _getItemTag,
        getTags: _getTags,
        getAutor : _getAutor,
        getPostsRelacionados: _getPostsRelacionados,
        getItemCampoInteresse: _getCampoInteresse,
        getItemCategoria: _getItemCategoria
    };
});

