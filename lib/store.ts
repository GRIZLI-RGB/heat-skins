import { atom } from "jotai";
import { UserType } from "./types";
import { atomWithStorage } from "jotai/utils";

export const _globalLoading_ = atom(true);

export const _disableBodyScroll_ = atom(false);

export const _isMobileMenuOpen_ = atom(false);

export const _user_ = atom<UserType | null>(null);

export const _cartItemsIds_ = atomWithStorage<number[]>("cartItemsIds", []);

export const _searchQuery_ = atom("");

export const _isOpenReplenishmentModal_ = atom(false);
export const _isOpenPurchaseItemsModal_ = atom(false)
