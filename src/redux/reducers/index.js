import clone from "lodash.clonedeep";
import isEqual from "lodash.isequal";

import Settings from "../../data/Settings";
import PluginService from "../../services/PluginService";
import OverlayPluginService from "../../services/PluginService/OverlayPluginService";
import ObjectService from "../../services/ObjectService";
import GameDataProcessor from "../../processors/GameDataProcessor";
import ThemeService from "../../services/ThemeService";
import SampleGameData from "../../constants/SampleGameData";
import SampleHistoryData from "../../constants/SampleHistoryData";
import SampleAggroData from "../../constants/SampleAggroData";
import TTSService from "../../services/TTSService";
import TabSyncService from "../../services/TabSyncService";

const querystring = require("querystring");

let params                = new querystring.parse(String(window.location.search).substring(1));
let overlayplugin_service = new OverlayPluginService();
let uuid                  = (window.OverlayPluginApi) ? window.OverlayPluginApi.overlayUuid : "browser";

const initial_state = {
	plugin_service : new PluginService(),
	settings_data  : Settings,
	last_activity  : (new Date()).getTime() / 1000,
	internal       : {
		viewing              : "tables",
		character_name       : "YOU",
		character_id         : null,
		rank                 : "N/A",
		game                 : {},
		enmity               : {},
		aggro                : [],
		data_history         : {},
		encounter_history    : [],
		detail_player        : {},
		party                : [],
		spells               : {
			in_use : {}
		},
		viewing_history      : false,
		overlayplugin        : overlayplugin_service.isOverlayPlugin(),
		overlayplugin_author : overlayplugin_service.getAuthor(),
		new_version          : false,
		mode                 : params["mode"] || localStorage.getItem(`${uuid}-mode`) || "stats",
	},
	settings : {}
};

function rootReducer(state, action) {
	if (!state) {
		state = initial_state;

		ThemeService.setMode(state.internal.mode);
	}

	let new_state = false;
	let full_key  = action.key;

	switch (action.type) {
		case "setSetting":
			state.settings_data.setSetting(action.key, action.payload);

			full_key  = `settings.${action.key}`;
			new_state = createNewState(state, full_key, action);

			break;

		case "setSettings":
			new_state = clone(state);

			for (let setting of action.data) {
				new_state.settings_data.setSetting(setting.key, setting.payload, true);

				full_key  = `settings.${setting.key}`;
				new_state = createNewState(new_state, full_key, setting);
			}

			new_state.settings_data.saveSettings(true).then(() => TabSyncService.saveAction(action));
			break;

		case "parseGameData":
			let new_history = (
				!action.payload.Encounter ||
				!state.internal.encounter_history.length ||
				!state.internal.encounter_history[0].game.Encounter ||
				+action.payload.Encounter.DURATION < +state.internal.encounter_history[0].game.Encounter.DURATION
			);

			action.payload = GameDataProcessor.normalizeLocales(action.payload, state.settings.interface.language, (new_history) ? undefined : state);
			action.payload = GameDataProcessor.injectEnmity(action.payload, state);

			new_state = createNewState(state, full_key, action);

			if (new_history) {
				if (new_state.internal.encounter_history.length === 5) {
					new_state.internal.encounter_history.pop();
				}

				new_state.internal.encounter_history.unshift({
					game         : {},
					aggro        : [],
					enmity       : {},
					data_history : {}
				});
			}

			GameDataProcessor.appendHistory(action.payload, new_state);

			new_state.internal.encounter_history[0].game = action.payload;

			if ((new_history && !new_state.internal.viewing_history) || !new_state.internal.viewing_history) {
				new_state.internal.game         = new_state.internal.encounter_history[0].game;
				new_state.internal.data_history = new_state.internal.encounter_history[0].data_history;
			}

			GameDataProcessor.processCombatDataTTS(new_state.internal.game, new_state);
			break;

		case "loadSampleData":
			let tmp_action;

			switch (state.internal.mode) {
				case "stats":
					tmp_action = {
						type : "loadSampleData"
					};

					state.internal.data_history = SampleHistoryData;

					tmp_action.payload = GameDataProcessor.normalizeLocales(SampleGameData, state.settings.interface.language, state, true);

					new_state  = createNewState(state, "internal.game", tmp_action);
					tmp_action = {
						payload : GameDataProcessor.normalizeAggroList(SampleAggroData)
					};
					new_state  = createNewState(new_state, "internal.aggro", tmp_action);

					break;

				case "spells":
					let date = new Date();

					tmp_action = {
						payload : {
							"spell-7499"  : {
								type : "skill",
								id   : 7499,
								time : date
							},
							"spell-16481" :  {
								type : "skill",
								id   : 16481,
								time : date
							},
							"spell-16482" : {
								type : "skill",
								id   : 16482,
								time : date
							},
							"effect-1298" : {
								type     : "effect",
								id       : 1298,
								time     : date,
								duration : 40
							},
							"effect-1299" : {
								type     : "effect",
								id       : 1299,
								time     : date,
								duration : 40
							}
						}
					};
					new_state  = createNewState(state, "internal.spells.in_use", tmp_action);

					break;

				default:
					break;
			}

			break;

		case "loadHistoryEntry":
			let index = action.payload;

			new_state = clone(state);

			new_state.internal.viewing_history = (index !== 0);

			for (let key in new_state.internal.encounter_history[index]) {
				new_state.internal[key] = new_state.internal.encounter_history[index][key];
			}

			break;

		case "parseEnmity":
			if (!state.internal.encounter_history.length) {
				return state;
			}

			action.payload = GameDataProcessor.processEnmity(action.payload);

			if (isEqual(action.payload, state.internal.encounter_history[0].enmity)) {
				return state;
			}

			new_state = clone(state);

			new_state.internal.encounter_history[0].enmity = action.payload;

			if (!new_state.internal.viewing_history) {
				new_state.internal.enmity = action.payload;
			}

			break;

		case "parseAggroList":
			if (!state.internal.encounter_history.length) {
				return state;
			}

			action.payload = GameDataProcessor.normalizeAggroList(action.payload);
			new_state      = clone(state);

			new_state.internal.encounter_history[0].aggro = action.payload;

			if (!new_state.internal.viewing_history) {
				new_state.internal.aggro = action.payload;
			}

			GameDataProcessor.processAggroTTS(new_state.internal.aggro, new_state);
			break;

		case "parseParty":
			new_state = clone(state);
			
			new_state.internal.party = GameDataProcessor.processParty(action.payload);

			break;

		case "changeMode":
			new_state = createNewState(state, full_key, action);

			new_state.plugin_service.updateSubscriptions(new_state.settings_data, new_state.internal);

			localStorage.setItem(`${uuid}-mode`, new_state.internal.mode);
			break;

		case "parseLogLine":
			switch (state.internal.mode) {
				case "stats":
					TTSService.processLogLine(action.payload, state);
					break;

				case "spells":
					let in_use = GameDataProcessor.parseSpellLogLine(action.payload, state);

					if (in_use !== false) {
						new_state = clone(state);

						new_state.internal.spells.in_use = in_use;
					}

					break;
				
				default:
					break;
			}

			break;

		default:
			new_state = createNewState(state, full_key, action);
			break;
	}

	return Object.assign(
		{},
		new_state || state
	);
};

function createNewState(state, full_key, action) {
	if (!full_key) {
		return false;
	}

	let new_state = clone(state);

	new_state.plugin_service = state.plugin_service;

	if (["parseGameData", "loadSampleData"].indexOf(action.type) !== -1) {
		new_state.last_activity = (new Date()).getTime() / 1000;

		if (action.type === "parseGameData") {
			return new_state;
		}
	}

	ObjectService.setByKeyPath(new_state, full_key, action.payload);

	if (["settings", "settings.interface.theme"].indexOf(full_key) !== -1) {
		let theme = (full_key === "settings") ? action.payload.interface.theme : action.payload;

		ThemeService.setTheme(theme);
	}

	if (["settings", "settings.interface.minimal_theme"].indexOf(full_key) !== -1) {
		let minimal_theme = (full_key === "settings") ? action.payload.interface.minimal_theme : action.payload;

		ThemeService.toggleMinimal(minimal_theme);
	}

	if (full_key === "internal.mode") {
		ThemeService.setMode(action.payload);
	}

	if (["settings", "settings.tts.rules"].indexOf(full_key) !== -1) {
		let rules = (full_key === "settings") ? action.payload.tts.rules : action.payload;

		TTSService.updateRules(rules);
	}

	return new_state;
}

export default rootReducer;