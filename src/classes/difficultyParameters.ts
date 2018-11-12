import { EmbedQuestion } from "./gameParameters";

/**
 * 早押しひらめきモザイクの難易度設定データの型
 */
export interface DifficultyParameter {
	/** このパラメータが適用される難易度の最小値 */
	minimumDifficulty: number;
	/** 問題をどういった順番で出すかを指定するパラメータ */
	questionSequence: EmbedQuestion[];
}

/**
 * 早押しひらめきモザイクの難易度設定データJSONの型
 */
export interface DifficultyParametersJson {
	/**
	 * 難易度設定データの配列
	 * minimumDifficultyが小さいものから並べる
	 */
	difficultyParameterList: DifficultyParameter[];
}
