import { gameUtil } from "../util/gameUtil";
import { CommonParameterReader } from "../commonNicowariGame/commonParameterReader";
import { GameParameters, EmbedQuestion } from "./gameParameters";
import { DifficultyParametersJson, DifficultyParameter } from "./difficultyParameters";
import { define } from "./define";
import { MiscAssetInfo } from "./miscAssetInfo";
import { QuizDataType } from "./quizDataType";

/**
 * ゲーム固有パラメータの読み込みクラス
 * 省略されたパラメータ項目の補完などを行う
 */
export class GameParameterReader {
	/** GameParameters.questionSequence に相当する値 */
	static questionSequence: EmbedQuestion[];
	/** questionSequence に対応するクイズデータ */
	static quizData: QuizDataType[];
	/** 正解番号インデックスリスト */
	static rightAnswerIndexes: number[];
	/**
	 * 起動パラメータから対応するメンバ変数を設定する
	 * @param {g.Scene} _scene Sceneインスタンス
	 */
	static read(_scene: g.Scene): void {
		this.questionSequence = [];
		this.rightAnswerIndexes = [];
		const iEnd = define.RIGHT_ANSWER_INDEXES.length;
		for (let i = 0; i < iEnd; ++i) {
			this.questionSequence[i] = {
				score: define.GAME_COLLECT_SCORE_MAX,
				timeLimit: define.SEC_QUESTION,
				embedNumber: i + 1
			};
			this.rightAnswerIndexes[i] = define.RIGHT_ANSWER_INDEXES[i];
		}
		this.quizData = [];

		if (!CommonParameterReader.nicowari) {
			if (CommonParameterReader.useDifficulty) {
				// 難易度指定によるパラメータを設定
				this.loadFromJson(_scene);
			} else {
				const param: GameParameters = _scene.game.vars.parameters;
				if (param.questionSequence) {
					this.questionSequence = param.questionSequence;
				} else { // ニコ割モードじゃなく、難易度使わず、クイズデータパラメータも使わない場合
					if (CommonParameterReader.randomGenerator) {
						// クイズ番号リスト作成
						let questionIndexList: number[] = [];
						this.rightAnswerIndexes = [];
						for (let i = 0; i < define.RIGHT_ANSWER_INDEXES.length; ++i) {
							questionIndexList[i] = i;
							this.rightAnswerIndexes[i] =
								gameUtil.getRandomLessThanMax(define.BUTTON_NUM, CommonParameterReader.randomGenerator);
						}

						// クイズ番号リストをランダムソート
						questionIndexList = gameUtil.shuffle(questionIndexList, CommonParameterReader.randomGenerator);

						for (let i = 0; i < questionIndexList.length; ++i) {
							this.quizData[i] = {
								index: questionIndexList[i],
								timeLimit: define.SEC_QUESTION,
								timeScore: define.GAME_COLLECT_SCORE_MAX
							};
						}
						return;
					}
				}
			}
		}

		const qs = this.questionSequence;
		const jEnd = (qs.length < define.RIGHT_ANSWER_INDEXES.length)
			? qs.length : define.RIGHT_ANSWER_INDEXES.length;
		for (let j = 0; j < jEnd; ++j) {
			const qsj = qs[j];
			let score = define.GAME_COLLECT_SCORE_MAX;
			if (typeof qsj.score === "number") {
				score = qsj.score;
			}
			let timeLimit = define.SEC_QUESTION;
			if (typeof qsj.timeLimit === "number") {
				timeLimit = qsj.timeLimit;
			}
			let embedNumber = j;
			if (embedNumber >= define.RIGHT_ANSWER_INDEXES.length) {
				embedNumber = define.RIGHT_ANSWER_INDEXES.length - 1;
			}
			if (typeof qsj.embedNumber === "number") {
				embedNumber = qsj.embedNumber - 1;
			}
			this.quizData[j] = {
				index: embedNumber,
				timeLimit: timeLimit,
				timeScore: score
			};
		}
		// console.log("read: quizData.length:" + this.quizData.length + ".");
	}

	/**
	 * JSONから難易度指定によるパラメータを設定
	 * @param {g.Scene} _scene Sceneインスタンス
	 */
	private static loadFromJson(_scene: g.Scene): void {
		const difficultyJson: DifficultyParametersJson
			= JSON.parse((<g.TextAsset>_scene
				.assets[MiscAssetInfo.difficultyData.name]).data);
		const difficultyList: DifficultyParameter[]
			= difficultyJson.difficultyParameterList;
		if (difficultyList.length === 0) {
			return;
		}
		let index = 0;
		for (let i = difficultyList.length - 1; i >= 0; --i) {
			if (difficultyList[i].minimumDifficulty
				<= CommonParameterReader.difficulty) {
				index = i;
				// console.log("minimumDifficulty[" + i + "]:" + difficultyList[i].minimumDifficulty + ".");
				break;
			}
		}
		if (difficultyList[index].questionSequence) {
			this.questionSequence = difficultyList[index].questionSequence;
		}
	}
}
