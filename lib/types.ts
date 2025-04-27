type BaseEntityType = {
	id: number;
	created_at: Date;
	updated_at: Date;
};

export type UserType = BaseEntityType & {
	username: string;
	email: string;
	steam_id: string;
	steam_trade_url: string;
	ref_code: string;
	ref_id: number;
	balance: number;
	ref_balance: number;
	avatar_url: string;
	ref_count: number;
	ref_percent: number;
	currency_symbol: string;
};

export type FaqItemType = BaseEntityType & {
	question: string;
	answer: string;
};

export type BlogArticleType = {
	id: number;
	title: string;
	content: string;
	photo: string;
	preview: string;
	views: number;
	is_banner: 0 | 1;
	photo_url: URL;
	preview_url: URL;
	created_at: Date;
	updated_at: Date;
};

export type ReferralUserType = BaseEntityType & {
	role_id: number;
	username: string;
	email: string | null;
	balance: string;
	ref_balance: string;
	steam_trade_url: string | null;
	steam_id: string;
	ref_code: string;
	ref_id: number;
	settings: unknown[];
	avatar_url: string;
	ref_count: number;
	ref_percent: number;
	currency_symbol: string;
};

export type PurchaseType = BaseEntityType & {
	user_id: number;
	offer: {
		id: number;
		market_hash_name: string;
		price: number;
		float: number;
		type: string;
		phase: string;
		stattrack: boolean;
		souvenir: boolean;
		rarity: string;
		img: string;
	};
	purchase: {
		success: boolean;
		refunded: boolean;
		refund_time: Date;
	};
	status:
		| "preparing"
		| "waiting_acceptance"
		| "cancelled"
		| "not_accepted"
		| "error"
		| "completed";
	status_name: string;
	trade_id: string;
	rejection_count: number;
	last_status_check: Date;
};

export type TransactionType = BaseEntityType & {
	sum: number;
	payment_system: "unityfinance";
	payment_system_name: string;
	status: "pending" | "inProgress" | "success" | "failed";
	status_name: string;
	payment_id: string;
	payment_url: string;
	payment_data: string;
	error: string;
};

export type ApiGetItemsType = {
	types?: string[];
	phases?: string[];
	price_min?: number;
	price_max?: number;
	wears?: string[];
	rarities?: string[];
	stattrack?: boolean;
	souvenir?: boolean;
	stickers?: number[];
	float_min?: number;
	float_max?: number;
	page?: number;
	search?: string;
};

export type PaymentSystemType = {
	id: number;
	name: string;
	img: string;
};

// TODO
// type, phase и т.п. = по сути константы, получаемые с бэка,
// нужно придумать, как лучше их хранить типами
export type ItemType = BaseEntityType & {
	market_hash_name: string;
	type: string;
	phase: string;
	price: string;
	float: number;
	rarity: string;
	stattrack: boolean;
	souvenir: boolean;
	classid: string;
	instanceid: string;
	real_instanceid: string;
	asset: string;
	old_price: string;
	stamp: Date;
	base_id: string;
	paintseed: string;
	paintindex: string;
	chance_to_transfer: number;
	img: string;
	screenshot: string;
	wear: string;
	wear_short_name: string;
	stickers: {
		id: number;
		name: string;
		img: string;
	}[];
	currency_symbol: string;
};
