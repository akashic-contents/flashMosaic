import { StateBaseClass } from "./stateBaseClass";

/**
 * ステート管理クラス
 */
export class StateMachineClass {
	/** ステートの各ハンドラ呼び出し時にthisとして使用するオブジェクト */
	owner: g.Scene;
	/** 活動フラグ */
	isActive: boolean;
	/** 現在のステート */
	currentState: StateBaseClass;
	/** 全ステートを保持する配列 */
	states: StateBaseClass[];

	/**
	 * シーンの参照と初期値設定
	 * @param  {g.Scene} _owner シーン
	 */
	constructor(_owner: g.Scene) {
		this.owner = _owner;
		this.isActive = true;
		this.currentState = null;
		this.states = [];
	}

	/**
	 * 強制的にステートなしの状態にするメソッド
	 */
	resetState(): void {
		this.currentState = null;
	}

	/**
	 * ステート滞在中の処理を呼ぶメソッド
	 */
	onUpdate(): void {
		if (!this.isActive) {
			return;  // 活動停止したら何もしない
		}
		if (this.currentState) {
			this.currentState.onStateStay.call(this.owner);
		}
	}

	/**
	 * ステートを遷移させるメソッド
	 * @param {StateBaseClass} _nextState 遷移先ステート
	 */
	transition(_nextState: StateBaseClass): void {
		if (!this.isActive) {
			return;  // 活動停止したら何もしない
		}

		// exit
		if (this.currentState) {
			this.currentState.onStateExit.call(this.owner);
		}

		// current
		this.currentState = null;
		if (this.getIndex(_nextState) > -1) {
			this.currentState = _nextState;
		}

		// enter
		if (this.currentState) {
			this.currentState.onStateEnter.call(this.owner);
		}
	}

	/**
	 * ステートに対応するステート配列でのインデックスを取得するメソッド
	 * @param  {StateBaseClass} _s 処理対象ステート
	 * @return {number}            インデックス番号（存在しない場合は-1）
	 */
	getIndex(_s: StateBaseClass): number {
		return this.states.indexOf(_s);
	}

	/**
	 * 次のステートに遷移させるメソッド
	 */
	goNextState(): void {
		const nextIndex: number = this.getIndex(this.currentState) + 1;
		const nextState: StateBaseClass = this.states[nextIndex];
		// 次ステートへ
		this.transition(nextState);
	}
}
