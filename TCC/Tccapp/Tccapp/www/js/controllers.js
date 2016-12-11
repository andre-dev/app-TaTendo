angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicLoading, $ionicModal, $stateParams, $timeout, Conexao, ConfigUrl) {

      $scope.lista = [];

      /*$scope.dados = function(valor){
        $scope.nome2 = $scope.lista[valor].nome;
        $scope.email2 = $scope.lista[valor].email;
      }*/
        $scope.dados = function(valor){
        $scope.nomeEmpresa = $scope.lista[valor].nomeEmpresa;
        $scope.descricaoOferta = $scope.lista[valor].descricaoOferta;
        $scope.descricaoOferta2 = $scope.lista[valor].descricaoOferta;
        $scope.localidadeOferta = $scope.lista[valor].localidadeOferta;
        $scope.validadeOferta = $scope.lista[valor].validadeOferta;
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

        if(nome === undefined){
          alert('O campo nome esta vazio');
        }else {
          if (sobrenome === undefined) {
            alert('O campo sobrenome esta vazio');
          }else {
            if (email === undefined) {
              alert('O campo email esta vazio ou o email não é válido');
            } else {
              if (senha === undefined) {
                alert('O campo senha esta vazio');
              } else {

                $ionicLoading.show({
                  template: 'Carregando...'
                });

                Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
                  console.log(data);
                  $scope.carregar();


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

      // Cadastrar Empresa;


      $scope.cadastrarEmpresa = function(cnpj, email, senha){


        var valores = {
          parametros:'cadastroEmpresa',
          cnpj:cnpj,
          email:email,
          senha:senha
        }


        if(cnpj == '' || cnpj == undefined || cnpj.length < 18 || validarCNPJ(cnpj) == false){
          alert("O campo CNPJ esta vazio ou inválido.");
        }else if(email == '' || email == undefined){
          alert("O campo email esta vazio ou o email não é válido");
        }else if(senha == '' || senha == undefined){
          alert("O campo SENHA esta vazio.");
        }else if(validarCNPJ(cnpj) == false) {
          alert("CNPJ INVÁLIDO!");
        }else{

                $ionicLoading.show({
                  template: 'Carregando...'
                });

                Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
                  console.log(data);
                  $scope.carregar();


                  if(data == ""){
                    alert('Não foi possivel cafastrar os dados.');
                    $ionicLoading.hide();
                  }else{
                    document.getElementById('cnpj').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('senha').value = "";

                    $scope.doCadastroEmpresa();
                    $ionicLoading.hide();
                  }
                  alert("Parabéns! Cadastro realizado com sucesso.");
                  refresh();
                }).error(function(data){
                  $ionicLoading.hide();
                });
              }
            }
      
      // Cadastro Oferta
      
      
      $scope.cadastrarOferta = function(nomeEmpresa, localidadeOferta, validadeOferta, descricaoOferta, cidadeEmpresa, telefoneEmpresa, tipoOferta){


        var valores = {
          parametros:'cadastroOferta',
          nomeEmpresa:nomeEmpresa,
          localidadeOferta:localidadeOferta,
          validadeOferta:validadeOferta,
          descricaoOferta:descricaoOferta,
          cidadeEmpresa:cidadeEmpresa,
          telefoneEmpresa:telefoneEmpresa,
          tipoOferta:tipoOferta
        }
        
        Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
        console.log(data);
        $scope.carregar();
        });

        /*if(cnpj == '' || cnpj == undefined || cnpj.length < 18 || validarCNPJ(cnpj) == false){
          alert("O campo CNPJ esta vazio ou inválido.");
        }else if(email == '' || email == undefined){
          alert("O campo email esta vazio ou o email não é válido");
        }else if(senha == '' || senha == undefined){
          alert("O campo SENHA esta vazio.");
        }else if(validarCNPJ(cnpj) == false) {
          alert("CNPJ INVÁLIDO!");
        }else{

                $ionicLoading.show({
                  template: 'Carregando...'
                });

                Conexao.getConexao(valores, ConfigUrl.BaseUrl).success(function(data){
                  console.log(data);
                  $scope.carregar();


                  if(data == ""){
                    alert('Não foi possivel cafastrar os dados.');
                    $ionicLoading.hide();
                  }else{
                    document.getElementById('cnpj').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('senha').value = "";

                    $scope.doCadastroEmpresa();
                    $ionicLoading.hide();
                  }
                  alert("Parabéns! Cadastro realizado com sucesso.");
                  refresh();
                }).error(function(data){
                  $ionicLoading.hide();
                });
              }*/
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
    }, 0);
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

 // Cria a model para cadastroEmpresa

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/cadastroEmpresa.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.moda3 = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeCadastroEmpresa = function() {
        $scope.moda3.hide();
      };

      // Open the login modal
      $scope.cadastroEmpresa = function() {
        $scope.moda3.show();
      };

      $scope.doCadastroEmpresa = function() {
        console.log('Doing login', $scope.loginData);
        $timeout(function() {
          $scope.closeCadastroEmpresa();
        }, 0);
      };

    // Cria a model para cadastroOferta

    
    
    // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/cadastroOferta.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.moda4 = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeCadastroOferta = function() {
        $scope.moda4.hide();
      };

      // Open the login modal
      $scope.cadastroOferta = function(cnpj) {
          if(cnpj == '' || cnpj == undefined || cnpj.length < 18 || validarCNPJ(cnpj) == false){
              alert("CNPJ Inválido!");
          }else{
              $scope.moda4.show();
          }
        
      };

      $scope.doCadastroOferta = function() {
        console.log('Doing login', $scope.loginData);
        $timeout(function() {
          $scope.closeCadastroOferta();
        }, 0);
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