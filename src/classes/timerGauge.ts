import { define } from "./define";
import { entityUtil } from "../util/entityUtil";
import { gameUtil } from "../util/gameUtil";
import { spriteUtil } from "../util/spriteUtil";
import { AssetInfo } from "./assetInfo";
import { SpriteFrameMap } from "../util/spriteSheetTypes";

/**
 * 残り時間の管理、表示を行うクラス
 * 残り時間警告の演出も管理する。
 */
export class TimerGauge extends g.E {

	/** 残り時間[フレーム数] */
	private remainFrameCount: number;
	/** 背面イメージ */
	private bkImg: g.Sprite;
	/** バー画像 */
	private fillImg: g.Sprite;
	/** 回答時間 */
	private totalFrameCount: number;
	/** バー画像の元の幅 */
	private fillSrcWidth: number;
	/** 点滅フラグ */
	private isBlink: boolean;
	/** ゲージ表示用のSpriteParameterObjectオブジェクト */
	private spoQuizUi: g.SpriteParameterObject;
	/** ゲージ表示用のSpriteFrameMapオブジェクト */
	private sfmQuizUi: SpriteFrameMap;

	/** バー画像のフレーム名配列 */
	private imgAry: string[];
	/** 点滅処理用のTimerIdentifier */
	private intervalId: g.TimerIdentifier;

	/**
	 * 継承元のコンストラクタをよび、ゲージスプライトを作成する
	 * @param  {g.Scene} _scene シーン
	 */
	constructor(_scene: g.Scene) {
		super({ scene: _scene });

		this.spoQuizUi = spriteUtil.createSpriteParameter(AssetInfo.mains);
		this.sfmQuizUi = spriteUtil.createSpriteFrameMap(AssetInfo.mains);

		// 背面イメージ作成
		this.bkImg = spriteUtil.createFrameSprite(
			this.spoQuizUi, this.sfmQuizUi,
			AssetInfo.mains.frames.uiFasterGaugeBase);
		entityUtil.appendEntity(this.bkImg, this);

		// 画像フレーム名を定義
		this.imgAryReset();

		// フィル画像作成
		this.fillImg = spriteUtil.createFrameSprite(
			this.spoQuizUi, this.sfmQuizUi, this.imgAry[0]);
		this.fillImg.moveTo(define.GAUGE_FILL_IMG_POS);
		entityUtil.appendEntity(this.fillImg, this);

		// 最初のsrcwidthを保存
		this.fillSrcWidth = this.fillImg.srcWidth;
	}

	/**
	 * 表示系以外のオブジェクトをdestroyするメソッド
	 * 表示系のオブジェクトはg.Eのdestroyに任せる。
	 * @override
	 */
	destroy(): void {
		if (this.destroyed()) {
			return;
		}

		super.destroy();
	}


	/**
	 * 現在の残り秒数を設定するメソッド
	 * @param {number} _seconds 設定する値
	 */
	setTimeCount(_seconds: number): void {
		this.setTimeFrameCount(gameUtil.sec2Frame(_seconds));
	}
	/**
	 * 現在の残り秒数をフレーム数で設定するメソッド
	 * @param {number} _frames 設定する値
	 */
	setTimeFrameCount(_frames: number): void {
		this.remainFrameCount = _frames;
		this.totalFrameCount = _frames;
		// バーの表示を戻す
		this.fillReset();
	}

	/**
	 * 現在の残り秒数を取得するメソッド（小数部は切り上げる）
	 * @return {number} 秒数
	 */
	getTimeCount(): number {
		return Math.ceil(gameUtil.frame2Sec(this.remainFrameCount));
	}

	/**
	 * 現在の残り秒数を取得するメソッド（小数部あり）
	 * @return {number} 秒数
	 */
	getTimeCountReal(): number {
		return gameUtil.frame2Sec(this.remainFrameCount);
	}

	/**
	 * 現在の残り秒数をフレーム数で取得するメソッド
	 * @return {number} フレーム数
	 */
	getTimeFrameCount(): number {
		return this.remainFrameCount;
	}

	/**
	 * 表示を開始するメソッド
	 * ゲーム画面に遷移するワイプ演出で表示が始まる時点で呼ばれる。
	 */
	showContent(): void {
		// 塗りを戻す
		this.fillReset();
	}

	/**
	 * 残り時間と指定した進行率をかけてゲージを減らすメソッド
	 * @param {number} _progress 進行率（1になった時ゲージが0になる）
	 */
	discharge(_progress: number): void {
		const num = Math.floor(
			this.remainFrameCount - (this.remainFrameCount * _progress));
		this.fillUpdate(num);
	}

	/**
	 * 1フレーム分時間を進めるメソッド
	 */
	tick(): void {
		if (this.remainFrameCount > 0) {
			--this.remainFrameCount;
			// remainFrameCountの値が小数である場合を考慮した条件
			if (this.remainFrameCount < 0) {
				// 時間切れ
				// remainFrameCountの値が小数である場合を考慮した処理
				this.remainFrameCount = 0;
			} else if (this.getTimeCount() < define.CAUTION_ANSWER_TIME_CONDITION) {
				// 点滅
				if (!this.isBlink) {
					this.startBlink(); // 点滅開始
				}
			}

			// バーの表示更新
			this.fillUpdate(this.remainFrameCount);
		}
	}

	/**
	 * バーの表示状態を初期化するメソッド
	 */
	private fillReset(): void {
		// 画像名再定義
		this.imgAryReset();
		// 塗りを通常に戻す
		spriteUtil.setSpriteFrame(this.sfmQuizUi, this.imgAry[0], this.fillImg);
		// 点滅停止
		this.stopBlink();
	}

	/**
	 * 残り時間時間に応じてバーの長さを更新するメソッド
	 * @param {number} _frame 残り時間
	 */
	private fillUpdate(_frame: number): void {
		this.fillImg.srcWidth
			= this.fillSrcWidth * (_frame / this.totalFrameCount);
		this.fillImg.modified();
	}

	/**
	 * 点滅を停止するメソッド
	 */
	private stopBlink(): void {
		this.isBlink = false;
		// intervalIdがあれば停止
		if (this.intervalId) {
			this.scene.clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	/**
	 * 点滅を開始するメソッド
	 */
	private startBlink(): void {
		this.isBlink = true;
		// スプライトを入れ替える
		this.changeSprite();

		this.intervalId = this.scene.setInterval(() => {
			this.changeSprite();
		}, 200, this);
	}

	/**
	 * バー画像を入れ替えるメソッド
	 */
	private changeSprite(): void {
		this.imgAry.reverse();
		const w = this.fillImg.srcWidth;
		spriteUtil.setSpriteFrame(this.sfmQuizUi, this.imgAry[0], this.fillImg);
		this.fillImg.srcWidth = w;
		this.fillImg.modified();
	}

	/**
	 * バー画像のフレーム名配列を初期化するメソッド
	 */
	private imgAryReset(): void {
		this.imgAry = [
			AssetInfo.mains.frames.uiFasterGauge01,
			AssetInfo.mains.frames.uiFasterGauge02];
	}
}
