"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spriteUtil_1 = require("../util/spriteUtil");
var assetInfo_1 = require("./assetInfo");
var define_1 = require("./define");
/**
 * モザイク画像管理クラス
 */
var Mosaic = /** @class */ (function () {
    /**
     * シーンの参照、AssetInfoとの紐付け、スプライトの仮作成
     * @param  {g.Scene}        _scene  シーン
     * @param  {g.CommonOffset} _center 中心座標
     */
    function Mosaic(_scene, _center) {
        /** モザイク段階 */
        this.level = 0;
        this.scene = _scene;
        this.initMosaicImgList();
        this.spr = new g.Sprite({
            scene: _scene,
            src: _scene.assets[this.imgList[0][0]]
        });
        this.spr.moveTo(_center.x - (this.spr.width / 2), define_1.define.MOSAIC_Y);
    }
    /**
     * 現在のモザイク段階からまだ進められるか判定するメソッド
     * @param  {number}   _currentQuestion 問題番号
     * @return {boolean}                   進められるならtrue
     */
    Mosaic.prototype.checkLevel = function (_currentQuestion) {
        if (this.level < this.imgList[_currentQuestion].length - 1) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * モザイク画像を切り替えるメソッド
     * @param {number} _currentQuestion 問題番号
     */
    Mosaic.prototype.changeMosaicSprite = function (_currentQuestion) {
        spriteUtil_1.spriteUtil.changeSpriteSurface(this.spr, this.scene.assets[this.imgList[_currentQuestion][this.level]]);
    };
    /**
     * AssetInfoから「mosaic9999」の形式で定義されているモザイク画像のファイル名をリスト化する
     */
    Mosaic.prototype.initMosaicImgList = function () {
        var _this = this;
        this.imgList = [];
        var wk = assetInfo_1.AssetInfo;
        var _loop_1 = function (row) {
            this_1.imgList[row] = [];
            var searchStr = "mosaic" + ("00" + (row + 1)).slice(-2);
            Object.keys(wk).filter(function (e) {
                return (e.indexOf(searchStr) !== -1);
            }).forEach(function (val, i) {
                var info = wk[val];
                // console.log(info.img);
                _this.imgList[row][i] = info.img;
            });
        };
        var this_1 = this;
        for (var row = 0; row < define_1.define.ALL_QUESTION_NUM; ++row) {
            _loop_1(row);
        }
    };
    return Mosaic;
}());
exports.Mosaic = Mosaic;
