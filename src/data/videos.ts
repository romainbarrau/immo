// YouTube videos shown on the Videos page (and in the home page carousel)
// start: seconds to start from; such a video also plays muted on its own when shown, like on the original Lovable site
export type YouTubeVideo = { id: number; embedId: string; start?: number };

export const propertyConceptVideos: YouTubeVideo[] = [
  { id: 1, embedId: 'v6WfZXmMk4A' },
  { id: 2, embedId: '4yDcD1XFkeA' },
  { id: 3, embedId: 'ObfdTZ29cYE' },
  { id: 4, embedId: 'sWy_1cYImf4' },
  { id: 5, embedId: '5-kQOUX4VSs' },
  { id: 6, embedId: 'p1sCuQsVVXE' },
  { id: 7, embedId: '2xQrBOiqNtA' },
];

export const renovationSeries: YouTubeVideo[] = [
  { id: 9, embedId: '2A8PP0Xgkms', start: 17 },
];

export const propertyVideos: YouTubeVideo[] = [
  { id: 10, embedId: 'fxN2-HqkM2I' },
  { id: 11, embedId: 'FqxgC8oARTQ' },
  { id: 12, embedId: 'PhwVO0NnXLc' },
  { id: 13, embedId: 'Rx7803_xctA' },
  { id: 14, embedId: 'FrssUO78EHg' },
  { id: 15, embedId: 'nfDBTtLOgcw' },
  { id: 16, embedId: '44yySFRM58U' },
  { id: 17, embedId: 'Ip8Y3dQDiF0' },
  { id: 18, embedId: 'LQcNZzRbqsk' },
  { id: 19, embedId: 'cQJs74VPnLw' },
  { id: 20, embedId: 'eo9WQ6ogq6Q' },
  { id: 21, embedId: 'ThI7Z8H8Uyo' },
  { id: 22, embedId: 'sdggYToVjQM' },
  { id: 23, embedId: 'jEVexef-vks' },
  { id: 24, embedId: 'XBqVsiL7Tsw' },
  { id: 25, embedId: '8RM8Tc0UahU' },
  { id: 26, embedId: 'FvxnyR_btyw' },
  { id: 27, embedId: 'layI4z-dXBk' },
  { id: 28, embedId: 'gJsN_Ln7qD8' },
  { id: 29, embedId: 'ytO2Ku0xbw8' },
  { id: 30, embedId: 'q8ZG01Xc5ZE' },
  { id: 31, embedId: 'RLnu3e87fHc' },
];
