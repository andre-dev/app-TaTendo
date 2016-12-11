angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicLoading, $ionicModal, $stateParams, $timeout, Conexao, ConfigUrl) {

      $scope.lista = [];

      $scope.dados = function(valor){
        $scope.nome2 = $scope.lista[valor].nome;
        $scope.email2 = $scope.lista[valor].email;
      }

      $scope.carregar = function(){

        var valores = {
          parametros:'leitura'
        }
        $ionicLoading.show({
          template: 'Carregando...'
        });
        Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
          console.log(data);
          $scope.lista = data;
          $ionicLoading.hide();
        }).error(function(data){
          $ionicLoading.hide();
        });
      }
      $scope.carregar();

  $scope.cadastrar = function(nome, sobrenome, email, senha){
    var valores = {
      parametros:'cadastro',
      nome:nome,
      sobrenome:sobrenome,
      email:email,
      senha:senha
    }

    if(nome == undefined){
      alert('O campo nome esta vazio');
    }else {
      if (sobrenome == undefined) {
        alert('O campo sobrenome esta vazio');
      }else {
        if (email == undefined) {
          alert('O campo email esta vazio ou o email não é válido');
        } else {
          if (senha == undefined) {
            alert('O campo senha esta vazio');
          } else {

            $ionicLoading.show({
              template: 'Carregando...'
            });

            Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
              console.log(data);

              if(data == ""){
                alert('Não foi possivel cafastrar os dados.');
                $ionicLoading.hide();
              }else{
                $scope.doCadastro();
                $ionicLoading.hide();
              }

            }).error(function(data){
              $ionicLoading.hide();
            });
          }
        }
      }
    }
  }

  // Abre tela de cadastro
  $ionicModal.fromTemplateUrl('templates/cadastro.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeCadastro = function() {
    $scope.modal2.hide();
  };

  // Open the login modal
  $scope.cadastro = function() {
    $scope.modal2.show();
    $scope.carregar();
  };
  $scope.doCadastro = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
    $scope.closeCadastro();
    }, 1000);
  };




  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
