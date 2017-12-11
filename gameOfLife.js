$(() => {

	var defaultConfig = {
		caseSize: 30,
		caseWidthNbr: Math.round((window.innerWidth || document.body.clientWidth) / 30),
		caseHeightNbr: Math.round((window.innerHeight || document.body.clientHeight) / 30)
	};

	var gameLifeBoard = [];

	let caseModifySate = ($this, state) => {
		var x = $this.attr(`x`) / defaultConfig.caseSize;
		var y = $this.attr(`y`) / defaultConfig.caseSize;
		if (state) {
			gameLifeBoard[x][y] = 0;
			$this.attr(`fill`, `white`);
		}
		else {
			gameLifeBoard[x][y] = 1;
			$this.attr(`fill`, `rgb(128, 128, 128)`);
		}
	};

	let caseEvent = () => {
		var $rect = $(`rect`);
		$rect.off(`mousedown`).on(`mousedown`, (event) => {
			var $this = $(event.currentTarget);
			var x = $this.attr(`x`) / defaultConfig.caseSize;
			var y = $this.attr(`y`) / defaultConfig.caseSize;
			var state = gameLifeBoard[x][y];
			$rect.off(`mouseover click`).on(`mouseover click`, (event) => {
				if (!state) {
					event.currentTarget.setAttribute ('ry', 5);
					event.currentTarget.setAttribute ('rx', 5);
					setTimeout(() => {
						event.currentTarget.setAttribute ('ry', 0);
						event.currentTarget.setAttribute ('rx', 0);
					}, 500);
				}
				caseModifySate($(event.currentTarget), state)
			});
		}).off(`mouseup`).on(`mouseup`, (event) => {
			$rect.off(`mouseover`);
		});
	};

	let makeSVG = (tag, attrs) => {
		var elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs)
			elem.setAttribute(k, attrs[k]);
		return elem;
	};

	let buildGrid = (config = defaultConfig) => {
		var rect;
		var id = 0;
		$(`body`).append(`<svg width="`+ config.caseWidthNbr * config.caseSize +`"
					height="`+ config.caseHeightNbr * config.caseSize +`"
					xmlns="http://www.w3.org/2000/svg" id="grid"></svg>`);
		for (var i = 0; i < config.caseWidthNbr; i++) {
			gameLifeBoard[i] = [];
			for (var j = 0; j < config.caseHeightNbr; j++) {
				gameLifeBoard[i][j] = 0;
				rect = makeSVG(`rect`, {x: i * config.caseSize, y: j * config.caseSize,
										width: config.caseSize, height: config.caseSize,
										fill: '#ffffff', stroke: '#000', 'stroke-opacity': '0.2',
										id: id});
				$(`#grid`).append(rect);
			}
		}
		caseEvent();
	};
	
	buildGrid();

	$( ".ui-draggable" ).draggable({
		addClasses: false
	});

});