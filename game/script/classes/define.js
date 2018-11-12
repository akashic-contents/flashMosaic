"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ゲーム関連の静的情報
 */
var define;
(function (define) {
    /** 制限時間[秒] */
    define.GAME_TIME = 30;
    /** このゲームが許容する最長の制限時間[秒] */
    define.GAME_TIME_MAX = 99;
    /** 残り時間警告が始まる残り時間[秒]（この時間未満になった時に始まる） */
    define.CAUTION_TIME_CONDITION = 6;
    /** 回答時間警告が始まる残り時間[秒]（この時間未満になった時に始まる） */
    define.CAUTION_ANSWER_TIME_CONDITION = 5;
    /** 演出中もタイマーを止めないフラグ */
    define.DISABLE_TIMER_PAUSE = true;
    /** 横解像度を480から640に変更した際のX座標オフセット値 */
    define.OFFSET_X = (640 - 480) / 2;
    /** ゲーム制限時間の数字の桁数 */
    define.GAME_TIMER_DIGIT = 2;
    /** ゲーム制限時間の数字のX座標 */
    define.GAME_TIMER_X = 67 + define.OFFSET_X;
    /** ゲーム制限時間の数字のY座標 */
    define.GAME_TIMER_Y = 3;
    /** ポイント用の数字の桁数 */
    define.GAME_SCORE_DIGIT = 5;
    /** ポイント用の数字のX座標 */
    define.GAME_SCORE_X = 404 + define.OFFSET_X;
    /** ポイント用の数字のY座標 */
    define.GAME_SCORE_Y = 5;
    /** ポイントアイコン用の数字の座標 */
    define.GAME_SCORE_ICON_POINT = {
        x: 430 + define.OFFSET_X, y: 5
    };
    /** 回答時間の座標 */
    define.GAME_ANSWER_TIME_POINT = {
        x: 100 + define.OFFSET_X, y: 2
    };
    /** UIアイコン（時計）のX座標 */
    define.ICON_T_X = 5 + define.OFFSET_X;
    /** UIアイコン（時計）のY座標 */
    define.ICON_T_Y = 0;
    /** 何問目からスタートかの指定 */
    define.START_QUESTION = 0;
    /** 時間切れまで問題をループさせるフラグ */
    define.ENABLE_LOOP = true;
    /** ポイントplusアニメが終わるまでのフレーム */
    define.PLUS_FRAME_LENGTH = 25;
    // 各問題制限時間
    define.SEC_QUESTION = 10.0;
    // 各問題制限時間フレーム
    define.START_FRAME_QUESTION = (define.SEC_QUESTION * g.game.fps);
    /** スコア 正解時 最高点 */
    define.GAME_COLLECT_SCORE_MAX = 1000;
    // 各問題の正解添え字
    define.RIGHT_ANSWER_INDEXES = [
        2,
        1,
        2,
        1,
        0,
        0,
        0,
        1,
        2,
        0,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        0,
        2,
        1,
        1,
        0,
        2,
        1,
        2,
        0,
        0,
        1,
        1
    ];
    /** スコア上限 */
    define.SCORE_LIMIT = Math.pow(10, define.GAME_SCORE_DIGIT) - 1;
    /** 全問題数 */
    define.ALL_QUESTION_NUM = 29;
    /** ボタンの数 */
    define.BUTTON_NUM = 3;
    /** ボタンの左端のX座標 */
    define.BUTTON_X = 132;
    /** ボタンの上端のY座標 */
    define.BUTTON_Y = 289;
    /** ボタンの幅 */
    define.BUTTON_W = 128;
    /** 背景フレームのY座標 */
    define.BG_FRAME_Y = 50;
    /** 正解の文字列画像座標 */
    define.CHAR_CORRECT_POS = {
        x: 78 + define.OFFSET_X, y: 196
    };
    /** 「正解は」画像の座標 */
    define.CORRECT_IS_POS = {
        x: 79 + define.OFFSET_X, y: 58
    };
    /** フレームのY座標 */
    define.FRAME_Y = 4.5;
    /** マルバツのY座標 */
    define.GOODBAD_Y = 153;
    /** タイムアップアニメのY座標 */
    define.JINGLE_TIMEUP_Y = 155;
    /** 第？問のY座標 */
    define.QUESTION_NO_Y = 114;
    /** モザイク画像のY座標 */
    define.MOSAIC_Y = 50;
    /** ゲージフィル画像の座標 */
    define.GAUGE_FILL_IMG_POS = {
        x: 62, y: 12
    };
})(define = exports.define || (exports.define = {}));
