import axios from "axios";
import { ApiGetItemsType } from "./types";

const API_URL = "https://api.grabyourkit.com/api/";

const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const getOauthSteamLink = (refId?: number | string) =>
	`${API_URL}oauth/steam${refId ? `?ref=${refId}` : ""}`;

export const editProfile = async ({
	email,
	trade_url,
	avatar,
}: {
	email?: string;
	trade_url?: string;
	avatar?: File | Blob | string;
}) => {
	const formData = new FormData();

	if (email) formData.append("email", email);
	if (trade_url) formData.append("trade_url", trade_url);
	if (avatar) formData.append("avatar", avatar);

	if (
		!formData.has("email") &&
		!formData.has("trade_url") &&
		!formData.has("avatar")
	) {
		throw new Error("Хотя бы одно поле должно быть передано");
	}

	return await api.post("edit", formData, {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		},
	});
};

export const getUser = async () => await api.get("user");

export const getFaq = async () => await api.get("faqs");

export const getBlogArticles = async ({
	most_viewed,
	limit,
	page,
}: {
	most_viewed?: boolean;
	limit?: number;
	page?: number;
}) => await api.get("blog/articles", { params: { most_viewed, limit, page } });

export const getBlogArticle = async (id: string | number) =>
	await api.get(`blog/article/${id}`);

export const getBlogBannerArticle = async () => await api.get("blog/banner");

export const getItems = async ({
	types,
	phases,
	price_min,
	price_max,
	wears,
	rarities,
	stattrack,
	souvenir,
	stickers,
	float_min,
	float_max,
	page,
	search,
}: ApiGetItemsType) =>
	await api.get("items", {
		params: {
			types,
			phases,
			price_min,
			price_max,
			wears,
			rarities,
			stattrack,
			souvenir,
			stickers,
			float_min,
			float_max,
			page,
			search,
		},
	});

export const getItemsByIds = async (ids: number[]) => {
	return await api.get("items/list", {
		params: {
			offers: ids,
		},
	});
};

export const getReferrals = async () => await api.get("referrals");

export const getInventory = async () => await api.get("inventory");

export const getTransactions = async () => await api.get("transactions");

export const getPurchases = async () => await api.get("purchase-history");

export const getItem = async (id: number | string) =>
	await api.get(`items/${id}`);

export const getItemFilters = async () => await api.get("items/filters");

export const buyItem = async (id: number | string) => {
	return await api.post(`items/${id}/buy`);
};

export const buyItems = async (ids: number[]) => {
	return await api.post(`items/buy`, {
		offers: ids.map((id) => ({
			id,
		})),
	});
};

export const paymentInit = async ({
	payment_system,
	amount,
}: {
	payment_system: number;
	amount: number;
}) => {
	return await api.post(`payment/initiate`, {
		payment_system,
		amount,
	});
};

export const getPaymentSystems = async () => await api.get("payment/systems");

export const getCurrencies = async () => await api.get("currencies");

export const setCurrency = async (currencyId: number) =>
	await api.post("user/currency", { currency: currencyId });

export default api;
