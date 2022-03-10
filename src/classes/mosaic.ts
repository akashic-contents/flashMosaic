import { spriteUtil } from "../util/spriteUtil";
import { AssetInfo } from "./assetInfo";
import { define } from "./define";
import { AssetInfoType } from "../commonTypes/assetInfoType";

/**
 * モザイク画像管理クラス
 */
export class Mosaic {
	/** モザイクスプライト */
	spr: g.Sprite;
	/** モザイク画像アセット名配列 */
	imgList: string[][];
	/** モザイク段階 */
	level: number = 0;

	/** シーン */
	private scene: g.Scene;

	/**
	 * シーンの参照、AssetInfoとの紐付け、スプライトの仮作成
	 * @param  {g.Scene}        _scene  シーン
	 * @param  {g.CommonOffset} _center 中心座標
	 */
	constructor(_scene: g.Scene, _center: g.CommonOffset) {
		this.scene = _scene;
		this.initMosaicImgList();
		this.spr = new g.Sprite({
			scene: _scene,
			src: _scene.asset.getImageById(this.imgList[0][0])
		});
		this.spr.moveTo(_center.x - (this.spr.width / 2), define.MOSAIC_Y);
	}

	/**
	 * 現在のモザイク段階からまだ進められるか判定するメソッド
	 * @param  {number}   _currentQuestion 問題番号
	 * @return {boolean}                   進められるならtrue
	 */
	checkLevel(_currentQuestion: number): boolean {
		if (this.level < this.imgList[_currentQuestion].length - 1) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * モザイク画像を切り替えるメソッド
	 * @param {number} _currentQuestion 問題番号
	 */
	changeMosaicSprite(_currentQuestion: number): void {
		spriteUtil.changeSpriteSurface(
			this.spr,
			this.scene.asset.getImageById(this.imgList[_currentQuestion][this.level]));
	}

	/**
	 * AssetInfoから「mosaic9999」の形式で定義されているモザイク画像のファイル名をリスト化する
	 */
	private initMosaicImgList(): void {
		this.imgList = [];
		const wk: Object = AssetInfo;
		for (let row = 0; row < define.ALL_QUESTION_NUM; ++row) {
			this.imgList[row] = [];
			const searchStr: string = "mosaic" + ("00" + (row + 1)).slice(-2);
			Object.keys(wk).filter((e) => {
				return (e.indexOf(searchStr) !== -1);
			}).forEach((val: string, i: number) => {
				const info = (<{ [key: string]: AssetInfoType }>wk)[val];
				// console.log(info.img);
				this.imgList[row][i] = info.img;
			});
		}
	}
}
