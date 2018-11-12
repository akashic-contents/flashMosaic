import { AssetInfoType } from "../commonTypes/assetInfoType";

/**
 * 画像アセット関連の静的情報
 */
export class AssetInfo {
	/** ゲーム中の数字（黒） */
	// tslint:disable-next-line:typedef
	static numBlack = {
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
	static numRed = {
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
	static numQuestion = {
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
	static mains = {
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
	static qa = {
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
	static answer01: AssetInfoType = { img: "q01_11" };
	static answer02: AssetInfoType = { img: "q02_11" };
	static answer03: AssetInfoType = { img: "q03_11" };
	static answer04: AssetInfoType = { img: "q04_11" };
	static answer05: AssetInfoType = { img: "q05_11" };
	static answer06: AssetInfoType = { img: "q06_11" };
	static answer07: AssetInfoType = { img: "q07_11" };
	static answer08: AssetInfoType = { img: "q08_11" };
	static answer09: AssetInfoType = { img: "q09_11" };
	static answer10: AssetInfoType = { img: "q10_11" };
	static answer11: AssetInfoType = { img: "q11_11" };
	static answer12: AssetInfoType = { img: "q12_11" };
	static answer13: AssetInfoType = { img: "q13_11" };
	static answer14: AssetInfoType = { img: "q14_11" };
	static answer15: AssetInfoType = { img: "q15_11" };
	static answer16: AssetInfoType = { img: "q16_11" };
	static answer17: AssetInfoType = { img: "q17_11" };
	static answer18: AssetInfoType = { img: "q18_11" };
	static answer19: AssetInfoType = { img: "q19_11" };
	static answer20: AssetInfoType = { img: "q20_11" };
	static answer21: AssetInfoType = { img: "q21_11" };
	static answer22: AssetInfoType = { img: "q22_11" };
	static answer23: AssetInfoType = { img: "q23_11" };
	static answer24: AssetInfoType = { img: "q24_11" };
	static answer25: AssetInfoType = { img: "q25_11" };
	static answer26: AssetInfoType = { img: "q26_11" };
	static answer27: AssetInfoType = { img: "q27_11" };
	static answer28: AssetInfoType = { img: "q28_11" };
	static answer29: AssetInfoType = { img: "q29_11" };


	// モザイク画像
	static mosaic0101: AssetInfoType = { img: "q01_01" };
	static mosaic0102: AssetInfoType = { img: "q01_02" };
	static mosaic0103: AssetInfoType = { img: "q01_03" };
	static mosaic0104: AssetInfoType = { img: "q01_04" };
	static mosaic0105: AssetInfoType = { img: "q01_05" };
	static mosaic0106: AssetInfoType = { img: "q01_06" };
	static mosaic0107: AssetInfoType = { img: "q01_07" };
	static mosaic0108: AssetInfoType = { img: "q01_08" };
	static mosaic0109: AssetInfoType = { img: "q01_09" };
	static mosaic0110: AssetInfoType = { img: "q01_10" };

	static mosaic0201: AssetInfoType = { img: "q02_01" };
	static mosaic0202: AssetInfoType = { img: "q02_02" };
	static mosaic0203: AssetInfoType = { img: "q02_03" };
	static mosaic0204: AssetInfoType = { img: "q02_04" };
	static mosaic0205: AssetInfoType = { img: "q02_05" };
	static mosaic0206: AssetInfoType = { img: "q02_06" };
	static mosaic0207: AssetInfoType = { img: "q02_07" };
	static mosaic0208: AssetInfoType = { img: "q02_08" };
	static mosaic0209: AssetInfoType = { img: "q02_09" };
	static mosaic0210: AssetInfoType = { img: "q02_10" };

	static mosaic0301: AssetInfoType = { img: "q03_01" };
	static mosaic0302: AssetInfoType = { img: "q03_02" };
	static mosaic0303: AssetInfoType = { img: "q03_03" };
	static mosaic0304: AssetInfoType = { img: "q03_04" };
	static mosaic0305: AssetInfoType = { img: "q03_05" };
	static mosaic0306: AssetInfoType = { img: "q03_06" };
	static mosaic0307: AssetInfoType = { img: "q03_07" };
	static mosaic0308: AssetInfoType = { img: "q03_08" };
	static mosaic0309: AssetInfoType = { img: "q03_09" };
	static mosaic0310: AssetInfoType = { img: "q03_10" };

	static mosaic0401: AssetInfoType = { img: "q04_01" };
	static mosaic0402: AssetInfoType = { img: "q04_02" };
	static mosaic0403: AssetInfoType = { img: "q04_03" };
	static mosaic0404: AssetInfoType = { img: "q04_04" };
	static mosaic0405: AssetInfoType = { img: "q04_05" };
	static mosaic0406: AssetInfoType = { img: "q04_06" };
	static mosaic0407: AssetInfoType = { img: "q04_07" };
	static mosaic0408: AssetInfoType = { img: "q04_08" };
	static mosaic0409: AssetInfoType = { img: "q04_09" };
	static mosaic0410: AssetInfoType = { img: "q04_10" };

	static mosaic0501: AssetInfoType = { img: "q05_01" };
	static mosaic0502: AssetInfoType = { img: "q05_02" };
	static mosaic0503: AssetInfoType = { img: "q05_03" };
	static mosaic0504: AssetInfoType = { img: "q05_04" };
	static mosaic0505: AssetInfoType = { img: "q05_05" };
	static mosaic0506: AssetInfoType = { img: "q05_06" };
	static mosaic0507: AssetInfoType = { img: "q05_07" };
	static mosaic0508: AssetInfoType = { img: "q05_08" };
	static mosaic0509: AssetInfoType = { img: "q05_09" };
	static mosaic0510: AssetInfoType = { img: "q05_10" };

	static mosaic0601: AssetInfoType = { img: "q06_01" };
	static mosaic0602: AssetInfoType = { img: "q06_02" };
	static mosaic0603: AssetInfoType = { img: "q06_03" };
	static mosaic0604: AssetInfoType = { img: "q06_04" };
	static mosaic0605: AssetInfoType = { img: "q06_05" };
	static mosaic0606: AssetInfoType = { img: "q06_06" };
	static mosaic0607: AssetInfoType = { img: "q06_07" };
	static mosaic0608: AssetInfoType = { img: "q06_08" };
	static mosaic0609: AssetInfoType = { img: "q06_09" };
	static mosaic0610: AssetInfoType = { img: "q06_10" };

	static mosaic0701: AssetInfoType = { img: "q07_01" };
	static mosaic0702: AssetInfoType = { img: "q07_02" };
	static mosaic0703: AssetInfoType = { img: "q07_03" };
	static mosaic0704: AssetInfoType = { img: "q07_04" };
	static mosaic0705: AssetInfoType = { img: "q07_05" };
	static mosaic0706: AssetInfoType = { img: "q07_06" };
	static mosaic0707: AssetInfoType = { img: "q07_07" };
	static mosaic0708: AssetInfoType = { img: "q07_08" };
	static mosaic0709: AssetInfoType = { img: "q07_09" };
	static mosaic0710: AssetInfoType = { img: "q07_10" };

	static mosaic0801: AssetInfoType = { img: "q08_01" };
	static mosaic0802: AssetInfoType = { img: "q08_02" };
	static mosaic0803: AssetInfoType = { img: "q08_03" };
	static mosaic0804: AssetInfoType = { img: "q08_04" };
	static mosaic0805: AssetInfoType = { img: "q08_05" };
	static mosaic0806: AssetInfoType = { img: "q08_06" };
	static mosaic0807: AssetInfoType = { img: "q08_07" };
	static mosaic0808: AssetInfoType = { img: "q08_08" };
	static mosaic0809: AssetInfoType = { img: "q08_09" };
	static mosaic0810: AssetInfoType = { img: "q08_10" };

	static mosaic0901: AssetInfoType = { img: "q09_01" };
	static mosaic0902: AssetInfoType = { img: "q09_02" };
	static mosaic0903: AssetInfoType = { img: "q09_03" };
	static mosaic0904: AssetInfoType = { img: "q09_04" };
	static mosaic0905: AssetInfoType = { img: "q09_05" };
	static mosaic0906: AssetInfoType = { img: "q09_06" };
	static mosaic0907: AssetInfoType = { img: "q09_07" };
	static mosaic0908: AssetInfoType = { img: "q09_08" };
	static mosaic0909: AssetInfoType = { img: "q09_09" };
	static mosaic0910: AssetInfoType = { img: "q09_10" };

	static mosaic1001: AssetInfoType = { img: "q10_01" };
	static mosaic1002: AssetInfoType = { img: "q10_02" };
	static mosaic1003: AssetInfoType = { img: "q10_03" };
	static mosaic1004: AssetInfoType = { img: "q10_04" };
	static mosaic1005: AssetInfoType = { img: "q10_05" };
	static mosaic1006: AssetInfoType = { img: "q10_06" };
	static mosaic1007: AssetInfoType = { img: "q10_07" };
	static mosaic1008: AssetInfoType = { img: "q10_08" };
	static mosaic1009: AssetInfoType = { img: "q10_09" };
	static mosaic1010: AssetInfoType = { img: "q10_10" };

	static mosaic1101: AssetInfoType = { img: "q11_01" };
	static mosaic1102: AssetInfoType = { img: "q11_02" };
	static mosaic1103: AssetInfoType = { img: "q11_03" };
	static mosaic1104: AssetInfoType = { img: "q11_04" };
	static mosaic1105: AssetInfoType = { img: "q11_05" };
	static mosaic1106: AssetInfoType = { img: "q11_06" };
	static mosaic1107: AssetInfoType = { img: "q11_07" };
	static mosaic1108: AssetInfoType = { img: "q11_08" };
	static mosaic1109: AssetInfoType = { img: "q11_09" };
	static mosaic1110: AssetInfoType = { img: "q11_10" };

	static mosaic1201: AssetInfoType = { img: "q12_01" };
	static mosaic1202: AssetInfoType = { img: "q12_02" };
	static mosaic1203: AssetInfoType = { img: "q12_03" };
	static mosaic1204: AssetInfoType = { img: "q12_04" };
	static mosaic1205: AssetInfoType = { img: "q12_05" };
	static mosaic1206: AssetInfoType = { img: "q12_06" };
	static mosaic1207: AssetInfoType = { img: "q12_07" };
	static mosaic1208: AssetInfoType = { img: "q12_08" };
	static mosaic1209: AssetInfoType = { img: "q12_09" };
	static mosaic1210: AssetInfoType = { img: "q12_10" };

	static mosaic1301: AssetInfoType = { img: "q13_01" };
	static mosaic1302: AssetInfoType = { img: "q13_02" };
	static mosaic1303: AssetInfoType = { img: "q13_03" };
	static mosaic1304: AssetInfoType = { img: "q13_04" };
	static mosaic1305: AssetInfoType = { img: "q13_05" };
	static mosaic1306: AssetInfoType = { img: "q13_06" };
	static mosaic1307: AssetInfoType = { img: "q13_07" };
	static mosaic1308: AssetInfoType = { img: "q13_08" };
	static mosaic1309: AssetInfoType = { img: "q13_09" };
	static mosaic1310: AssetInfoType = { img: "q13_10" };

	static mosaic1401: AssetInfoType = { img: "q14_01" };
	static mosaic1402: AssetInfoType = { img: "q14_02" };
	static mosaic1403: AssetInfoType = { img: "q14_03" };
	static mosaic1404: AssetInfoType = { img: "q14_04" };
	static mosaic1405: AssetInfoType = { img: "q14_05" };
	static mosaic1406: AssetInfoType = { img: "q14_06" };
	static mosaic1407: AssetInfoType = { img: "q14_07" };
	static mosaic1408: AssetInfoType = { img: "q14_08" };
	static mosaic1409: AssetInfoType = { img: "q14_09" };
	static mosaic1410: AssetInfoType = { img: "q14_10" };

	static mosaic1501: AssetInfoType = { img: "q15_01" };
	static mosaic1502: AssetInfoType = { img: "q15_02" };
	static mosaic1503: AssetInfoType = { img: "q15_03" };
	static mosaic1504: AssetInfoType = { img: "q15_04" };
	static mosaic1505: AssetInfoType = { img: "q15_05" };
	static mosaic1506: AssetInfoType = { img: "q15_06" };
	static mosaic1507: AssetInfoType = { img: "q15_07" };
	static mosaic1508: AssetInfoType = { img: "q15_08" };
	static mosaic1509: AssetInfoType = { img: "q15_09" };
	static mosaic1510: AssetInfoType = { img: "q15_10" };

	static mosaic1601: AssetInfoType = { img: "q16_01" };
	static mosaic1602: AssetInfoType = { img: "q16_02" };
	static mosaic1603: AssetInfoType = { img: "q16_03" };
	static mosaic1604: AssetInfoType = { img: "q16_04" };
	static mosaic1605: AssetInfoType = { img: "q16_05" };
	static mosaic1606: AssetInfoType = { img: "q16_06" };
	static mosaic1607: AssetInfoType = { img: "q16_07" };
	static mosaic1608: AssetInfoType = { img: "q16_08" };
	static mosaic1609: AssetInfoType = { img: "q16_09" };
	static mosaic1610: AssetInfoType = { img: "q16_10" };

	static mosaic1701: AssetInfoType = { img: "q17_01" };
	static mosaic1702: AssetInfoType = { img: "q17_02" };
	static mosaic1703: AssetInfoType = { img: "q17_03" };
	static mosaic1704: AssetInfoType = { img: "q17_04" };
	static mosaic1705: AssetInfoType = { img: "q17_05" };
	static mosaic1706: AssetInfoType = { img: "q17_06" };
	static mosaic1707: AssetInfoType = { img: "q17_07" };
	static mosaic1708: AssetInfoType = { img: "q17_08" };
	static mosaic1709: AssetInfoType = { img: "q17_09" };
	static mosaic1710: AssetInfoType = { img: "q17_10" };

	static mosaic1801: AssetInfoType = { img: "q18_01" };
	static mosaic1802: AssetInfoType = { img: "q18_02" };
	static mosaic1803: AssetInfoType = { img: "q18_03" };
	static mosaic1804: AssetInfoType = { img: "q18_04" };
	static mosaic1805: AssetInfoType = { img: "q18_05" };
	static mosaic1806: AssetInfoType = { img: "q18_06" };
	static mosaic1807: AssetInfoType = { img: "q18_07" };
	static mosaic1808: AssetInfoType = { img: "q18_08" };
	static mosaic1809: AssetInfoType = { img: "q18_09" };
	static mosaic1810: AssetInfoType = { img: "q18_10" };

	static mosaic1901: AssetInfoType = { img: "q19_01" };
	static mosaic1902: AssetInfoType = { img: "q19_02" };
	static mosaic1903: AssetInfoType = { img: "q19_03" };
	static mosaic1904: AssetInfoType = { img: "q19_04" };
	static mosaic1905: AssetInfoType = { img: "q19_05" };
	static mosaic1906: AssetInfoType = { img: "q19_06" };
	static mosaic1907: AssetInfoType = { img: "q19_07" };
	static mosaic1908: AssetInfoType = { img: "q19_08" };
	static mosaic1909: AssetInfoType = { img: "q19_09" };
	static mosaic1910: AssetInfoType = { img: "q19_10" };

	static mosaic2001: AssetInfoType = { img: "q20_01" };
	static mosaic2002: AssetInfoType = { img: "q20_02" };
	static mosaic2003: AssetInfoType = { img: "q20_03" };
	static mosaic2004: AssetInfoType = { img: "q20_04" };
	static mosaic2005: AssetInfoType = { img: "q20_05" };
	static mosaic2006: AssetInfoType = { img: "q20_06" };
	static mosaic2007: AssetInfoType = { img: "q20_07" };
	static mosaic2008: AssetInfoType = { img: "q20_08" };
	static mosaic2009: AssetInfoType = { img: "q20_09" };
	static mosaic2010: AssetInfoType = { img: "q20_10" };

	static mosaic2101: AssetInfoType = { img: "q21_01" };
	static mosaic2102: AssetInfoType = { img: "q21_02" };
	static mosaic2103: AssetInfoType = { img: "q21_03" };
	static mosaic2104: AssetInfoType = { img: "q21_04" };
	static mosaic2105: AssetInfoType = { img: "q21_05" };
	static mosaic2106: AssetInfoType = { img: "q21_06" };
	static mosaic2107: AssetInfoType = { img: "q21_07" };
	static mosaic2108: AssetInfoType = { img: "q21_08" };
	static mosaic2109: AssetInfoType = { img: "q21_09" };
	static mosaic2110: AssetInfoType = { img: "q21_10" };

	static mosaic2201: AssetInfoType = { img: "q22_01" };
	static mosaic2202: AssetInfoType = { img: "q22_02" };
	static mosaic2203: AssetInfoType = { img: "q22_03" };
	static mosaic2204: AssetInfoType = { img: "q22_04" };
	static mosaic2205: AssetInfoType = { img: "q22_05" };
	static mosaic2206: AssetInfoType = { img: "q22_06" };
	static mosaic2207: AssetInfoType = { img: "q22_07" };
	static mosaic2208: AssetInfoType = { img: "q22_08" };
	static mosaic2209: AssetInfoType = { img: "q22_09" };
	static mosaic2210: AssetInfoType = { img: "q22_10" };

	static mosaic2301: AssetInfoType = { img: "q23_01" };
	static mosaic2302: AssetInfoType = { img: "q23_02" };
	static mosaic2303: AssetInfoType = { img: "q23_03" };
	static mosaic2304: AssetInfoType = { img: "q23_04" };
	static mosaic2305: AssetInfoType = { img: "q23_05" };
	static mosaic2306: AssetInfoType = { img: "q23_06" };
	static mosaic2307: AssetInfoType = { img: "q23_07" };
	static mosaic2308: AssetInfoType = { img: "q23_08" };
	static mosaic2309: AssetInfoType = { img: "q23_09" };
	static mosaic2310: AssetInfoType = { img: "q23_10" };

	static mosaic2401: AssetInfoType = { img: "q24_01" };
	static mosaic2402: AssetInfoType = { img: "q24_02" };
	static mosaic2403: AssetInfoType = { img: "q24_03" };
	static mosaic2404: AssetInfoType = { img: "q24_04" };
	static mosaic2405: AssetInfoType = { img: "q24_05" };
	static mosaic2406: AssetInfoType = { img: "q24_06" };
	static mosaic2407: AssetInfoType = { img: "q24_07" };
	static mosaic2408: AssetInfoType = { img: "q24_08" };
	static mosaic2409: AssetInfoType = { img: "q24_09" };
	static mosaic2410: AssetInfoType = { img: "q24_10" };

	static mosaic2501: AssetInfoType = { img: "q25_01" };
	static mosaic2502: AssetInfoType = { img: "q25_02" };
	static mosaic2503: AssetInfoType = { img: "q25_03" };
	static mosaic2504: AssetInfoType = { img: "q25_04" };
	static mosaic2505: AssetInfoType = { img: "q25_05" };
	static mosaic2506: AssetInfoType = { img: "q25_06" };
	static mosaic2507: AssetInfoType = { img: "q25_07" };
	static mosaic2508: AssetInfoType = { img: "q25_08" };
	static mosaic2509: AssetInfoType = { img: "q25_09" };
	static mosaic2510: AssetInfoType = { img: "q25_10" };

	static mosaic2601: AssetInfoType = { img: "q26_01" };
	static mosaic2602: AssetInfoType = { img: "q26_02" };
	static mosaic2603: AssetInfoType = { img: "q26_03" };
	static mosaic2604: AssetInfoType = { img: "q26_04" };
	static mosaic2605: AssetInfoType = { img: "q26_05" };
	static mosaic2606: AssetInfoType = { img: "q26_06" };
	static mosaic2607: AssetInfoType = { img: "q26_07" };
	static mosaic2608: AssetInfoType = { img: "q26_08" };
	static mosaic2609: AssetInfoType = { img: "q26_09" };
	static mosaic2610: AssetInfoType = { img: "q26_10" };

	static mosaic2701: AssetInfoType = { img: "q27_01" };
	static mosaic2702: AssetInfoType = { img: "q27_02" };
	static mosaic2703: AssetInfoType = { img: "q27_03" };
	static mosaic2704: AssetInfoType = { img: "q27_04" };
	static mosaic2705: AssetInfoType = { img: "q27_05" };
	static mosaic2706: AssetInfoType = { img: "q27_06" };
	static mosaic2707: AssetInfoType = { img: "q27_07" };
	static mosaic2708: AssetInfoType = { img: "q27_08" };
	static mosaic2709: AssetInfoType = { img: "q27_09" };
	static mosaic2710: AssetInfoType = { img: "q27_10" };

	static mosaic2801: AssetInfoType = { img: "q28_01" };
	static mosaic2802: AssetInfoType = { img: "q28_02" };
	static mosaic2803: AssetInfoType = { img: "q28_03" };
	static mosaic2804: AssetInfoType = { img: "q28_04" };
	static mosaic2805: AssetInfoType = { img: "q28_05" };
	static mosaic2806: AssetInfoType = { img: "q28_06" };
	static mosaic2807: AssetInfoType = { img: "q28_07" };
	static mosaic2808: AssetInfoType = { img: "q28_08" };
	static mosaic2809: AssetInfoType = { img: "q28_09" };
	static mosaic2810: AssetInfoType = { img: "q28_10" };

	static mosaic2901: AssetInfoType = { img: "q29_01" };
	static mosaic2902: AssetInfoType = { img: "q29_02" };
	static mosaic2903: AssetInfoType = { img: "q29_03" };
	static mosaic2904: AssetInfoType = { img: "q29_04" };
	static mosaic2905: AssetInfoType = { img: "q29_05" };
	static mosaic2906: AssetInfoType = { img: "q29_06" };
	static mosaic2907: AssetInfoType = { img: "q29_07" };
	static mosaic2908: AssetInfoType = { img: "q29_08" };
	static mosaic2909: AssetInfoType = { img: "q29_09" };
	static mosaic2910: AssetInfoType = { img: "q29_10" };
}
