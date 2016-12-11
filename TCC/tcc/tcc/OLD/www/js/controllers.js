angular.module('starter.controllers', [])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout, Conexao, ConfigUrl, $ionicLoading, $stateParams, $location) {
      $scope.lista = [];
      $scope.btnAtualizar = false;
      var indice;
//Carrega a lista de cadastros ----------------------------------
      $scope.carregar = function(){
        var valores = {
          parametros:'leitura'
        }
        $ionicLoading.show({
          template: 'carregando...'
        });
        Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
          $scope.lista = data;
          console.log(data);
          $ionicLoading.hide();
        }).error(function(data){
          $ionicLoading.hide();
        });
      }
      $scope.carregar();
//----------------------------------------------------- ---------------------
      $scope.ver = function(valor){
        $scope.nome2 = $scope.lista[valor].nome;
        $scope.sobrenome2 = $scope.lista[valor].sobrenome;
        $scope.email2 = $scope.lista[valor].email;
        $scope.senha2 = $scope.lista[valor].senha;
        $scope.id2 = $scope.lista[valor].Id;
        indice = valor;
      }
//Faz a atualização dos dados no banco ----------------------------------
      $scope.atualizar = function(nome,sobrenome){
        var valores = {
          parametros:'atualizar',
          nome:nome,
          sobrenome: sobrenome,
          id:$scope.id2
        }
        Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
          console.log(data);
          if(data == "true"){
            $scope.btnAtualizar = false;
            $scope.carregar();
          }else{
            alert('Não possivel atuaizar dados');
          }
        }).error(function(data){
          alert('Não foi possivel acessar o servidor no momento');
        });
      }
//----------------------------------------------------- ----------------------------
//Deleta os dados no banco de dados -----------------------------------------------
      $scope.deletar = function(valor){
        result = window.confirm("Deseja deletar o usuario: "+$scope.nome2);
        if(result == 1){
          var valores = {
            parametros:'deletar',
            id:$scope.id2
          }
          Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
            console.log(data);
            if(data == ""){
              alert('Registro Deletado com Sucesso');
              $scope.carregar();
            }else{
              alert('Não foi possivel deletar este registro no momento');
            }
          }).error(function(){
          });
        }
      }
//----------------------------------------------------- --------------------
//Faz o dasdatro no banco de dados ----------------------------------------
      $scope.cadastrar = function(nome,sobrenome,email,senha){
        var valores = {
          parametros:'cadastro',
          nome:nome,
          sobrenome:sobrenome,
          email:email,
          senha:senha
        }
        if(nome == undefined){
          alert("O Campo nome esta vazio");
        }else{
          if(sobrenome == undefined){
            alert("O Campo sobrenome esta vazio");
          }else{
            if(email == undefined){
              alert("O Campo email esta vazio ou o email não é valido");
            }else{
              if(senha == undefined){
                alert("O Campo senha esta vazio");
              }else{
                $ionicLoading.show({
                  template: 'Carregando...'
                });
                Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
                  if(data == ""){
                    alert("Não foi possivel cadastrar dados");
                    $ionicLoading.hide();
                  }else{
                    $ionicLoading.hide();
                    $scope.doCadastro();
                  }
                }).error(function(data){
                  $ionicLoading.hide();
                });
              }
            }
          }
        }
      }
//----------------------------------------------------- --------------------------
      // Form data for the login modal
      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/cadastro.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal2 = modal;
      });
      // Triggered in the login modal to close it
      $scope.closeCadastro = function() {
        $scope.modal2.hide();
        $scope.carregar();
      };
      // Open the login modal
      $scope.cadastro = function() {
        $scope.modal2.show();
      };
      // Perform the login action when the user submits the login form
      $scope.doCadastro = function() {
        console.log('Doing login', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
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
      $scope.atualiza = function() {

        $scope.btnAtualizar = true;
      };
    });