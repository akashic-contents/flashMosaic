import { spriteUtil } from "../util/spriteUtil";
import { AssetInfo } from "./assetInfo";
import { define } from "./define";
import { SpriteSheetInfo } from "./gameSceneContext";
import { GameParameterReader } from "./gameParameterReader";
import { CommonParameterReader } from "../commonNicowariGame/commonParameterReader";

/** ボタン通常状態のスプライトシートフレーム名 */
const BUTTON_NORMAL: string = AssetInfo.mains.frames.btnNormal;
/** ボタン押下状態のスプライトシートフレーム名 */
const BUTTON_OFF: string = AssetInfo.mains.frames.btnOff;

/**
 * 回答ボタン管理クラス
 */
export class Button {
	/** ボタンが押された際に発火するTrigger */
	onCollisionTrigger: g.Trigger<number> = new g.Trigger<number>();
	/** ボタン上に表示する文字のasset情報(問題数×選択肢) */
	imgList: string[][];

	/** ボタン */
	private sprFrame: g.Sprite[] = new Array(define.BUTTON_NUM);
	/** ボタン上に表示する文字 */
	private sprStr: g.Sprite[] = new Array(define.BUTTON_NUM);

	/** ボタン画像を含むスプライトシートのSpriteSheetInfo */
	private mapFrame: SpriteSheetInfo;
	/** 選択肢文字画像を含むスプライトシートのSpriteSheetInfo */
	private mapStr: SpriteSheetInfo;

	/**
	 * AssetInfoとの紐付け、ボタンの作成
	 * @param  {number}          _currentQuestion 初期表示に使用する問題番号
	 * @param  {SpriteSheetInfo} _frame           ボタン画像を含むスプライトシートのSpriteSheetInfo
	 * @param  {SpriteSheetInfo} _str             選択肢文字列画像を含むスプライトシートのSpriteSheetInfo
	 */
	constructor(
		_currentQuestion: number,
		_frame: SpriteSheetInfo,
		_str: SpriteSheetInfo
	) {
		this.mapFrame = _frame;
		this.mapStr = _str;
		if (!CommonParameterReader.randomGenerator) {
			this.initButonImgList();
		} else {
			this.initButonImgListUseRandom();
		}
		// ボタン上に表示する文字配列定義 問題数×選択肢
		for (let i = 0; i < define.BUTTON_NUM; ++i) {
			this.sprFrame[i] = spriteUtil.createFrameSprite(
				this.mapFrame.spriteParam,
				this.mapFrame.jsonSpriteFrameMap,
				BUTTON_NORMAL
			);
			this.sprFrame[i].moveTo(define.BUTTON_X + (i * define.BUTTON_W), define.BUTTON_Y);
			this.sprStr[i] = spriteUtil.createFrameSprite(
				this.mapStr.spriteParam,
				this.mapStr.jsonSpriteFrameMap,
				this.imgList[_currentQuestion][i]
			);
			this.sprStr[i].hide();
		}
	}

	/**
	 * ボタンを指定のレイヤーにappendするメソッド
	 * @param {g.E} _parent ボタンを表示するレイヤー
	 */
	appendTo(_parent: g.E): void {
		for (let i = 0; i < define.BUTTON_NUM; ++i) {
			_parent.append(this.sprFrame[i]);
			this.sprFrame[i].modified();
			_parent.append(this.sprStr[i]);
			this.sprStr[i].modified();
		}
	}

	/**
	 * ボタンの表示状態を初期化するメソッド
	 * @param {number} _currentQuestion 表示する問題番号
	 */
	initButtons(_currentQuestion: number): void {
		for (let i = 0; i < define.BUTTON_NUM; ++i) {
			spriteUtil.setSpriteFrame(
				this.mapFrame.jsonSpriteFrameMap, BUTTON_NORMAL,
				this.sprFrame[i]);

			const pos: g.CommonOffset = {
				x: (this.sprFrame[i].x + (this.sprFrame[i].width / 2)),
				y: (this.sprFrame[i].y + (this.sprFrame[i].height / 2))
			};

			// 文字数によって中心がぶれるので毎回設定
			spriteUtil.setSpriteFrame(
				this.mapStr.jsonSpriteFrameMap,
				this.imgList[_currentQuestion][i],
				this.sprStr[i]);
			this.sprStr[i].moveTo(
				pos.x - (this.sprStr[i].width / 2),
				pos.y - (this.sprStr[i].height / 2));
			this.sprStr[i].hide();
		}
	}

	/**
	 * ボタン上の文字を表示するメソッド
	 */
	showButtonTexts(): void {
		for (let i = 0; i < define.BUTTON_NUM; ++i) {
			this.sprStr[i].show();
			this.sprStr[i].modified();
		}
	}

	/**
	 * タッチ位置とボタンのあたり判定を行うメソッド
	 * @param {g.CommonOffset} _pos タッチ位置
	 */
	onCollision(_pos: g.CommonOffset): void {
		const area: g.CommonArea = { x: _pos.x, y: _pos.y, width: 1, height: 1 };
		for (let i = 0; i < define.BUTTON_NUM; ++i) {
			if (g.Collision.intersectAreas(area, this.sprFrame[i])) {
				spriteUtil.setSpriteFrame(
					this.mapFrame.jsonSpriteFrameMap,
					BUTTON_OFF,
					this.sprFrame[i]
				);
				this.onCollisionTrigger.fire(i);
			}
		}
	}

	/**
	 * AssetInfo.qa.framesから「select9999」の形式で定義されている選択時文字列画像のファイル名をリスト化する
	 */
	private initButonImgList(): void {
		this.imgList = [];
		const wk: Object = AssetInfo.qa.frames;
		for (let row = 0; row < define.ALL_QUESTION_NUM; ++row) {
			this.imgList[row] = [];
			const searchStr: string = "select" + ("00" + (row + 1)).slice(-2);
			// console.log(searchStr);
			Object.keys(wk).filter((e) => {
				return (e.indexOf(searchStr) !== -1);
			}).forEach((val: string, i: number) => {
				const img: string = (<{ [key: string]: string }>wk)[val];
				// console.log(img);
				this.imgList[row][i] = img;
			});
		}
	}

	/**
	 * initButonImgList後の画像リストをランダム作成した正解位置をもとに入れ替える
	 */
	private initButonImgListUseRandom(): void {
		this.initButonImgList();
		for (let row = 0; row < this.imgList.length; ++row) {
			let imgs = this.imgList[row];
			for (let i = 0; i < imgs.length; ++i) {
				if (i === define.RIGHT_ANSWER_INDEXES[row]) { // 本来の正解の位置だったらランダムで設定した正解位置と入れ替え
					const wk = imgs[i];
					imgs[i] = imgs[GameParameterReader.rightAnswerIndexes[row]];
					imgs[GameParameterReader.rightAnswerIndexes[row]] = wk;
				}
			}
		}
	}
}
