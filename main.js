angular.module('app', [])
	.constant('elements', {
		'k113': {
			'which': '',
			'k': 'q',
			'thum': 'ice.png'
		},
		'k119': {
			'which': '',
			'k': 'w',
			'thum': 'light.png'
		},
		'k101': {
			'which': '',
			'k': 'e',
			'thum': 'fire.png'
		}
	})
	.constant('magics', [{
			'which': '116',
			'k': 't',
			'code': 'eee',
			'name': 'sun strike',
			'thum': 'sun_strike.png'
		},
		{
			'which': '118',
			'k': 'v',
			'code': 'qqw',
			'name': 'gost walk',
			'thum': 'ghost_walk.png'
		},
		{
			'which': '122',
			'k': 'z',
			'code': 'wwe',
			'name': 'alcarity',
			'thum': 'alacrity.png'
		},
		{
			'which': '99',
			'k': 'c',
			'code': 'www',
			'name': 'emp',
			'thum': 'emp.png'
		},
		{
			'which': '98',
			'k': 'b',
			'code': 'qwe',
			'name': 'defeading blast',
			'thum': 'deafening_blast.png'
		},
		{
			'which': '102',
			'k': 'f',
			'code': 'eeq',
			'name': 'forge spirit',
			'thum': 'forge_spirit.png'
		},
		{
			'which': '103',
			'k': 'g',
			'code': 'qqe',
			'name': 'ice wall',
			'thum': 'ice_wall.png'
		},
		{
			'which': '120',
			'k': 'x',
			'code': 'wwq',
			'name': 'tornado',
			'thum': 'tornado.png'
		},
		{
			'which': '100',
			'k': 'd',
			'code': 'wee',
			'name': 'chaos meteor',
			'thum': 'chaos_meteor.png'
		},
		{
			'which': '121',
			'k': 'y',
			'code': 'qqq',
			'name': 'code snap.png',
			'thum': 'cold_snap.png'
		}
	]).constant('map', {
		'ice.png': 'q',
		'light.png': 'w',
		'fire.png': 'e'
	})
	.controller('ctrl', ['$scope', 'elements', 'magics', 'map', function ($scope, elements, magics, map) {

		$scope.elements = ['ice.png', 'light.png', 'fire.png'];
		$scope.magics = [magics[0], magics[1]];
		$scope.hello = 'Kael Practice';
		$scope.keypress = function ($event) {
			var key = elements['k' + $event.keyCode];
			if (key != undefined) {
				$scope.elements[0] = $scope.elements[1];
				$scope.elements[1] = $scope.elements[2];
				$scope.elements[2] = key.thum;
				return;
			}
			if ($event.keyCode == 114) //R key
			{
				var next = getMagic();
				if (next == undefined)
					return;
				if (next.code == $scope.magics[0].code)
					return;
				if (next.code == $scope.magics[1].code) {
					next = $scope.magics[0];
					$scope.magics[0] = $scope.magics[1];
					$scope.magics[1] = next;
				} else {
					$scope.magics[1] = $scope.magics[0];
					$scope.magics[0] = next;
				}
			}
			if (ValidateKey($event.keyCode)) {

				var answer = ValidateAnswer($event.keyCode);
				if (answer != undefined) {
					$scope.Questions.splice(answer, 1);
					if ($scope.Questions.length == 0) {
						$scope.Questions = GetRandom(1);
					}
				}
			}
		}

		function ValidateKey(keyCode) {

			for (var i = 0; i <= 1; i++) {
				if ($scope.magics[i].which == keyCode)
					return true;
			}
			return false;
		}


		function ValidateAnswer(keyCode) {
			var len = $scope.Questions.length;
			for (var i = 0; i < len; i++) {
				var q = $scope.Questions[i];
				if (q.which == keyCode)
					return i;
			}

		}

		var GetRandom = function (count) {
			var cache = {},
				i = 0,
				val = [];
			while (i < count) {
				var r = Math.floor(Math.random() * 10);
				if (cache['m' + r] != undefined)
					continue;
				cache['m' + r] = 1;
				val.push(magics[r]);
				i++;
			}
			return val;
		}
		$scope.Questions = GetRandom(1);

		function getMagic() {
			var e0 = map[$scope.elements[0]],
				e1 = map[$scope.elements[1]],
				e2 = map[$scope.elements[2]];
			for (var i = 0; i < magics.length; i++) {
				var currentMagic = magics[i];
				var tempCode = currentMagic.code;
				var i0 = tempCode.indexOf(e0);
				if (i0 >= 0)
					tempCode = spliceSlice(tempCode, i0, 1);
				else
					continue;

				var i1 = tempCode.indexOf(e1);
				if (i1 >= 0)
					tempCode = spliceSlice(tempCode, i1, 1);
				else
					continue;

				var i2 = tempCode.indexOf(e2);
				if (i2 >= 0)
					tempCode = spliceSlice(tempCode, i2, 1);
				else
					continue;
				return currentMagic;
			}
		}

		function spliceSlice(str, index, count, add) {
			return str.slice(0, index) + (add || "") + str.slice(index + count);
		}

	}]);