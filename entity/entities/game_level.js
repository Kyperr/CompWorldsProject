
/**
 * Game levels will be run and determine the state of the game.
 * @param {*} game - The game.
 * @param {*} initFunc - The initialization for the level. Args: (gameLevel, game)
 * @param {*} sequenceFunc - The things things that happen in this level. Args: (gameLevel, game)
 * @param {*} completeCondition - Under what conditions is this level complete? Args: (gameLevel, game)
 * @param {*} onCompletion - What should be done upon completion of the level? Args: (gameLevel, game)
 */
function GameLevel(game, initFunc, sequenceFunc, completeCondition, onCompletion) {
    this.game = game;
    this.initFunc = initFunc;
    this.sequenceFunc = sequenceFunc;
    this.completeCondition = completeCondition;
    this.onCompletion = onCompletion;
    this.initialized = false;
    this.phasesDone = [];
    this.spawnSequences = [];
}

GameLevel.prototype = Object.create(Entity.prototype);
GameLevel.prototype.constructor = GameLevel;

GameLevel.prototype.update = function () {
    this.sequenceFunc(this, this.game);

    if (this.completeCondition(this, this.game)) {
        this.onCompletion(this, this.game);
    }
}

GameLevel.prototype.init = function () {
    this.initFunc(this, this.game);
    this.initialized = true;
}

/**
 * Game Level Static Functions
 */

//Standard complete condition
GameLevel.stdCompleteCondition = function (gameLevel, gameEngine) {
    return gameEngine.enemies.length == 0 && gameLevel.initialized;//This might be buggy. Not sure yet.
}

//Standard onCompletion
GameLevel.stdOnCompletion = function (gameLevel, gameEngine) {
    //Here is where the outro animation should happen.
    if (gameEngine.currentLevel < gameEngine.levels.length - 1) {//-1 magic number because javascript
        gameEngine.currentLevel++;
        gameEngine.levels[gameEngine.currentLevel].init();
    } else {
        console.log("you won");
        gameEngine.won = true;
    }
}
//Standard level sequence
GameLevel.stdLevelSequence = function (gameLevel, gameEngine) {
    gameLevel.spawnSequences.forEach(spawnSequence => {
        spawnSequence.resolve();
    });
}

//Level one init
GameLevel.levelOneInit = function (gameLevel, gameEngine) {
    var map = new Map(gameEngine, AM.getAsset("./img/map.png"), 1600, 1600);
    gameEngine.map = map;

    var zerglings = new SpawnSequence(
        () => { return true },
        () => {
            for (var i = 0; i < ZERGLINGS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                gameEngine.addEnemy(Zergling.quickCreate(gameEngine, x, y));
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(zerglings);

    var hydralisks = new SpawnSequence(
        () => { return gameEngine.enemies.length == 0 },
        () => {
            for (var i = 0; i < HYDRALISKS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                gameEngine.addEnemy(Hydralisk.quickCreate(gameEngine, x, y));
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(hydralisks);
}

//Level two init
GameLevel.levelTwoInit = function (gameLevel, gameEngine) {
    var map = new Map(gameEngine, AM.getAsset("./img/map.png"), 1600, 1600);
    gameEngine.map = map;

    var ultralisks = new SpawnSequence(
        () => { return true },
        () => {
            for (var i = 0; i < ULTRALISKS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                var ultralisk = new Ultralisk(x, y, gameEngine, AM.getAsset("./img/red_ultralisk.png"), AM.getAsset("./img/red_ultralisk.png"));
                ultralisk.init(gameEngine);
                gameEngine.addEnemy(ultralisk);
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(ultralisks);

    var mutalisks = new SpawnSequence(
        () => { return true },
        () => {
            for (var i = 0; i < MUTALISKS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                var mutalisk = new Mutalisk(x, y, gameEngine, AM.getAsset("./img/red_mutalisk.png"), AM.getAsset("./img/mut_zairdthl.png"));
                mutalisk.init(gameEngine);
                gameEngine.addEnemy(mutalisk);
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(mutalisks);
}

//Level three init
GameLevel.levelThreeInit = function (gameLevel, gameEngine) {
    var map = new Map(gameEngine, AM.getAsset("./img/map.png"), 1600, 1600);
    gameEngine.map = map;

    var guardians = new SpawnSequence(
        () => { return true },
        () => {
            for (var i = 0; i < GUARDIANS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                guardian = new Guardian(x, y, gameEngine, AM.getAsset("./img/red_guardian.png"), AM.getAsset("./img/gua_zairdthl.png"));
                guardian.init(gameEngine);
                gameEngine.addEnemy(guardian);
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(guardians);
    
    var ultralisks = new SpawnSequence(
        () => { return true },
        () => {
            for (var i = 0; i < ULTRALISKS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                var ultralisk = new Ultralisk(x, y, gameEngine, AM.getAsset("./img/red_ultralisk.png"), AM.getAsset("./img/red_ultralisk.png"));
                ultralisk.init(gameEngine);
                gameEngine.addEnemy(ultralisk);
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(ultralisks);
    
    var lurkers = new SpawnSequence(
        () => { return true },
        () => {
            for (var i = 0; i < LURKERS; i++) {
                var x = calcSpawnX(gameEngine, ZER_FRAME_DIM);
                var y = calcSpawnY(gameEngine, ZER_FRAME_DIM);
                var lurker = new Lurker(x, y, gameEngine, AM.getAsset("./img/red_lurker.png"), AM.getAsset("./img/red_lurker.png"));
                lurker.init(gameEngine);
                gameEngine.addEnemy(lurker);
            }
            gameLevel.spawnSequences.splice(this, 1);
        });
    gameLevel.spawnSequences.push(lurkers);
}


/**
 * Spawn sequence class
 */


function SpawnSequence(spawnCondition, spawnFunc) {
    this.spawnCondition = spawnCondition;
    this.spawnFunc = spawnFunc;
}

SpawnSequence.prototype.resolve = function () {
    if (this.spawnCondition()) {
        this.spawnFunc();
    }
}