import { RireGameParameters } from "../commonNicowariGame/rireGameParameters";

/**
 * 組み込み問題を表すインターフェース
 */
export interface EmbedQuestion {
	/** 問題に割り当てられる点数の係数 */
	score: number;
	/** 問題に答えることが許可される秒数 */
	timeLimit: number;
	/** 組み込み問題の番号 */
	embedNumber: number;
}

/**
 * 早押しひらめきモザイクのパラメータ
 */
export interface GameParameters extends RireGameParameters {
	/**
	 * この値が指定されると、問題をどういった順番で出すかを指定出来る。
	 */
	questionSequence?: EmbedQuestion[];
}
