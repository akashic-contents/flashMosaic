import { gameUtil } from "../util/gameUtil";
import { spriteUtil } from "../util/spriteUtil";
import { entityUtil } from "../util/entityUtil";
import { asaEx } from "../util/asaEx";
import { AsaInfo } from "./asaInfo";
import { AssetInfo } from "./assetInfo";
import { GameSceneContext } from "./gameSceneContext";
import { Mosaic } from "./mosaic";
import { Score } from "./score";
import { Button } from "./button";
import { define } from "./define";

/**
 * 表示要素を管理するクラス
 */
export class GameSceneView extends g.E {

	/** モザイク画像管理クラスインスタンス */
	mosaic: Mosaic;
	/** スコア管理クラスのインスタンス */
	point: Score;

	/** ボタン管理クラスのインスタンス */
	private button: Button;
	/** 「正解は」画像 */
	private correctIs: g.Sprite;
	/** 正解文字列画像 */
	private charCorrect: g.Sprite;
	/** 正解画像 */
	private answer: g.Sprite;
	/** 「第～問」ラベル */
	private questLabel: g.Label;
	/** 「○」「×」アニメのActor */
	private goodBad: asaEx.Actor;
	/** 「時間切れ！」アニメのActor */
	private jingleTimeup: asaEx.Actor;
	/** 動的に初期化される定数的な情報を持つクラス */
	private context: GameSceneContext;
	/** 背景表示レイヤー */
	private layerBg: g.E;
	/** モザイク画像表示レイヤー */
	private layerMosaic: g.E;
	/** UI表示レイヤー */
	private layerUi: g.E;

	/**
	 * 継承元のコンストラクタをよび、インスタンスを参照する
	 * @param  {g.Scene}          _scene   シーン
	 * @param  {GameSceneContext} _context シーン内で参照される情報クラスインスタンス
	 */
	constructor(_scene: g.Scene, _context: GameSceneContext) {
		super({ scene: _scene });
		this.context = _context;
	}

	/**
	 * フレームから秒へ換算し小数部が一桁の固定小数点表現の文字列を返す
	 * @param  {number} _frame フレーム数
	 * @return {string}        秒数
	 */
	static frame2SecToFixOne(_frame: number): string {
		const orgSec = gameUtil.frame2Sec(_frame);
		return (Math.ceil(orgSec * 10) / 10).toFixed(1);
	}

	/**
	 * ラベルの右寄せ
	 * @param {g.Label}      _label  ラベル
	 * @param {g.BitmapFont} _font   フォント
	 * @param {number}       _maxlen 想定される最大幅
	 */
	static alignRightLabel(
		_label: g.Label, _font: g.BitmapFont, _maxlen: number): void {
		_label.x += _font.defaultGlyphWidth;  // 右端へ
		// ラベルを右寄せ
		_label.aligning(_maxlen * _font.defaultGlyphWidth, "right");
		_label.x -= (_maxlen * _font.defaultGlyphWidth);  // 位置調整
	}

	/**
	 * クイズ画面の初期表示を行うメソッド
	 * @param {number} _startFrameQuestion 初期表示に使用する回答時間
	 */
	prepaerQuiz(_startFrameQuestion: number): void {
		const scene = this.scene;
		const context = this.context;
		const imgMain = context.imgMain;
		const imgQa = context.imgQa;
		const DUMMY_CURRENT_QUESTION = 0;
		const CENTER = { x: scene.game.width / 2, y: scene.game.height / 2 };

		// console.log("prepaerQuiz: _startFrameQuestion:" + _startFrameQuestion + ".");
		this.clearForRetry();

		// layer
		const layerBg = this.layerBg = new g.E({ scene: scene });
		const layerMosaic = this.layerMosaic = new g.E({ scene: scene });
		const layerUi = this.layerUi = new g.E({ scene: scene });

		const button = this.button = new Button(
			DUMMY_CURRENT_QUESTION, imgMain, imgQa);

		const mosaic = this.mosaic = new Mosaic(scene, CENTER);
		mosaic.spr.hide();

		const answer = this.answer = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById(context.aryAnswers[DUMMY_CURRENT_QUESTION])
		});
		answer.moveTo(mosaic.spr.x, mosaic.spr.y);
		answer.hide();

		const bgFrame = spriteUtil.createFrameSprite(
			imgMain.spriteParam,
			imgMain.jsonSpriteFrameMap,
			AssetInfo.mains.frames.mainBg);
		bgFrame.moveTo(CENTER.x - (bgFrame.width / 2), define.BG_FRAME_Y);

		const charCorrect = this.charCorrect = spriteUtil.createFrameSprite(
			imgQa.spriteParam,
			imgQa.jsonSpriteFrameMap,
			context.aryQaCorrect[DUMMY_CURRENT_QUESTION]);
		charCorrect.moveTo(define.CHAR_CORRECT_POS);
		charCorrect.hide();

		const correctIs = this.correctIs = spriteUtil.createFrameSprite(
			imgMain.spriteParam,
			imgMain.jsonSpriteFrameMap,
			AssetInfo.mains.frames.correctIs);
		correctIs.moveTo(define.CORRECT_IS_POS);
		correctIs.hide();

		const frame = spriteUtil.createFrameSprite(
			imgMain.spriteParam,
			imgMain.jsonSpriteFrameMap,
			AssetInfo.mains.frames.mainFrame);
		frame.moveTo(CENTER.x - (frame.width / 2), define.FRAME_Y);

		const goodBad = this.goodBad = new asaEx.Actor(
			scene, AsaInfo.goodBad.pj, AsaInfo.goodBad.anim.good);
		goodBad.moveTo(CENTER.x, define.GOODBAD_Y);
		goodBad.hide();
		goodBad.onUpdate.add(spriteUtil.makeActorUpdater(goodBad), this);

		const jingleTimeup = this.jingleTimeup = new asaEx.Actor(
			scene, AsaInfo.jingle.pj, AsaInfo.jingle.anim.timeup);
		jingleTimeup.moveTo(CENTER.x, define.JINGLE_TIMEUP_Y);
		jingleTimeup.hide();
		jingleTimeup.onUpdate.add(spriteUtil.makeActorUpdater(jingleTimeup), this);

		this.point = new Score(100);

		const fontQuestion: g.BitmapFont = gameUtil.createNumFontWithAssetInfo(
			AssetInfo.numQuestion);
		const quest = this.questLabel = entityUtil.createNumLabel(
			scene, fontQuestion, 5);
		quest.textAlign = "center";
		quest.text = "第" + DUMMY_CURRENT_QUESTION + "問";
		quest.moveTo(CENTER.x - (quest.width / 2), define.QUESTION_NO_Y);
		quest.hide();

		// append
		entityUtil.appendEntity(bgFrame, layerBg);

		entityUtil.appendEntity(mosaic.spr, layerMosaic);
		entityUtil.appendEntity(answer, layerMosaic);
		entityUtil.appendEntity(goodBad, layerMosaic);
		entityUtil.appendEntity(jingleTimeup, layerMosaic);

		entityUtil.appendEntity(correctIs, layerUi);
		entityUtil.appendEntity(frame, layerUi);
		button.appendTo(layerUi); // ボタンの数だけappend
		entityUtil.appendEntity(charCorrect, layerUi);
		entityUtil.appendEntity(quest, layerUi);

		entityUtil.appendEntity(layerBg, this);
		entityUtil.appendEntity(layerMosaic, this);
		entityUtil.appendEntity(layerUi, this);
	}

	/**
	 * 指定された問題に表示を切り替えるメソッド
	 * @param {number} _currentQuestion 問題番号
	 * @param {number} _frameQuestion   回答時間
	 * @param {number} _mosaicLevel     モザイク段階
	 */
	setQuiz(
		_currentQuestion: number,
		_frameQuestion: number,
		_mosaicLevel: number
	): void {
		// console.log("setQuiz: _currentQuestion:" + _currentQuestion + ".");

		// ボタンリセット
		this.button.initButtons(_currentQuestion);

		this.mosaic.changeMosaicSprite(_currentQuestion);

		spriteUtil.setSpriteFrame(
			this.context.imgQa.jsonSpriteFrameMap,
			this.context.aryQaCorrect[_currentQuestion],
			this.charCorrect);

		this.mosaic.spr.hide();
		this.answer.hide();
		this.charCorrect.hide();
		this.correctIs.hide();
	}

	/**
	 * 「第～問」を表示するメソッド
	 * @param {number} _questionNo 現在何問目か
	 */
	showQuestionNumber(_questionNo: number): void {
		entityUtil.setLabelText(this.questLabel, "第" + _questionNo + "問");
		this.questLabel.show();
	}

	/**
	 * 「第～問」表示を終了するメソッド
	 */
	hideQuestionNumber(): void {
		this.questLabel.hide();
	}

	/**
	 * モザイク画像を表示し、回答受付を開始するメソッド
	 * @param {(index: number) => void} _onAnswer 回答ボタン押下時のハンドラ関数
	 */
	startQuiz(_onAnswer: (index: number) => void): void {
		entityUtil.showEntity(this.mosaic.spr);
		this.button.showButtonTexts();
		this.button.onCollisionTrigger.add((i: number) => {
			if (_onAnswer) {
				_onAnswer(i);
			}
			return true;
		}, this);
	}

	/**
	 * 回答ボタンのあたり判定処理を呼び出すメソッド
	 * @param {g.CommonOffset} _pos タッチ位置の座標
	 */
	checkTouchButtons(_pos: g.CommonOffset): void {
		this.button.onCollision(_pos);
	}
	/**
	 * 「○」「×」アニメを表示するメソッド
	 * @param {boolean}    _isGood        正解の場合はtrue
	 * @param {number}     _pointAdder    加算表示される得点
	 * @param {number}     _frameQuestion 残り回答時間
	 * @param {() => void} _onFinish      アニメ表示終了時のハンドラ関数
	 */
	showGoodBad(
		_isGood: boolean,
		_pointAdder: number,
		_frameQuestion: number,
		_onFinish: () => void
	): void {
		if (_isGood) {
			this.goodBad.play(
				AsaInfo.goodBad.anim.good, 0, false, 1.0);  // 正解
			this.point.stack += _pointAdder;
		} else {
			this.goodBad.play(
				AsaInfo.goodBad.anim.bad, 0, false, 1.0);  // 不正解
		}
		this.goodBad.show();

		this.goodBad.onUpdate.add((): boolean => {
			if (this.goodBad.currentFrame >=
				(this.goodBad.animation.frameCount - 1)) {
				this.goodBad.hide();
				if (_onFinish) {
					_onFinish();
					_onFinish = null;
				}
				return true;
			}
			return false;
		}, this);
	}

	/**
	 * 「時間切れ！」アニメの表示を開始するメソッド
	 * @param {() => void} _onFinish アニメ表示終了時のハンドラ関数
	 */
	showTimeupJingle(_onFinish: () => void): void {
		this.jingleTimeup.play(
			AsaInfo.jingle.anim.timeup, 0, false, 1.0);
		this.jingleTimeup.show();
		this.jingleTimeup.modified();
		this.jingleTimeup.ended.add((): boolean => {
			this.jingleTimeup.hide();
			if (_onFinish) {
				_onFinish();
				_onFinish = null;
			}
			return true;
		}, this);
	}

	/**
	 * 回答受付終了時の処理を行うメソッド
	 */
	finishQuiz(): void {
		this.button.onCollisionTrigger.removeAll({owner: this});
	}

	/**
	 * 「正解は」表示を開始するメソッド
	 * @param {number} _currentQuestion 問題番号
	 */
	setAnswer(_currentQuestion: number): void {
		this.correctIs.show();
		spriteUtil.changeSpriteSurface(
			this.answer,
			this.scene.asset.getImageById(this.context.aryAnswers[_currentQuestion]));
	}
	/**
	 * 正解表示を開始するメソッド
	 */
	showAnswer(): void {
		this.answer.show();
		this.charCorrect.show();
	}
	/**
	 * スコアを加算するメソッド
	 * @param {number} _pointAdder 一度に加算する値
	 */
	addPoint(_pointAdder: number): void {
		this.point.animePlusScore(_pointAdder);
	}

	/**
	 * 表示要素を消去するメソッド
	 */
	clearForRetry(): void {
		if (this.layerBg) {
			this.layerBg.destroy();
		}
		if (this.layerMosaic) {
			this.layerMosaic.destroy();
		}
		if (this.layerUi) {
			this.layerUi.destroy();
		}

		this.layerBg = undefined;
		this.layerMosaic = undefined;
		this.layerUi = undefined;
		this.button = undefined;
		this.correctIs = undefined;
		this.charCorrect = undefined;
		this.mosaic = undefined;
		this.answer = undefined;
		this.questLabel = undefined;
		this.goodBad = undefined;
		this.jingleTimeup = undefined;
		this.point = undefined;
	}
}
