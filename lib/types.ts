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

// TODO
// type, phase и т.п. = по сути константы, получаемые с бэка,
// нужно придумать, как лучше их хранить типами
export type ItemType = {
	id: number;
	market_hash_name: string;
	type: string;
	phase: string;
	price: number;
	float: number;
	rarity: string;
	stattrack: boolean;
	souvenir: boolean;
	classid: string;
	instanceid: string;
	real_instanceid: string;
	asset: string;
	old_price: number;
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
