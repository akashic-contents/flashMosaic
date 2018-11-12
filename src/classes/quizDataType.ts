/** JSONで読み込むクイズのデータ型 */
export interface QuizDataType {
	/** 組み込み問題番号 */
	index: number;
	/** 回答時間 */
	timeLimit: number;
	/** スコア基準値 */
	timeScore: number;
}
