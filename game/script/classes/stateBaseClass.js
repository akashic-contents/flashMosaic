"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * StateMachineClassが扱うステートのクラス
 */
var StateBaseClass = /** @class */ (function () {
    function StateBaseClass() {
        /** このステートに入ったときの処理ハンドラ */
        this.onStateEnter = function () {
            // NOP
        };
        /** このステートに滞在中のonUpdate時の処理ハンドラ */
        this.onStateStay = function () {
            // NOP
        };
        /** このステートからぬけるときの処理ハンドラ */
        this.onStateExit = function () {
            // NOP
        };
    }
    return StateBaseClass;
}());
exports.StateBaseClass = StateBaseClass;
