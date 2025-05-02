import { ItemQualityType } from "./types";

export const formatDate = (
	inputDate: Date,
	format: "long" | "short" = "long"
): string => {
	const date = new Date(inputDate);

	const day = String(date.getDate()).padStart(2, "0");
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	if (format === "short") {
		return `${day} ${month} (${hours}:${minutes})`; // 23 Feb (13:48)
	} else {
		return `${day} ${month} ${year}, ${hours}:${minutes}`; // 23 Feb 2025, 13:48
	}
};

export const truncateString = (str: string, maxLength: number = 80): string => {
	if (str.length <= maxLength) {
		return str;
	}

	return str.slice(0, maxLength) + "...";
};

export const getItemGradient = (quality: ItemQualityType) => {
	return {
		"Factory New": {
			from: "#2E2F3F80",
			via: "#3E2E6533",
			to: "#204e74",
		},
		"Minimal Wear": {
			from: "#2E2F3F80",
			via: "#3E2E6533",
			to: "#2c7153",
		},
		"Field-Tested": {
			from: "#2E2F3F80",
			via: "#2E376533",
			to: "#8c6d3d",
		},
		"Well-Worn": {
			from: "#2E2F3F80",
			via: "#2E376533",
			to: "#754d36",
		},
		"Battle-Scarred": {
			from: "#2E2F3F80",
			via: "#2E376533",
			to: "#7c2e41",
		},
	}[quality];
};
