import { RefObject } from "react";

export type DiscType = {
  id: string;
  items: string[];
  name: string;
}

export type HomeProps = {
  setSavedVideos(value: DiscType): void;
  api_key: string;
  setTranslate(value: number | boolean): void;
  translate: number | boolean;
  menuContainer: RefObject<HTMLDivElement | null>;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
  isErrorMessage: boolean;
  errorMessage: string;
  isDarkMode: boolean;
  setIsDarkMode(value: boolean): void;
  setWatchTitle(value: string): void;
}

export type SearchProps = {
  isChannel: boolean;
  setIsSuggestions(value: boolean): void;
  setPopUpChannelLogo(value: PopUpChannelLogo | {}): void;
  setSearchHistory(value: SearchHistory[]): void;
  searchText: string;
  setSearchText(value: string): void;
  fetchChannelsData(value: unknown): void;
  searchField: RefObject<HTMLInputElement | null>;
}

export type SearchHistory = {
  key: string;
  searchName: string;
}

export type HeaderProps = {
  setVideos(value: unknown): void;
  setChannelVideos(value: unknown): void;
  setChannelsLogos(value: unknown): void;
  api_key: string;
  setTranslate(value: number | boolean): void;
  menuContainer: RefObject<HTMLDivElement | null>;
  handleErrorMessage(value: string): void;
  setIsChannel(value: boolean): void;
  isChannel: boolean;
  popUpChannelLogo: PopUpChannelLogo;
  setPopUpChannelLogo(value: unknown): void;
  setChannelLogo(value: unknown): void;
  isDarkMode: boolean;
  setWatchTitle(value: string): void;
  setIsLoading(value: boolean): void;
}

export type ChannelItem = {
  id: { kind: string; channelId: string }
}

export type VideosChannelsItem = {
  snippet: { channelId: string }
}

export type VideosItem = {
  id: { videoId: string }
}

type PopUpChannelLogo = {
  items?: [{
    id: string;
    snippet: {
      thumbnails: { default: { url: string } };
      title: string;
      customUrl: string;
    }
  }]
}

export type SuggestionsProps = {
  popUpChannelLogo: PopUpChannelLogo;
  apiKey: string;
  setIsSuggestions(value: boolean): void;
  setChannelVideos(value: unknown): void;
  setChannelLogo(value: PopUpChannelLogo): void;
  searchHistory: SearchHistory[];
  setSearchHistory(value: SearchHistory[]): void;
  searchText: string;
  fetchChannelsData(value: string): void;
  searchField: RefObject<HTMLInputElement | null>;
  setSearchText(value: string): void;
  setIsLoading(value: boolean): void;
  isLoadingChannels: boolean;
}

export type PlaylistInfoItem = {
  contentDetails: {videoId: string}
}

export type SidePanelProps = {
  translate: number | boolean;
  setTranslate(value: number | boolean): void;
  menuContainer: RefObject<HTMLDivElement | null>;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
  setSavedVideos(value: DiscType): void;
  isDarkMode: boolean;
  setIsDarkMode(value: boolean): void;
  setWatchTitle(value: string): void;
}

export type DiscProps = {
  disc: string;
  title: string;
  discId: string;
  setDiscs(value: DiscType[]): void;
  deleteConfirmationRef: RefObject<HTMLElement | null>
  handleErrorMessage(value: string): void;
  setSavedVideos(value: DiscType): void;
  discObject: DiscType; 
  setWatchTitle(value: string): void;
}

export type DiscDeleteProps = {
  setDiscs(value: DiscType[]): void;
  setShowDelete(value: boolean): void;
  deleteConfirmationRef: RefObject<HTMLElement | null>;
  discId: string;
}