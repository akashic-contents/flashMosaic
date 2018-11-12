"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ステート管理クラス
 */
var StateMachineClass = /** @class */ (function () {
    /**
     * シーンの参照と初期値設定
     * @param  {g.Scene} _owner シーン
     */
    function StateMachineClass(_owner) {
        this.owner = _owner;
        this.isActive = true;
        this.currentState = null;
        this.states = [];
    }
    /**
     * 強制的にステートなしの状態にするメソッド
     */
    StateMachineClass.prototype.resetState = function () {
        this.currentState = null;
    };
    /**
     * ステート滞在中の処理を呼ぶメソッド
     */
    StateMachineClass.prototype.onUpdate = function () {
        if (!this.isActive) {
            return; // 活動停止したら何もしない
        }
        if (this.currentState) {
            this.currentState.onStateStay.call(this.owner);
        }
    };
    /**
     * ステートを遷移させるメソッド
     * @param {StateBaseClass} _nextState 遷移先ステート
     */
    StateMachineClass.prototype.transition = function (_nextState) {
        if (!this.isActive) {
            return; // 活動停止したら何もしない
        }
        // exit
        if (this.currentState) {
            this.currentState.onStateExit.call(this.owner);
        }
        // current
        this.currentState = null;
        if (this.getIndex(_nextState) > -1) {
            this.currentState = _nextState;
        }
        // enter
        if (this.currentState) {
            this.currentState.onStateEnter.call(this.owner);
        }
    };
    /**
     * ステートに対応するステート配列でのインデックスを取得するメソッド
     * @param  {StateBaseClass} _s 処理対象ステート
     * @return {number}            インデックス番号（存在しない場合は-1）
     */
    StateMachineClass.prototype.getIndex = function (_s) {
        return this.states.indexOf(_s);
    };
    /**
     * 次のステートに遷移させるメソッド
     */
    StateMachineClass.prototype.goNextState = function () {
        var nextIndex = this.getIndex(this.currentState) + 1;
        var nextState = this.states[nextIndex];
        // 次ステートへ
        this.transition(nextState);
    };
    return StateMachineClass;
}());
exports.StateMachineClass = StateMachineClass;
