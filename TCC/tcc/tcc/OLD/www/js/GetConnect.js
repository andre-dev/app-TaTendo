'use strict';
angular.module('starter').factory('Conexao', ['$http', function($http){
   var _getConexao = function(valores,url){
      return $http({
      method: 'POST',
      url: url,
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    };
	return {
		getConexao: _getConexao
	};
}]);