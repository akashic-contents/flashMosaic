"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spriteUtil_1 = require("../util/spriteUtil");
var define_1 = require("./define");
var assetInfo_1 = require("./assetInfo");
/**
 * シーン内で参照される情報を保持するクラス
 */
var GameSceneContext = /** @class */ (function () {
    /**
     * AssetInfoとの紐付け
     */
    function GameSceneContext() {
        this.initArrayQaCorrect();
        this.initArrayAnswers();
    }
    /**
     * メンバ変数を初期化するメソッド
     */
    GameSceneContext.prototype.init = function () {
        this.imgMain = {
            jsonSpriteFrameMap: spriteUtil_1.spriteUtil.createSpriteFrameMap(assetInfo_1.AssetInfo.mains),
            spriteParam: spriteUtil_1.spriteUtil.createSpriteParameter(assetInfo_1.AssetInfo.mains)
        };
        this.imgQa = {
            jsonSpriteFrameMap: spriteUtil_1.spriteUtil.createSpriteFrameMap(assetInfo_1.AssetInfo.qa),
            spriteParam: spriteUtil_1.spriteUtil.createSpriteParameter(assetInfo_1.AssetInfo.qa)
        };
    };
    /**
     * AssetInfo.qa.framesから「correct99」の形式で定義されている正解文字列画像のファイル名をリスト化する
     */
    GameSceneContext.prototype.initArrayQaCorrect = function () {
        var _this = this;
        this.aryQaCorrect = [];
        var wk = assetInfo_1.AssetInfo.qa.frames;
        var _loop_1 = function (row) {
            var searchStr = "correct" + ("00" + (row + 1)).slice(-2);
            // console.log(searchStr);
            Object.keys(wk).filter(function (e) {
                return (e.indexOf(searchStr) !== -1);
            }).forEach(function (val, i) {
                var img = wk[val];
                // console.log(img);
                _this.aryQaCorrect[row] = img;
            });
        };
        for (var row = 0; row < define_1.define.ALL_QUESTION_NUM; ++row) {
            _loop_1(row);
        }
    };
    /**
     * AssetInfoから「answer99」の形式で定義されている正解画像のファイル名をリスト化する
     */
    GameSceneContext.prototype.initArrayAnswers = function () {
        var _this = this;
        this.aryAnswers = [];
        var wk = assetInfo_1.AssetInfo;
        var _loop_2 = function (row) {
            var searchStr = "answer" + ("00" + (row + 1)).slice(-2);
            Object.keys(wk).filter(function (e) {
                return (e.indexOf(searchStr) !== -1);
            }).forEach(function (val, i) {
                var info = wk[val];
                // console.log(info.img);
                _this.aryAnswers[row] = info.img;
            });
        };
        for (var row = 0; row < define_1.define.ALL_QUESTION_NUM; ++row) {
            _loop_2(row);
        }
    };
    return GameSceneContext;
}());
exports.GameSceneContext = GameSceneContext;
