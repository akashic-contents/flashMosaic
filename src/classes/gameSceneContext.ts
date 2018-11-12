import { spriteUtil } from "../util/spriteUtil";
import { define } from "./define";
import { AssetInfo } from "./assetInfo";
import { SpriteFrameMap } from "../util/spriteSheetTypes";
import { AssetInfoType } from "../commonTypes/assetInfoType";

/** スプライトシート情報の型 */
export interface SpriteSheetInfo {
	/** スプライトシートに対応するSpriteFrameMapオブジェクト */
	jsonSpriteFrameMap: SpriteFrameMap;
	/** スプライトシートに対応するSpriteParameterObjectオブジェクト */
	spriteParam: g.SpriteParameterObject;
}

/**
 * シーン内で参照される情報を保持するクラス
 */
export class GameSceneContext {
	/** メインUIスプライトシートの情報 */
	imgMain: SpriteSheetInfo;
	/** 正解・選択肢スプライトシートの情報 */
	imgQa: SpriteSheetInfo;
	/** 正解文字列画像フレーム名配列 */
	aryQaCorrect: string[];
	/** 正解画像アセット名配列 */
	aryAnswers: string[];

	/**
	 * AssetInfoとの紐付け
	 */
	constructor() {
		this.initArrayQaCorrect();
		this.initArrayAnswers();
	}

	/**
	 * メンバ変数を初期化するメソッド
	 */
	init(): void {
		this.imgMain = {
			jsonSpriteFrameMap: spriteUtil.createSpriteFrameMap(AssetInfo.mains),
			spriteParam: spriteUtil.createSpriteParameter(AssetInfo.mains)
		};
		this.imgQa = {
			jsonSpriteFrameMap: spriteUtil.createSpriteFrameMap(AssetInfo.qa),
			spriteParam: spriteUtil.createSpriteParameter(AssetInfo.qa)
		};
	}

	/**
	 * AssetInfo.qa.framesから「correct99」の形式で定義されている正解文字列画像のファイル名をリスト化する
	 */
	private initArrayQaCorrect(): void {
		this.aryQaCorrect = [];
		const wk: Object = AssetInfo.qa.frames;
		for (let row = 0; row < define.ALL_QUESTION_NUM; ++row) {
			const searchStr: string = "correct" + ("00" + (row + 1)).slice(-2);
			// console.log(searchStr);
			Object.keys(wk).filter((e) => {
				return (e.indexOf(searchStr) !== -1);
			}).forEach((val: string, i: number) => {
				const img: string = (<{ [key: string]: string }>wk)[val];
				// console.log(img);
				this.aryQaCorrect[row] = img;
			});
		}
	}

	/**
	 * AssetInfoから「answer99」の形式で定義されている正解画像のファイル名をリスト化する
	 */
	private initArrayAnswers(): void {
		this.aryAnswers = [];
		const wk: Object = AssetInfo;
		for (let row = 0; row < define.ALL_QUESTION_NUM; ++row) {
			const searchStr: string = "answer" + ("00" + (row + 1)).slice(-2);
			Object.keys(wk).filter((e) => {
				return (e.indexOf(searchStr) !== -1);
			}).forEach((val: string, i: number) => {
				const info = (<{ [key: string]: AssetInfoType }>wk)[val];
				// console.log(info.img);
				this.aryAnswers[row] = info.img;
			});
		}
	}
}
