import axios from "axios";

const API_URL = "https://api.topskinsmarket.com/api/";

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

export const getOauthSteamLink = () => `${API_URL}oauth/steam`;

export const editProfile = async ({
	email,
	trade_url,
	avatar,
}: {
	email?: string;
	trade_url?: string;
	avatar?: File | Blob;
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

export default api;
