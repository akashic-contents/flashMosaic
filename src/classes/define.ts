/**
 * ゲーム関連の静的情報
 */
export namespace define {
	/** 制限時間[秒] */
	export const GAME_TIME = 30;
	/** このゲームが許容する最長の制限時間[秒] */
	export const GAME_TIME_MAX = 99;
	/** 残り時間警告が始まる残り時間[秒]（この時間未満になった時に始まる） */
	export const CAUTION_TIME_CONDITION = 6;
	/** 回答時間警告が始まる残り時間[秒]（この時間未満になった時に始まる） */
	export const CAUTION_ANSWER_TIME_CONDITION = 5;
	/** 演出中もタイマーを止めないフラグ */
	export const DISABLE_TIMER_PAUSE = true;

	/** 横解像度を480から640に変更した際のX座標オフセット値 */
	export const OFFSET_X = (640 - 480) / 2;
	/** ゲーム制限時間の数字の桁数 */
	export const GAME_TIMER_DIGIT = 2;
	/** ゲーム制限時間の数字のX座標 */
	export const GAME_TIMER_X = 67 + define.OFFSET_X;
	/** ゲーム制限時間の数字のY座標 */
	export const GAME_TIMER_Y = 3;
	/** ポイント用の数字の桁数 */
	export const GAME_SCORE_DIGIT = 5;
	/** ポイント用の数字のX座標 */
	export const GAME_SCORE_X = 404 + define.OFFSET_X;
	/** ポイント用の数字のY座標 */
	export const GAME_SCORE_Y = 5;
	/** ポイントアイコン用の数字の座標 */
	export const GAME_SCORE_ICON_POINT: g.CommonOffset = {
		x: 430 + define.OFFSET_X, y: 5
	};
	/** 回答時間の座標 */
	export const GAME_ANSWER_TIME_POINT: g.CommonOffset = {
		x: 100 + define.OFFSET_X, y: 2
	};

	/** UIアイコン（時計）のX座標 */
	export const ICON_T_X = 5 + define.OFFSET_X;
	/** UIアイコン（時計）のY座標 */
	export const ICON_T_Y = 0;

	/** 何問目からスタートかの指定 */
	export const START_QUESTION: number = 0;
	/** 時間切れまで問題をループさせるフラグ */
	export const ENABLE_LOOP: boolean = true;
	/** ポイントplusアニメが終わるまでのフレーム */
	export const PLUS_FRAME_LENGTH: number = 25;
	// 各問題制限時間
	export const SEC_QUESTION = 10.0;
	// 各問題制限時間フレーム
	export const START_FRAME_QUESTION = (SEC_QUESTION * g.game.fps);
	/** スコア 正解時 最高点 */
	export const GAME_COLLECT_SCORE_MAX = 1000;
	// 各問題の正解添え字
	export const RIGHT_ANSWER_INDEXES = [
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
	export const SCORE_LIMIT: number = Math.pow(10, GAME_SCORE_DIGIT) - 1;
	/** 全問題数 */
	export const ALL_QUESTION_NUM: number = 29;
	/** ボタンの数 */
	export const BUTTON_NUM: number = 3;
	/** ボタンの左端のX座標 */
	export const BUTTON_X: number = 132;
	/** ボタンの上端のY座標 */
	export const BUTTON_Y: number = 289;
	/** ボタンの幅 */
	export const BUTTON_W: number = 128;
	/** 背景フレームのY座標 */
	export const BG_FRAME_Y: number = 50;
	/** 正解の文字列画像座標 */
	export const CHAR_CORRECT_POS: g.CommonOffset = {
		x: 78 + OFFSET_X, y: 196
	};
	/** 「正解は」画像の座標 */
	export const CORRECT_IS_POS: g.CommonOffset = {
		x: 79 + OFFSET_X, y: 58
	};
	/** フレームのY座標 */
	export const FRAME_Y: number = 4.5;
	/** マルバツのY座標 */
	export const GOODBAD_Y: number = 153;
	/** タイムアップアニメのY座標 */
	export const JINGLE_TIMEUP_Y: number = 155;
	/** 第？問のY座標 */
	export const QUESTION_NO_Y: number = 114;
	/** モザイク画像のY座標 */
	export const MOSAIC_Y: number = 50;
	/** ゲージフィル画像の座標 */
	export const GAUGE_FILL_IMG_POS: g.CommonOffset = {
		x: 62, y: 12
	};
}
