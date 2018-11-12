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
var entityUtil_1 = require("../util/entityUtil");
var gameUtil_1 = require("../util/gameUtil");
var spriteUtil_1 = require("../util/spriteUtil");
var assetInfo_1 = require("./assetInfo");
/**
 * 残り時間の管理、表示を行うクラス
 * 残り時間警告の演出も管理する。
 */
var TimerGauge = /** @class */ (function (_super) {
    __extends(TimerGauge, _super);
    /**
     * 継承元のコンストラクタをよび、ゲージスプライトを作成する
     * @param  {g.Scene} _scene シーン
     */
    function TimerGauge(_scene) {
        var _this = _super.call(this, { scene: _scene }) || this;
        _this.spoQuizUi = spriteUtil_1.spriteUtil.createSpriteParameter(assetInfo_1.AssetInfo.mains);
        _this.sfmQuizUi = spriteUtil_1.spriteUtil.createSpriteFrameMap(assetInfo_1.AssetInfo.mains);
        // 背面イメージ作成
        _this.bkImg = spriteUtil_1.spriteUtil.createFrameSprite(_this.spoQuizUi, _this.sfmQuizUi, assetInfo_1.AssetInfo.mains.frames.uiFasterGaugeBase);
        entityUtil_1.entityUtil.appendEntity(_this.bkImg, _this);
        // 画像フレーム名を定義
        _this.imgAryReset();
        // フィル画像作成
        _this.fillImg = spriteUtil_1.spriteUtil.createFrameSprite(_this.spoQuizUi, _this.sfmQuizUi, _this.imgAry[0]);
        _this.fillImg.moveTo(define_1.define.GAUGE_FILL_IMG_POS);
        entityUtil_1.entityUtil.appendEntity(_this.fillImg, _this);
        // 最初のsrcwidthを保存
        _this.fillSrcWidth = _this.fillImg.srcWidth;
        return _this;
    }
    /**
     * 表示系以外のオブジェクトをdestroyするメソッド
     * 表示系のオブジェクトはg.Eのdestroyに任せる。
     * @override
     */
    TimerGauge.prototype.destroy = function () {
        if (this.destroyed()) {
            return;
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * 現在の残り秒数を設定するメソッド
     * @param {number} _seconds 設定する値
     */
    TimerGauge.prototype.setTimeCount = function (_seconds) {
        this.setTimeFrameCount(gameUtil_1.gameUtil.sec2Frame(_seconds));
    };
    /**
     * 現在の残り秒数をフレーム数で設定するメソッド
     * @param {number} _frames 設定する値
     */
    TimerGauge.prototype.setTimeFrameCount = function (_frames) {
        this.remainFrameCount = _frames;
        this.totalFrameCount = _frames;
        // バーの表示を戻す
        this.fillReset();
    };
    /**
     * 現在の残り秒数を取得するメソッド（小数部は切り上げる）
     * @return {number} 秒数
     */
    TimerGauge.prototype.getTimeCount = function () {
        return Math.ceil(gameUtil_1.gameUtil.frame2Sec(this.remainFrameCount));
    };
    /**
     * 現在の残り秒数を取得するメソッド（小数部あり）
     * @return {number} 秒数
     */
    TimerGauge.prototype.getTimeCountReal = function () {
        return gameUtil_1.gameUtil.frame2Sec(this.remainFrameCount);
    };
    /**
     * 現在の残り秒数をフレーム数で取得するメソッド
     * @return {number} フレーム数
     */
    TimerGauge.prototype.getTimeFrameCount = function () {
        return this.remainFrameCount;
    };
    /**
     * 表示を開始するメソッド
     * ゲーム画面に遷移するワイプ演出で表示が始まる時点で呼ばれる。
     */
    TimerGauge.prototype.showContent = function () {
        // 塗りを戻す
        this.fillReset();
    };
    /**
     * 残り時間と指定した進行率をかけてゲージを減らすメソッド
     * @param {number} _progress 進行率（1になった時ゲージが0になる）
     */
    TimerGauge.prototype.discharge = function (_progress) {
        var num = Math.floor(this.remainFrameCount - (this.remainFrameCount * _progress));
        this.fillUpdate(num);
    };
    /**
     * 1フレーム分時間を進めるメソッド
     */
    TimerGauge.prototype.tick = function () {
        if (this.remainFrameCount > 0) {
            --this.remainFrameCount;
            // remainFrameCountの値が小数である場合を考慮した条件
            if (this.remainFrameCount < 0) {
                // 時間切れ
                // remainFrameCountの値が小数である場合を考慮した処理
                this.remainFrameCount = 0;
            }
            else if (this.getTimeCount() < define_1.define.CAUTION_ANSWER_TIME_CONDITION) {
                // 点滅
                if (!this.isBlink) {
                    this.startBlink(); // 点滅開始
                }
            }
            // バーの表示更新
            this.fillUpdate(this.remainFrameCount);
        }
    };
    /**
     * バーの表示状態を初期化するメソッド
     */
    TimerGauge.prototype.fillReset = function () {
        // 画像名再定義
        this.imgAryReset();
        // 塗りを通常に戻す
        spriteUtil_1.spriteUtil.setSpriteFrame(this.sfmQuizUi, this.imgAry[0], this.fillImg);
        // 点滅停止
        this.stopBlink();
    };
    /**
     * 残り時間時間に応じてバーの長さを更新するメソッド
     * @param {number} _frame 残り時間
     */
    TimerGauge.prototype.fillUpdate = function (_frame) {
        this.fillImg.srcWidth
            = this.fillSrcWidth * (_frame / this.totalFrameCount);
        this.fillImg.modified();
    };
    /**
     * 点滅を停止するメソッド
     */
    TimerGauge.prototype.stopBlink = function () {
        this.isBlink = false;
        // intervalIdがあれば停止
        if (this.intervalId) {
            this.scene.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    /**
     * 点滅を開始するメソッド
     */
    TimerGauge.prototype.startBlink = function () {
        var _this = this;
        this.isBlink = true;
        // スプライトを入れ替える
        this.changeSprite();
        this.intervalId = this.scene.setInterval(200, this, function () {
            _this.changeSprite();
        });
    };
    /**
     * バー画像を入れ替えるメソッド
     */
    TimerGauge.prototype.changeSprite = function () {
        this.imgAry.reverse();
        var w = this.fillImg.srcWidth;
        spriteUtil_1.spriteUtil.setSpriteFrame(this.sfmQuizUi, this.imgAry[0], this.fillImg);
        this.fillImg.srcWidth = w;
        this.fillImg.modified();
    };
    /**
     * バー画像のフレーム名配列を初期化するメソッド
     */
    TimerGauge.prototype.imgAryReset = function () {
        this.imgAry = [
            assetInfo_1.AssetInfo.mains.frames.uiFasterGauge01,
            assetInfo_1.AssetInfo.mains.frames.uiFasterGauge02
        ];
    };
    return TimerGauge;
}(g.E));
exports.TimerGauge = TimerGauge;
