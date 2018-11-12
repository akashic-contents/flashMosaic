/**
 * スコア管理クラス
 */
export class Score {
	/** スコア値 */
	score: number = 0;
	/** 加算演出用待機スコア値 */
	stack: number = 0;
	/** 加算演出用スコア加算値 */
	plus: number;

	/**
	 * 初期値設定
	 * @param {number} _plus     加算演出用スコア加算値
	 * @param {number} opt_score スコア初期値
	 */
	constructor(_plus: number, opt_score?: number) {
		this.plus = _plus;
		if (opt_score) {
			this.score = opt_score;
		}
	}

	/**
	 * スコアを一定量ずつ足すメソッド
	 * @param {number} opt_plus スコア加算値
	 */
	animePlusScore(opt_plus?: number): void {
		const wkPlus: number = (opt_plus) ? opt_plus : this.plus;
		if (this.stack > 0 && this.stack >= wkPlus) {
			this.score += wkPlus;
			this.stack -= wkPlus;
		} else {
			this.score += this.stack;
			this.stack = 0;
		}
	}

	/**
	 * 待機スコア値をすべてスコアに加算するメソッド
	 */
	mergeScore(): void {
		this.score += this.stack;
		this.stack = 0;
	}
}
