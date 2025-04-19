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
