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

export const truncateString = (str: string, maxLength: number = 32): string => {
	if (str.length <= maxLength) {
		return str;
	}

	return str.slice(0, maxLength) + "...";
};
