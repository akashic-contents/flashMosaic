"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * asapj関連の静的情報
 */
var AsaInfo = /** @class */ (function () {
    function AsaInfo() {
    }
    /** マルバツアニメ */
    // tslint:disable-next-line:typedef
    AsaInfo.goodBad = {
        pj: "pj_goodbad",
        anim: {
            good: "good_good",
            bad: "bad_bad"
        }
    };
    /** ジングルアニメ */
    // tslint:disable-next-line:typedef
    AsaInfo.jingle = {
        pj: "pj_jingle",
        anim: {
            timeup: "jingle_timeup_jingle_timeup",
            end: "jingle_end_jingle_end"
        }
    };
    return AsaInfo;
}());
exports.AsaInfo = AsaInfo;
