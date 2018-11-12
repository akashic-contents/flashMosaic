/**
 * 音声アセット関連の静的情報
 */
export class SoundInfo {
	/** SE名のマップ */
	// tslint:disable-next-line:typedef
	static seSet = {
		end: "se_No3_TimeUp",
		rollCount2: "se_No8_RollCount2",
		rollCountFinish: "se_No8_RollCount_Finish",
		question: "se_No9_Question",
		answer2: "se_No12_Answer2",
		badAnswer2: "se_No13_BadAnswer2",
		timeUp: "se_No14_TimeUp",
		drumRoll: "se_No15_DrumRoll",
		drumRollFinish: "se_No15_DrumRoll_Finish"
	};

	/** BGM名のマップ */
	// tslint:disable-next-line:typedef
	static bgmSet = {
		title: "bgm_quiz",
		main: "bgm_quiz",
		thinkingTime: "bgm_TickCount"
	};
}
