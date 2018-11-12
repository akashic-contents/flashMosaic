/**
 * StateMachineClassが扱うステートのクラス
 */
export class StateBaseClass {
	/** このステートに入ったときの処理ハンドラ */
	onStateEnter = (): void => {
		// NOP
	}

	/** このステートに滞在中のonUpdate時の処理ハンドラ */
	onStateStay = (): void => {
		// NOP
	}

	/** このステートからぬけるときの処理ハンドラ */
	onStateExit = (): void => {
		// NOP
	}
}
