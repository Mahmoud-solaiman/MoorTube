import { RefObject } from "react";

export type DiscType = {
  _id: string;
  name: string;
  user: string;
  videos: string[];
  parentId: string;
  ancestors: string[];
}

export type HomeProps = {
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
  translate: boolean;
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
  translate: boolean;
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
  setTranslate(value: boolean): void;
  menuContainer: RefObject<HTMLDivElement | null>;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
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
  discObject: DiscType;
  setWatchTitle(value: string): void;
  discs: DiscType[];
  parentId: string;
}

export type DiscDeleteProps = {
  setDiscs(value: DiscType[]): void;
  setShowDelete(value: boolean): void;
  deleteConfirmationRef: RefObject<HTMLElement | null>;
  discId: string;
  discs: DiscType[];
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
  discs: DiscType[];
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
  discs: DiscType[];
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
  setTranslate(value: boolean): void;
  translate: boolean;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
  isDarkMode: boolean;
  setIsDarkMode(value: boolean): void;
  errorMessage: string;
  isErrorMessage: boolean;
  setWatchTitle(value: string): void;
  setPoster(value: string): void;
  savedVideosDetails: SavedVideosDetails[] | undefined;
  setSavedVideosDetails(value: SavedVideosDetails[] | undefined): void;
  videos: string[];
  setVideos(value: string[]): void;
}

export type SavedVideosHeaderProps = {
  discName?: string;
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

export type SavedVideosDetailsResponse = {
  message: string;
  success: boolean;
  videos: {
    items: SavedVideosDetails[];
  },
  disc: DiscType;
}

export type SavedVideosPanelProps = {
  discName: string;
  savedVideosDetails: SavedVideosDetails[] | undefined;
  setPoster(value: string | undefined): void;
}

export type SavedVideosGridProps = {
  savedVideosDetails: SavedVideosDetails[] | undefined;
  setSavedVideosDetails(value: SavedVideosDetails[]): void;
  handleErrorMessage(value: string): void;
  setPoster(value: string): void;
  layout: 'saved-videos' | 'watch-panel';
  videos: string[];
  setVideos(value: string[]): void;
}

export type SavedVideosControlsProps = {
  setOpenControls(value: number | null): void;
  controlsBtnRef: RefObject<SVGSVGElement | null>;
  savedVideosDetails: SavedVideosDetails[];
  setSavedVideosDetails(value: SavedVideosDetails[]): void;
  targetIndex: number;
  setOpenDiscs(value: number | null): void;
  discsRef: RefObject<HTMLDivElement | null>;
  handleErrorMessage(value: string): void;
  videos: string[];
  setVideos(value: string[]): void;
}

export type DiscsControlsProps = {
  discsRef: RefObject<HTMLDivElement | null>;
  videoId: string;
  setOpenControls(value: number | null): void;
  setOpenDiscs(value: number | null): void;
  handleErrorMessage(value: string): void;
}

export type WatchProps = Omit<SavedVideosGridProps, 'setVideos' | 'setDiscName' | 'setTranslate' | 'setIsSpinner'> & {
  setTranslate(value: boolean): void;
  menuContainer: RefObject<HTMLDivElement | null>
  isDarkMode: boolean;
  translate: boolean;
  discs: DiscType[];
  setDiscs(value: DiscType[]): void;
  handleErrorMessage(value: string): void;
  setIsDarkMode(value: boolean): void;
  isErrorMessage: boolean;
  errorMessage: string;
  watchTitle: string;
  setWatchTitle(value: string): void;
  poster: string;
  setVideos(value: string[]): void;
}

export type WatchPanelProps = SavedVideosGridProps & {
  setDiscs(value: DiscType[]): void;
};

export type ControlsProps = {
  isBlur: boolean;
  setIsBlur(value: boolean): void;
  isShowControls: boolean;
  hideControls?(): void;
  isSettings: boolean;
  isSpeedSettings: boolean;
  isNoteTakers: boolean;
  setIsSettings(value: boolean): void;
  setIsSpeedSettings(value: boolean): void;
  setIsNoteTakers(value: boolean): void;
}

export type Location = {
  coords: {
    latitude: number;
    longitude: number;
  }
}

export type NextPrayer = {
  timings: {[key: string]: string}
}

export type VideoPlayerSettingsProps = {
  setIsSpeedSettings(value: boolean): void;
  setIsSettings(value: boolean): void;
  setBlurBoxes(value: string[]): void;
  blurBoxes: string[];
  setIsNoteTakers(value: boolean): void;
} 

export type PlaySpeedControlsProps = Omit<VideoPlayerSettingsProps, 'setBlurBoxes' | 'blurBoxes' | 'setIsNoteTakers'>;

export type BlurBoxProps = {
  blurBoxes: string[];
  setBlurBoxes(value: string[]): void;
}

export type NoteTakersProps = {
  setIsNoteTakers(value: boolean): void;
  setIsSettings(value: boolean): void;
  setNotes(value: NoteTakerType[]): void;
  notes: NoteTakerType[];
  setNoteTakers(value: NoteTakerType[]): void;
  noteTakers: NoteTakerType[];
}

export type NoteProps = {
  note: NoteTakerType;
  notes: NoteTakerType[];
  setNotes(value: NoteTakerType[]): void;
  setNoteTakers(value: NoteTakerType[]): void;
  noteTakers: NoteTakerType[];
}

export type NoteColorsProps = {
  noteRef: RefObject<HTMLElement | null>;
  setIsNoteColors(value: boolean): void;
  noteId: string;
  noteTakers: NoteTakerType[];
  setNoteTakers(value: NoteTakerType[]): void;
}

export type NoteTakerResponse = {
  message: string;
  success: boolean;
  note: NoteTakerType;
}

export type NoteTakersResponse = Omit<NoteTakerResponse, 'note'> & {
  notes: NoteTakerType[];
}

export type NoteTakerType = {
  _id: string;
  videoId: string;
  user: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export type AuthenticationProps = {
  errorMessage: string;
  handleErrorMessage(value: string): void;
  isErrorMessage: boolean;
  layout: 'register' | 'login';
}

export type AuthenticationRes = {
  data: {
    message: string; 
    isRegistered: boolean;
    token: string;
  }
}

export type DiscsResponse = {
  data: {
    message: string;
    discs: DiscType[];
    success: boolean;
  }
}

export type SingleDiscResponse = {
  data: {
    message: string;
    disc: DiscType;
    success: boolean;
    videos: SavedVideosDetails[];
  }
}

export type SettingsProps = {
  setIsSettings(value: boolean): void;
  settingsBtnRef: RefObject<SVGSVGElement | null>;
}