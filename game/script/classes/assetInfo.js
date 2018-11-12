"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 画像アセット関連の静的情報
 */
var AssetInfo = /** @class */ (function () {
    function AssetInfo() {
    }
    /** ゲーム中の数字（黒） */
    // tslint:disable-next-line:typedef
    AssetInfo.numBlack = {
        img: "img_numbers_n",
        json: "json_numbers_n",
        numFrames: [
            "numbers_n_10.png",
            "numbers_n_01.png",
            "numbers_n_02.png",
            "numbers_n_03.png",
            "numbers_n_04.png",
            "numbers_n_05.png",
            "numbers_n_06.png",
            "numbers_n_07.png",
            "numbers_n_08.png",
            "numbers_n_09.png"
        ],
        nonnumFrames: [
            { char: "*", frame: "numbers_n_11.png" },
            { char: "+", frame: "numbers_n_12.png" },
            { char: "-", frame: "numbers_n_13.png" }
        ],
        missing: "numbers_n_13.png",
        frames: {
            cross: "numbers_n_11.png",
            plus: "numbers_n_12.png",
            minus: "numbers_n_13.png"
        },
        fontWidth: 26,
        fontHeight: 30
    };
    /** ゲーム中の数字（赤） */
    // tslint:disable-next-line:typedef
    AssetInfo.numRed = {
        img: "img_numbers_n_red",
        json: "json_numbers_n_red",
        numFrames: [
            "numbers_n_red_10.png",
            "numbers_n_red_01.png",
            "numbers_n_red_02.png",
            "numbers_n_red_03.png",
            "numbers_n_red_04.png",
            "numbers_n_red_05.png",
            "numbers_n_red_06.png",
            "numbers_n_red_07.png",
            "numbers_n_red_08.png",
            "numbers_n_red_09.png"
        ],
        nonnumFrames: [
            { char: "*", frame: "numbers_n_red_11.png" },
            { char: "+", frame: "numbers_n_red_12.png" },
            { char: "-", frame: "numbers_n_red_13.png" }
        ],
        missing: "numbers_n_red_13.png",
        frames: {
            cross: "numbers_n_red_11.png",
            plus: "numbers_n_red_12.png",
            minus: "numbers_n_red_13.png"
        },
        fontWidth: 26,
        fontHeight: 30
    };
    /** 第？問 */
    // tslint:disable-next-line:typedef
    AssetInfo.numQuestion = {
        img: "img_num_question",
        json: "json_num_question",
        numFrames: [
            "num_question_10.png",
            "num_question_01.png",
            "num_question_02.png",
            "num_question_03.png",
            "num_question_04.png",
            "num_question_05.png",
            "num_question_06.png",
            "num_question_07.png",
            "num_question_08.png",
            "num_question_09.png"
        ],
        nonnumFrames: [
            { char: "第", frame: "num_question_11.png" },
            { char: "問", frame: "num_question_12.png" }
        ],
        missing: "num_question_09.png",
        frames: {
            dai: "num_question_11.png",
            mon: "num_question_12.png"
        },
        fontWidth: 42,
        fontHeight: 68
    };
    /** メインスプライト */
    // tslint:disable-next-line:typedef
    AssetInfo.mains = {
        img: "img_main",
        json: "json_main",
        frames: {
            iconPt: "ui_icon_pt_.png",
            iconClock: "icon_clock_.png",
            uiFasterGauge01: "ui_faster_gauge01.png",
            uiFasterGauge02: "ui_faster_gauge02.png",
            uiFasterGaugeBase: "ui_faster_gauge_base.png",
            bg: "bg.png",
            btnNormal: "btn_normal.png",
            btnOff: "btn_off.png",
            correctIs: "correctIs.png",
            mainBg: "main_bg.png",
            mainFrame: "main_frame.png"
        }
    };
    /** 正解時の文字列画像、選択肢の文字列画像 */
    // tslint:disable-next-line:typedef
    AssetInfo.qa = {
        img: "img_qa",
        json: "json_qa",
        frames: {
            correct01: "correct01_clab.png",
            correct02: "correct02_daibutu.png",
            correct03: "correct03_mabo.png",
            correct04: "correct04_surfer.png",
            correct05: "correct05_tempra.png",
            correct06: "correct06_tokyoTower.png",
            correct07: "correct07_dump.png",
            correct08: "correct08_hokkaido.png",
            correct09: "correct09_shark.png",
            correct10: "correct10_pool.png",
            correct11: "correct11_stapler.png",
            correct12: "correct12_dragonfly.png",
            correct13: "correct13_garilla.png",
            correct14: "correct14_aiti.png",
            correct15: "correct15_faucet.png",
            correct16: "correct16_post.png",
            correct17: "correct17_vehiclestop.png",
            correct18: "correct18_dice.png",
            correct19: "correct19_knife.png",
            correct20: "correct20_boots.png",
            correct21: "correct21_fishingrod.png",
            correct22: "correct22_sushi.png",
            correct23: "correct23_balloon.png",
            correct24: "correct24_sunflower.png",
            correct25: "correct25_marimo.png",
            correct26: "correct26_chestnut.png",
            correct27: "correct27_rocket.png",
            correct28: "correct28_wrestler.png",
            correct29: "correct29_ufo.png",
            select0101: "select01_01hitode.png",
            select0102: "select01_02handbag.png",
            select0103: "select01_03clab.png",
            select0201: "select02_01zou.png",
            select0202: "select02_02daibutu.png",
            select0203: "select02_03saboten.png",
            select0301: "select03_01pizza.png",
            select0302: "select03_02meatsource.png",
            select0303: "select03_03mabo.png",
            select0401: "select04_01husya.png",
            select0402: "select04_02surfer.png",
            select0403: "select04_03eki.png",
            select0501: "select05_01tempra.png",
            select0502: "select05_02udon.png",
            select0503: "select05_03track.png",
            select0601: "select06_01tokyoTower.png",
            select0602: "select06_02koi.png",
            select0603: "select06_03bird.png",
            select0701: "select07_01dump.png",
            select0702: "select07_02shovell.png",
            select0703: "select07_03kyoryu.png",
            select0801: "select08_01kuroba.png",
            select0802: "select08_02hokkaido.png",
            select0803: "select08_03oumu.png",
            select0901: "select09_01sensui.png",
            select0902: "select09_02hikousen.png",
            select0903: "select09_03shark.png",
            select1001: "select10_01pool.png",
            select1002: "select10_02sabaku.png",
            select1003: "select10_03dohyou.png",
            select1101: "select11_01sportscar.png",
            select1102: "select11_02bus.png",
            select1103: "select11_03stapler.png",
            select1201: "select12_01elephant.png",
            select1202: "select12_02lily.png",
            select1203: "select12_03dragonfly.png",
            select1301: "select13_01dog.png",
            select1302: "select13_02gorilla.png",
            select1303: "select13_03briquettes.png",
            select1401: "select14_01donkey.png",
            select1402: "select14_02aiti.png",
            select1403: "select14_03grasshopper.png",
            select1501: "select15_01screw.png",
            select1502: "select15_02faucet.png",
            select1503: "select15_03mouse.png",
            select1601: "select16_01vendingmachine.png",
            select1602: "select16_02apple.png",
            select1603: "select16_03post.png",
            select1701: "select17_01pouse.png",
            select1702: "select17_02notraffictovehicles.png",
            select1703: "select17_03vehiclestop.png",
            select1801: "select18_01dice.png",
            select1802: "select18_02policecar.png",
            select1803: "select18_03eggrice.png",
            select1901: "select19_01saw.png",
            select1902: "select19_02sanma.png",
            select1903: "select19_03knife.png",
            select2001: "select20_01crow.png",
            select2002: "select20_02boots.png",
            select2003: "select20_03italy.png",
            select2101: "select21_01bow.png",
            select2102: "select21_02fishingrod.png",
            select2103: "select21_03sword.png",
            select2201: "select22_01sushi.png",
            select2202: "select22_02highheel.png",
            select2203: "select22_03sneaker.png",
            select2301: "select23_01lake.png",
            select2302: "select23_02slime.png",
            select2303: "select23_03balloon.png",
            select2401: "select24_01banana.png",
            select2402: "select24_02sunflower.png",
            select2403: "select24_03hat.png",
            select2501: "select25_01greenpepper.png",
            select2502: "select25_02ameba.png",
            select2503: "select25_03marimo.png",
            select2601: "select26_01chestnut.png",
            select2602: "select26_02pot.png",
            select2603: "select26_03coin.png",
            select2701: "select27_01rocket.png",
            select2702: "select27_02squid.png",
            select2703: "select27_03lighter.png",
            select2801: "select28_01daruma.png",
            select2802: "select28_02wrestler.png",
            select2803: "select28_03lantern.png",
            select2901: "select29_01usa.png",
            select2902: "select29_02ufo.png",
            select2903: "select29_03uma.png"
        }
    };
    // 正解画像
    AssetInfo.answer01 = { img: "q01_11" };
    AssetInfo.answer02 = { img: "q02_11" };
    AssetInfo.answer03 = { img: "q03_11" };
    AssetInfo.answer04 = { img: "q04_11" };
    AssetInfo.answer05 = { img: "q05_11" };
    AssetInfo.answer06 = { img: "q06_11" };
    AssetInfo.answer07 = { img: "q07_11" };
    AssetInfo.answer08 = { img: "q08_11" };
    AssetInfo.answer09 = { img: "q09_11" };
    AssetInfo.answer10 = { img: "q10_11" };
    AssetInfo.answer11 = { img: "q11_11" };
    AssetInfo.answer12 = { img: "q12_11" };
    AssetInfo.answer13 = { img: "q13_11" };
    AssetInfo.answer14 = { img: "q14_11" };
    AssetInfo.answer15 = { img: "q15_11" };
    AssetInfo.answer16 = { img: "q16_11" };
    AssetInfo.answer17 = { img: "q17_11" };
    AssetInfo.answer18 = { img: "q18_11" };
    AssetInfo.answer19 = { img: "q19_11" };
    AssetInfo.answer20 = { img: "q20_11" };
    AssetInfo.answer21 = { img: "q21_11" };
    AssetInfo.answer22 = { img: "q22_11" };
    AssetInfo.answer23 = { img: "q23_11" };
    AssetInfo.answer24 = { img: "q24_11" };
    AssetInfo.answer25 = { img: "q25_11" };
    AssetInfo.answer26 = { img: "q26_11" };
    AssetInfo.answer27 = { img: "q27_11" };
    AssetInfo.answer28 = { img: "q28_11" };
    AssetInfo.answer29 = { img: "q29_11" };
    // モザイク画像
    AssetInfo.mosaic0101 = { img: "q01_01" };
    AssetInfo.mosaic0102 = { img: "q01_02" };
    AssetInfo.mosaic0103 = { img: "q01_03" };
    AssetInfo.mosaic0104 = { img: "q01_04" };
    AssetInfo.mosaic0105 = { img: "q01_05" };
    AssetInfo.mosaic0106 = { img: "q01_06" };
    AssetInfo.mosaic0107 = { img: "q01_07" };
    AssetInfo.mosaic0108 = { img: "q01_08" };
    AssetInfo.mosaic0109 = { img: "q01_09" };
    AssetInfo.mosaic0110 = { img: "q01_10" };
    AssetInfo.mosaic0201 = { img: "q02_01" };
    AssetInfo.mosaic0202 = { img: "q02_02" };
    AssetInfo.mosaic0203 = { img: "q02_03" };
    AssetInfo.mosaic0204 = { img: "q02_04" };
    AssetInfo.mosaic0205 = { img: "q02_05" };
    AssetInfo.mosaic0206 = { img: "q02_06" };
    AssetInfo.mosaic0207 = { img: "q02_07" };
    AssetInfo.mosaic0208 = { img: "q02_08" };
    AssetInfo.mosaic0209 = { img: "q02_09" };
    AssetInfo.mosaic0210 = { img: "q02_10" };
    AssetInfo.mosaic0301 = { img: "q03_01" };
    AssetInfo.mosaic0302 = { img: "q03_02" };
    AssetInfo.mosaic0303 = { img: "q03_03" };
    AssetInfo.mosaic0304 = { img: "q03_04" };
    AssetInfo.mosaic0305 = { img: "q03_05" };
    AssetInfo.mosaic0306 = { img: "q03_06" };
    AssetInfo.mosaic0307 = { img: "q03_07" };
    AssetInfo.mosaic0308 = { img: "q03_08" };
    AssetInfo.mosaic0309 = { img: "q03_09" };
    AssetInfo.mosaic0310 = { img: "q03_10" };
    AssetInfo.mosaic0401 = { img: "q04_01" };
    AssetInfo.mosaic0402 = { img: "q04_02" };
    AssetInfo.mosaic0403 = { img: "q04_03" };
    AssetInfo.mosaic0404 = { img: "q04_04" };
    AssetInfo.mosaic0405 = { img: "q04_05" };
    AssetInfo.mosaic0406 = { img: "q04_06" };
    AssetInfo.mosaic0407 = { img: "q04_07" };
    AssetInfo.mosaic0408 = { img: "q04_08" };
    AssetInfo.mosaic0409 = { img: "q04_09" };
    AssetInfo.mosaic0410 = { img: "q04_10" };
    AssetInfo.mosaic0501 = { img: "q05_01" };
    AssetInfo.mosaic0502 = { img: "q05_02" };
    AssetInfo.mosaic0503 = { img: "q05_03" };
    AssetInfo.mosaic0504 = { img: "q05_04" };
    AssetInfo.mosaic0505 = { img: "q05_05" };
    AssetInfo.mosaic0506 = { img: "q05_06" };
    AssetInfo.mosaic0507 = { img: "q05_07" };
    AssetInfo.mosaic0508 = { img: "q05_08" };
    AssetInfo.mosaic0509 = { img: "q05_09" };
    AssetInfo.mosaic0510 = { img: "q05_10" };
    AssetInfo.mosaic0601 = { img: "q06_01" };
    AssetInfo.mosaic0602 = { img: "q06_02" };
    AssetInfo.mosaic0603 = { img: "q06_03" };
    AssetInfo.mosaic0604 = { img: "q06_04" };
    AssetInfo.mosaic0605 = { img: "q06_05" };
    AssetInfo.mosaic0606 = { img: "q06_06" };
    AssetInfo.mosaic0607 = { img: "q06_07" };
    AssetInfo.mosaic0608 = { img: "q06_08" };
    AssetInfo.mosaic0609 = { img: "q06_09" };
    AssetInfo.mosaic0610 = { img: "q06_10" };
    AssetInfo.mosaic0701 = { img: "q07_01" };
    AssetInfo.mosaic0702 = { img: "q07_02" };
    AssetInfo.mosaic0703 = { img: "q07_03" };
    AssetInfo.mosaic0704 = { img: "q07_04" };
    AssetInfo.mosaic0705 = { img: "q07_05" };
    AssetInfo.mosaic0706 = { img: "q07_06" };
    AssetInfo.mosaic0707 = { img: "q07_07" };
    AssetInfo.mosaic0708 = { img: "q07_08" };
    AssetInfo.mosaic0709 = { img: "q07_09" };
    AssetInfo.mosaic0710 = { img: "q07_10" };
    AssetInfo.mosaic0801 = { img: "q08_01" };
    AssetInfo.mosaic0802 = { img: "q08_02" };
    AssetInfo.mosaic0803 = { img: "q08_03" };
    AssetInfo.mosaic0804 = { img: "q08_04" };
    AssetInfo.mosaic0805 = { img: "q08_05" };
    AssetInfo.mosaic0806 = { img: "q08_06" };
    AssetInfo.mosaic0807 = { img: "q08_07" };
    AssetInfo.mosaic0808 = { img: "q08_08" };
    AssetInfo.mosaic0809 = { img: "q08_09" };
    AssetInfo.mosaic0810 = { img: "q08_10" };
    AssetInfo.mosaic0901 = { img: "q09_01" };
    AssetInfo.mosaic0902 = { img: "q09_02" };
    AssetInfo.mosaic0903 = { img: "q09_03" };
    AssetInfo.mosaic0904 = { img: "q09_04" };
    AssetInfo.mosaic0905 = { img: "q09_05" };
    AssetInfo.mosaic0906 = { img: "q09_06" };
    AssetInfo.mosaic0907 = { img: "q09_07" };
    AssetInfo.mosaic0908 = { img: "q09_08" };
    AssetInfo.mosaic0909 = { img: "q09_09" };
    AssetInfo.mosaic0910 = { img: "q09_10" };
    AssetInfo.mosaic1001 = { img: "q10_01" };
    AssetInfo.mosaic1002 = { img: "q10_02" };
    AssetInfo.mosaic1003 = { img: "q10_03" };
    AssetInfo.mosaic1004 = { img: "q10_04" };
    AssetInfo.mosaic1005 = { img: "q10_05" };
    AssetInfo.mosaic1006 = { img: "q10_06" };
    AssetInfo.mosaic1007 = { img: "q10_07" };
    AssetInfo.mosaic1008 = { img: "q10_08" };
    AssetInfo.mosaic1009 = { img: "q10_09" };
    AssetInfo.mosaic1010 = { img: "q10_10" };
    AssetInfo.mosaic1101 = { img: "q11_01" };
    AssetInfo.mosaic1102 = { img: "q11_02" };
    AssetInfo.mosaic1103 = { img: "q11_03" };
    AssetInfo.mosaic1104 = { img: "q11_04" };
    AssetInfo.mosaic1105 = { img: "q11_05" };
    AssetInfo.mosaic1106 = { img: "q11_06" };
    AssetInfo.mosaic1107 = { img: "q11_07" };
    AssetInfo.mosaic1108 = { img: "q11_08" };
    AssetInfo.mosaic1109 = { img: "q11_09" };
    AssetInfo.mosaic1110 = { img: "q11_10" };
    AssetInfo.mosaic1201 = { img: "q12_01" };
    AssetInfo.mosaic1202 = { img: "q12_02" };
    AssetInfo.mosaic1203 = { img: "q12_03" };
    AssetInfo.mosaic1204 = { img: "q12_04" };
    AssetInfo.mosaic1205 = { img: "q12_05" };
    AssetInfo.mosaic1206 = { img: "q12_06" };
    AssetInfo.mosaic1207 = { img: "q12_07" };
    AssetInfo.mosaic1208 = { img: "q12_08" };
    AssetInfo.mosaic1209 = { img: "q12_09" };
    AssetInfo.mosaic1210 = { img: "q12_10" };
    AssetInfo.mosaic1301 = { img: "q13_01" };
    AssetInfo.mosaic1302 = { img: "q13_02" };
    AssetInfo.mosaic1303 = { img: "q13_03" };
    AssetInfo.mosaic1304 = { img: "q13_04" };
    AssetInfo.mosaic1305 = { img: "q13_05" };
    AssetInfo.mosaic1306 = { img: "q13_06" };
    AssetInfo.mosaic1307 = { img: "q13_07" };
    AssetInfo.mosaic1308 = { img: "q13_08" };
    AssetInfo.mosaic1309 = { img: "q13_09" };
    AssetInfo.mosaic1310 = { img: "q13_10" };
    AssetInfo.mosaic1401 = { img: "q14_01" };
    AssetInfo.mosaic1402 = { img: "q14_02" };
    AssetInfo.mosaic1403 = { img: "q14_03" };
    AssetInfo.mosaic1404 = { img: "q14_04" };
    AssetInfo.mosaic1405 = { img: "q14_05" };
    AssetInfo.mosaic1406 = { img: "q14_06" };
    AssetInfo.mosaic1407 = { img: "q14_07" };
    AssetInfo.mosaic1408 = { img: "q14_08" };
    AssetInfo.mosaic1409 = { img: "q14_09" };
    AssetInfo.mosaic1410 = { img: "q14_10" };
    AssetInfo.mosaic1501 = { img: "q15_01" };
    AssetInfo.mosaic1502 = { img: "q15_02" };
    AssetInfo.mosaic1503 = { img: "q15_03" };
    AssetInfo.mosaic1504 = { img: "q15_04" };
    AssetInfo.mosaic1505 = { img: "q15_05" };
    AssetInfo.mosaic1506 = { img: "q15_06" };
    AssetInfo.mosaic1507 = { img: "q15_07" };
    AssetInfo.mosaic1508 = { img: "q15_08" };
    AssetInfo.mosaic1509 = { img: "q15_09" };
    AssetInfo.mosaic1510 = { img: "q15_10" };
    AssetInfo.mosaic1601 = { img: "q16_01" };
    AssetInfo.mosaic1602 = { img: "q16_02" };
    AssetInfo.mosaic1603 = { img: "q16_03" };
    AssetInfo.mosaic1604 = { img: "q16_04" };
    AssetInfo.mosaic1605 = { img: "q16_05" };
    AssetInfo.mosaic1606 = { img: "q16_06" };
    AssetInfo.mosaic1607 = { img: "q16_07" };
    AssetInfo.mosaic1608 = { img: "q16_08" };
    AssetInfo.mosaic1609 = { img: "q16_09" };
    AssetInfo.mosaic1610 = { img: "q16_10" };
    AssetInfo.mosaic1701 = { img: "q17_01" };
    AssetInfo.mosaic1702 = { img: "q17_02" };
    AssetInfo.mosaic1703 = { img: "q17_03" };
    AssetInfo.mosaic1704 = { img: "q17_04" };
    AssetInfo.mosaic1705 = { img: "q17_05" };
    AssetInfo.mosaic1706 = { img: "q17_06" };
    AssetInfo.mosaic1707 = { img: "q17_07" };
    AssetInfo.mosaic1708 = { img: "q17_08" };
    AssetInfo.mosaic1709 = { img: "q17_09" };
    AssetInfo.mosaic1710 = { img: "q17_10" };
    AssetInfo.mosaic1801 = { img: "q18_01" };
    AssetInfo.mosaic1802 = { img: "q18_02" };
    AssetInfo.mosaic1803 = { img: "q18_03" };
    AssetInfo.mosaic1804 = { img: "q18_04" };
    AssetInfo.mosaic1805 = { img: "q18_05" };
    AssetInfo.mosaic1806 = { img: "q18_06" };
    AssetInfo.mosaic1807 = { img: "q18_07" };
    AssetInfo.mosaic1808 = { img: "q18_08" };
    AssetInfo.mosaic1809 = { img: "q18_09" };
    AssetInfo.mosaic1810 = { img: "q18_10" };
    AssetInfo.mosaic1901 = { img: "q19_01" };
    AssetInfo.mosaic1902 = { img: "q19_02" };
    AssetInfo.mosaic1903 = { img: "q19_03" };
    AssetInfo.mosaic1904 = { img: "q19_04" };
    AssetInfo.mosaic1905 = { img: "q19_05" };
    AssetInfo.mosaic1906 = { img: "q19_06" };
    AssetInfo.mosaic1907 = { img: "q19_07" };
    AssetInfo.mosaic1908 = { img: "q19_08" };
    AssetInfo.mosaic1909 = { img: "q19_09" };
    AssetInfo.mosaic1910 = { img: "q19_10" };
    AssetInfo.mosaic2001 = { img: "q20_01" };
    AssetInfo.mosaic2002 = { img: "q20_02" };
    AssetInfo.mosaic2003 = { img: "q20_03" };
    AssetInfo.mosaic2004 = { img: "q20_04" };
    AssetInfo.mosaic2005 = { img: "q20_05" };
    AssetInfo.mosaic2006 = { img: "q20_06" };
    AssetInfo.mosaic2007 = { img: "q20_07" };
    AssetInfo.mosaic2008 = { img: "q20_08" };
    AssetInfo.mosaic2009 = { img: "q20_09" };
    AssetInfo.mosaic2010 = { img: "q20_10" };
    AssetInfo.mosaic2101 = { img: "q21_01" };
    AssetInfo.mosaic2102 = { img: "q21_02" };
    AssetInfo.mosaic2103 = { img: "q21_03" };
    AssetInfo.mosaic2104 = { img: "q21_04" };
    AssetInfo.mosaic2105 = { img: "q21_05" };
    AssetInfo.mosaic2106 = { img: "q21_06" };
    AssetInfo.mosaic2107 = { img: "q21_07" };
    AssetInfo.mosaic2108 = { img: "q21_08" };
    AssetInfo.mosaic2109 = { img: "q21_09" };
    AssetInfo.mosaic2110 = { img: "q21_10" };
    AssetInfo.mosaic2201 = { img: "q22_01" };
    AssetInfo.mosaic2202 = { img: "q22_02" };
    AssetInfo.mosaic2203 = { img: "q22_03" };
    AssetInfo.mosaic2204 = { img: "q22_04" };
    AssetInfo.mosaic2205 = { img: "q22_05" };
    AssetInfo.mosaic2206 = { img: "q22_06" };
    AssetInfo.mosaic2207 = { img: "q22_07" };
    AssetInfo.mosaic2208 = { img: "q22_08" };
    AssetInfo.mosaic2209 = { img: "q22_09" };
    AssetInfo.mosaic2210 = { img: "q22_10" };
    AssetInfo.mosaic2301 = { img: "q23_01" };
    AssetInfo.mosaic2302 = { img: "q23_02" };
    AssetInfo.mosaic2303 = { img: "q23_03" };
    AssetInfo.mosaic2304 = { img: "q23_04" };
    AssetInfo.mosaic2305 = { img: "q23_05" };
    AssetInfo.mosaic2306 = { img: "q23_06" };
    AssetInfo.mosaic2307 = { img: "q23_07" };
    AssetInfo.mosaic2308 = { img: "q23_08" };
    AssetInfo.mosaic2309 = { img: "q23_09" };
    AssetInfo.mosaic2310 = { img: "q23_10" };
    AssetInfo.mosaic2401 = { img: "q24_01" };
    AssetInfo.mosaic2402 = { img: "q24_02" };
    AssetInfo.mosaic2403 = { img: "q24_03" };
    AssetInfo.mosaic2404 = { img: "q24_04" };
    AssetInfo.mosaic2405 = { img: "q24_05" };
    AssetInfo.mosaic2406 = { img: "q24_06" };
    AssetInfo.mosaic2407 = { img: "q24_07" };
    AssetInfo.mosaic2408 = { img: "q24_08" };
    AssetInfo.mosaic2409 = { img: "q24_09" };
    AssetInfo.mosaic2410 = { img: "q24_10" };
    AssetInfo.mosaic2501 = { img: "q25_01" };
    AssetInfo.mosaic2502 = { img: "q25_02" };
    AssetInfo.mosaic2503 = { img: "q25_03" };
    AssetInfo.mosaic2504 = { img: "q25_04" };
    AssetInfo.mosaic2505 = { img: "q25_05" };
    AssetInfo.mosaic2506 = { img: "q25_06" };
    AssetInfo.mosaic2507 = { img: "q25_07" };
    AssetInfo.mosaic2508 = { img: "q25_08" };
    AssetInfo.mosaic2509 = { img: "q25_09" };
    AssetInfo.mosaic2510 = { img: "q25_10" };
    AssetInfo.mosaic2601 = { img: "q26_01" };
    AssetInfo.mosaic2602 = { img: "q26_02" };
    AssetInfo.mosaic2603 = { img: "q26_03" };
    AssetInfo.mosaic2604 = { img: "q26_04" };
    AssetInfo.mosaic2605 = { img: "q26_05" };
    AssetInfo.mosaic2606 = { img: "q26_06" };
    AssetInfo.mosaic2607 = { img: "q26_07" };
    AssetInfo.mosaic2608 = { img: "q26_08" };
    AssetInfo.mosaic2609 = { img: "q26_09" };
    AssetInfo.mosaic2610 = { img: "q26_10" };
    AssetInfo.mosaic2701 = { img: "q27_01" };
    AssetInfo.mosaic2702 = { img: "q27_02" };
    AssetInfo.mosaic2703 = { img: "q27_03" };
    AssetInfo.mosaic2704 = { img: "q27_04" };
    AssetInfo.mosaic2705 = { img: "q27_05" };
    AssetInfo.mosaic2706 = { img: "q27_06" };
    AssetInfo.mosaic2707 = { img: "q27_07" };
    AssetInfo.mosaic2708 = { img: "q27_08" };
    AssetInfo.mosaic2709 = { img: "q27_09" };
    AssetInfo.mosaic2710 = { img: "q27_10" };
    AssetInfo.mosaic2801 = { img: "q28_01" };
    AssetInfo.mosaic2802 = { img: "q28_02" };
    AssetInfo.mosaic2803 = { img: "q28_03" };
    AssetInfo.mosaic2804 = { img: "q28_04" };
    AssetInfo.mosaic2805 = { img: "q28_05" };
    AssetInfo.mosaic2806 = { img: "q28_06" };
    AssetInfo.mosaic2807 = { img: "q28_07" };
    AssetInfo.mosaic2808 = { img: "q28_08" };
    AssetInfo.mosaic2809 = { img: "q28_09" };
    AssetInfo.mosaic2810 = { img: "q28_10" };
    AssetInfo.mosaic2901 = { img: "q29_01" };
    AssetInfo.mosaic2902 = { img: "q29_02" };
    AssetInfo.mosaic2903 = { img: "q29_03" };
    AssetInfo.mosaic2904 = { img: "q29_04" };
    AssetInfo.mosaic2905 = { img: "q29_05" };
    AssetInfo.mosaic2906 = { img: "q29_06" };
    AssetInfo.mosaic2907 = { img: "q29_07" };
    AssetInfo.mosaic2908 = { img: "q29_08" };
    AssetInfo.mosaic2909 = { img: "q29_09" };
    AssetInfo.mosaic2910 = { img: "q29_10" };
    return AssetInfo;
}());
exports.AssetInfo = AssetInfo;
