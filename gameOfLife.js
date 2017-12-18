var gameLifeBoard = [];
$(() => {

	var defaultConfig = {
		caseSize: 30,
		caseWidthNbr: Math.round((window.innerWidth || document.body.clientWidth) / 30),
		caseHeightNbr: Math.round((window.innerHeight || document.body.clientHeight) / 30),
		speed: 210,
		realXSize: 100,
		realYSize: 100,
		displayType: "Fixed"
	};
	var refreshIntervalGOL;
	// var gameLifeBoard = [];
	var patterns = {
		Glider: [[0, 1, 1, 0, 0, 1, 1, 0],
				 [1, 1, 0, 0, 0, 0, 1, 1],
				 [0, 0, 1, 0, 0, 1, 0, 0],
				 [0, 0, 0, 0, 0, 0, 0, 0],
				 [0, 0, 0, 0, 0, 0, 0, 0],
				 [0, 0, 1, 0, 0, 1, 0, 1],
				 [1, 1, 0, 0, 0, 0, 1, 1],
				 [0, 1, 1, 0, 0, 0, 1, 0]],
		LWSS:  [[0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
				[1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1]],
		Pulsar: [[0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
				 [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
				 [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
				 [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
				 [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				 [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
				 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				 [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
				 [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				 [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
				 [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
				 [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
				 [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0]]
	}

	let caseModifySate = ($this, state) => {
		var x = $this.attr(`x`) / defaultConfig.caseSize;
		var y = $this.attr(`y`) / defaultConfig.caseSize;
		if (state) {
			gameLifeBoard[y][x] = 0;
			$this.attr(`fill`, `white`);
		}
		else {
			gameLifeBoard[y][x] = 1;
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
			var state = gameLifeBoard[y][x];
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
		gameLifeBoard = [];
		$(`body`).prepend(`<svg width="`+ config.caseWidthNbr * config.caseSize +`"
					height="`+ config.caseHeightNbr * config.caseSize +`"
					xmlns="http://www.w3.org/2000/svg" id="grid"></svg>`);
		for (var i = 0; i < config.caseHeightNbr; i++) {
			gameLifeBoard[i] = [];
			for (var j = 0; j < config.caseWidthNbr; j++) {
				gameLifeBoard[i][j] = 0;
				rect = makeSVG(`rect`, {x: j * config.caseSize, y: i * config.caseSize,
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

	let btnHideDashBoard = () => {
		$(`#hide_dashboard`).off(`click`).on(`click`, (event) => {
			$(`#accordion`).css(`display`,`none`);
			$(`#accordion_dashboard > header`).css(`display`,`none`);
			$(`#accordion_dashboard`).css({width: `20px`, height: `7px`});
			btnShowDashBoard();
		});
	};

	let btnShowDashBoard = () => {
		$(`#hide_dashboard`).off(`click`).on(`click`, (event) => {
			$(`#accordion`).css(`display`,``);
			$(`#accordion_dashboard > header`).css(`display`,``);
			$(`#accordion_dashboard`).css({width: `505px`, height: `auto`});
			btnHideDashBoard();
		});
	};

	let loopGrid = (option, grid = gameLifeBoard) => {
		var cnt = 0;
		for (var i = 0; i < grid.length ; i++) {
			for (var j = 0; j < grid[i].length ; j++) {
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
		$(`.helper`).tooltip();
		$(`#accordion`).accordion({
			heightStyle: "content"
		});
		btnStart();
		btnPause();
		btnStop();
		btnSlower();
		btnFaster();
		btnNewMap();
		btnHideDashBoard();
		btnPatterns();
	};

	let getPattern = (pattern, config = defaultConfig) => {
		var $pattern = `<svg class="ghost-patern" width="`+ pattern[0].length * config.caseSize +`"
						height="`+ pattern.length * config.caseSize +`">`;
		for (var y = 0; y < pattern.length; y++) {
			for (var x = 0; x < pattern[y].length; x++) {
				if (pattern[y][x])
					$pattern = $pattern + `<rect x="`+ config.caseSize * x +`" 
									y="`+ config.caseSize * y +`" width="`+ config.caseSize +`"
									height="`+ config.caseSize +`" fill="rgb(255, 105, 80)" stroke="#000"></rect>`;
				else
					$pattern = $pattern + `<rect opacity="0" x="`+ config.caseSize * x +`" 
									y="`+ config.caseSize * y +`" width="`+ config.caseSize +`"
									height="`+ config.caseSize +`" ></rect>`;
			}
		}
		$pattern = $pattern + `</svg>`;
		$(`body`).append($pattern);
		$(`#grid`).off(`mousemove`).on('mousemove', function(event){
			$('.ghost-patern').css({
				left: event.pageX - config.caseSize / 2,
				top: event.pageY - config.caseSize /2
			});
			$(`rect`).off(`mousedown`).off(`click`).on(`click`, (event) => {
				var $this = $(event.currentTarget);
				var x = $this.attr('x') / config.caseSize;
				var y = $this.attr('y') / config.caseSize;
				for (var i = 0; i < pattern.length; i++) {
					for (var j = 0; j < pattern[i].length; j++) {
						if (i + y >= gameLifeBoard.length || j + x >= gameLifeBoard[i].length) {
							break ;
						}
						gameLifeBoard[i + y][j + x] = pattern[i][j];
					}
				}
				$('.ghost-patern').remove();
				loopGrid({display: 1});
				$(`#grid`).off(`mousemove`);
				caseEvent();
			});
		});
		
	};

	let btnGlider = () => {
		$(`#Glider`).off(`click`).on(`click`, (event) => {
			var $this = $(event.currentTarget);
			getPattern(patterns[$this.attr('pattern')]);
		});
	};

	let btnLWSS = () => {
		$(`#LWSS`).off(`click`).on(`click`, (event) => {
			var $this = $(event.currentTarget);
			getPattern(patterns[$this.attr('pattern')]);
		});
	};

	let btnPulsar = () => {
		$(`#Pulsar`).off(`click`).on(`click`, (event) => {
			var $this = $(event.currentTarget);
			getPattern(patterns[$this.attr('pattern')]);
		});
	};

	let btnPatterns = () => {
		btnRandomMap();
		btnGlider();
		btnLWSS();
		btnPulsar();
	};

	let celLiveOrDie = (x, y, gameBoard, config = defaultConfig) => {
		var partener = 0;
		var xTmp = 0;
		var yTmp = 0;
		for (var i = y - 1; i < y + 2; i++) {
			for (var j = x - 1; j < x + 2; j++) {
				xTmp = j;
				yTmp = i;
				// console.log(gameBoard, i , j , xTmp, yTmp)
				if (config.displayType == 'Fixed') {
					if (i >= 0 && i < gameBoard.length &&
						j >= 0 && j < gameBoard[i].length) {
						partener++;
						if (!gameBoard[yTmp][xTmp] || (yTmp == y && xTmp == x))
							partener--;
					}
				}
				else if (config.displayType == 'Loop') {
					// console.log(config.caseHeightNbr, i , config.caseWidthNbr, j)
					if (i < 0) {
						yTmp = config.caseHeightNbr + i;
						console.log("-y","-"+ yTmp)
					}
					if (j < 0) {
						xTmp = config.caseWidthNbr + j;
						console.log("-x","-"+ xTmp)
					}
					// console.log(config.caseHeightNbr, gameBoard.length,config.caseWidthNbr, gameBoard.length)
					if (i > config.caseHeightNbr) {
						yTmp = i - config.caseHeightNbr;
						console.log("+y","+"+ yTmp)
					}
					if (j > config.caseWidthNbr) {
						xTmp = j - config.caseWidthNbr;
						console.log("+x","+"+ xTmp)
					}
					// console.log(j, i,xTmp, yTmp, config.caseWidthNbr, config.caseHeightNbr)
					// console.log(gameBoard[0].length, config.caseWidthNbr)
					break;
					partener++;
					if (!gameBoard[yTmp][xTmp] || (yTmp == y && xTmp == x))
						partener--;

				}
			}
		}
		// console.log(partener)
		if (partener == 2 && gameBoard[y][x])
			return 1;
		else if (partener == 2 && !gameBoard[y][x])
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
				nextGenBoard[i][j] = celLiveOrDie(j, i, gameBoard);
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
