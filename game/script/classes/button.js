"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spriteUtil_1 = require("../util/spriteUtil");
var assetInfo_1 = require("./assetInfo");
var define_1 = require("./define");
var gameParameterReader_1 = require("./gameParameterReader");
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
/** ボタン通常状態のスプライトシートフレーム名 */
var BUTTON_NORMAL = assetInfo_1.AssetInfo.mains.frames.btnNormal;
/** ボタン押下状態のスプライトシートフレーム名 */
var BUTTON_OFF = assetInfo_1.AssetInfo.mains.frames.btnOff;
/**
 * 回答ボタン管理クラス
 */
var Button = /** @class */ (function () {
    /**
     * AssetInfoとの紐付け、ボタンの作成
     * @param  {number}          _currentQuestion 初期表示に使用する問題番号
     * @param  {SpriteSheetInfo} _frame           ボタン画像を含むスプライトシートのSpriteSheetInfo
     * @param  {SpriteSheetInfo} _str             選択肢文字列画像を含むスプライトシートのSpriteSheetInfo
     */
    function Button(_currentQuestion, _frame, _str) {
        /** ボタンが押された際に発火するTrigger */
        this.onCollisionTrigger = new g.Trigger();
        /** ボタン */
        this.sprFrame = new Array(define_1.define.BUTTON_NUM);
        /** ボタン上に表示する文字 */
        this.sprStr = new Array(define_1.define.BUTTON_NUM);
        this.mapFrame = _frame;
        this.mapStr = _str;
        if (!commonParameterReader_1.CommonParameterReader.randomGenerator) {
            this.initButonImgList();
        }
        else {
            this.initButonImgListUseRandom();
        }
        // ボタン上に表示する文字配列定義 問題数×選択肢
        for (var i = 0; i < define_1.define.BUTTON_NUM; ++i) {
            this.sprFrame[i] = spriteUtil_1.spriteUtil.createFrameSprite(this.mapFrame.spriteParam, this.mapFrame.jsonSpriteFrameMap, BUTTON_NORMAL);
            this.sprFrame[i].moveTo(define_1.define.BUTTON_X + (i * define_1.define.BUTTON_W), define_1.define.BUTTON_Y);
            this.sprStr[i] = spriteUtil_1.spriteUtil.createFrameSprite(this.mapStr.spriteParam, this.mapStr.jsonSpriteFrameMap, this.imgList[_currentQuestion][i]);
            this.sprStr[i].hide();
        }
    }
    /**
     * ボタンを指定のレイヤーにappendするメソッド
     * @param {g.E} _parent ボタンを表示するレイヤー
     */
    Button.prototype.appendTo = function (_parent) {
        for (var i = 0; i < define_1.define.BUTTON_NUM; ++i) {
            _parent.append(this.sprFrame[i]);
            this.sprFrame[i].modified();
            _parent.append(this.sprStr[i]);
            this.sprStr[i].modified();
        }
    };
    /**
     * ボタンの表示状態を初期化するメソッド
     * @param {number} _currentQuestion 表示する問題番号
     */
    Button.prototype.initButtons = function (_currentQuestion) {
        for (var i = 0; i < define_1.define.BUTTON_NUM; ++i) {
            spriteUtil_1.spriteUtil.setSpriteFrame(this.mapFrame.jsonSpriteFrameMap, BUTTON_NORMAL, this.sprFrame[i]);
            var pos = {
                x: (this.sprFrame[i].x + (this.sprFrame[i].width / 2)),
                y: (this.sprFrame[i].y + (this.sprFrame[i].height / 2))
            };
            // 文字数によって中心がぶれるので毎回設定
            spriteUtil_1.spriteUtil.setSpriteFrame(this.mapStr.jsonSpriteFrameMap, this.imgList[_currentQuestion][i], this.sprStr[i]);
            this.sprStr[i].moveTo(pos.x - (this.sprStr[i].width / 2), pos.y - (this.sprStr[i].height / 2));
            this.sprStr[i].hide();
        }
    };
    /**
     * ボタン上の文字を表示するメソッド
     */
    Button.prototype.showButtonTexts = function () {
        for (var i = 0; i < define_1.define.BUTTON_NUM; ++i) {
            this.sprStr[i].show();
            this.sprStr[i].modified();
        }
    };
    /**
     * タッチ位置とボタンのあたり判定を行うメソッド
     * @param {g.CommonOffset} _pos タッチ位置
     */
    Button.prototype.onCollision = function (_pos) {
        var area = { x: _pos.x, y: _pos.y, width: 1, height: 1 };
        for (var i = 0; i < define_1.define.BUTTON_NUM; ++i) {
            if (g.Collision.intersectAreas(area, this.sprFrame[i])) {
                spriteUtil_1.spriteUtil.setSpriteFrame(this.mapFrame.jsonSpriteFrameMap, BUTTON_OFF, this.sprFrame[i]);
                this.onCollisionTrigger.fire(i);
            }
        }
    };
    /**
     * AssetInfo.qa.framesから「select9999」の形式で定義されている選択時文字列画像のファイル名をリスト化する
     */
    Button.prototype.initButonImgList = function () {
        var _this = this;
        this.imgList = [];
        var wk = assetInfo_1.AssetInfo.qa.frames;
        var _loop_1 = function (row) {
            this_1.imgList[row] = [];
            var searchStr = "select" + ("00" + (row + 1)).slice(-2);
            // console.log(searchStr);
            Object.keys(wk).filter(function (e) {
                return (e.indexOf(searchStr) !== -1);
            }).forEach(function (val, i) {
                var img = wk[val];
                // console.log(img);
                _this.imgList[row][i] = img;
            });
        };
        var this_1 = this;
        for (var row = 0; row < define_1.define.ALL_QUESTION_NUM; ++row) {
            _loop_1(row);
        }
    };
    /**
     * initButonImgList後の画像リストをランダム作成した正解位置をもとに入れ替える
     */
    Button.prototype.initButonImgListUseRandom = function () {
        this.initButonImgList();
        for (var row = 0; row < this.imgList.length; ++row) {
            var imgs = this.imgList[row];
            for (var i = 0; i < imgs.length; ++i) {
                if (i === define_1.define.RIGHT_ANSWER_INDEXES[row]) {
                    var wk = imgs[i];
                    imgs[i] = imgs[gameParameterReader_1.GameParameterReader.rightAnswerIndexes[row]];
                    imgs[gameParameterReader_1.GameParameterReader.rightAnswerIndexes[row]] = wk;
                }
            }
        }
    };
    return Button;
}());
exports.Button = Button;
