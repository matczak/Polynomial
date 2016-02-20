$(document).ready(function () {
	$('#container').slideToggle('500');
	var schemaCanvas = $('#registerSchema').css('display', 'none');
	var schema = $('#matrixButtons input:eq(2)').css('display', 'none');
	schema.click(function () {
		$('#schema input').remove();
		schemaCanvas.empty();
		schemaCanvas.css('display', 'none');
		schemaCanvas.animate({"opacity": "show"}, {duration: "slow"});
		LFSR.drawSchema($('#matrixContainer input'), schemaCanvas);
	});
	var divs = $('#helpLFSR').css('display', 'none');
	$('#info span').click(function () {
		$(divs).slideToggle();
	}).toggle(function () {
		$(this).html('Zwiń pomoc &uarr;');
	}, function () {
		$(this).html('Rozwiń pomoc &darr;');
	});
	$('.grayBtn').hover(function () {
		$(this).addClass('hover2');
	}, function () {
		$(this).removeClass('hover2');
	});
	$('.infoBtn').hover(function () {
		$(this).addClass('hover2');
	}, function () {
		$(this).removeClass('hover2');
	});
	$('#matrixCreateHelp').css('display', 'none');
	$('#statesCreateHelp').css('display', 'none');
	var infoButtons = $('#infoButtons');
	var images = $('.helpImages');
	infoButtons.find('input:eq(0)').click(function () {
		$('#helpLFSR div').not(infoButtons, '#lfsrDesc').css('display', 'none');
		$('#lfsrDesc').animate({"opacity": "show"}, {duration: "slow"});
	});
	infoButtons.find('input:eq(1)').click(function () {
		$('#helpLFSR div').not(infoButtons, '#matrixCreateHelp').css('display', 'none');
		$('#matrixCreateHelp').animate({"opacity": "show"}, {duration: "slow"});
		$('#matrixCreateHelp .helpImages').animate({"opacity": "show"}, {duration: "slow"});
	});
	infoButtons.find('input:eq(2)').click(function () {
		$('#helpLFSR div').not(infoButtons, '#statesCreateHelp').css('display', 'none');
		$('#statesCreateHelp').animate({"opacity": "show"}, {duration: "slow"});
		$('#statesCreateHelp .helpImages').animate({"opacity": "show"}, {duration: "slow"});
	});
	$('.linkBtn').hover(function () {
		$(this).addClass('hover3');
	}, function () {
		$(this).removeClass('hover3');
	});
	var comput = $('#matrixButtons input:eq(0)').click(function () {
		var container = $('#matrixResult');
		var inputs = $('#matrixContainer input');
		container.children().remove();
		container.css('display', 'none');
		LFSR.compute(inputs, container);
		container.addClass('styleBox').animate({"opacity": "show"}, {duration: "slow"});
	});
	var graphCanvas = $('#matrixGraph').css('display', 'none');
	var graph = $('#matrixButtons input:eq(1)').click(function () {
		graphCanvas.empty();
		graphCanvas.css('display', 'none');
		var canvas = $('<canvas id="canvas" width="452" height="494"></canvas>').appendTo(graphCanvas);
		canvas.springy({graph: LFSR.graph});
		graphCanvas.animate({"opacity": "show"}, {duration: "slow"});
		$('<input type="button" value="Generuj obraz .png" class="grayBtn"/>').hover(function () {
			$(this).addClass('hover2');
		}, function () {
			$(this).removeClass('hover2');
		}).click(function () {
			window.open(document.getElementById('canvas').toDataURL("image/png"));
		}).appendTo(graphCanvas);
	});
	$('#matrixChange').change(function () {
		LFSR.matrixCleaner($('#matrixContainer'));
		LFSR.matrixBuilder($('#matrixContainer'), $('#matrixChange option:selected').val());
		graph.css('display', 'none');
	});
	$('#matrixChange').trigger('change');
	$('#FlipFlopType').change(function () {
		LFSR.flipFlopType = $('#FlipFlopType option:selected').val();
	});
	$('#FlipFlopType').trigger('change');
	$('#helpMatrix').tooltip({
		showURL: false, bodyHandler: function () {
			return $("<div />").html("Reprezentuje połączenia pomiędzy przerzutnikami. Kolumna oznacza wyjście przerzutnika (skąd) a wiersz oznacza wejście (dokąd). Wartość \"1\" oznacza sprzężenie zwrotne danych wejść/wyjść rejestru. Czerwone elementy są niepoprawne z punktu widzenia konstruowania rejestru.");
		}, top: -10, left: 20
	});
	$('#helpStates').tooltip({
		showURL: false, bodyHandler: function () {
			return $("<div />").html("Dla rejestru o długości n, maksymalny cykl wynosi 2<sup>n</sup>-1. Macierz mnożona jest przez kolejne wygenerowane stany aż do powtórzenia się wartości wziętej na początku (pierwsza wartość binarna, która się nie powtórzyła), wtedy cykl jest zamykany i brana jest kolejna liczba binarna, jeszcze nie wykorzystana.");
		}, top: -10, left: 20
	});
	$('#helpGraph').tooltip({
		showURL: false, bodyHandler: function () {
			return $("<div />").html("Reprezentuje połączenia pomiędzy wygenerowanymi stanami. Skupiska węzłów nie połączone ze sobą w grafie stanowią odrębne cykle. Przejścia mogą odbywać się do różnych węzłów jak i do tych samych.");
		}, top: -10, left: 20
	});
	$('#helpMatrixOptions').tooltip({
		showURL: false, bodyHandler: function () {
			return $("<div />").html("Opcje pozwalają sprawdzić poprawność macierzy, wygenerować macierz wzorcową zawierającą wartości \"1\" pod główną przekątną oraz w prawym górnym rogu macierzy (dla przerzutnika T dodatkowo na przekątnej \"1\" a także wygenerować macierz losową.");
		}, top: -10, left: 20
	});
	$('#helpRegister').tooltip({
		showURL: false, bodyHandler: function () {
			return $("<div />").html("Prezentacja schematu rejestru zbudowanego za pomocą przerzutników typu D i wygenerowanego z poprawnej macierzy połączeń. Sprzężenia łączone są bramkami X-OR.");
		}, top: -10, left: 20
	});
	$('#helpFlipFlop').tooltip({
		showURL: false, bodyHandler: function () {
			return $("<div />").html("Macierz połączeń może się różnić dla obu typów przerzutników, ponieważ przerzutnik typu T jest zbudowany z przerzutnika typu D i bramki X-OR z jego wyjścia na wejście.");
		}, top: -10, left: 20
	});
	$('#matrixOptions input:eq(0)').click(function () {
		LFSR.checkMatrix($('#matrixContainer input'));
	});
	$('#matrixOptions input:eq(1)').click(function () {
		LFSR.setGoodMatrix($('#matrixContainer input'));
	});
	$('#matrixOptions input:eq(2)').click(function () {
		LFSR.setRandomMatrix($('#matrixContainer input'));
	});
});
LFSR = {
	matrixSize: null,
	states: [],
	matrix: [],
	graph: null,
	graphNodes: [],
	flipFlopType: null,
	setGoodMatrix: function (container) {
		this.clearErrorColor(container);
		var temp = this.matrixSize;
		for (var i = 0; i < container.length; i++) {
			container[i].value = 0;
		}
		while (temp <= container.length) {
			container[temp].value = 1;
			temp += this.matrixSize + 1;
		}
		container[this.matrixSize - 1].value = 1;
		if (this.flipFlopType == 'T') {
			for (var i = 0; i < container.length; i += this.matrixSize + 1) {
				container[i].value = 1;
			}
		}
	},
	setRandomMatrix: function (container) {
		this.generateMatrix(container);
		this.setGoodMatrix(container);
		if (this.flipFlopType == 'D') {
			for (var i = 0; i < this.matrixSize - 1; i++) {
				this.matrix[0][i].value = Math.floor(Math.random() * 2);
			}
			for (var i = 1; i < this.matrixSize; i++) {
				this.matrix[i][this.matrixSize - 1].value = Math.floor(Math.random() * 2);
			}
			for (var i = 1; i < this.matrixSize; i++) {
				for (var j = i; j < this.matrixSize; j++) {
					if (this.matrix[0][j].value == 1 && this.matrix[i][this.matrixSize - 1].value == 1) {
						this.matrix[i][j].value = 1;
					}
				}
			}
		} else {
			for (var i = 0; i < this.matrixSize; i++) {
				this.matrix[i][i].value = Math.floor(Math.random() * 2);
			}
			for (var i = 1; i < this.matrixSize; i++) {
				for (var j = i; j < this.matrixSize; j++) {
					if (i == j && this.matrix[i][j].value == 0) {
						this.matrix[0][j].value = 1;
						for (var k = j + 1; k < this.matrixSize; k++) {
							this.matrix[i][k].value = 1;
						}
					}
				}
			}
			for (var i = 1; i < this.matrixSize; i++) {
				for (var j = i; j < this.matrixSize; j++) {
					if (i == j && this.matrix[i][j].value == 1) {
						var temp = i;
						if (j == this.matrixSize - 1) {
							break;
						}
						while (temp != 0) {
							this.matrix[temp - 1][j].value = 0;
							temp--;
						}
					}
				}
			}
			for (var i = 1; i < this.matrixSize; i++) {
				for (var j = i; j < this.matrixSize; j++) {
					if (i < j && j != this.matrixSize - 1 && this.matrix[i][j].value == 0) {
						for (var k = j + 1; k < this.matrixSize; k++) {
							if (this.matrix[i][k].value == 1 && (this.matrix[j][j].value == 0 || this.matrix[0][j].value == 1)) {
								this.matrix[i][j].value = 1;
							}
						}
					}
				}
			}
			this.matrix[0][this.matrixSize - 1].value = 1;
		}
	},
	clearErrorColor: function (container) {
		for (var i = 0; i < container.length; i++) {
			if ($(container[i]).hasClass('wrongValue') || $(container[i]).hasClass('warningValue')) {
				$(container[i]).removeClass();
			}
		}
	},
	checkMatrix: function (container) {
		var error = false;
		var warning = false;
		var infoPanel = $('#matrixInfoError');
		this.generateMatrix(container);
		this.clearErrorColor(container);
		if (this.flipFlopType == 'D') {
			for (var i = 1; i < this.matrixSize; i++) {
				for (var j = i; j < this.matrixSize; j++) {
					if (this.matrix[0][j].value == 1 && this.matrix[i][this.matrixSize - 1].value == 1 && this.matrix[i][j].value == 0) {
						$(this.matrix[i][j]).addClass('wrongValue');
						error = true;
					}
					if ((this.matrix[0][j].value == 0 && this.matrix[i][this.matrixSize - 1].value == 1 && this.matrix[i][j].value == 1) || (this.matrix[0][j].value == 0 && this.matrix[i][this.matrixSize - 1].value == 0 && this.matrix[i][j].value == 1) || (this.matrix[0][j].value == 1 && this.matrix[i][this.matrixSize - 1].value == 0 && this.matrix[i][j].value == 1)) {
						$(this.matrix[i][j]).addClass('warningValue');
						warning = true;
					}
				}
			}
		} else {
			for (var i = 1; i < this.matrixSize; i++) {
				for (var j = i; j < this.matrixSize; j++) {
					if (((this.matrix[0][j].value == 0 && this.matrix[i][this.matrixSize - 1].value == 0 && this.matrix[i][j].value == 1) || (this.matrix[0][j].value == 0 && this.matrix[i][this.matrixSize - 1].value == 1 && this.matrix[i][j].value == 1) || (this.matrix[0][j].value == 1 && this.matrix[i][this.matrixSize - 1].value == 0 && this.matrix[i][j].value == 1)) && (i != j) && (this.matrix[j][j].value != 0 && this.matrix[i][i].value != 0)) {
						$(this.matrix[i][j]).addClass('warningValue');
						warning = true;
					}
					if (i == j && this.matrix[i][j].value == 0 && this.matrix[0][j].value == 0) {
						$(this.matrix[0][j]).addClass('wrongValue');
						$(this.matrix[i][j]).addClass('wrongValue');
						error = true;
					}
					if (i == j && i != this.matrixSize - 1 && this.matrix[i][j].value == 0 && this.matrix[i][this.matrixSize - 1].value == 0) {
						$(this.matrix[i][this.matrixSize - 1]).addClass('wrongValue');
						error = true;
					}
					if (i == j && j != this.matrixSize - 1 && this.matrix[i][j].value == 0) {
						for (var k = j + 1; k < this.matrixSize; k++) {
							if (this.matrix[i][k].value == 0 && (this.matrix[k][k].value == 0 || this.matrix[0][k].value == 1)) {
								$(this.matrix[i][k]).addClass('wrongValue');
								error = true;
							}
						}
					}
					if (i < j && j != this.matrixSize - 1 && this.matrix[i][j].value == 0) {
						for (var k = j + 1; k < this.matrixSize; k++) {
							if (this.matrix[i][k].value == 1 && (this.matrix[j][j].value == 0 || this.matrix[0][j].value == 1)) {
								$(this.matrix[i][j]).addClass('wrongValue');
								error = true;
							}
						}
					}
				}
			}
		}
		if (this.matrix[0][this.matrixSize - 1].value == 0) {
			$(this.matrix[0][this.matrixSize - 1]).addClass('wrongValue');
			error = true;
		}
		for (var i = 0; i < this.matrixSize - 2; i++) {
			for (var j = 0; j < i + 1; j++) {
				if (this.matrix[i + 2][j].value == 1) {
					$(this.matrix[i + 2][j]).addClass('wrongValue');
					error = true;
				}
			}
		}
		for (var i = 0; i < this.matrixSize - 1; i++) {
			if (this.matrix[i + 1][i].value == 0) {
				$(this.matrix[i + 1][i]).addClass('wrongValue');
				error = true;
			}
		}
		infoPanel.children().remove();
		if (error) {
			$('<p class="bad">Macierz niepoprawna!</p><p class="white">Nie można wygenerować z niej schematu rejestru.</p>').appendTo(infoPanel);
		}
		else if (warning && !error) {
			$('<p class="warning">Macierz warunkowo poprawna!</p><p class="white">Niektóre elementy można połączyć tylko wydzielonym i odosobnionym połączeniem.</p><p class="white">Nie można wygenerować schematu, ponieważ nie wszystkie elementy można połączyć przez główne połączenie sprzężenia zwrotnego.</p>').appendTo(infoPanel);
		}
		else {
			this.clearErrorColor(container);
			$('#matrixButtons input:eq(2)').animate({"opacity": "show"}, {duration: "slow"});
			$('<p class="good">Macierz poprawna!</p><p class="white">Z podanej macierzy można wygenerować schemat rejestru.</p>').appendTo(infoPanel);
		}
		infoPanel.css('display', 'none');
		infoPanel.animate({"opacity": "show"}, {duration: "slow"});
		return !(error || warning);
	},
	drawSchema: function (inputs, container) {
		if (this.checkMatrix(inputs)) {
			var ffSize = 70;
			var start = 0;
			var shift = 0;
			var shift2 = 0;
			if (this.flipFlopType == 'D') {
				var canvas = $('<canvas id="schemaCanvas" width="' + (ffSize + 105) * this.matrixSize + '" height="198"></canvas>').appendTo(container).get(0);
				var ctx = canvas.getContext('2d');
				ctx.strokeStyle = "#000000";
				ctx.lineWidth = 2;
				start = 50;
				for (var i = 0; i < this.matrixSize; i++) {
					shift = start + (i * 350) / 2;
					shift2 = start + ((i + 1) * 350) / 2;
					this.flipFlop(ctx, shift, 120, ffSize, 50, this.flipFlopType, i);
					if (shift == start) {
						ctx.beginPath();
						ctx.moveTo(shift, 120 + 25);
						ctx.lineTo(shift - 40, 120 + 25);
						ctx.lineTo(shift - 40, 120 - 80);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(shift - 1, 120 + 25);
						ctx.lineTo(shift - 6, 120 + 23);
						ctx.lineTo(shift - 6, 120 + 27);
						ctx.closePath();
						ctx.stroke();
					}
					if (i + 1 == this.matrixSize) {
						ctx.beginPath();
						ctx.moveTo(shift + ffSize, 120 + 25);
						ctx.lineTo(shift + ffSize + 40, 120 + 25);
						ctx.lineTo(shift + ffSize + 40, 120 - 80);
						ctx.lineTo(start - 40, 120 - 80);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(shift + ffSize + 40, 120 - 33);
						ctx.lineTo(shift + ffSize + 40 - 2, 120 - 28);
						ctx.lineTo(shift + ffSize + 40 + 2, 120 - 28);
						ctx.closePath();
						ctx.stroke();
					}
					else {
						ctx.beginPath();
						ctx.moveTo(shift + ffSize, 120 + 25);
						ctx.lineTo(shift + ffSize + (shift2 - shift - ffSize), 120 + 25);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(shift + ffSize + (shift2 - shift - ffSize) - 1, 120 + 25);
						ctx.lineTo(shift + ffSize + (shift2 - shift - ffSize) - 6, 120 + 23);
						ctx.lineTo(shift + ffSize + (shift2 - shift - ffSize) - 6, 120 + 27);
						ctx.closePath();
						ctx.stroke();
					}
				}
				shift = 0;
				for (var i = 0; i < this.matrixSize; i++) {
					for (var j = 0; j < this.matrixSize; j++) {
						if ((i == 0 && j == this.matrixSize - 1) || this.matrix[i][j].value == 0) {
							continue;
						}
						if (j == i) {
							if (j != this.matrixSize - 1 && i != this.matrixSize - 1) {
								shift = start + (j * 350) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + 105, 120 + 25);
								ctx.lineTo(shift + 105, 120 - 90);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + 105, 120 + 25, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + 105, 120 - 80, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 105, 120 - 70);
								ctx.lineTo(shift + 105 - 2, 120 - 65);
								ctx.lineTo(shift + 105 + 2, 120 - 65);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 105 + 11, 120 - 80);
								ctx.lineTo(shift + 105 + 16, 120 - 78);
								ctx.lineTo(shift + 105 + 16, 120 - 82);
								ctx.closePath();
								ctx.stroke();
							}
							if (j != 0 && i != 0) {
								shift = start + ((j - 1) * 350) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + ffSize + ffSize, 120 - 80);
								ctx.lineTo(shift + ffSize + ffSize, 120 + 35);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + ffSize + ffSize, 120 - 80, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + ffSize + ffSize, 120 + 25, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize + ffSize, 120 + 15);
								ctx.lineTo(shift + ffSize + ffSize - 2, 120 + 10);
								ctx.lineTo(shift + ffSize + ffSize + 2, 120 + 10);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize + ffSize - 11, 120 + 25);
								ctx.lineTo(shift + ffSize + ffSize - 16, 120 + 27);
								ctx.lineTo(shift + ffSize + ffSize - 16, 120 + 23);
								ctx.closePath();
								ctx.stroke();
							}
						}
						else if (j > i) {
							if (i != 0) {
								shift = start + (i * 350) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + ffSize - 105, 120 - 80);
								ctx.lineTo(shift + ffSize - 105, 120 + 35);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + ffSize - 105, 120 - 80, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + ffSize - 105, 120 + 25, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize - 105, 120 + 15);
								ctx.lineTo(shift + ffSize - 105 - 2, 120 + 10);
								ctx.lineTo(shift + ffSize - 105 + 2, 120 + 10);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize - 105 - 11, 120 + 25);
								ctx.lineTo(shift + ffSize - 105 - 16, 120 + 27);
								ctx.lineTo(shift + ffSize - 105 - 16, 120 + 23);
								ctx.closePath();
								ctx.stroke();
							}
							if (j != this.matrixSize - 1) {
								shift = start + (j * 350) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + 105, 120 + 25);
								ctx.lineTo(shift + 105, 120 - 90);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + 105, 120 + 25, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + 105, 120 - 80, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 105, 120 - 70);
								ctx.lineTo(shift + 105 - 2, 120 - 65);
								ctx.lineTo(shift + 105 + 2, 120 - 65);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 105 + 11, 120 - 80);
								ctx.lineTo(shift + 105 + 16, 120 - 78);
								ctx.lineTo(shift + 105 + 16, 120 - 82);
								ctx.closePath();
								ctx.stroke();
							}
						}
					}
				}
			}
			else {
				var canvas = $('<canvas id="schemaCanvas" width="' + (ffSize + 185) * this.matrixSize + '" height="198"></canvas>').appendTo(container).get(0);
				var ctx = canvas.getContext('2d');
				ctx.strokeStyle = "#000000";
				ctx.lineWidth = 2;
				start = 100;
				for (var i = 0; i < this.matrixSize; i++) {
					shift = start + (i * 490) / 2;
					shift2 = start + ((i + 1) * 490) / 2;
					this.flipFlop(ctx, shift, 120, ffSize, 50, this.flipFlopType, i);
					ctx.beginPath();
					ctx.moveTo(shift - 35, 120 + 25);
					ctx.lineTo(shift - 41, 120 + 23);
					ctx.lineTo(shift - 41, 120 + 27);
					ctx.closePath();
					ctx.stroke();
					if (shift == start) {
						ctx.beginPath();
						ctx.moveTo(shift, 120 + 25);
						ctx.lineTo(shift - 90, 120 + 25);
						ctx.lineTo(shift - 90, 120 - 80);
						ctx.stroke();
					}
					if (i + 1 == this.matrixSize) {
						ctx.beginPath();
						ctx.moveTo(shift + ffSize, 120 + 25);
						ctx.lineTo(shift + ffSize + 90, 120 + 25);
						ctx.lineTo(shift + ffSize + 90, 120 - 80);
						ctx.lineTo(start - 90, 120 - 80);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(shift + ffSize + 90, 120 - 33);
						ctx.lineTo(shift + ffSize + 90 - 2, 120 - 28);
						ctx.lineTo(shift + ffSize + 90 + 2, 120 - 28);
						ctx.closePath();
						ctx.stroke();
					}
					else {
						ctx.beginPath();
						ctx.moveTo(shift + ffSize, 120 + 25);
						ctx.lineTo(shift + ffSize + (shift2 - shift - ffSize), 120 + 25);
						ctx.stroke();
					}
				}
				for (var i = 0; i < this.matrixSize; i++) {
					for (var j = 0; j < this.matrixSize; j++) {
						if ((i == 0 && j == this.matrixSize - 1) || (this.matrix[i][j].value == 0 && (i != j))) {
							continue;
						}
						if ((j == i) && (this.matrix[i][j].value == 0)) {
							if (j != this.matrixSize - 1 && i != this.matrixSize - 1) {
								shift = start + (j * 490) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + 120, 120 + 25);
								ctx.lineTo(shift + 120, 120 - 90);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + 120, 120 + 25, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + 120, 120 - 80, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 120, 120 - 70);
								ctx.lineTo(shift + 120 - 2, 120 - 65);
								ctx.lineTo(shift + 120 + 2, 120 - 65);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 120 + 11, 120 - 80);
								ctx.lineTo(shift + 120 + 16, 120 - 78);
								ctx.lineTo(shift + 120 + 16, 120 - 82);
								ctx.closePath();
								ctx.stroke();
							}
							if (j != 0 && i != 0) {
								shift = start + ((j - 1) * 490) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + ffSize + ffSize + 35, 120 - 80);
								ctx.lineTo(shift + ffSize + ffSize + 35, 120 + 35);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + ffSize + ffSize + 35, 120 - 80, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + ffSize + ffSize + 35, 120 + 25, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize + ffSize + 35, 120 + 15);
								ctx.lineTo(shift + ffSize + ffSize - 2 + 35, 120 + 10);
								ctx.lineTo(shift + ffSize + ffSize + 2 + 35, 120 + 10);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize + ffSize - 11 + 35, 120 + 25);
								ctx.lineTo(shift + ffSize + ffSize - 16 + 35, 120 + 27);
								ctx.lineTo(shift + ffSize + ffSize - 16 + 35, 120 + 23);
								ctx.closePath();
								ctx.stroke();
							}
						}
						else if (j > i) {
							if (i != 0) {
								shift = start + (i * 490) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + ffSize - 140, 120 - 80);
								ctx.lineTo(shift + ffSize - 140, 120 + 35);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + ffSize - 140, 120 - 80, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + ffSize - 140, 120 + 25, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize - 140, 120 + 15);
								ctx.lineTo(shift + ffSize - 140 - 2, 120 + 10);
								ctx.lineTo(shift + ffSize - 140 + 2, 120 + 10);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + ffSize - 140 - 11, 120 + 25);
								ctx.lineTo(shift + ffSize - 140 - 16, 120 + 27);
								ctx.lineTo(shift + ffSize - 140 - 16, 120 + 23);
								ctx.closePath();
								ctx.stroke();
							}
							if (j != this.matrixSize - 1) {
								shift = start + (j * 490) / 2;
								ctx.beginPath();
								ctx.moveTo(shift + 120, 120 + 25);
								ctx.lineTo(shift + 120, 120 - 90);
								ctx.stroke();
								ctx.beginPath();
								ctx.arc(shift + 120, 120 + 25, 3, 0, Math.PI * 2, false);
								ctx.fill();
								ctx.beginPath();
								ctx.arc(shift + 120, 120 - 80, 10, 0, Math.PI * 2, false);
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 120, 120 - 70);
								ctx.lineTo(shift + 120 - 2, 120 - 65);
								ctx.lineTo(shift + 120 + 2, 120 - 65);
								ctx.closePath();
								ctx.stroke();
								ctx.beginPath();
								ctx.moveTo(shift + 120 + 11, 120 - 80);
								ctx.lineTo(shift + 120 + 16, 120 - 78);
								ctx.lineTo(shift + 120 + 16, 120 - 82);
								ctx.closePath();
								ctx.stroke();
							}
						}
					}
				}
			}
			$('<input type="button" value="Generuj obraz .png" class="grayBtn"/>').hover(function () {
				$(this).addClass('hover2');
			}, function () {
				$(this).removeClass('hover2');
			}).click(function () {
				window.open(document.getElementById('schemaCanvas').toDataURL("image/png"));
			}).appendTo('#schema');
		}
	},
	flipFlop: function (ctx, x, y, sizex, sizey, type, number) {
		ctx.beginPath();
		ctx.rect(x, y, sizex, sizey);
		ctx.font = "13px Verdana, sans-serif";
		ctx.fillText('q', x + sizex / 2 - 6, y + sizey / 2 + 5);
		ctx.font = "9px Verdana, sans-serif";
		ctx.fillText(number, x + sizex / 2 + 2, y + sizey / 2 + 7);
		ctx.stroke();
		if (type == 'T') {
			ctx.beginPath();
			ctx.arc(x - sizex / 2 + 10, y + sizey / 2, 10, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x - sizex / 2 + 10, y + sizey / 2 - 11);
			ctx.lineTo(x - sizex / 2 + 12, y + sizey / 2 - 16);
			ctx.lineTo(x - sizex / 2 + 8, y + sizey / 2 - 16);
			ctx.closePath();
			ctx.stroke();
			ctx.moveTo(x - sizex / 2 + 10, y + sizey / 2 - 10);
			ctx.lineTo(x - sizex / 2 + 10, y + sizey / 2 + 10);
			ctx.stroke();
			ctx.save();
			ctx.lineWidth = 1;
			ctx.moveTo(x - sizex / 2 + 10, y + sizey / 2 - 10);
			ctx.lineTo(x - sizex / 2 + 10, y + sizey / 2 - 42);
			ctx.lineTo(x + sizex + 20, y + sizey / 2 - 42);
			ctx.lineTo(x + sizex + 20, y + sizey / 2);
			ctx.stroke();
			ctx.restore();
			ctx.beginPath();
			ctx.arc(x + sizex + 20, y + sizey / 2, 3, 0, Math.PI * 2, false);
			ctx.fill();
		}
	},
	matrixBuilder: function (container, size) {
		this.matrixSize = parseInt(size);
		this.generateStates();
		var subContainer = $('<div class="matrixDescTop"></div>').appendTo(container);
		for (var i = 0; i < size; i++) {
			$('<span class="matrixDesc">q<sub>' + i + '</sub></span>').animate({"opacity": "show"}, {duration: "slow"}).appendTo(subContainer);
		}
		for (var i = 0; i < size; i++) {
			subContainer = $('<div></div>');
			$('<span class="matrixDesc2">q<sub>' + i + '</sub></span>').appendTo(subContainer);
			for (var j = 0; j < size; j++) {
				$('<input type="button" value="0"></input>').hover(function () {
					$(this).addClass('hover');
				}, function () {
					$(this).removeClass('hover');
				}).mousedown(function () {
					$(this).addClass('mousedown');
				}).mouseup(function () {
					$(this).removeClass('mousedown');
				}).click(function () {
					if (this.value == "0") {
						$(this).attr('value', '1');
					}
					else {
						$(this).attr('value', '0');
					}
					if ($(this).hasClass('wrongValue') || $(this).hasClass('warningValue')) {
						$(this).removeClass();
					}
				}).appendTo(subContainer);
				subContainer.animate({"opacity": "show"}, {duration: "slow"}).appendTo(container);
			}
		}
	},
	matrixCleaner: function (container) {
		container.children().remove();
	},
	generateMatrix: function (inputs) {
		this.matrix.length = 0;
		var input = 0;
		for (var i = 0; i < this.matrixSize; i++) {
			var temp = [];
			for (var j = 0; j < this.matrixSize; j++) {
				temp[j] = inputs[input];
				input++;
			}
			this.matrix[i] = temp;
		}
	},
	generateStates: function () {
		this.states.length = 0;
		for (var i = 0; i < Math.pow(2, this.matrixSize); i++) {
			this.states[i] = {number: this.decToBin(i, this.matrixSize), status: false};
		}
	},
	matrixMulti: function (matrix, vector) {
		var result = [];
		for (var i = 0; i < matrix.length; i++) {
			var temp = 0;
			for (var j = 0; j < matrix[0].length; j++) {
				temp += matrix[i][j].value * vector[j];
			}
			result[i] = temp % 2;
		}
		return result;
	},
	refreshStates: function () {
		this.graphNodes.length = 0;
		this.graph = null;
		this.graph = new Graph();
		for (var i = 0; i < this.states.length; i++) {
			this.graphNodes[i] = this.graph.newNode({label: i});
			this.states[i].status = false;
		}
	},
	arrayToString: function (array) {
		var str = "";
		for (var i = 0; i < array.length; i++) {
			str += array[i] + " ";
		}
		return str;
	},
	compute: function (inputs, container) {
		this.checkMatrix(inputs);
		this.refreshStates();
		var subContainer = $('<div class="resultDesc"></div>')
		for (var i = 0; i < this.matrixSize; i++) {
			$('<span class="qdesc">q<sub>' + i + '</sub></span>').appendTo(subContainer);
		}
		$('<span class="tdesc">T</span>').appendTo(subContainer);
		subContainer.appendTo(container);
		$('<hr />').appendTo(container);
		for (var i = 0; i < this.states.length; i++) {
			if (this.states[i].status) {
				continue;
			}
			var which = i;
			var t = 1;
			var temp = this.arrayToString(this.states[which].number);
			$('<p><span class="lefts">(' + which + ')</span><span class="rights">' + temp + '</span><span class="trights">t</span><div class="clearb"></div></p>').appendTo(container);
			while (!this.states[which].status) {
				this.states[which].status = true;
				var wynik = this.matrixMulti(this.matrix, this.states[which].number);
				var bin = this.binToDec(wynik);
				this.graph.newEdge(this.graphNodes[which], this.graphNodes[bin], {color: '#000000'});
				temp = this.arrayToString(wynik);
				$('<p><span class="lefts">(' + bin + ')</span><span class="rights">' + temp + '</span><span class="trights">t+' + t + '</span><div class="clearb"></div></p>').appendTo(container);
				which = bin;
				t++;
			}
			$('<hr />').appendTo(container);
		}
		$('#matrixButtons input:eq(1)').animate({"opacity": "show"}, {duration: "slow"});
	},
	decToBin: function (i, size) {
		var temp = 0, tab = [];
		while (i > 0) {
			tab[temp] = i % 2;
			i = Math.floor(i / 2);
			temp++;
		}
		for (var i = temp; i < size; i++) {
			tab[i] = 0;
		}
		return tab;
	},
	binToDec: function (array) {
		var n = 0;
		for (var i = 0; i < array.length; i++) {
			n += array[i] * Math.pow(2, i);
		}
		return n;
	}
};