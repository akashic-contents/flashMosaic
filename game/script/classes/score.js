"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * スコア管理クラス
 */
var Score = /** @class */ (function () {
    /**
     * 初期値設定
     * @param {number} _plus     加算演出用スコア加算値
     * @param {number} opt_score スコア初期値
     */
    function Score(_plus, opt_score) {
        /** スコア値 */
        this.score = 0;
        /** 加算演出用待機スコア値 */
        this.stack = 0;
        this.plus = _plus;
        if (opt_score) {
            this.score = opt_score;
        }
    }
    /**
     * スコアを一定量ずつ足すメソッド
     * @param {number} opt_plus スコア加算値
     */
    Score.prototype.animePlusScore = function (opt_plus) {
        var wkPlus = (opt_plus) ? opt_plus : this.plus;
        if (this.stack > 0 && this.stack >= wkPlus) {
            this.score += wkPlus;
            this.stack -= wkPlus;
        }
        else {
            this.score += this.stack;
            this.stack = 0;
        }
    };
    /**
     * 待機スコア値をすべてスコアに加算するメソッド
     */
    Score.prototype.mergeScore = function () {
        this.score += this.stack;
        this.stack = 0;
    };
    return Score;
}());
exports.Score = Score;
