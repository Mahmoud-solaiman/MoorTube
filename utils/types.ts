import { RefObject } from "react";

export type DiscType = {
  id: string;
  items: string[];
  name: string;
}

export type HomeProps = {
  setSavedVideos(value: DiscType): void;
  api_key: string;
  setTranslate(value: boolean): void;
  translate: boolean;
  menuContainer: RefObject<HTMLDivElement | null>;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
  isErrorMessage: boolean;
  errorMessage: string;
  isDarkMode: boolean;
  setIsDarkMode(value: boolean): void;
  setWatchTitle(value: string): void;
  setPoster(value: string): void;
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
  setTranslate(value: boolean): void;
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
  contentDetails: { videoId: string }
}

export type SidePanelProps = {
  translate: boolean;
  setTranslate(value: boolean): void;
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

export type VideoGridProps = {
  channelLogo: {
    items: [{
      id: string;
      snippet: {
        thumbnails: {
          default: {
            url: string;
          }
        }
      }
    }]
  };
  videos: {
    items: [{
      id: string;
      snippet: {
        thumbnails: {
          maxres: {
            url: string;
          },
          standard: {
            url: string;
          },
          high: {
            url: string;
          },
          medium: {
            url: string;
          },
          default: {
            url: string;
          },
        };
        title: string;
        channelTitle: string;
        channelId: string;
        publishedAt: string;
      };
      contentDetails: {
        duration: string;
      };
      statistics: {
        viewCount: string;
      }
    }]
  };
  setDiscs(value: DiscType[]): void;
  setTranslate(value: boolean): void;
  handleErrorMessage(value: string): void;
  setPoster(value: string): void;
}

export type ActionsProps = {
  setOpenDisc(value: number | null): void;
  index: number;
  actionsContainerRef: RefObject<HTMLElement | null>;
  setOpenNewAdder(value: number | null): void;
  isOpenTop: boolean;
  handleErrorMessage(value: string): void;
  setOpenIndex(value: number | undefined): void;
}

export type DiscsActionsProps = {
  discsContainerRef: RefObject<HTMLElement | null>;
  videoId: string;
  handleErrorMessage(value: string): void;
  setOpenDisc(value: number | null): void;
  setOpenIndex(value: number | undefined): void;
  isOpenTop: boolean;
  setDiscs(value: DiscType[]): void;
}

export type AddNewDiscProps = {
  newAdderContainerRef: RefObject<HTMLElement | null>
  setDiscs(value: DiscType[]): void;
  setOpenIndex(value: number | undefined): void;
  setOpenNewAdder(value: number | null): void;
  setTranslate(value: boolean): void;
  handleErrorMessage(value: string): void;
  videoId: string;
  isOpenTop: boolean;
}

export type SavedVideosProps = {
  savedVideos: DiscType;
  api_key: string;
  setTranslate(value: boolean): void;
  translate: boolean;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
  setSavedVideos(value: DiscType): void;
  isDarkMode: boolean;
  setIsDarkMode(value: boolean): void;
  errorMessage: string;
  isErrorMessage: boolean;
  setWatchTitle(value: string): void;
  setPoster(value: string): void;
}

export type SavedVideosHeaderProps = {
  discTitle: string;
  setTranslate(value: boolean): void;
  menuContainer: RefObject<HTMLDivElement | null>;
  isDarkMode: boolean;
}

export type SavedVideosDetails = {
  snippet: {
    thumbnails: {
      maxres: {
        url: string;
      },
      standard: {
        url: string;
      },
      high: {
        url: string;
      },
      medium: {
        url: string;
      },
      default: {
        url: string;
      },
    },
    channelTitle: string;
    title: string;
    publishedAt: string;
  };
  id: string;
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  }
};

export type SavedVideosPanelProps = {
  savedVideos: DiscType;
  savedVideosDetails: SavedVideosDetails[] | undefined;
  setPoster(value: string | undefined): void;
}

export type SavedVideosGridProps = {
  savedVideosDetails: SavedVideosDetails[] | undefined;
  setSavedVideosDetails(value: SavedVideosDetails[]): void;
  setSavedVideos(value: DiscType): void;
  handleErrorMessage(value: string): void;
  setPoster(value: string): void;
}

export type SavedVideosControlsProps = {
  setOpenControls(value: number | null): void;
  controlsBtnRef: RefObject<SVGSVGElement | null>;
  savedVideosDetails: SavedVideosDetails[];
  setSavedVideosDetails(value: SavedVideosDetails[]): void;
  targetIndex: number;
  setSavedVideos(value: DiscType): void;
  setOpenDiscs(value: number | null): void;
  discsRef: RefObject<HTMLDivElement | null>;
}

export type DiscsControlsProps = {
  discsRef: RefObject<HTMLDivElement | null>;
  videoId: string;
  setOpenControls(value: number | null): void;
  setOpenDiscs(value: number | null): void;
  handleErrorMessage(value: string): void;
}