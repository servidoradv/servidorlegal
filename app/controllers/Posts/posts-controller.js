    angular.module("Servidor").controller('PostsServidorLegalCtrl', function ($scope, $route, $rootScope, postsServidorLegalAPI) {

    $scope.loading = false;
    $scope.loadingPostRelacionado = false;
    $scope.PostRelacionado = [];
    $scope.Tags = [];
    $scope.Nenhumlocalizado = false;
    $scope.NenhumTaglocalizada = false;
    $scope.NenhumComentario = false;
    $scope.Comentarioencontrado = false;
    $scope.naoencontrado = false;
    $scope.postencontrado = false;
    $scope.previousview = false;
    $scope.nextview = false;
    $scope.lista = [];
    $scope.item;
    $scope.previouspage;
    $scope.nextpage;
    $scope.pagination;
    $scope.origempage;
    $scope.nameNext = "Próximo ›";
    $scope.namePrevious = "‹ Anterior";

    var carregarLista = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage  = "index.html#";
        $scope.nextpage = "index.html#";
        $scope.origempage = "index.html#/posts/page/";
        if ($route.current.params.page == null) {
            postsServidorLegalAPI.getLista(10, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsServidorLegalAPI.getLista(10, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItem = function () {
        $scope.loading = true;
        $scope.Nenhumlocalizado = false;
        $scope.NenhumTaglocalizada = true;
        $scope.postencontrado = false;
        $scope.naoencontrado = false;
        postsServidorLegalAPI.getItem($route.current.params.url).then(function (data) {
            if (data.statusText == "OK") {
                if (data.data.mensagem != "#102 - Dados não encontrados. Ocorreu um erro não esperado.") {
                    $scope.item = data.data.resultado;
                    $scope.loading = false;
                    $scope.loadingPostRelacionado = true;
                    $rootScope.tituloPaginaURL = $scope.item.title;
                    $rootScope.linkPaginaURL = $scope.item.url;
                    $rootScope.linkPaginaDescription = $scope.item.breveDescricao;

                    if ($scope.item.assuntos.length > 0) {

                        var assuntos = "";

                        for (var i = 0; i < $scope.item.assuntos.length; i++) {
                            if (i > 0)
                                assuntos += ",";

                            assuntos += $scope.item.assuntos[i].id;
                        }

                        postsServidorLegalAPI.getPostsRelacionados(assuntos, $scope.item.id).then(function (dataAssunto) {
                            if (dataAssunto.statusText == "OK") {
                                $scope.PostRelacionado = dataAssunto.data.resultado;
                                $scope.loadingPostRelacionado = false;

                                if ($scope.PostRelacionado.length == 0) {
                                    $scope.Nenhumlocalizado = true;
                                }
                                else {
                                    $scope.Nenhumlocalizado = false;
                                }
                            }
                            else {
                                $scope.Nenhumlocalizado = true;
                            }
                        });
                    }
                    else {
                        $scope.Nenhumlocalizado = true;
                    }

                    if ($scope.item.comentarios.length > 0) {
                        $scope.Comentarioencontrado = true;
                    }
                    else {
                        $scope.NenhumComentario = true;
                    }

                    if ($scope.item.tags.length > 0) {
                        postsServidorLegalAPI.getItemTag($scope.item.id).then(function (dataTag) {
                            if (dataTag.statusText == "OK") {
                                $scope.Tags = dataTag.data.resultado;

                                if ($scope.Tags.length == 0) {
                                    $scope.NenhumTaglocalizada = true;
                                }
                                else {
                                    $scope.NenhumTaglocalizada = false;
                                }
                            }
                            else {
                                $scope.NenhumTaglocalizada = true;
                            }
                        });
                    }
                    else {
                        $scope.NenhumTaglocalizada = true;
                    }

                    if ($scope.item.length == 0) {
                        $scope.naoencontrado = true;
                    }
                    else {
                        $scope.postencontrado = true;
                    }
                }
                else {
                    $scope.naoencontrado = true;
                    $scope.postencontrado = false;
                    $scope.loading = false;
                }
            }
        });
    };

    var carregarItemPesquisa = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/buscar/" + $route.current.params.nome + "/page/";
        if ($route.current.params.page == null) {
            postsServidorLegalAPI.getItemPesquisa($route.current.params.nome, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsServidorLegalAPI.getItemPesquisa($route.current.params.nome, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemTags = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/tags/" + $route.current.params.tags + "/page/";
        if ($route.current.params.page == null) {
            postsServidorLegalAPI.getTags($route.current.params.tags, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsServidorLegalAPI.getTags($route.current.params.tags, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemAutor = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/autor/" + $route.current.params.autor + "/page/";
        if ($route.current.params.page == null) {
            postsServidorLegalAPI.getAutor($route.current.params.autor, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsServidorLegalAPI.getAutor($route.current.params.autor, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemCampoInteresse = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/interesse/" + $route.current.params.campo + "/page/";
        if ($route.current.params.page == null) {
            postsServidorLegalAPI.getItemCampoInteresse($route.current.params.campo, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsServidorLegalAPI.getItemCampoInteresse($route.current.params.campo, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    var carregarItemCategoria = function () {
        $scope.loading = true;
        $scope.pagination = false;
        $scope.previouspage;
        $scope.nextpage;
        $scope.origempage = "index.html#/posts/categoria/" + $route.current.params.categoria + "/page/";
        if ($route.current.params.page == null) {
            postsServidorLegalAPI.getItemCategoria($route.current.params.categoria, 1, 1).then(function (data) {
                var numpage = 1;
                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = false;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
        else {
            postsServidorLegalAPI.getItemCategoria($route.current.params.categoria, $route.current.params.ultimoitem, $route.current.params.page).then(function (data) {
                var numpage = $route.current.params.page;

                var numpagenext = numpage - (-1);
                $scope.nextpage = $scope.origempage + numpagenext;
                $scope.pagination = true;

                if (data.statusText == "OK") {
                    $scope.lista = data.data.resultado;
                    $scope.loading = false;

                    if ($scope.lista.length == 0) {
                        $scope.naoencontrado = true;
                        $scope.pagination = false;
                    }
                    else {
                        var ultimoId = $scope.lista[$scope.lista.length - 1];
                        $scope.nextpage = $scope.nextpage + "/" + ultimoId.id;
                    }

                    if ($scope.lista.length < 10) {
                        $scope.nextview = false;
                    }
                    else {
                        $scope.nextview = true;
                    }

                    $scope.previousview = true;
                    var firstPost = $scope.lista[0];
                    $rootScope.tituloPaginaURL = firstPost.title;
                    $rootScope.linkPaginaURL = firstPost.url;
                    $rootScope.linkPaginaDescription = firstPost.breveDescricao;
                }
            });
        }
    };

    if ($route.current.params.url == null && $route.current.params.nome == null && $route.current.params.campo == null && $route.current.params.categoria == null && $route.current.params.tags == null && $route.current.params.autor == null)
        carregarLista();
    else if ($route.current.params.url != null)
        carregarItem();
    else if ($route.current.params.nome != null)
        carregarItemPesquisa();
    else if ($route.current.params.campo != null)
        carregarItemCampoInteresse();
    else if ($route.current.params.categoria != null)
        carregarItemCategoria();
    else if ($route.current.params.tags != null)
        carregarItemTags();
    else if ($route.current.params.autor != null)
        carregarItemAutor();

});