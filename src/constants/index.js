let calculateEffectiveHealed = function(player, players) {
	let total_effective_heals  = 0;
	let player_effective_heals = 0;

	for (let tmp_player of players) {
		let ratio           = 1 - (+tmp_player.OverHealPct.replace("%", "") / 100);
		let effective_heals = +tmp_player.healed * ratio;

		total_effective_heals += effective_heals;

		if (tmp_player.name === player.name) {
			player_effective_heals = effective_heals;
		}
	}

	let effective_ratio = (player_effective_heals / total_effective_heals * 100).toFixed(0) + "%";

	return effective_ratio;
};

let calculateEffectiveHPS = function(player) {
	let ratio = 1 - (+player.OverHealPct.replace("%", "") / 100);
	let hps   = +player.enchps * ratio;

	return hps;
};

let calculateTankedDamagePercent = function(player, players) {
	let total_damage_taken  = 0;
	let player_damage_taken = 0;

	for (let tmp_player of players) {
		total_damage_taken += +tmp_player.damagetaken;

		if (tmp_player.name === player.name) {
			player_damage_taken = +tmp_player.damagetaken;
		}
	}

	let effective_ratio = (player_damage_taken / total_damage_taken * 100).toFixed(0) + "%";

	return effective_ratio;
};

let formatMaxHit = function(player) {
	if (!player["maxhit"]) {
		return "N/A";
	}

	let parts = player["maxhit"].split("-");

	parts[1] = (+parts[1]).toLocaleString();

	let value = parts.join(" - ");

	return value;
}

let formatMaxHeal = function(player) {
	if (!player["maxheal"]) {
		return "N/A";
	}

	let parts = player["maxheal"].split("-");

	parts[1] = (+parts[1]).toLocaleString();

	let value = parts.join(" - ");

	return value;
}

let PlayerDataCustomValues = {
	"effective_heal_pct" : calculateEffectiveHealed,
	"effective_hps"      : calculateEffectiveHPS,
	"damage_taken_pct"   : calculateTankedDamagePercent,
	"max_heal_format"    : formatMaxHeal,
	"max_hit_format"     : formatMaxHit
};

let PlayerDataTitles = {
	"BlockPct"           : {
		short : "Blk %",
		long  : "Block %"
	},
	"CritDirectHitPct"   : {
		short : "CH DH %",
		long  : "Critical Direct Hit %"
	},
	"critheal%"          : {
		short : "CH %",
		long  : "Critical Heal %"
	},
	"crithit%"           : {
		short : "CH %",
		long  : "Critical Hit %"
	},
	"damage"             : {
		short : "Dmg",
		long  : "Damage"
	},
	"damage%"            : {
		short : "Dmg %",
		long  : "Damage %"
	},
	"damage_taken_pct"   : {
		short : "Dmg %",
		long  : "Damage Taken %"
	},
	"damagetaken"        : {
		short : "Dmg",
		long  : "Damage Taken"
	},
	"deaths"             : {
		short : "Death",
		long  : "Deaths"
	},
	"DirectHitPct"       : {
		short : "DH %",
		long  : "Direct Hit %"
	},
	"effective_heal_pct" : {
		short : "Ef H %",
		long  : "Effective Heal %"
	},
	"effective_hps"      : {
		short : "Ef HPS",
		long  : "Effective Heals Per Second"
	},
	"encdps"             : {
		short : "DPS",
		long  : "Damage Per Second"
	},
	"enchps"             : {
		short : "HPS",
		long  : "Heal Per Second"
	},
	"healed"             : {
		short : "Heal",
		long  : "Total Heal"
	},
	"healed%"            : {
		short : "Heal %",
		long  : "Heal %"
	},
	"healstaken"         : {
		short : "Heals",
		long  : "Heals Received"
	},
	"max_heal_format"    : {
		short : "Mx Heal",
		long  : "Max Heal"
	},
	"max_hit_format"     : {
		short : "Mx Hit",
		long  : "Max Hit"
	},
	"OverHealPct"        : {
		short : "Ovr %",
		long  : "Overheal %"
	}
};

const PlayerMetricTypeData = {
	dps  : [
		"CritDirectHitPct",
		"crithit%",
		"damage",
		"damage%",
		"DirectHitPct",
		"encdps",
		"max_hit_format"
	],
	heal : [
		"critheal%",
		"effective_heal_pct",
		"effective_hps",
		"enchps",
		"healed",
		"healed%",
		"max_heal_format",
		"OverHealPct"
	],
	tank : [
		"BlockPct",
		"damage_taken_pct",
		"damagetaken",
		"deaths",
		"healstaken"
	]
};

export default {
	PlayerDataCustomValues,
	PlayerDataTitles,
	PlayerMetricTypeData
};