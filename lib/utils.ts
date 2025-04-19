export const formatDate = (inputDate: Date): string => {
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

	return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

export const truncateString = (str: string, maxLength: number = 32): string => {
	if (str.length <= maxLength) {
		return str;
	}

	return str.slice(0, maxLength) + "...";
};
