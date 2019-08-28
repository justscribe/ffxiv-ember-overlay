import LocalizationService from "../services/LocalizationService";

let short_name_options = [
	{
		key   : "no_short",
		value : "no_short",
		text  : "No"
	},
	{
		key   : "short_first",
		value : "short_first",
		text  : "F. Last"
	},
	{
		key   : "short_last",
		value : "short_last",
		text  : "First L."
	},
	{
		key   : "short_both",
		value : "short_both",
		text  : "F. L."
	}
];

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
		key   : "jp",
		value : "jp",
		text  : "日本語"
	},
	{
		key   : "pt",
		value : "pt",
		text  : "Português"
	}
];

const SettingsSchema = {
	sections : [
		{
			title    : "Interface",
			path     : "interface",
			sections : [
				{
					title    : "General",
					settings : [
						{
							key_path : "interface.language",
							label    : "Language",
							type     : "select",
							options  : language_options,
							value    : obj => obj.props.settings.interface.language
						},
						{
							key_path : "interface.player_name",
							label    : "Player Name",
							type     : "textbox",
							value    : function() {
								return this.props.settings.interface.player_name;
							}
						},
						{
							key_path : "interface.opacity",
							label    : "Overlay Opacity",
							type     : "slider",
							range    : "min",
							minimum  : 0,
							maximum  : 100,
							value    : function() {
								return this.props.settings.interface.opacity;
							}
						},
						{
							key_path : "interface.zoom",
							label    : "Overlay Zoom",
							type     : "slider",
							range    : "min",
							minimum  : 1,
							maximum  : 500,
							value    : function() {
								return this.props.settings.interface.zoom;
							}
						},
						{
							key_path : "interface.top_right_rank",
							label    : "Display Rank in Top Right",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.interface.top_right_rank;
							}
						},
						{
							key_path : "interface.collapse_down",
							label    : "Collapse Downwards",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.interface.collapse_down;
							}
						},
						{
							key_path : "interface.footer_when_collapsed",
							label    : "Show Overlay Footer When Collapsed",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.interface.footer_when_collapsed;
							}
						},
						{
							key_path : "interface.footer_dps",
							label    : "Display Raid DPS in Overlay Footer",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.interface.footer_dps;
							}
						},
						{
							key_path : "interface.light_theme",
							label    : "Use Light Theme",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.interface.light_theme;
							}
						}
					]
				}
			]
		},
		{
			title    : "Player Table",
			path     : "player-table",
			sections : [
				{
					title    : "General",
					settings : [
						{
							key_path : "table_settings.general.table.short_names",
							label    : "Shorten Player Names",
							type     : "select",
							options  : short_name_options,
							value    : function() {
								return this.props.settings.table_settings.general.table.short_names;
							}
						},
						{
							key_path : "table_settings.general.table.footer_at_top",
							label    : "Move Totals (Footer) to Top of Table",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.table_settings.general.table.footer_at_top;
							}
						},
						{
							key_path : "table_settings.general.table.percent_bars",
							label    : "Show Performance Background Bars",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.table_settings.general.table.percent_bars;
							}
						}
					]
				},
				{
					title    : "DPS",
					settings : [
						{
							key_path : "table_columns.dps",
							label    : "Table Columns",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.table_columns.dps;
							}
						},
						{
							key_path : "sort_columns.dps",
							label    : "Default Sort Column",
							type     : "select",
							multiple : false,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.sort_columns.dps;
							}
						},
						{
							key_path : "table_settings.dps.show_footer",
							label    : "Show Footer",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.table_settings.dps.show_footer;
							}
						}
					]
				},
				{
					title    : "Heal",
					settings : [
						{
							key_path : "table_columns.heal",
							label    : "Table Columns",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.table_columns.heal;
							}
						},
						{
							key_path : "sort_columns.heal",
							label    : "Default Sort Column",
							type     : "select",
							multiple : false,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.sort_columns.heal;
							}
						},
						{
							key_path : "table_settings.heal.show_footer",
							label    : "Show Footer",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.table_settings.heal.show_footer;
							}
						}
					]
				},
				{
					title    : "Tank",
					settings : [
						{
							key_path : "table_columns.tank",
							label    : "Table Columns",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.table_columns.tank;
							}
						},
						{
							key_path : "sort_columns.tank",
							label    : "Default Sort Column",
							type     : "select",
							multiple : false,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.sort_columns.tank;
							}
						},
						{
							key_path : "table_settings.tank.show_footer",
							label    : "Show Footer",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.table_settings.tank.show_footer;
							}
						}
					]
				}
			]
		},
		{
			title    : "Player Detail",
			path     : "player-detail",
			sections : [
				{
					title    : "DPS",
					settings : [
						{
							key_path : "detail_data.dps",
							label    : "Player Metrics",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.detail_data.dps;
							}
						}
					]
				},
				{
					title    : "Heal",
					settings : [
						{
							key_path : "detail_data.heal",
							label    : "Player Metrics",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.detail_data.heal;
							}
						}
					]
				},
				{
					title    : "Tank",
					settings : [
						{
							key_path : "detail_data.tank",
							label    : "Player Metrics",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.detail_data.tank;
							}
						}
					]
				}
			]
		},
		{
			title    : "Raid View",
			path     : "raid-view",
			sections : [
				{
					title    : "General",
					settings : [
						{
							key_path : "sort_columns.raid",
							label    : "Default Sort Metric",
							type     : "select",
							multiple : false,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.sort_columns.raid;
							}
						},
						{
							key_path : "table_settings.general.raid.short_names",
							label    : "Shorten Player Names",
							type     : "select",
							options  : short_name_options,
							value    : function() {
								return this.props.settings.table_settings.general.raid.short_names;
							}
						},
						{
							key_path : "table_settings.general.raid.percent_bars",
							label    : "Show Performance Background Bars",
							type     : "checkbox",
							value    : function() {
								return this.props.settings.table_settings.general.raid.percent_bars;
							}
						}
					]
				},
				{
					title    : "DPS",
					settings : [
						{
							key_path : "table_columns.raid.dps",
							label    : "Metrics",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.table_columns.raid.dps;
							}
						}
					]
				},
				{
					title    : "Heal",
					settings : [
						{
							key_path : "table_columns.raid.heal",
							label    : "Metrics",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.table_columns.raid.heal;
							}
						}
					]
				},
				{
					title    : "Tank",
					settings : [
						{
							key_path : "table_columns.raid.tank",
							label    : "Metrics",
							type     : "select",
							multiple : true,
							search   : true,
							options  : LocalizationService.getPlayerDataTitles,
							value    : function() {
								return this.props.settings.table_columns.raid.tank;
							}
						}
					]
				}
			]
		},
		{
			title    : "Custom CSS",
			path     : "custom-css",
			sections : [
				{
					title    : "Custom CSS",
					settings : [
						{
							key_path : "custom.css",
							label    : "User-provided CSS is at your own risk.",
							type     : "code",
							value    : function() {
								return this.props.settings.custom.css;
							}
						}
					]
				}
			]
		}
	]
}

export default SettingsSchema;