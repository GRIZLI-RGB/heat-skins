import { atom } from "jotai";
import { UserType } from "./types";

export const _globalLoading_ = atom(false);

export const _disableBodyScroll_ = atom(false);

export const _isMobileMenuOpen_ = atom(false);

export const _user_ = atom<UserType | null>(null);
