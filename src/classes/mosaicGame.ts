import { define } from "./define";
import { AssetInfo } from "./assetInfo";
import { SoundInfo } from "./soundInfo";
import { entityUtil } from "../util/entityUtil";
import { spriteUtil } from "../util/spriteUtil";
import { gameUtil } from "../util/gameUtil";
import { audioUtil } from "../util/audioUtil";
import { TimerLabel } from "./timerLabel";
import { GameSceneContext } from "./gameSceneContext";
import { GameSceneView } from "./gameSceneView";
import { StateBaseClass } from "./stateBaseClass";
import { StateMachineClass } from "./stateMachineClass";
import { Mosaic } from "./mosaic";
import { GameParameterReader } from "./gameParameterReader";
import { QuizDataType } from "./quizDataType";
import { TimerGauge } from "./timerGauge";
import { GameBase } from "../commonNicowariGame/gameBase";
import { CommonParameterReader } from "../commonNicowariGame/commonParameterReader";

/**
 * ゲームの実体を実装するクラス
 */
export class MosaicGame extends GameBase {
	/** ゲーム中フラグ */
	private inGame: boolean;
	/** タイマー停止フラグ */
	private inTimerPause: boolean;
	/** timeupフラグ */
	private timeupped: boolean;

	/** スコア値 */
	private scoreValue: number;
	/** 残り時間表示ラベル */
	private timerLabel: TimerLabel;
	/** スコア表示ラベル */
	private scoreLabel: g.Label;
	/** 残り時間ゲージ */
	private timerGauge: TimerGauge;

	/** ステートマシン */
	private stateMachine: StateMachineClass;
	/** ステート：表示要素の生成 */
	private createState: StateBaseClass;
	/** ステート：問題ごとの状態初期化 */
	private initState: StateBaseClass;
	/** ステート：「第～問」表示 */
	private questState: StateBaseClass;
	/** ステート：回答受付 */
	private playState: StateBaseClass;
	/** ステート：回答結果表示 */
	private answerState: StateBaseClass;

	/** シーン内で参照される情報を保持するクラスのインスタンス */
	private sceneContext: GameSceneContext;
	/** 表示要素を管理するクラスのインスタンス */
	private view: GameSceneView;

	/** クイズデータ */
	private quizData: QuizDataType[];
	/** クイズデータの何問目か */
	private currentIndex: number;

	/** 表示・演出用カウンタ */
	private cnt: number = 0;
	/** 残り回答時間 */
	private frameQuestion: number = define.START_FRAME_QUESTION;
	/** 出題中の問題番号 */
	private currentQuestion: number = define.START_QUESTION;
	/** スコア加算幅 */
	private plusQuestion: number = 0;  // 各問題のポイント足し幅
	/** スコア加算幅に対応する残り時間減算幅 */
	private plusFrame: number = 0;
	/** 残りスコア加算 */
	private plusLeft: number = 0;
	/** 正解時点のframeQuestionの値 */
	private dischargeFrame: number = 0;

	/** 回答ボタンを押したらtrueになるフラグ */
	private flgAnswer: boolean = false;
	/** モザイク早送りが終わったらtrueになるフラグ */
	private flgSkipMosaic: boolean = false;
	/** 回答時間切れになったらtrueになるフラグ */
	private flgTimeup: boolean = false;

	/** 第？問表示用番号 */
	private questionNo: number = define.START_QUESTION;
	/** モザイク */
	private mosaic: Mosaic;

	/**
	 * 継承元のコンストラクタをよぶ
	 * @param  {g.Scene} _scene シーン
	 */
	constructor(_scene: g.Scene) {
		super(_scene);
	}

	/**
	 * このクラスで使用するオブジェクトを生成するメソッド
	 * Scene#loadedを起点とする処理からコンストラクタの直後に呼ばれる。
	 * このクラスはゲーム画面終了時も破棄されず、次のゲームで再利用される。
	 * そのためゲーム状態の初期化はinitではなくshowContentで行う必要がある。
	 * @override
	 */
	init(): void {
		super.init();

		// クイズデータ生成
		GameParameterReader.read(this.scene);
		this.quizData = GameParameterReader.quizData;
		this.currentIndex = 0;
		this.questionNo = 0;

		const scene = this.scene;
		const spoMain = spriteUtil.createSpriteParameter(AssetInfo.mains);
		const sfmMain = spriteUtil.createSpriteFrameMap(AssetInfo.mains);

		this.sceneContext = new GameSceneContext();
		this.sceneContext.init();

		this.view = new GameSceneView(scene, this.sceneContext);
		entityUtil.appendEntity(this.view, this);

		const iconT = spriteUtil.createFrameSprite(
			spoMain, sfmMain, AssetInfo.mains.frames.iconClock);
		iconT.moveTo(define.ICON_T_X, define.ICON_T_Y);
		entityUtil.appendEntity(iconT, this);

		const timer = this.timerLabel = new TimerLabel(scene);
		timer.createLabel(AssetInfo.numBlack, AssetInfo.numRed);
		timer.moveLabelTo(define.GAME_TIMER_X, define.GAME_TIMER_Y);
		entityUtil.appendEntity(timer, this);

		const fontBlack = gameUtil.createNumFontWithAssetInfo(
			AssetInfo.numBlack);

		const score = this.scoreLabel = entityUtil.createNumLabel(
			scene, fontBlack, define.GAME_SCORE_DIGIT);
		entityUtil.moveNumLabelTo(
			score, define.GAME_SCORE_X, define.GAME_SCORE_Y);
		entityUtil.appendEntity(score, this);

		const scoreIcon = spriteUtil.createFrameSprite(
			spoMain, sfmMain, AssetInfo.mains.frames.iconPt);
		scoreIcon.moveTo(
			define.GAME_SCORE_ICON_POINT.x, define.GAME_SCORE_ICON_POINT.y);
		entityUtil.appendEntity(scoreIcon, this);

		// タイマーゲージ作成
		this.timerGauge = new TimerGauge(scene);
		entityUtil.setXY(
			this.timerGauge,
			define.GAME_ANSWER_TIME_POINT.x, define.GAME_ANSWER_TIME_POINT.y);
		entityUtil.appendEntity(this.timerGauge, this);

		this.stateMachine = new StateMachineClass(scene);
		this.createState = new StateBaseClass();
		this.initState = new StateBaseClass();
		this.questState = new StateBaseClass();
		this.playState = new StateBaseClass();
		this.answerState = new StateBaseClass();
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
	}

	/**
	 * 表示系以外のオブジェクトをdestroyするメソッド
	 * 表示系のオブジェクトはg.Eのdestroyに任せる。
	 * @override
	 */
	destroy(): void {
		super.destroy();
	}

	/**
	 * タイトル画面のBGMのアセット名を返すメソッド
	 * 共通フロー側でBGMを鳴らさない場合は実装クラスでオーバーライドして
	 * 空文字列を返すようにする
	 * @return {string} アセット名
	 * @override
	 */
	getTitleBgmName(): string {
		return SoundInfo.bgmSet.title;
	}

	/**
	 * ゲーム中のBGMのアセット名を返すメソッド
	 * 共通フロー側でBGMを鳴らさない場合は実装クラスでオーバーライドして
	 * 空文字列を返すようにする
	 * @return {string} アセット名
	 * @override
	 */
	getMainBgmName(): string {
		return "";
	}

	/**
	 * 表示を開始するメソッド
	 * ゲーム画面に遷移するワイプ演出で表示が始まる時点で呼ばれる。
	 * @override
	 */
	showContent(): void {
		this.inGame = false;
		this.inTimerPause = true;
		this.timeupped = false;

		this.currentIndex = define.START_QUESTION;
		this.currentQuestion = this.quizData[this.currentIndex].index;
		this.questionNo = 1;

		// 最初のステートへ
		this.stateMachine.resetState();
		this.stateMachine.transition(this.createState);

		this.scoreValue = 0;
		entityUtil.setLabelText(this.scoreLabel, String(this.scoreValue));
		gameUtil.updateGameStateScore(this.scoreValue);
		let timeLimit = define.GAME_TIME;
		if (CommonParameterReader.useGameTimeLimit) {
			timeLimit = CommonParameterReader.gameTimeLimit;
			if (timeLimit > define.GAME_TIME_MAX) {
				timeLimit = define.GAME_TIME_MAX;
			}
		} else if (CommonParameterReader.useGameTimeMax) {
			timeLimit = define.GAME_TIME_MAX;
		}
		this.timerLabel.setTimeCount(timeLimit);
		this.timerLabel.timeCaution.handle(this, this.onTimeCaution);
		this.timerLabel.timeCautionCancel.handle(
			this, this.onTimeCautionCancel);

		// 回答時間ゲージ表示
		this.timerGauge.showContent();

		super.showContent();
	}

	/**
	 * ゲームを開始するメソッド
	 * ReadyGo演出が完了した時点で呼ばれる。
	 * @override
	 */
	startGame(): void {
		this.inGame = true;
		this.stateMachine.transition(this.initState);
	}

	/**
	 * 表示を終了するメソッド
	 * このサブシーンから遷移するワイプ演出で表示が終わる時点で呼ばれる。
	 * @override
	 */
	hideContent(): void {
		this.stateMachine.resetState();
		this.view.clearForRetry();

		this.timerLabel.timeCaution.removeAll(this);
		this.timerLabel.timeCautionCancel.removeAll(this);
		super.hideContent();
	}

	/**
	 * Scene#updateを起点とする処理から呼ばれるメソッド
	 * ゲーム画面でない期間には呼ばれない。
	 * @override
	 */
	onUpdate(): void {
		if (this.inGame) {
			this.stateMachine.onUpdate();
			if (!this.inTimerPause || define.DISABLE_TIMER_PAUSE) {
				this.timerLabel.tick();
				if (this.timerLabel.getTimeCount() === 0) {
					this.finishGame();
				}
			}
		}
	}

	/**
	 * TimerLabel#timeCautionのハンドラ
	 */
	private onTimeCaution(): void {
		this.timeCaution.fire();
	}

	/**
	 * TimerLabel#timeCautionCancelのハンドラ
	 */
	private onTimeCautionCancel(): void {
		this.timeCautionCancel.fire();
	}

	/**
	 * ゲームを終了するメソッド
	 * gameUtil.setGameScoreしたスコアが結果画面で表示される。
	 * @param {boolean = false} opt_isLifeZero
	 * (optional)ライフ消滅によるゲーム終了の場合はtrue
	 */
	private finishGame(opt_isLifeZero: boolean = false): void {
		if (this.inTimerPause) {
			this.timeupped = true;
			return;
		}
		audioUtil.play(SoundInfo.seSet.end);
		this.inGame = false;
		this.scene.pointDownCapture.removeAll(this);
		audioUtil.stop(SoundInfo.bgmSet.thinkingTime);
		gameUtil.setGameScore(this.scoreValue);
		// 呼び出すトリガーによって共通フローのジングルアニメが変化する
		if (opt_isLifeZero) {
			this.gameOver.fire();
			this.timerLabel.forceStopBlink();
		} else {
			this.timeup.fire();
		}
	}

	/**
	 * 各ステートのハンドラ関数を設定するメソッド
	 */
	private initStateFunction(): void {
		this.createState.onStateEnter = (): void => {
			// console.log("createState.onStateEnter.");
			this.enterCreate();
		};
		this.initState.onStateEnter = (): void => {
			// console.log("initState.onStateEnter.");
			this.enterInit();
		};
		this.questState.onStateEnter = (): void => {
			// console.log("questState.onStateEnter.");
			this.enterQuest();
		};
		this.questState.onStateExit = (): void => {
			// console.log("questState.onStateExit.");
			this.exitQuest();
		};
		this.playState.onStateEnter = (): void => {
			// console.log("playState.onStateEnter.");
			this.enterPlay();
		};
		this.playState.onStateStay = (): void => {
			// console.log("playState.onStateStay.");
			this.stayPlay();
		};
		this.playState.onStateExit = (): void => {
			// console.log("playState.onStateExit.");
			this.exitPlay();
		};
		this.answerState.onStateEnter = (): void => {
			// console.log("answerState.onStateEnter.");
			this.enterAnswer();
		};
		this.answerState.onStateStay = (): void => {
			// console.log("answerState.onStateStay.");
			this.stayAnswer();
		};
	}

	/**
	 * 表示要素の生成ステート開始時に呼ばれるメソッド
	 */
	private enterCreate(): void {
		this.view.prepaerQuiz(gameUtil.sec2Frame(this.quizData[this.currentIndex].timeLimit));
		this.mosaic = this.view.mosaic;
	}

	/**
	 * 問題ごとの状態初期化ステート開始時に呼ばれるメソッド
	 */
	private enterInit(): void {
		this.cnt = 0;
		this.mosaic.level = 0;
		this.flgAnswer = false;
		this.flgSkipMosaic = false;
		this.flgTimeup = false;
		this.frameQuestion = gameUtil.sec2Frame(
			this.quizData[this.currentIndex].timeLimit);
		this.timerGauge.setTimeCount(this.quizData[this.currentIndex].timeLimit);
		this.plusQuestion = 0;
		this.plusFrame = 0;
		this.plusLeft = 0;

		this.view.setQuiz(this.currentQuestion, this.frameQuestion, this.mosaic.level);
		this.stateMachine.transition(this.questState);
	}

	/**
	 * 「第～問」表示ステート開始時に呼ばれるメソッド
	 */
	private enterQuest(): void {
		audioUtil.play(SoundInfo.seSet.question);
		this.view.showQuestionNumber(this.questionNo);

		this.scene.setTimeout(1000, (): void => {
			this.stateMachine.transition(this.playState);
		});
	}
	/**
	 * 「第～問」表示ステート終了時に呼ばれるメソッド
	 */
	private exitQuest(): void {
		this.view.hideQuestionNumber();
	}

	/**
	 * 回答受付ステート開始時に呼ばれるメソッド
	 */
	private enterPlay(): void {
		audioUtil.play(SoundInfo.bgmSet.thinkingTime);
		this.view.startQuiz((index: number): void => {
			this.onAnswer(index);
		});
		// 回答ボタンクリック
		this.scene.pointDownCapture.handle(this, this.handlePlayStatePointDown);
		this.inTimerPause = false;
	}
	/**
	 * タッチ開始時のハンドラ関数
	 * @param  {g.PointDownEvent} _e タッチ開始イベントオブジェクト
	 * @return {boolean}             回答ボタンを押した場合はtrue
	 */
	private handlePlayStatePointDown(_e: g.PointDownEvent): boolean {
		if (!this.flgTimeup) { // タイムアップ前
			this.view.checkTouchButtons(_e.point); // 衝突判定
		}
		return this.flgAnswer; // ボタンを押したときのみtrueになっている
	}
	/**
	 * 回答ボタン押下時のハンドラ関数
	 * @param {number} _index 回答ボタン番号
	 */
	private onAnswer(_index: number): void {
		// ボタンが押されたら
		this.flgAnswer = true;
		audioUtil.stop(SoundInfo.bgmSet.thinkingTime);
		this.inTimerPause = true;

		let isGood: boolean = false;
		let pointAdder: number = 0;
		// アンサーチェック
		if (_index === GameParameterReader.rightAnswerIndexes[this.currentQuestion]) {
			audioUtil.play(SoundInfo.seSet.answer2);
			isGood = true;
			pointAdder = this.calcPointAdder();
			this.plusQuestion = Math.ceil(
				pointAdder / define.PLUS_FRAME_LENGTH);  // 足し幅
			this.plusFrame = Math.ceil(
				this.frameQuestion / define.PLUS_FRAME_LENGTH);  // 引き幅
			this.plusLeft = pointAdder;
			this.dischargeFrame = this.frameQuestion;
			// console.log("onAnswer: plusQuestion:" + this.plusQuestion + ", PLUS_FRAME_LENGTH:" + define.PLUS_FRAME_LENGTH + ".");
			// console.log("onAnswer: plusFrame:" + this.plusFrame);
		} else {
			audioUtil.play(SoundInfo.seSet.badAnswer2);
		}
		this.view.showGoodBad(
			isGood, pointAdder, this.frameQuestion, (): void => {
				this.stateMachine.transition(this.answerState);
			});
	}
	/**
	 * 正解時の獲得スコアを計算するメソッド
	 * @return {number} 残り回答時間に対応するスコア
	 */
	private calcPointAdder(): number {
		const quizData = this.quizData[this.currentIndex];
		const remainSec
			= Number(GameSceneView.frame2SecToFixOne(this.frameQuestion));
		// console.log("calcPointAdder: remainSec:" + remainSec + ", frameQuestion:" + this.frameQuestion + ".");
		const remainRate = remainSec / quizData.timeLimit;
		// console.log("calcPointAdder: remainRate:" + remainRate + ", timeLimit:" + quizData.timeLimit + ".");
		// console.log("calcPointAdder: return:" + Math.ceil(remainRate * quizData.timeScore) + ", timeScore:" + quizData.timeScore + ".");
		return Math.ceil(remainRate * quizData.timeScore);
	}
	/**
	 * 回答受付ステート滞在中のonUpdateで呼ばれるメソッド
	 */
	private stayPlay(): void {
		++this.cnt;
		if (!this.flgAnswer && !this.flgTimeup) {  // 回答前 時間切れ前
			--this.frameQuestion;
			this.timerGauge.tick();

			// 定期的モザイク薄め
			const interval = (1 * this.scene.game.fps / define.SEC_QUESTION
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
			audioUtil.stop(SoundInfo.bgmSet.thinkingTime);
			audioUtil.play(SoundInfo.seSet.timeUp);
			this.flgTimeup = true;
			this.inTimerPause = true;
			this.view.showTimeupJingle((): void => {
				this.stateMachine.transition(this.answerState);
			});
		}
	}
	/**
	 * 回答受付ステート終了時に呼ばれるメソッド
	 */
	private exitPlay(): void {
		this.view.finishQuiz();
		this.scene.pointDownCapture.removeAll(this);
	}

	/**
	 * 回答結果表示ステート開始時に呼ばれるメソッド
	 */
	private enterAnswer(): void {
		this.view.setAnswer(this.currentQuestion);
		audioUtil.play(SoundInfo.seSet.drumRoll);
	}
	/**
	 * 回答結果表示ステート滞在中のonUpdateで呼ばれるメソッド
	 */
	private stayAnswer(): void {
		if (!this.flgSkipMosaic) {
			++this.cnt;
			if (this.cnt % 3 === 0) {  // 3フレームごと
				this.stepSkipMosaic();
			}
		}

		if (this.flgSkipMosaic && (this.plusFrame > 0)) {
			// モザイク段階を進め終わっていて正解している場合
			if (this.frameQuestion > this.plusFrame) {
				// 設定した足し幅で減算する
				this.frameQuestion -= this.plusFrame;
				if (!audioUtil.isPlaying(SoundInfo.seSet.rollCount2)) {
					audioUtil.play(SoundInfo.seSet.rollCount2);
				}
			} else {
				this.frameQuestion = 0;
				audioUtil.stop(SoundInfo.seSet.rollCount2);
			}
			if (this.plusLeft > 0) {
				const plus = (this.plusLeft >= this.plusQuestion) ? this.plusQuestion : this.plusLeft;
				this.view.addPoint(plus);
				this.plusLeft -= plus;
			}
			const progress
				= 1 - (this.frameQuestion / this.dischargeFrame);
			this.timerGauge.discharge(progress);
		}

		this.scoreValue = this.view.point.score;
		if (this.scoreValue > define.SCORE_LIMIT) {
			this.scoreValue = define.SCORE_LIMIT;
		}
		entityUtil.setLabelText(this.scoreLabel, String(this.scoreValue));
		gameUtil.updateGameStateScore(this.scoreValue);
	}
	/**
	 * モザイク段階を進めるメソッド
	 */
	private stepSkipMosaic(): void {
		if (this.mosaic.checkLevel(this.currentQuestion)) {
			// モザイク段階を進められる場合
			this.mosaic.level += 1;
			this.mosaic.changeMosaicSprite(this.currentQuestion);
		} else {
			// モザイク段階を進め終わった場合
			this.flgSkipMosaic = true;
			audioUtil.stop(SoundInfo.seSet.drumRoll);
			this.view.showAnswer();
			audioUtil.play(SoundInfo.seSet.drumRollFinish);
			this.scene.setTimeout(1500, (): void => {
				// console.log("stepSkipMosaic: scoreValue:" + this.scoreValue + ".");
				this.goNextQuestion();
			});
		}
	}
	/**
	 * 次の問題に進めるメソッド
	 */
	private goNextQuestion(): void {
		if (this.timeupped) {
			// 時間切れの場合
			this.inTimerPause = false;
			this.finishGame();
			return;
		}
		if (this.currentIndex === (this.quizData.length - 1)) {
			// 最後の問題だった場合
			if ((!CommonParameterReader.nicowari) && define.ENABLE_LOOP) {
				this.currentIndex = 0;
				this.questionNo += 1;
				this.currentQuestion = this.quizData[this.currentIndex].index;
				this.stateMachine.transition(this.initState);
			} else {
				this.inTimerPause = false;
				this.finishGame(true);
			}
		} else {
			// 最後の問題でない場合
			this.currentIndex += 1;
			this.questionNo += 1;

			this.currentQuestion = this.quizData[this.currentIndex].index;
			this.stateMachine.transition(this.initState);
		}
	}
}
