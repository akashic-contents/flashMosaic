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
var gameUtil_1 = require("../util/gameUtil");
var spriteUtil_1 = require("../util/spriteUtil");
var entityUtil_1 = require("../util/entityUtil");
var asaEx_1 = require("../util/asaEx");
var asaInfo_1 = require("./asaInfo");
var assetInfo_1 = require("./assetInfo");
var mosaic_1 = require("./mosaic");
var score_1 = require("./score");
var button_1 = require("./button");
var define_1 = require("./define");
/**
 * 表示要素を管理するクラス
 */
var GameSceneView = /** @class */ (function (_super) {
    __extends(GameSceneView, _super);
    /**
     * 継承元のコンストラクタをよび、インスタンスを参照する
     * @param  {g.Scene}          _scene   シーン
     * @param  {GameSceneContext} _context シーン内で参照される情報クラスインスタンス
     */
    function GameSceneView(_scene, _context) {
        var _this = _super.call(this, { scene: _scene }) || this;
        _this.context = _context;
        return _this;
    }
    /**
     * フレームから秒へ換算し小数部が一桁の固定小数点表現の文字列を返す
     * @param  {number} _frame フレーム数
     * @return {string}        秒数
     */
    GameSceneView.frame2SecToFixOne = function (_frame) {
        var orgSec = gameUtil_1.gameUtil.frame2Sec(_frame);
        return (Math.ceil(orgSec * 10) / 10).toFixed(1);
    };
    /**
     * ラベルの右寄せ
     * @param {g.Label}      _label  ラベル
     * @param {g.BitmapFont} _font   フォント
     * @param {number}       _maxlen 想定される最大幅
     */
    GameSceneView.alignRightLabel = function (_label, _font, _maxlen) {
        _label.x += _font.defaultGlyphWidth; // 右端へ
        // ラベルを右寄せ
        _label.aligning(_maxlen * _font.defaultGlyphWidth, g.TextAlign.Right);
        _label.x -= (_maxlen * _font.defaultGlyphWidth); // 位置調整
    };
    /**
     * クイズ画面の初期表示を行うメソッド
     * @param {number} _startFrameQuestion 初期表示に使用する回答時間
     */
    GameSceneView.prototype.prepaerQuiz = function (_startFrameQuestion) {
        var scene = this.scene;
        var context = this.context;
        var imgMain = context.imgMain;
        var imgQa = context.imgQa;
        var DUMMY_CURRENT_QUESTION = 0;
        var CENTER = { x: scene.game.width / 2, y: scene.game.height / 2 };
        // console.log("prepaerQuiz: _startFrameQuestion:" + _startFrameQuestion + ".");
        this.clearForRetry();
        // layer
        var layerBg = this.layerBg = new g.E({ scene: scene });
        var layerMosaic = this.layerMosaic = new g.E({ scene: scene });
        var layerUi = this.layerUi = new g.E({ scene: scene });
        var button = this.button = new button_1.Button(DUMMY_CURRENT_QUESTION, imgMain, imgQa);
        var mosaic = this.mosaic = new mosaic_1.Mosaic(scene, CENTER);
        mosaic.spr.hide();
        var answer = this.answer = new g.Sprite({
            scene: scene,
            src: scene.assets[context.aryAnswers[DUMMY_CURRENT_QUESTION]]
        });
        answer.moveTo(mosaic.spr.x, mosaic.spr.y);
        answer.hide();
        var bgFrame = this.bgFrame = spriteUtil_1.spriteUtil.createFrameSprite(imgMain.spriteParam, imgMain.jsonSpriteFrameMap, assetInfo_1.AssetInfo.mains.frames.mainBg);
        bgFrame.moveTo(CENTER.x - (bgFrame.width / 2), define_1.define.BG_FRAME_Y);
        var charCorrect = this.charCorrect = spriteUtil_1.spriteUtil.createFrameSprite(imgQa.spriteParam, imgQa.jsonSpriteFrameMap, context.aryQaCorrect[DUMMY_CURRENT_QUESTION]);
        charCorrect.moveTo(define_1.define.CHAR_CORRECT_POS);
        charCorrect.hide();
        var correctIs = this.correctIs = spriteUtil_1.spriteUtil.createFrameSprite(imgMain.spriteParam, imgMain.jsonSpriteFrameMap, assetInfo_1.AssetInfo.mains.frames.correctIs);
        correctIs.moveTo(define_1.define.CORRECT_IS_POS);
        correctIs.hide();
        var frame = this.frame = spriteUtil_1.spriteUtil.createFrameSprite(imgMain.spriteParam, imgMain.jsonSpriteFrameMap, assetInfo_1.AssetInfo.mains.frames.mainFrame);
        frame.moveTo(CENTER.x - (frame.width / 2), define_1.define.FRAME_Y);
        var goodBad = this.goodBad = new asaEx_1.asaEx.Actor(scene, asaInfo_1.AsaInfo.goodBad.pj, asaInfo_1.AsaInfo.goodBad.anim.good);
        goodBad.moveTo(CENTER.x, define_1.define.GOODBAD_Y);
        goodBad.hide();
        goodBad.update.handle(this, spriteUtil_1.spriteUtil.makeActorUpdater(goodBad));
        var jingleTimeup = this.jingleTimeup = new asaEx_1.asaEx.Actor(scene, asaInfo_1.AsaInfo.jingle.pj, asaInfo_1.AsaInfo.jingle.anim.timeup);
        jingleTimeup.moveTo(CENTER.x, define_1.define.JINGLE_TIMEUP_Y);
        jingleTimeup.hide();
        jingleTimeup.update.handle(this, spriteUtil_1.spriteUtil.makeActorUpdater(jingleTimeup));
        this.point = new score_1.Score(100);
        var fontQuestion = gameUtil_1.gameUtil.createNumFontWithAssetInfo(assetInfo_1.AssetInfo.numQuestion);
        var quest = this.questLabel = entityUtil_1.entityUtil.createNumLabel(scene, fontQuestion, 5);
        quest.textAlign = g.TextAlign.Center;
        quest.text = "第" + DUMMY_CURRENT_QUESTION + "問";
        quest.moveTo(CENTER.x - (quest.width / 2), define_1.define.QUESTION_NO_Y);
        quest.hide();
        // append
        entityUtil_1.entityUtil.appendEntity(bgFrame, layerBg);
        entityUtil_1.entityUtil.appendEntity(mosaic.spr, layerMosaic);
        entityUtil_1.entityUtil.appendEntity(answer, layerMosaic);
        entityUtil_1.entityUtil.appendEntity(goodBad, layerMosaic);
        entityUtil_1.entityUtil.appendEntity(jingleTimeup, layerMosaic);
        entityUtil_1.entityUtil.appendEntity(correctIs, layerUi);
        entityUtil_1.entityUtil.appendEntity(frame, layerUi);
        button.appendTo(layerUi); // ボタンの数だけappend
        entityUtil_1.entityUtil.appendEntity(charCorrect, layerUi);
        entityUtil_1.entityUtil.appendEntity(quest, layerUi);
        entityUtil_1.entityUtil.appendEntity(layerBg, this);
        entityUtil_1.entityUtil.appendEntity(layerMosaic, this);
        entityUtil_1.entityUtil.appendEntity(layerUi, this);
    };
    /**
     * 指定された問題に表示を切り替えるメソッド
     * @param {number} _currentQuestion 問題番号
     * @param {number} _frameQuestion   回答時間
     * @param {number} _mosaicLevel     モザイク段階
     */
    GameSceneView.prototype.setQuiz = function (_currentQuestion, _frameQuestion, _mosaicLevel) {
        // console.log("setQuiz: _currentQuestion:" + _currentQuestion + ".");
        // ボタンリセット
        this.button.initButtons(_currentQuestion);
        this.mosaic.changeMosaicSprite(_currentQuestion);
        spriteUtil_1.spriteUtil.setSpriteFrame(this.context.imgQa.jsonSpriteFrameMap, this.context.aryQaCorrect[_currentQuestion], this.charCorrect);
        this.mosaic.spr.hide();
        this.answer.hide();
        this.charCorrect.hide();
        this.correctIs.hide();
    };
    /**
     * 「第～問」を表示するメソッド
     * @param {number} _questionNo 現在何問目か
     */
    GameSceneView.prototype.showQuestionNumber = function (_questionNo) {
        entityUtil_1.entityUtil.setLabelText(this.questLabel, "第" + _questionNo + "問");
        this.questLabel.show();
    };
    /**
     * 「第～問」表示を終了するメソッド
     */
    GameSceneView.prototype.hideQuestionNumber = function () {
        this.questLabel.hide();
    };
    /**
     * モザイク画像を表示し、回答受付を開始するメソッド
     * @param {(index: number) => void} _onAnswer 回答ボタン押下時のハンドラ関数
     */
    GameSceneView.prototype.startQuiz = function (_onAnswer) {
        entityUtil_1.entityUtil.showEntity(this.mosaic.spr);
        this.button.showButtonTexts();
        this.button.onCollisionTrigger.handle(this, function (i) {
            if (_onAnswer) {
                _onAnswer(i);
            }
            return true;
        });
    };
    /**
     * 回答ボタンのあたり判定処理を呼び出すメソッド
     * @param {g.CommonOffset} _pos タッチ位置の座標
     */
    GameSceneView.prototype.checkTouchButtons = function (_pos) {
        this.button.onCollision(_pos);
    };
    /**
     * 「○」「×」アニメを表示するメソッド
     * @param {boolean}    _isGood        正解の場合はtrue
     * @param {number}     _pointAdder    加算表示される得点
     * @param {number}     _frameQuestion 残り回答時間
     * @param {() => void} _onFinish      アニメ表示終了時のハンドラ関数
     */
    GameSceneView.prototype.showGoodBad = function (_isGood, _pointAdder, _frameQuestion, _onFinish) {
        var _this = this;
        if (_isGood) {
            this.goodBad.play(asaInfo_1.AsaInfo.goodBad.anim.good, 0, false, 1.0); // 正解
            this.point.stack += _pointAdder;
        }
        else {
            this.goodBad.play(asaInfo_1.AsaInfo.goodBad.anim.bad, 0, false, 1.0); // 不正解
        }
        this.goodBad.show();
        this.goodBad.update.handle(this, function () {
            if (_this.goodBad.currentFrame >=
                (_this.goodBad.animation.frameCount - 1)) {
                _this.goodBad.hide();
                if (_onFinish) {
                    _onFinish();
                    _onFinish = null;
                }
                return true;
            }
            return false;
        });
    };
    /**
     * 「時間切れ！」アニメの表示を開始するメソッド
     * @param {() => void} _onFinish アニメ表示終了時のハンドラ関数
     */
    GameSceneView.prototype.showTimeupJingle = function (_onFinish) {
        var _this = this;
        this.jingleTimeup.play(asaInfo_1.AsaInfo.jingle.anim.timeup, 0, false, 1.0);
        this.jingleTimeup.show();
        this.jingleTimeup.modified();
        this.jingleTimeup.ended.handle(this, function () {
            _this.jingleTimeup.hide();
            if (_onFinish) {
                _onFinish();
                _onFinish = null;
            }
            return true;
        });
    };
    /**
     * 回答受付終了時の処理を行うメソッド
     */
    GameSceneView.prototype.finishQuiz = function () {
        this.button.onCollisionTrigger.removeAll(this);
    };
    /**
     * 「正解は」表示を開始するメソッド
     * @param {number} _currentQuestion 問題番号
     */
    GameSceneView.prototype.setAnswer = function (_currentQuestion) {
        this.correctIs.show();
        spriteUtil_1.spriteUtil.changeSpriteSurface(this.answer, this.scene.assets[this.context.aryAnswers[_currentQuestion]]);
    };
    /**
     * 正解表示を開始するメソッド
     */
    GameSceneView.prototype.showAnswer = function () {
        this.answer.show();
        this.charCorrect.show();
    };
    /**
     * スコアを加算するメソッド
     * @param {number} _pointAdder 一度に加算する値
     */
    GameSceneView.prototype.addPoint = function (_pointAdder) {
        this.point.animePlusScore(_pointAdder);
    };
    /**
     * 表示要素を消去するメソッド
     */
    GameSceneView.prototype.clearForRetry = function () {
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
        this.bgFrame = undefined;
        this.frame = undefined;
        this.correctIs = undefined;
        this.charCorrect = undefined;
        this.mosaic = undefined;
        this.answer = undefined;
        this.questLabel = undefined;
        this.goodBad = undefined;
        this.jingleTimeup = undefined;
        this.point = undefined;
    };
    return GameSceneView;
}(g.E));
exports.GameSceneView = GameSceneView;
