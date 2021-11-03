angular.module('mobilemed', ['ngAnimate', 'ngRoute'])

.controller('PrincipalController', function ($scope, $http)
{
	$scope.atendimentos = [];

	var promise = $http.get('http://localhost:3000/atendimentos');
	promise.then(function(retorno)
	{
		$scope.atendimentos = retorno.data;
		console.log($scope.atendimentos)
	}).catch(function(error)
	{
		console.log(error);
	})
	
	$scope.submeter = function() {
		const dataString = $scope.atendimento.dataAtendimento.getDate() +'/' + ($scope.atendimento.dataAtendimento.getMonth() + 1) 
		+'/' +$scope.atendimento.dataAtendimento.getFullYear()

		const atendimento = {
			nomePaciente: $scope.atendimento.nomePaciente,
			idade: $scope.atendimento.idade,
			descAtendimento: $scope.atendimento.descAtendimento,
			nomeMedico: $scope.atendimento.nomeMedico,
			dataAtendimento: dataString
		}

		console.log(atendimento)
		$http.post('http://localhost:3000/atendimentos/new', atendimento)
		.success(function() {
			$scope.atendimento = {};
			console.log('Atendimento cadastrado com sucesso');
		})
		.error(function(erro)
		{
			console.log(erro);
		});
	}

	$scope.editar = function(atendimento)
	{

	}
	
	$scope.remover = function(atendimento)
	{
		$http.delete('http://localhost:3000/atendimentos/' +atendimento.id)
		.success(function()
		{
			var indiceAtendimento = $scope.atendimentos.indexOf(atendimento);
			$scope.atendimentos.splice(indiceAtendimento, 1);
		})
		.error(function(erro) 
		{
			console.log(erro);
		});
	};
});