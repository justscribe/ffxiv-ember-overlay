import LocalizationService from "../services/LocalizationService";

const language_options = [
	{
		key   : "en",
		value : "en",
		text  : "English"
	},
	{
		key   : "cn",
		value : "cn",
		text  : "中文"
	},
	{
		key   : "de",
		value : "de",
		text  : "Deutsch"
	},
	{
		key   : "fr",
		value : "fr",
		text  : "Français"
	},
	{
		key   : "jp",
		value : "jp",
		text  : "日本語"
	},
	{
		key   : "kr",
		value : "kr",
		text  : "한국어"
	},
	{
		key   : "pt",
		value : "pt",
		text  : "Português"
	},
	{
		key   : "es",
		value : "es",
		text  : "Español"
	},
	{
		key   : "ua",
		value : "ua",
		text  : "Українська"
	}
];
const decimal_options  = [
	{
		key   : "0",
		value : "0",
		text  : "0"
	},
	{
		key   : "1",
		value : 1,
		text  : "1"
	},
	{
		key   : "2",
		value : 2,
		text  : "2"
	},
];
const theme_options = [
	{
		key   : "ffxiv-dark",
		value : "ffxiv-dark",
		text  : "FFXIV Dark"
	},
	{
		key   : "ffxiv-light",
		value : "ffxiv-light",
		text  : "FFXIV Light"
	},
	{
		key   : "ffxiv-classic",
		value : "ffxiv-classic",
		text  : "FFXIV Classic"
	}
];

const SettingsSchema = {
	all_before : {
		sections : [
			{
				path     : "interface",
				sections : [
					{
						settings : [
							{
								key_path : "interface.language",
								locale   : "interface.language",
								type     : "select",
								options  : language_options
							},
							{
								key_path      : "interface.player_name",
								type          : "textbox",
								exclude_modes : [
									"spells"
								]
							},
							{
								key_path      : "interface.blur_job_icons",
								type          : "checkbox",
								exclude_modes : [
									"spells"
								]
							},
							{
								key_path      : "interface.collapse_down",
								type          : "checkbox",
								exclude_modes : [
									"spells"
								]
							},
							{
								key_path      : "interface.footer_when_collapsed",
								type          : "checkbox",
								exclude_modes : [
									"spells"
								]
							},
							{
								key_path      : "interface.hide_top_bar",
								type          : "checkbox",
								exclude_modes : [
									"stats"
								]
							},
							{
								key_path      : "interface.auto_hide",
								type          : "checkbox",
								exclude_modes : [
									"spells"
								]
							},
							{
								key_path      : "interface.auto_hide_delay",
								type          : "slider",
								exclude_modes : [
									"spells"
								],
								range   : "min",
								minimum : 0,
								maximum : 600
							}
						]
					},
					{
						exclude_modes : [
							"spells"
						],
						settings : [
							{
								key_path : "interface.top_right_rank",
								type     : "checkbox"
							},
							{
								key_path : "interface.footer_dps",
								type     : "checkbox"
							},
							{
								key_path : "interface.decimal_accuracy",
								type     : "select",
								options  : decimal_options
							},
							{
								key_path : "interface.shorten_thousands",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "interface.opacity",
								type     : "slider",
								range    : "min",
								minimum  : 0,
								maximum  : 100
							},
							{
								key_path : "interface.zoom",
								type     : "slider",
								range    : "min",
								minimum  : 1,
								maximum  : 500
							},
							{
								key_path : "interface.theme",
								type     : "select",
								options  : theme_options
							},
							{
								key_path      : "interface.minimal_theme",
								type          : "checkbox",
								exclude_modes : [
									"spells"
								]
							}
						]
					}
				]
			}
		]
	},
	stats : {
		sections : [
			{
				path     : "metric-names",
				sections : [
					{
						settings : [
							{
								key_path : "custom.metric_names",
								type     : "MetricNameTable",
								options  : () => LocalizationService.getPlayerDataTitles(true, true)
							}
						]
					}
				]
			},
			{
				path     : "tts",
				sections : [
					{
						settings : [
							{
								key_path : "tts.language",
								locale   : "interface.language",
								type     : "select",
								options  : language_options
							},
							{
								key_path : "tts.rules",
								type     : "TTSRulesTable",
								options  : () => LocalizationService.getTTSRuleOptions()
							}
						]
					}
				]
			},
			{
				path     : "player-table",
				sections : [
					{
						settings : [
							{
								key_path : "table_settings.general.table.short_names",
								type     : "select",
								options  : () => LocalizationService.getPlayerShortNameOptions()
							},
							{
								key_path : "table_settings.general.table.footer_at_top",
								type     : "checkbox"
							},
							{
								key_path : "table_settings.general.table.percent_bars",
								type     : "checkbox"
							},
							{
								key_path : "table_settings.general.table.prioritize_party",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "table_columns.dps",
								locale   : "table_columns.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "sort_columns.dps",
								locale   : "sort_columns.dps",
								type     : "select",
								multiple : false,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "table_settings.dps.show_footer",
								locale   : "table_settings.dps.show_footer",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "table_columns.heal",
								locale   : "table_columns.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "sort_columns.heal",
								locale   : "sort_columns.dps",
								type     : "select",
								multiple : false,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "table_settings.heal.show_footer",
								locale   : "table_settings.dps.show_footer",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "table_columns.tank",
								locale   : "table_columns.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "sort_columns.tank",
								locale   : "sort_columns.dps",
								type     : "select",
								multiple : false,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "table_settings.tank.show_footer",
								locale   : "table_settings.dps.show_footer",
								type     : "checkbox"
							}
						]
					}
				]
			},
			{
				path     : "player-detail",
				sections : [
					{
						settings : [
							{
								key_path : "detail_data.dps",
								locale   : "detail_data.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							}
						]
					},
					{
						settings : [
							{
								key_path : "detail_data.heal",
								locale   : "detail_data.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							}
						]
					},
					{
						settings : [
							{
								key_path : "detail_data.tank",
								locale   : "detail_data.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							}
						]
					}
				]
			},
			{
				path     : "raid-view",
				sections : [
					{
						settings : [
							{
								key_path : "sort_columns.raid",
								type     : "select",
								multiple : false,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							},
							{
								key_path : "table_settings.general.raid.short_names",
								type     : "select",
								options  : () => LocalizationService.getPlayerShortNameOptions()
							},
							{
								key_path : "table_settings.general.raid.percent_bars",
								type     : "checkbox"
							},
							{
								key_path : "table_settings.general.raid.prioritize_party",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "table_columns.raid.dps",
								locale   : "table_columns.raid.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							}
						]
					},
					{
						settings : [
							{
								key_path : "table_columns.raid.heal",
								locale   : "table_columns.raid.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							}
						]
					},
					{
						settings : [
							{
								key_path : "table_columns.raid.tank",
								locale   : "table_columns.raid.dps",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getPlayerDataTitles()
							}
						]
					}
				]
			},
			{
				path     : "discord",
				sections : [
					{
						info     : () => LocalizationService.getDiscordWebhookInfo(),
						settings : [
							{
								key_path : "discord.url",
								type     : "textbox",
								fluid    : true
							}
						]
					}
				]
			},
		]
	},
	spells : {
		sections : [
			{
				path : "spells-mode",
				sections : [
					{
						settings : [
							{
								key_path : "spells_mode.spells",
								locale   : "spells_mode.spells",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getoGCDSkillOptions()
							},
							{
								key_path : "spells_mode.reverse_skill",
								locale   : "spells_mode.reverse_skill",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.always_skill",
								locale   : "spells_mode.always_skill",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.always_skill_static",
								locale   : "spells_mode.always_skill_static",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.effects",
								locale   : "spells_mode.effects",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getEffectOptions(false)
							},
							{
								key_path : "spells_mode.reverse_effect",
								locale   : "spells_mode.reverse_effect",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.always_effect",
								locale   : "spells_mode.always_skill",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.always_effect_static",
								locale   : "spells_mode.always_skill_static",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.dots",
								locale   : "spells_mode.dots",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getEffectOptions(true)
							},
							{
								key_path : "spells_mode.reverse_dot",
								locale   : "spells_mode.reverse_dot",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.always_dot",
								locale   : "spells_mode.always_skill",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.always_dot_static",
								locale   : "spells_mode.always_skill_static",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.show_icon",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.use_tts",
								locale   : "spells_mode.use_tts",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.tts_trigger",
								type     : "select",
								options  : () => LocalizationService.getSpellsTTSTriggerOptions()
							},
							{
								key_path : "spells_mode.warning_threshold",
								type     : "slider",
								range    : "min",
								minimum  : 0,
								maximum  : 10
							},
							{
								key_path : "spells_mode.spells_per_row",
								type     : "slider",
								range    : "min",
								minimum  : 1,
								maximum  : 20
							},
							{
								key_path : "spells_mode.layout",
								type     : "select",
								options  : () => LocalizationService.getSpellLayoutOptions()
							},
							{
								key_path : "spells_mode.invert_vertical",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.invert_horizontal",
								type     : "checkbox"
							}
						]
					}
				]
			},
			{
				path : "spells-mode-party",
				sections : [
					{
						settings : [
							{
								key_path : "spells_mode.party_spells",
								locale   : "spells_mode.spells",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getoGCDSkillOptions()
							},
							{
								key_path : "spells_mode.party_reverse_skill",
								locale   : "spells_mode.reverse_skill",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.party_effects",
								locale   : "spells_mode.effects",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getEffectOptions(false)
							},
							{
								key_path : "spells_mode.party_reverse_effect",
								locale   : "spells_mode.reverse_effect",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.party_dots",
								locale   : "spells_mode.dots",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getEffectOptions(true)
							},
							{
								key_path : "spells_mode.party_reverse_dot",
								locale   : "spells_mode.reverse_dot",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.party_use_tts",
								locale   : "spells_mode.use_tts",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.party_zones",
								type     : "select",
								multiple : true,
								search   : true,
								options  : () => LocalizationService.getZoneOptions()
							}
						]
					}
				]
			},
			{
				path : "spells-designer",
				sections : [
					{
						settings : [
							{
								key_path : "spells_mode.designer.skill.warning",
								locale   : "spells_mode.designer.skill.warning",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.skill.cooldown_bottom_left",
								locale   : "spells_mode.designer.skill.cooldown_bottom_left",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.skill.indicator",
								locale   : "spells_mode.designer.skill.indicator",
								type     : "select",
								options  : () => LocalizationService.getSpellDesignerIndicatorOptions()
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.designer.effect.warning",
								locale   : "spells_mode.designer.skill.warning",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.effect.border",
								locale   : "spells_mode.designer.effect.border",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.effect.cooldown_bottom_left",
								locale   : "spells_mode.designer.skill.cooldown_bottom_left",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.effect.indicator",
								locale   : "spells_mode.designer.skill.indicator",
								type     : "select",
								options  : () => LocalizationService.getSpellDesignerIndicatorOptions()
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.designer.dot.warning",
								locale   : "spells_mode.designer.skill.warning",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.dot.border",
								locale   : "spells_mode.designer.effect.border",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.dot.cooldown_bottom_left",
								locale   : "spells_mode.designer.skill.cooldown_bottom_left",
								type     : "checkbox"
							},
							{
								key_path : "spells_mode.designer.dot.indicator",
								locale   : "spells_mode.designer.skill.indicator",
								type     : "select",
								options  : () => LocalizationService.getSpellDesignerIndicatorOptions()
							}
						]
					}
				]
			},
			{
				path : "spells-ui",
				sections : [
					{
						info     : () => LocalizationService.getSpellUIBuilderInfo(),
						settings : [
							{
								key_path : "spells_mode.ui.use",
								type     : "checkbox"
							}
						]
					},
					{
						settings : [
							{
								key_path : "spells_mode.ui.sections",
								type     : "SpellsUITable",
								options  : () => LocalizationService.getSpellTrackingOptions()
							}
						]
					}
				]
			}
		]
	},
	all_after : {
		sections : [
			{
				path     : "custom-css",
				sections : [
					{
						settings : [
							{
								key_path : "custom.css",
								type     : "code"
							}
						]
					}
				]
			}
		]
	}
}

export default SettingsSchema;