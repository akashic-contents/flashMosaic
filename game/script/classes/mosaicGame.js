"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = require("./define");
var assetInfo_1 = require("./assetInfo");
var soundInfo_1 = require("./soundInfo");
var entityUtil_1 = require("../util/entityUtil");
var spriteUtil_1 = require("../util/spriteUtil");
var gameUtil_1 = require("../util/gameUtil");
var audioUtil_1 = require("../util/audioUtil");
var timerLabel_1 = require("./timerLabel");
var gameSceneContext_1 = require("./gameSceneContext");
var gameSceneView_1 = require("./gameSceneView");
var stateBaseClass_1 = require("./stateBaseClass");
var stateMachineClass_1 = require("./stateMachineClass");
var gameParameterReader_1 = require("./gameParameterReader");
var timerGauge_1 = require("./timerGauge");
var gameBase_1 = require("../commonNicowariGame/gameBase");
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
/**
 * ゲームの実体を実装するクラス
 */
var MosaicGame = /** @class */ (function (_super) {
    __extends(MosaicGame, _super);
    /**
     * 継承元のコンストラクタをよぶ
     * @param  {g.Scene} _scene シーン
     */
    function MosaicGame(_scene) {
        var _this = _super.call(this, _scene) || this;
        /** 表示・演出用カウンタ */
        _this.cnt = 0;
        /** 残り回答時間 */
        _this.frameQuestion = define_1.define.START_FRAME_QUESTION;
        /** 出題中の問題番号 */
        _this.currentQuestion = define_1.define.START_QUESTION;
        /** スコア加算幅 */
        _this.plusQuestion = 0; // 各問題のポイント足し幅
        /** スコア加算幅に対応する残り時間減算幅 */
        _this.plusFrame = 0;
        /** 残りスコア加算 */
        _this.plusLeft = 0;
        /** 正解時点のframeQuestionの値 */
        _this.dischargeFrame = 0;
        /** 回答ボタンを押したらtrueになるフラグ */
        _this.flgAnswer = false;
        /** モザイク早送りが終わったらtrueになるフラグ */
        _this.flgSkipMosaic = false;
        /** 回答時間切れになったらtrueになるフラグ */
        _this.flgTimeup = false;
        /** 第？問表示用番号 */
        _this.questionNo = define_1.define.START_QUESTION;
        return _this;
    }
    /**
     * このクラスで使用するオブジェクトを生成するメソッド
     * Scene#loadedを起点とする処理からコンストラクタの直後に呼ばれる。
     * このクラスはゲーム画面終了時も破棄されず、次のゲームで再利用される。
     * そのためゲーム状態の初期化はinitではなくshowContentで行う必要がある。
     * @override
     */
    MosaicGame.prototype.init = function () {
        _super.prototype.init.call(this);
        // クイズデータ生成
        gameParameterReader_1.GameParameterReader.read(this.scene);
        this.quizData = gameParameterReader_1.GameParameterReader.quizData;
        this.currentIndex = 0;
        this.questionNo = 0;
        var scene = this.scene;
        var spoMain = spriteUtil_1.spriteUtil.createSpriteParameter(assetInfo_1.AssetInfo.mains);
        var sfmMain = spriteUtil_1.spriteUtil.createSpriteFrameMap(assetInfo_1.AssetInfo.mains);
        this.sceneContext = new gameSceneContext_1.GameSceneContext();
        this.sceneContext.init();
        this.view = new gameSceneView_1.GameSceneView(scene, this.sceneContext);
        entityUtil_1.entityUtil.appendEntity(this.view, this);
        var iconT = spriteUtil_1.spriteUtil.createFrameSprite(spoMain, sfmMain, assetInfo_1.AssetInfo.mains.frames.iconClock);
        iconT.moveTo(define_1.define.ICON_T_X, define_1.define.ICON_T_Y);
        entityUtil_1.entityUtil.appendEntity(iconT, this);
        var timer = this.timerLabel = new timerLabel_1.TimerLabel(scene);
        timer.createLabel(assetInfo_1.AssetInfo.numBlack, assetInfo_1.AssetInfo.numRed);
        timer.moveLabelTo(define_1.define.GAME_TIMER_X, define_1.define.GAME_TIMER_Y);
        entityUtil_1.entityUtil.appendEntity(timer, this);
        var fontBlack = gameUtil_1.gameUtil.createNumFontWithAssetInfo(assetInfo_1.AssetInfo.numBlack);
        var score = this.scoreLabel = entityUtil_1.entityUtil.createNumLabel(scene, fontBlack, define_1.define.GAME_SCORE_DIGIT);
        entityUtil_1.entityUtil.moveNumLabelTo(score, define_1.define.GAME_SCORE_X, define_1.define.GAME_SCORE_Y);
        entityUtil_1.entityUtil.appendEntity(score, this);
        var scoreIcon = spriteUtil_1.spriteUtil.createFrameSprite(spoMain, sfmMain, assetInfo_1.AssetInfo.mains.frames.iconPt);
        scoreIcon.moveTo(define_1.define.GAME_SCORE_ICON_POINT.x, define_1.define.GAME_SCORE_ICON_POINT.y);
        entityUtil_1.entityUtil.appendEntity(scoreIcon, this);
        // タイマーゲージ作成
        this.timerGauge = new timerGauge_1.TimerGauge(scene);
        entityUtil_1.entityUtil.setXY(this.timerGauge, define_1.define.GAME_ANSWER_TIME_POINT.x, define_1.define.GAME_ANSWER_TIME_POINT.y);
        entityUtil_1.entityUtil.appendEntity(this.timerGauge, this);
        this.stateMachine = new stateMachineClass_1.StateMachineClass(scene);
        this.createState = new stateBaseClass_1.StateBaseClass();
        this.initState = new stateBaseClass_1.StateBaseClass();
        this.questState = new stateBaseClass_1.StateBaseClass();
        this.playState = new stateBaseClass_1.StateBaseClass();
        this.answerState = new stateBaseClass_1.StateBaseClass();
        // fsmに預ける
        this.stateMachine.states = [
            this.createState,
            this.initState,
            this.questState,
            this.playState,
            this.answerState
        ];
        // ステート処理ハンドラ上書き
        this.initStateFunction();
    };
    /**
     * 表示系以外のオブジェクトをdestroyするメソッド
     * 表示系のオブジェクトはg.Eのdestroyに任せる。
     * @override
     */
    MosaicGame.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    /**
     * タイトル画面のBGMのアセット名を返すメソッド
     * 共通フロー側でBGMを鳴らさない場合は実装クラスでオーバーライドして
     * 空文字列を返すようにする
     * @return {string} アセット名
     * @override
     */
    MosaicGame.prototype.getTitleBgmName = function () {
        return soundInfo_1.SoundInfo.bgmSet.title;
    };
    /**
     * ゲーム中のBGMのアセット名を返すメソッド
     * 共通フロー側でBGMを鳴らさない場合は実装クラスでオーバーライドして
     * 空文字列を返すようにする
     * @return {string} アセット名
     * @override
     */
    MosaicGame.prototype.getMainBgmName = function () {
        return "";
    };
    /**
     * 表示を開始するメソッド
     * ゲーム画面に遷移するワイプ演出で表示が始まる時点で呼ばれる。
     * @override
     */
    MosaicGame.prototype.showContent = function () {
        this.inGame = false;
        this.inTimerPause = true;
        this.timeupped = false;
        this.currentIndex = define_1.define.START_QUESTION;
        this.currentQuestion = this.quizData[this.currentIndex].index;
        this.questionNo = 1;
        // 最初のステートへ
        this.stateMachine.resetState();
        this.stateMachine.transition(this.createState);
        this.scoreValue = 0;
        entityUtil_1.entityUtil.setLabelText(this.scoreLabel, String(this.scoreValue));
        gameUtil_1.gameUtil.updateGameStateScore(this.scoreValue);
        var timeLimit = define_1.define.GAME_TIME;
        if (commonParameterReader_1.CommonParameterReader.useGameTimeLimit) {
            timeLimit = commonParameterReader_1.CommonParameterReader.gameTimeLimit;
            if (timeLimit > define_1.define.GAME_TIME_MAX) {
                timeLimit = define_1.define.GAME_TIME_MAX;
            }
        }
        else if (commonParameterReader_1.CommonParameterReader.useGameTimeMax) {
            timeLimit = define_1.define.GAME_TIME_MAX;
        }
        this.timerLabel.setTimeCount(timeLimit);
        this.timerLabel.timeCaution.handle(this, this.onTimeCaution);
        this.timerLabel.timeCautionCancel.handle(this, this.onTimeCautionCancel);
        // 回答時間ゲージ表示
        this.timerGauge.showContent();
        _super.prototype.showContent.call(this);
    };
    /**
     * ゲームを開始するメソッド
     * ReadyGo演出が完了した時点で呼ばれる。
     * @override
     */
    MosaicGame.prototype.startGame = function () {
        this.inGame = true;
        this.stateMachine.transition(this.initState);
    };
    /**
     * 表示を終了するメソッド
     * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる。
     * @override
     */
    MosaicGame.prototype.hideContent = function () {
        this.stateMachine.resetState();
        this.view.clearForRetry();
        this.timerLabel.timeCaution.removeAll(this);
        this.timerLabel.timeCautionCancel.removeAll(this);
        _super.prototype.hideContent.call(this);
    };
    /**
     * Scene#updateを起点とする処理から呼ばれるメソッド
     * ゲーム画面でない期間には呼ばれない。
     * @override
     */
    MosaicGame.prototype.onUpdate = function () {
        if (this.inGame) {
            this.stateMachine.onUpdate();
            if (!this.inTimerPause || define_1.define.DISABLE_TIMER_PAUSE) {
                this.timerLabel.tick();
                if (this.timerLabel.getTimeCount() === 0) {
                    this.finishGame();
                }
            }
        }
    };
    /**
     * TimerLabel#timeCautionのハンドラ
     */
    MosaicGame.prototype.onTimeCaution = function () {
        this.timeCaution.fire();
    };
    /**
     * TimerLabel#timeCautionCancelのハンドラ
     */
    MosaicGame.prototype.onTimeCautionCancel = function () {
        this.timeCautionCancel.fire();
    };
    /**
     * ゲームを終了するメソッド
     * gameUtil.setGameScoreしたスコアが結果画面で表示される。
     * @param {boolean = false} opt_isLifeZero
     * (optional)ライフ消滅によるゲーム終了の場合はtrue
     */
    MosaicGame.prototype.finishGame = function (opt_isLifeZero) {
        if (opt_isLifeZero === void 0) { opt_isLifeZero = false; }
        if (this.inTimerPause) {
            this.timeupped = true;
            return;
        }
        audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.end);
        this.inGame = false;
        this.scene.pointDownCapture.removeAll(this);
        audioUtil_1.audioUtil.stop(soundInfo_1.SoundInfo.bgmSet.thinkingTime);
        gameUtil_1.gameUtil.setGameScore(this.scoreValue);
        // 呼び出すトリガーによって共通フローのジングルアニメが変化する
        if (opt_isLifeZero) {
            this.gameOver.fire();
            this.timerLabel.forceStopBlink();
        }
        else {
            this.timeup.fire();
        }
    };
    /**
     * 各ステートのハンドラ関数を設定するメソッド
     */
    MosaicGame.prototype.initStateFunction = function () {
        var _this = this;
        this.createState.onStateEnter = function () {
            // console.log("createState.onStateEnter.");
            _this.enterCreate();
        };
        this.initState.onStateEnter = function () {
            // console.log("initState.onStateEnter.");
            _this.enterInit();
        };
        this.questState.onStateEnter = function () {
            // console.log("questState.onStateEnter.");
            _this.enterQuest();
        };
        this.questState.onStateExit = function () {
            // console.log("questState.onStateExit.");
            _this.exitQuest();
        };
        this.playState.onStateEnter = function () {
            // console.log("playState.onStateEnter.");
            _this.enterPlay();
        };
        this.playState.onStateStay = function () {
            // console.log("playState.onStateStay.");
            _this.stayPlay();
        };
        this.playState.onStateExit = function () {
            // console.log("playState.onStateExit.");
            _this.exitPlay();
        };
        this.answerState.onStateEnter = function () {
            // console.log("answerState.onStateEnter.");
            _this.enterAnswer();
        };
        this.answerState.onStateStay = function () {
            // console.log("answerState.onStateStay.");
            _this.stayAnswer();
        };
    };
    /**
     * 表示要素の生成ステート開始時に呼ばれるメソッド
     */
    MosaicGame.prototype.enterCreate = function () {
        this.view.prepaerQuiz(gameUtil_1.gameUtil.sec2Frame(this.quizData[this.currentIndex].timeLimit));
        this.mosaic = this.view.mosaic;
    };
    /**
     * 問題ごとの状態初期化ステート開始時に呼ばれるメソッド
     */
    MosaicGame.prototype.enterInit = function () {
        this.cnt = 0;
        this.mosaic.level = 0;
        this.flgAnswer = false;
        this.flgSkipMosaic = false;
        this.flgTimeup = false;
        this.frameQuestion = gameUtil_1.gameUtil.sec2Frame(this.quizData[this.currentIndex].timeLimit);
        this.timerGauge.setTimeCount(this.quizData[this.currentIndex].timeLimit);
        this.plusQuestion = 0;
        this.plusFrame = 0;
        this.plusLeft = 0;
        this.view.setQuiz(this.currentQuestion, this.frameQuestion, this.mosaic.level);
        this.stateMachine.transition(this.questState);
    };
    /**
     * 「第～問」表示ステート開始時に呼ばれるメソッド
     */
    MosaicGame.prototype.enterQuest = function () {
        var _this = this;
        audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.question);
        this.view.showQuestionNumber(this.questionNo);
        this.scene.setTimeout(1000, function () {
            _this.stateMachine.transition(_this.playState);
        });
    };
    /**
     * 「第～問」表示ステート終了時に呼ばれるメソッド
     */
    MosaicGame.prototype.exitQuest = function () {
        this.view.hideQuestionNumber();
    };
    /**
     * 回答受付ステート開始時に呼ばれるメソッド
     */
    MosaicGame.prototype.enterPlay = function () {
        var _this = this;
        audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.bgmSet.thinkingTime);
        this.view.startQuiz(function (index) {
            _this.onAnswer(index);
        });
        // 回答ボタンクリック
        this.scene.pointDownCapture.handle(this, this.handlePlayStatePointDown);
        this.inTimerPause = false;
    };
    /**
     * タッチ開始時のハンドラ関数
     * @param  {g.PointDownEvent} _e タッチ開始イベントオブジェクト
     * @return {boolean}             回答ボタンを押した場合はtrue
     */
    MosaicGame.prototype.handlePlayStatePointDown = function (_e) {
        if (!this.flgTimeup) {
            this.view.checkTouchButtons(_e.point); // 衝突判定
        }
        return this.flgAnswer; // ボタンを押したときのみtrueになっている
    };
    /**
     * 回答ボタン押下時のハンドラ関数
     * @param {number} _index 回答ボタン番号
     */
    MosaicGame.prototype.onAnswer = function (_index) {
        var _this = this;
        // ボタンが押されたら
        this.flgAnswer = true;
        audioUtil_1.audioUtil.stop(soundInfo_1.SoundInfo.bgmSet.thinkingTime);
        this.inTimerPause = true;
        var isGood = false;
        var pointAdder = 0;
        // アンサーチェック
        if (_index === gameParameterReader_1.GameParameterReader.rightAnswerIndexes[this.currentQuestion]) {
            audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.answer2);
            isGood = true;
            pointAdder = this.calcPointAdder();
            this.plusQuestion = Math.ceil(pointAdder / define_1.define.PLUS_FRAME_LENGTH); // 足し幅
            this.plusFrame = Math.ceil(this.frameQuestion / define_1.define.PLUS_FRAME_LENGTH); // 引き幅
            this.plusLeft = pointAdder;
            this.dischargeFrame = this.frameQuestion;
            // console.log("onAnswer: plusQuestion:" + this.plusQuestion + ", PLUS_FRAME_LENGTH:" + define.PLUS_FRAME_LENGTH + ".");
            // console.log("onAnswer: plusFrame:" + this.plusFrame);
        }
        else {
            audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.badAnswer2);
        }
        this.view.showGoodBad(isGood, pointAdder, this.frameQuestion, function () {
            _this.stateMachine.transition(_this.answerState);
        });
    };
    /**
     * 正解時の獲得スコアを計算するメソッド
     * @return {number} 残り回答時間に対応するスコア
     */
    MosaicGame.prototype.calcPointAdder = function () {
        var quizData = this.quizData[this.currentIndex];
        var remainSec = Number(gameSceneView_1.GameSceneView.frame2SecToFixOne(this.frameQuestion));
        // console.log("calcPointAdder: remainSec:" + remainSec + ", frameQuestion:" + this.frameQuestion + ".");
        var remainRate = remainSec / quizData.timeLimit;
        // console.log("calcPointAdder: remainRate:" + remainRate + ", timeLimit:" + quizData.timeLimit + ".");
        // console.log("calcPointAdder: return:" + Math.ceil(remainRate * quizData.timeScore) + ", timeScore:" + quizData.timeScore + ".");
        return Math.ceil(remainRate * quizData.timeScore);
    };
    /**
     * 回答受付ステート滞在中のonUpdateで呼ばれるメソッド
     */
    MosaicGame.prototype.stayPlay = function () {
        var _this = this;
        ++this.cnt;
        if (!this.flgAnswer && !this.flgTimeup) {
            --this.frameQuestion;
            this.timerGauge.tick();
            // 定期的モザイク薄め
            var interval = (1 * this.scene.game.fps / define_1.define.SEC_QUESTION
                * this.quizData[this.currentIndex].timeLimit) | 0;
            if (this.cnt % interval === 0) {
                if (this.mosaic.checkLevel(this.currentQuestion)) {
                    this.mosaic.level += 1;
                    this.mosaic.changeMosaicSprite(this.currentQuestion);
                }
            }
        }
        // タイムアップ
        if ((this.frameQuestion <= 0) && !this.flgTimeup) {
            audioUtil_1.audioUtil.stop(soundInfo_1.SoundInfo.bgmSet.thinkingTime);
            audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.timeUp);
            this.flgTimeup = true;
            this.inTimerPause = true;
            this.view.showTimeupJingle(function () {
                _this.stateMachine.transition(_this.answerState);
            });
        }
    };
    /**
     * 回答受付ステート終了時に呼ばれるメソッド
     */
    MosaicGame.prototype.exitPlay = function () {
        this.view.finishQuiz();
        this.scene.pointDownCapture.removeAll(this);
    };
    /**
     * 回答結果表示ステート開始時に呼ばれるメソッド
     */
    MosaicGame.prototype.enterAnswer = function () {
        this.view.setAnswer(this.currentQuestion);
        audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.drumRoll);
    };
    /**
     * 回答結果表示ステート滞在中のonUpdateで呼ばれるメソッド
     */
    MosaicGame.prototype.stayAnswer = function () {
        if (!this.flgSkipMosaic) {
            ++this.cnt;
            if (this.cnt % 3 === 0) {
                this.stepSkipMosaic();
            }
        }
        if (this.flgSkipMosaic && (this.plusFrame > 0)) {
            // モザイク段階を進め終わっていて正解している場合
            if (this.frameQuestion > this.plusFrame) {
                // 設定した足し幅で減算する
                this.frameQuestion -= this.plusFrame;
                if (!audioUtil_1.audioUtil.isPlaying(soundInfo_1.SoundInfo.seSet.rollCount2)) {
                    audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.rollCount2);
                }
            }
            else {
                this.frameQuestion = 0;
                audioUtil_1.audioUtil.stop(soundInfo_1.SoundInfo.seSet.rollCount2);
            }
            if (this.plusLeft > 0) {
                var plus = (this.plusLeft >= this.plusQuestion) ? this.plusQuestion : this.plusLeft;
                this.view.addPoint(plus);
                this.plusLeft -= plus;
            }
            var progress = 1 - (this.frameQuestion / this.dischargeFrame);
            this.timerGauge.discharge(progress);
        }
        this.scoreValue = this.view.point.score;
        if (this.scoreValue > define_1.define.SCORE_LIMIT) {
            this.scoreValue = define_1.define.SCORE_LIMIT;
        }
        entityUtil_1.entityUtil.setLabelText(this.scoreLabel, String(this.scoreValue));
        gameUtil_1.gameUtil.updateGameStateScore(this.scoreValue);
    };
    /**
     * モザイク段階を進めるメソッド
     */
    MosaicGame.prototype.stepSkipMosaic = function () {
        var _this = this;
        if (this.mosaic.checkLevel(this.currentQuestion)) {
            // モザイク段階を進められる場合
            this.mosaic.level += 1;
            this.mosaic.changeMosaicSprite(this.currentQuestion);
        }
        else {
            // モザイク段階を進め終わった場合
            this.flgSkipMosaic = true;
            audioUtil_1.audioUtil.stop(soundInfo_1.SoundInfo.seSet.drumRoll);
            this.view.showAnswer();
            audioUtil_1.audioUtil.play(soundInfo_1.SoundInfo.seSet.drumRollFinish);
            this.scene.setTimeout(1500, function () {
                // console.log("stepSkipMosaic: scoreValue:" + this.scoreValue + ".");
                _this.goNextQuestion();
            });
        }
    };
    /**
     * 次の問題に進めるメソッド
     */
    MosaicGame.prototype.goNextQuestion = function () {
        if (this.timeupped) {
            // 時間切れの場合
            this.inTimerPause = false;
            this.finishGame();
            return;
        }
        if (this.currentIndex === (this.quizData.length - 1)) {
            // 最後の問題だった場合
            if ((!commonParameterReader_1.CommonParameterReader.nicowari) && define_1.define.ENABLE_LOOP) {
                this.currentIndex = 0;
                this.questionNo += 1;
                this.currentQuestion = this.quizData[this.currentIndex].index;
                this.stateMachine.transition(this.initState);
            }
            else {
                this.inTimerPause = false;
                this.finishGame(true);
            }
        }
        else {
            // 最後の問題でない場合
            this.currentIndex += 1;
            this.questionNo += 1;
            this.currentQuestion = this.quizData[this.currentIndex].index;
            this.stateMachine.transition(this.initState);
        }
    };
    return MosaicGame;
}(gameBase_1.GameBase));
exports.MosaicGame = MosaicGame;
