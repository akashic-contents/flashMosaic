"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameUtil_1 = require("../util/gameUtil");
var commonParameterReader_1 = require("../commonNicowariGame/commonParameterReader");
var define_1 = require("./define");
var miscAssetInfo_1 = require("./miscAssetInfo");
/**
 * ゲーム固有パラメータの読み込みクラス
 * 省略されたパラメータ項目の補完などを行う
 */
var GameParameterReader = /** @class */ (function () {
    function GameParameterReader() {
    }
    /**
     * 起動パラメータから対応するメンバ変数を設定する
     * @param {g.Scene} _scene Sceneインスタンス
     */
    GameParameterReader.read = function (_scene) {
        this.questionSequence = [];
        this.rightAnswerIndexes = [];
        var iEnd = define_1.define.RIGHT_ANSWER_INDEXES.length;
        for (var i = 0; i < iEnd; ++i) {
            this.questionSequence[i] = {
                score: define_1.define.GAME_COLLECT_SCORE_MAX,
                timeLimit: define_1.define.SEC_QUESTION,
                embedNumber: i + 1
            };
            this.rightAnswerIndexes[i] = define_1.define.RIGHT_ANSWER_INDEXES[i];
        }
        this.quizData = [];
        if (!commonParameterReader_1.CommonParameterReader.nicowari) {
            if (commonParameterReader_1.CommonParameterReader.useDifficulty) {
                // 難易度指定によるパラメータを設定
                this.loadFromJson(_scene);
            }
            else {
                var param = _scene.game.vars.parameters;
                if (param.questionSequence) {
                    this.questionSequence = param.questionSequence;
                }
                else {
                    if (commonParameterReader_1.CommonParameterReader.randomGenerator) {
                        // クイズ番号リスト作成
                        var questionIndexList = [];
                        this.rightAnswerIndexes = [];
                        for (var i = 0; i < define_1.define.RIGHT_ANSWER_INDEXES.length; ++i) {
                            questionIndexList[i] = i;
                            this.rightAnswerIndexes[i] =
                                gameUtil_1.gameUtil.getRandomLessThanMax(define_1.define.BUTTON_NUM, commonParameterReader_1.CommonParameterReader.randomGenerator);
                        }
                        // クイズ番号リストをランダムソート
                        questionIndexList = gameUtil_1.gameUtil.shuffle(questionIndexList, commonParameterReader_1.CommonParameterReader.randomGenerator);
                        for (var i = 0; i < questionIndexList.length; ++i) {
                            this.quizData[i] = {
                                index: questionIndexList[i],
                                timeLimit: define_1.define.SEC_QUESTION,
                                timeScore: define_1.define.GAME_COLLECT_SCORE_MAX
                            };
                        }
                        return;
                    }
                }
            }
        }
        var qs = this.questionSequence;
        var jEnd = (qs.length < define_1.define.RIGHT_ANSWER_INDEXES.length)
            ? qs.length : define_1.define.RIGHT_ANSWER_INDEXES.length;
        for (var j = 0; j < jEnd; ++j) {
            var qsj = qs[j];
            var score = define_1.define.GAME_COLLECT_SCORE_MAX;
            if (typeof qsj.score === "number") {
                score = qsj.score;
            }
            var timeLimit = define_1.define.SEC_QUESTION;
            if (typeof qsj.timeLimit === "number") {
                timeLimit = qsj.timeLimit;
            }
            var embedNumber = j;
            if (embedNumber >= define_1.define.RIGHT_ANSWER_INDEXES.length) {
                embedNumber = define_1.define.RIGHT_ANSWER_INDEXES.length - 1;
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
    };
    /**
     * JSONから難易度指定によるパラメータを設定
     * @param {g.Scene} _scene Sceneインスタンス
     */
    GameParameterReader.loadFromJson = function (_scene) {
        var difficultyJson = JSON.parse(_scene
            .assets[miscAssetInfo_1.MiscAssetInfo.difficultyData.name].data);
        var difficultyList = difficultyJson.difficultyParameterList;
        if (difficultyList.length === 0) {
            return;
        }
        var index = 0;
        for (var i = difficultyList.length - 1; i >= 0; --i) {
            if (difficultyList[i].minimumDifficulty
                <= commonParameterReader_1.CommonParameterReader.difficulty) {
                index = i;
                // console.log("minimumDifficulty[" + i + "]:" + difficultyList[i].minimumDifficulty + ".");
                break;
            }
        }
        if (difficultyList[index].questionSequence) {
            this.questionSequence = difficultyList[index].questionSequence;
        }
    };
    return GameParameterReader;
}());
exports.GameParameterReader = GameParameterReader;
