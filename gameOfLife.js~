$(() => {

	var defaultConfig = {
		caseSize: 30,
		caseWidthNbr: Math.round((window.innerWidth || document.body.clientWidth) / 30),
		caseHeightNbr: Math.round((window.innerHeight || document.body.clientHeight) / 30),
		speed: 210
	};
	var refreshIntervalGOL;
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
		var $panel = $(`.dashboard`);
		$rect.off(`mousedown`).on(`mousedown`, (event) => {
			var $this = $(event.currentTarget);
			var x = $this.attr(`x`) / defaultConfig.caseSize;
			var y = $this.attr(`y`) / defaultConfig.caseSize;
			var state = gameLifeBoard[x][y];
			$rect.off(`mouseover click`).on(`mouseover click`, (event) => {
				$panel.css(`pointer-events`, `none`);
				if (!state) {
					event.currentTarget.setAttribute ('ry', 5);
					event.currentTarget.setAttribute ('rx', 5);
					setTimeout(() => {
						event.currentTarget.setAttribute ('ry', 0);
						event.currentTarget.setAttribute ('rx', 0);
					}, 500);
				}
				caseModifySate($(event.currentTarget), state);
			});
			$rect.off(`click`).on(`click`, (event) => {
				$panel.css(`pointer-events`, `none`);
				if (!state) {
					event.currentTarget.setAttribute ('ry', 5);
					event.currentTarget.setAttribute ('rx', 5);
					setTimeout(() => {
						event.currentTarget.setAttribute ('ry', 0);
						event.currentTarget.setAttribute ('rx', 0);
					}, 500);
				}
				caseModifySate($(event.currentTarget), state);
				$panel.css(`pointer-events`, ``);
			});
		}).off(`mouseup`).on(`mouseup`, (event) => {
			$rect.off(`mouseover`);
			$panel.css(`pointer-events`, ``);
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
		$(`body`).prepend(`<svg width="`+ config.caseWidthNbr * config.caseSize +`"
					height="`+ config.caseHeightNbr * config.caseSize +`"
					xmlns="http://www.w3.org/2000/svg" id="grid"></svg>`);
		for (var i = 0; i < config.caseWidthNbr; i++) {
			gameLifeBoard[i] = [];
			for (var j = 0; j < config.caseHeightNbr; j++) {
				gameLifeBoard[i][j] = 0;
				rect = makeSVG(`rect`, {x: i * config.caseSize, y: j * config.caseSize,
										width: config.caseSize, height: config.caseSize,
										fill: '#ffffff', stroke: '#000', 'stroke-opacity': '0.2',
										id: id++});
				$(`#grid`).append(rect);
			}
		}
		caseEvent();
	};

	let btnStart = () => {
		var $start = $(`#start`);
		$start.off(`click`).on(`click`, (event) => {
			refreshIntervalGOL = setInterval(() => {
				gameLifeBoard = gameOfLife(gameLifeBoard);
			}, defaultConfig.speed);
			$start.off(`click`);
		});
	};

	let btnPause = () => {
		$(`#pause`).off(`click`).on(`click`, (event) => {
			clearInterval(refreshIntervalGOL);
			btnStart();
		});
	};

	let btnStop = () => {
		$(`#stop`).off(`click`).on(`click`, (event) => {
			clearInterval(refreshIntervalGOL);
			gameLifeBoard = loopGrid({clear: 1, display: 1});
			btnStart();
		});
	};

	let btnSlower = () => {
		$(`#slower`).off(`click`).on(`click`, (event) => {
			if (defaultConfig.speed < 2000)
				defaultConfig.speed += 200;
		});
	};

	let btnFaster = () => {
		$(`#faster`).off(`click`).on(`click`, (event) => {
			if (defaultConfig.speed > 10)
				defaultConfig.speed -= 200;
		});
	};

	let btnNewMap = () => {
		$(`#new-map`).off(`click`).on(`click`, (event) => {
			var size = parseInt($(`#case-size`).val());
			if (size && size >= 7) {
				$(`.error`).remove();
				defaultConfig = {
					caseSize: size,
					caseWidthNbr: Math.round((window.innerWidth || document.body.clientWidth) / size),
					caseHeightNbr: Math.round((window.innerHeight || document.body.clientHeight) / size),
					speed: defaultConfig.speed
				};
				clearInterval(refreshIntervalGOL);
				$(`#grid`).remove();
				if (defaultConfig.caseWidthNbr == 0 || defaultConfig.caseheightNbr == 0) {
					$(`body`).append(`<h2 class="error">Sometimes people are not really smart, it happens...</h2>`);
				}
				else {
					buildGrid(defaultConfig);
					btnStart();
				}
			}
		});
	};

	let btnRandomMap = () => {
		$(`#random`).off(`click`).on(`click`, (event) => {
			clearInterval(refreshIntervalGOL);
			loopGrid({random: 1, display: 1})
			btnStart();
		});
	};

	let loopGrid = (option, grid = gameLifeBoard) => {
		var cnt = 0;
		for (var i = 0; i < grid.length ; i++) {
			for (var j = 0; j < grid[j].length ; j++) {
				if (option.clear)
					grid[i][j] = 0;
				if (option.random)
					grid[i][j] = Math.round(Math.random(0, 1));
				if (option.display) {
					grid[i][j] == 1 ? 
						$(`#`+ cnt).attr(`fill`, `rgb(128, 128, 128)`) : $(`#`+ cnt).attr(`fill`, `white`);
				}
				cnt++;
			}
		}
		return grid;
	};

	let dashboardEvents = () => {
		$(`.ui-draggable`).draggable();

		$(`#accordion`).accordion({
			heightStyle: "content"
		});
		btnStart();
		btnPause();
		btnStop();
		btnSlower();
		btnFaster();
		btnNewMap();
		btnRandomMap();
	};

	let celLiveOrDie = (x, y, gameBoard) => {
		var partener = 0;
		for (var i = x - 1; i < x + 2; i++) {
			for (var j = y - 1; j < y + 2; j++) {
				if (i >= 0 && i < gameBoard.length &&
					j >= 0 && j < gameBoard[i].length) {
					partener++;
					if (!gameBoard[i][j] || (x == i && j == y))
						partener--;
				}
			}
		}
		if (partener == 2 && gameBoard[x][y])
			return 1;
		else if (partener == 2 && !gameBoard[x][y])
			return 0;
		else if (partener == 3)
			return 1;
		return 0;
	};

	let gameOfLife = (gameBoard) => {
		var cnt = 0;
		var nextGenBoard = [];
		for (var i = 0; i < gameBoard.length; i++) {
			nextGenBoard[i] = [];
			for (var j = 0; j < gameBoard[i].length; j++) {
				nextGenBoard[i][j] = celLiveOrDie(i, j, gameBoard);
				if (nextGenBoard[i][j] != gameBoard[i][j])
					nextGenBoard[i][j] == 1 ? 
						$(`#`+ cnt).attr(`fill`, `rgb(128, 128, 128)`) : $(`#`+ cnt).attr(`fill`, `white`);
				cnt++;
			}
		}
		return nextGenBoard;
	};
	dashboardEvents();
	buildGrid();

});
