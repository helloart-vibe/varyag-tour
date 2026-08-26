import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const livingRoomPanorama = "./assets/1komnata.png";
const room70Panorama = "./assets/room-7-0.png";
const kitchenLivingPanorama = "./assets/kitchen-living-9-7.png";
const corridorPanorama = "./assets/corridor.png?v=3";
const room112Panorama = "./assets/room-11-2.png?v=4";
const room152Panorama = "./assets/room-15-2.png?v=4";
const room152RightPanorama = "./assets/room-15-2-right.png?v=4";
const room144Panorama = "./assets/room-14-4.png?v=1";
const wardrobe47Panorama = "./assets/wardrobe-4-7.png?v=1";
const wardrobe86Panorama = "./assets/wardrobe-8-6.png?v=1";
const floor2Bath50Panorama = "./assets/bath-5-0.png?v=1";
const floor2Bath46Panorama = "./assets/bath-4-6.png?v=1";
const floor2HallPanorama = "./assets/floor2-hall.png?v=1";
const diningSmallPanorama = "./assets/dining-11-2.png?v=4";
const hallPanorama = "./assets/hall.png";
const wardrobePanorama = "./assets/wardrobe.png?v=4";
const bathroomPanorama = "./assets/bathroom.png?v=4";
const porchPhoto = "./assets/porch.jpg?v=2";
const planWidth = 190;
const planHeight = 286;
const secondFloorPlanWidth = 190;
const secondFloorPlanHeight = 231;
const floorPlanAreas = [
  {
    id: "guest",
    label: "Гостиная 17.1",
    src: "./assets/plans/гостиная 17.1.svg",
    room: "lobby",
    x: 83.35,
    y: 3.65,
    width: 104,
    height: 86,
  },
  {
    id: "dining-large",
    label: "Столовая 17.8",
    src: "./assets/plans/столовая 17.8.svg",
    room: "living",
    x: 3,
    y: 4,
    width: 80,
    height: 115,
  },
  {
    id: "hall",
    label: "Холл 10.0",
    src: "./assets/plans/холл 10.0.svg",
    room: "hall",
    x: 84,
    y: 91,
    width: 103,
    height: 75,
    clipPath: "polygon(99% 0, 0 0, 0 100%, 46% 100%, 46% 57%, 100% 57%, 100% 0)",
  },
  {
    id: "corridor",
    label: "Коридор",
    src: "./assets/plans/коридор.svg",
    x: 54,
    y: 120,
    width: 29,
    height: 46,
  },
  {
    id: "bath",
    label: "С/у 4.4",
    src: "./assets/plans/с:у 4.4.svg",
    room: "bedroom",
    x: 4,
    y: 120,
    width: 50,
    height: 46,
  },
  {
    id: "wardrobe",
    label: "Гардероб 5.8",
    src: "./assets/plans/гардероб.svg",
    room: "room4",
    x: 132,
    y: 135,
    width: 54,
    height: 40,
  },
  {
    id: "entry",
    label: "Прихожая 4.2",
    src: "./assets/plans/Прихожая 4.2.svg",
    room: "corridor",
    x: 96,
    y: 168,
    width: 34,
    height: 63,
  },
  {
    id: "tech",
    label: "Тех.помещение 5.8",
    src: "./assets/plans/Тех.помещение 5.8.svg",
    room: "office",
    x: 132,
    y: 175,
    width: 56,
    height: 59,
  },
  {
    id: "dining-small",
    label: "Комната 11.2",
    src: "./assets/plans/Комната 11.2.svg",
    room: "diningSmall",
    x: 4,
    y: 168,
    width: 90,
    height: 63,
  },
  {
    id: "porch",
    label: "Крыльцо 4.6",
    src: "./assets/plans/Крыльцо 4.6.svg",
    room: "porch",
    x: 96,
    y: 235,
    width: 77,
    height: 28,
  },
];
const secondFloorPlanAreas = [
  {
    id: "floor2-room-15-2-left",
    label: "Комната 15.2",
    src: "./assets/plans/2floor/Комната 15.2 (1).svg",
    room: "floor2Room152",
    x: 4,
    y: 4,
    width: 91,
    height: 84,
  },
  {
    id: "floor2-room-15-2-right",
    label: "Комната 15.2",
    src: "./assets/plans/2floor/Комната 15.2 (2).svg",
    room: "floor2Room152Right",
    x: 95,
    y: 4,
    width: 91,
    height: 84,
  },
  {
    id: "floor2-bath-5",
    label: "С/у 5.0",
    src: "./assets/plans/2floor/сy 5.0.svg",
    room: "floor2Bath50",
    x: 4,
    y: 89,
    width: 46,
    height: 56,
  },
  {
    id: "floor2-wardrobe-4-7",
    label: "Гардероб 4.7",
    src: "./assets/plans/2floor/Гардероб 4.7.svg",
    room: "floor2Wardrobe47",
    x: 50,
    y: 89,
    width: 45,
    height: 57,
  },
  {
    id: "floor2-hall",
    label: "Холл 7.1",
    src: "./assets/plans/2floor/Холл 7.1.svg",
    room: "floor2Hall",
    x: 95,
    y: 89,
    width: 91.5,
    height: 89,
    clipPath: "polygon(0 100%, 0 0, 100% 0, 100% 49%, 42% 49%, 42% 100%)",
  },
  {
    id: "floor2-bath-4-6",
    label: "С/у 4.6",
    src: "./assets/plans/2floor/су 4.6.svg",
    room: "floor2Bath46",
    x: 133,
    y: 132,
    width: 53,
    height: 45,
  },
  {
    id: "floor2-room-14-4",
    label: "Комната 14.4",
    src: "./assets/plans/2floor/Комната 14.4.svg",
    room: "floor2Room144",
    x: 4,
    y: 147,
    width: 90,
    height: 80,
  },
  {
    id: "floor2-wardrobe-8-6",
    label: "Гардероб 8.6",
    src: "./assets/plans/2floor/Гардероб 8.6.svg",
    room: "floor2Wardrobe86",
    x: 95,
    y: 179,
    width: 90,
    height: 49,
  },
];
const planByRoom = {
  lobby: "guest",
  living: "dining-large",
  hall: "hall",
  corridor: "entry",
  room4: "wardrobe",
  diningSmall: "dining-small",
  office: "tech",
  kitchen: "entry",
  bedroom: "bath",
  porch: "porch",
  floor2Room152: "floor2-room-15-2-left",
  floor2Room152Right: "floor2-room-15-2-right",
  floor2Room144: "floor2-room-14-4",
  floor2Wardrobe47: "floor2-wardrobe-4-7",
  floor2Wardrobe86: "floor2-wardrobe-8-6",
  floor2Bath50: "floor2-bath-5",
  floor2Bath46: "floor2-bath-4-6",
  floor2Hall: "floor2-hall",
};
const floorByRoom = {};
floorPlanAreas.forEach((item) => {
  if (item.room) floorByRoom[item.room] = "floor1";
});
secondFloorPlanAreas.forEach((item) => {
  if (item.room) floorByRoom[item.room] = "floor2";
});
const portalArrowImage = `data:image/svg+xml,${encodeURIComponent(`
<svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(52 38)">
    <path d="M0 23L2.5 11.5L38.5 0L74.5 13V24.5L38.5 10L0 23Z" fill="#2B211E" fill-opacity="0.45" transform="translate(0 10)"/>
    <path d="M0 23L2.5 11.5L38.5 0L74.5 13V24.5L38.5 10L0 23Z" fill="#F4F4F4"/>
  </g>
</svg>
`)}`;

const rooms = {
  lobby: {
    title: "Гостиная 17.1",
    panelTitle: "Гостиная",
    short: "Гостиная 17.1",
    description:
      "Панорама гостиной. Отсюда можно перейти в соседние комнаты.",
    panorama: kitchenLivingPanorama,
    fallback: 0x27454f,
    accent: 0x36c5a3,
    position: [50, 46],
    startYaw: 190,
    startPitch: -3.4,
    showInNav: true,
    usePortalDots: true,
    exits: [
      { to: "hall", label: "Холл 10.0", arrowYaw: 210, pitch: -3 },
      {
        to: "living",
        label: "Кухня-гостиная 9.7",
        arrowYaw: -40,
        pitch: -6,
      },
    ],
  },
  living: {
    title: "Столовая 17.8",
    panelTitle: "Столовая",
    short: "Столов  ая",
    description:
      "Панорама зоны отдыха. В реальном туре у этой комнаты будет свой снимок 360, а точки перехода останутся тем же механизмом.",
    panorama: livingRoomPanorama,
    fallback: 0x4d3c35,
    accent: 0xf2c14e,
    position: [22, 24],
    startYaw: -260,
    startPitch: -3.4,
    showInNav: true,
    usePortalDots: true,
    exits: [{ to: "lobby", label: "Гостиная 17.1", yaw: 92, arrowYaw: 70, pitch: -28, dotScale: 1.62 }],
  },
  kitchen: {
    title: "Прихожая 2.3",
    panelTitle: "Прихожая",
    short: "Прихожая",
    description:
      "Кухонная панорама. Пока используется тот же референс, но данные уже готовы под отдельный URL фотографии.",
    panorama: livingRoomPanorama,
    fallback: 0x56605d,
    accent: 0xef6f5e,
    position: [78, 27],
    startYaw: 0,
    startPitch: -3.4,
    exits: [{ to: "lobby", label: "Лобби", arrowYaw: -132, pitch: -4 }],
  },
  hall: {
    title: "Холл 10.0",
    panelTitle: "Холл",
    short: "Холл 10.0",
    description:
      "Панорама холла. Точка подключена к планировке и готова к настройке переходов.",
    panorama: hallPanorama,
    fallback: 0x5b4735,
    accent: 0xe6d4b8,
    position: [48, 50],
    startYaw: 80,
    startPitch: -3.4,
    showInNav: true,
    usePortalDots: true,
    exits: [
      { to: "diningSmall", label: "Комната 11.2", yaw: 125, arrowYaw: 180, pitch: -18 },
      { to: "floor2Hall", label: "Холл 2 этаж", yaw: -8, arrowYaw: -120, pitch: -16, portalRotation: -0.45 },
      { to: "lobby", label: "Гостиная 17.1", yaw: -75, arrowYaw: -55, pitch: -16, portalRotation: -0.22 },
      { to: "room4", label: "Гардероб 4.0", yaw: 55, arrowYaw: 35, pitch: -16, portalRotation: 0.22 },
      { to: "corridor", label: "Прихожая 4.2", yaw: 85, arrowYaw: 105, pitch: -16, portalRotation: 0.45 },
      { to: "bedroom", label: "С/у 4.4", yaw: 146, arrowYaw: 180, pitch: -18 },
    ],
  },
  corridor: {
    title: "Прихожая 4.2 м²",
    panelTitle: "Прихожая",
    short: "Прихожая 4.2 м²",
    description:
      "Панорама коридора. Эту точку можно связать стрелками с соседними комнатами после ручной настройки направлений.",
    panorama: corridorPanorama,
    fallback: 0x4b4238,
    accent: 0xe1e1e1,
    position: [58, 84],
    startYaw: -90,
    startPitch: -3.4,
    exits: [
      { to: "hall", label: "Холл 10.0", yaw: -92, arrowYaw: -72, pitch: -5, dotScale: 1.34 },
      { to: "porch", label: "Крыльцо 4.6", yaw: 94, arrowYaw: 114, pitch: -5, dotScale: 1.34 },
      { to: "office", label: "Тех.помещение 5.8", yaw: 52, arrowYaw: 32, pitch: -5, dotScale: 1.34 },
    ],
  },
  room4: {
    title: "Гардероб 4.0",
    panelTitle: "Гардероб",
    short: "Гардероб 4.0",
    description:
      "Панорама гардероба. Точка добавлена на планировку и готова к дальнейшей настройке переходов.",
    panorama: wardrobePanorama,
    fallback: 0x4b3d35,
    accent: 0xe7f3d6,
    position: [34, 55],
    startYaw: 0,
    startPitch: -3.4,
    exits: [{ to: "hall", label: "Холл 10.0", arrowYaw: 260, pitch: -5, dotScale: 1.34 }],
  },
  diningSmall: {
    title: "Комната 11.2",
    panelTitle: "Комната",
    short: "Комната 11.2",
    description:
      "Панорама комнаты. Комната подключена к планировке и готова к ручной настройке стрелок перехода.",
    panorama: room112Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [68, 70],
    startYaw: 160,
    startPitch: -3.4,
    exits: [{ to: "hall", label: "Холл 10.0", yaw: -155, arrowYaw: -115, pitch: -5 }],
  },
  floor2Room152: {
    title: "Комната 15.2",
    panelTitle: "Комната",
    short: "Комната 15.2",
    description:
      "Панорама комнаты второго этажа. Комната подключена к планировке и готова к настройке переходов.",
    panorama: room152Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [46, 42],
    startYaw: 9,
    startPitch: -3.4,
    exits: [
      { to: "floor2Wardrobe47", label: "Гардероб 4.7", arrowYaw: -5, pitch: -5, dotScale: 1.34 },
    ],
  },
  floor2Room152Right: {
    title: "Комната 15.2",
    panelTitle: "Комната",
    short: "Комната 15.2",
    description:
      "Панорама второй комнаты 15.2 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: room152RightPanorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [138, 42],
    startYaw: 160,
    startPitch: -3.4,
    exits: [
      { to: "floor2Hall", label: "Холл 7.1", arrowYaw: -175, pitch: -5, dotScale: 1.34 },
    ],
  },
  floor2Room144: {
    title: "Комната 14.4",
    panelTitle: "Комната",
    short: "Комната 14.4",
    description:
      "Панорама комнаты 14.4 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: room144Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [46, 188],
    startYaw: 0,
    startPitch: -3.4,
    exits: [
      { to: "floor2Hall", label: "Холл 7.1", arrowYaw: -30, pitch: -5, dotScale: 1.34 },
    ],
  },
  floor2Wardrobe47: {
    title: "Гардероб 4.7",
    panelTitle: "Гардероб",
    short: "Гардероб 4.7",
    description:
      "Панорама гардероба 4.7 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: wardrobe47Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [72, 118],
    startYaw: 70,
    startPitch: -3.4,
    exits: [
      { to: "floor2Hall", label: "Холл 7.1", arrowYaw: -60, pitch: -27, dotScale: 2 },
      { to: "floor2Room152", label: "Комната 15.2", arrowYaw: 172, pitch: -5, dotScale: 2 },
      { to: "floor2Bath50", label: "С/у 5.0", arrowYaw: 105, pitch: -5, dotScale: 1.28 },
    ],
  },
  floor2Wardrobe86: {
    title: "Гардероб 8.6",
    panelTitle: "Гардероб",
    short: "Гардероб 8.6",
    description:
      "Панорама гардероба 8.6 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: wardrobe86Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [140, 204],
    startYaw: 50,
    startPitch: -3.4,
    exits: [
      { to: "floor2Hall", label: "Холл 7.1", arrowYaw: 84, pitch: -5, dotScale: 1.34 },
    ],
  },
  floor2Bath50: {
    title: "С/у 5.0",
    panelTitle: "Санузел",
    short: "С/у 5.0",
    description:
      "Панорама санузла 5.0 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: floor2Bath50Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [28, 117],
    startYaw: 100,
    startPitch: -3.4,
    exits: [
      { to: "floor2Wardrobe47", label: "Гардероб 4.7", arrowYaw: 102, pitch: -25, dotScale: 1.34 },
    ],
  },
  floor2Bath46: {
    title: "С/у 4.6",
    panelTitle: "Санузел",
    short: "С/у 4.6",
    description:
      "Панорама санузла 4.6 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: floor2Bath46Panorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [160, 154],
    startYaw: 0,
    startPitch: -3.4,
    exits: [
      { to: "floor2Hall", label: "Холл 7.1", arrowYaw: 5, pitch: -5, dotScale: 1.6
       },
    ],
  },
  floor2Hall: {
    title: "Холл 7.1",
    panelTitle: "Холл",
    short: "Холл 7.1",
    description:
      "Панорама холла 7.1 на втором этаже. Комната подключена к планировке и готова к настройке переходов.",
    panorama: floor2HallPanorama,
    fallback: 0x5d4a3a,
    accent: 0xe7f3d6,
    position: [140, 133],
    startYaw: 0,
    startPitch: -3.4,
    exits: [
      { to: "hall", label: "Холл 10.0", arrowYaw: -130, pitch: -6, dotScale: 1.28 },
      { to: "floor2Bath46", label: "С/у 4.6", arrowYaw: -60, pitch: -6, dotScale: 1.28 },
      { to: "floor2Wardrobe86", label: "Гардероб 8.6", arrowYaw: -18, pitch: -6, dotScale: 1.28 },
      { to: "floor2Room144", label: "Комната 14.4", arrowYaw: 38, pitch: -6, dotScale: 1.28 },
      { to: "floor2Wardrobe47", label: "Гардероб 4.7", arrowYaw: 118, pitch: -6, dotScale: 1.28 },
      { to: "floor2Room152Right", label: "Комната 15.2", arrowYaw: 178, pitch: -6, dotScale: 1.28 },
    ],
  },
  office: {
    title: "Тех.помещение 5.8",
    panelTitle: "Тех.помещение",
    short: "Тех.помещение 5.8",
    description:
      "Панорама технического помещения. Hotspots можно расставлять вручную по yaw/pitch для каждого снимка.",
    panorama: diningSmallPanorama,
    fallback: 0x293a34,
    accent: 0x8dd7cf,
    position: [26, 72],
    startYaw: 105,
    startPitch: -3.4,
    exits: [{ to: "corridor", label: "Прихожая", arrowYaw: 120, pitch: -5, dotScale: 1.34 }],
  },
  bedroom: {
    title: "С/у 4.4",
    panelTitle: "С/у",
    short: "С/у 4.4",
    description:
      "Панорама санузла. Комната подключена к планировке и готова к настройке переходов.",
    panorama: bathroomPanorama,
    fallback: 0x414760,
    accent: 0xc6a6ff,
    position: [18, 52],
    startYaw: 298,
    startPitch: -3.4,
    exits: [{ to: "hall", label: "Холл 10.0", yaw: -86, arrowYaw: -110, pitch: -6, dotScale: 1.62 }],
  },
  porch: {
    title: "Крыльцо 4.6",
    panelTitle: "Крыльцо",
    short: "Крыльцо 4.6",
    description:
      "Фото крыльца подключено как отдельная точка тура. Это обычное фото, поэтому обзор не будет полноценной 360-панорамой.",
    panorama: porchPhoto,
    projection: "flat",
    fallback: 0x7c746b,
    accent: 0xe7f3d6,
    position: [62, 90],
    startYaw: 0,
    startPitch: -3.4,
    usePortalDots: true,
    exits: [
      { to: "corridor", label: "Прихожая 4.2", arrowYaw: 12, pitch: -18, dotScale: 2 },
    ],
  },
};

const canvas = document.querySelector("#tourCanvas");
const roomTransitionOverlay = document.querySelector("#roomTransitionOverlay");
const roomTransitionFrame = document.querySelector("#roomTransitionFrame");
const initialLoader = document.querySelector("#initialLoader");
const roomTitle = document.querySelector("#roomTitle");
const roomStatus = document.querySelector("#roomStatus");
const roomNav = document.querySelector("#roomNav");
const roomPulseMarker = document.querySelector("#roomPulseMarker");
const directionArrows = document.querySelector("#directionArrows");
const sideTitle = document.querySelector("#sideTitle");
const sideText = document.querySelector("#sideText");
const transitionList = document.querySelector("#transitionList");
const miniMap = document.querySelector("#miniMap");
const tourShell = document.querySelector(".tour-shell");
const panelToggle = document.querySelector("#panelToggle");
const cursorFollower = document.querySelector("#cursorFollower");
const backgroundMusic = document.querySelector("#backgroundMusic");
const clickSound = document.querySelector("#clickSound");
const soundToggle = document.querySelector("#soundToggle");
const zoomIn = document.querySelector("#zoomIn");
const zoomOut = document.querySelector("#zoomOut");
const detailViewer = document.querySelector("#detailViewer");
const detailClose = document.querySelector("#detailClose");

const scene = new THREE.Scene();
const defaultFov = 96;
const camera = new THREE.PerspectiveCamera(defaultFov, 1, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  alpha: false,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

const panoramaGroup = new THREE.Group();
const portalGroup = new THREE.Group();
scene.add(panoramaGroup, portalGroup);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const portals = [];
const roomKeys = Object.keys(rooms);
const clock = new THREE.Clock();
const roomFadeDuration = 1.35;

let activeRoomId = "porch";
let yaw = 0;
let pitch = -0.06;
let targetYaw = 0;
let targetPitch = -0.06;
let isDragging = false;
let lastPoint = { x: 0, y: 0 };
let dragStart = { x: 0, y: 0 };
let hasDragged = false;
let activeTexture = null;
let activePanorama = null;
let screenFade = null;
let textureRequestId = 0;
const textureCache = new Map();
let roomSwitchRequestId = 0;
let activePlanAreaId = planByRoom[activeRoomId] ?? floorPlanAreas[0].id;
let activeMapFloor = "floor1";
let initialLoaderHidden = false;
const initialLoaderStartedAt = performance.now();
let cursorVisible = false;
let cursorHovering = false;
let roomChangeTimer = null;
const cursorPosition = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
const cursorTarget = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
const markerWorldPosition = new THREE.Vector3();
const mobilePanelQuery = window.matchMedia("(max-width: 920px)");
const mobilePortalDotScale = 1.5;

scene.add(camera);
camera.position.set(0, 0, 0);
const flatPhotoGroup = new THREE.Group();
camera.add(flatPhotoGroup);

const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin("anonymous");
const portalArrowTexture = textureLoader.load(portalArrowImage);
portalArrowTexture.colorSpace = THREE.SRGBColorSpace;

const isApplePointer = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
const verticalDragDirection = isApplePointer ? 1 : -1;
let hasStartedMusic = false;

function disposeGroup(group) {
  while (group.children.length) {
    const child = group.children.pop();
    disposeNode(child);
  }
}

function disposeNode(node) {
  node.traverse((item) => {
    if (item.geometry) item.geometry.dispose();
    if (item.material) {
      const materials = Array.isArray(item.material) ? item.material : [item.material];
      materials.forEach((material) => {
        if (material.map && !material.map.userData.keepAlive) material.map.dispose();
        material.dispose();
      });
    }
  });
}

function disposePanorama(panorama) {
  panoramaGroup.remove(panorama);
  disposeNode(panorama);
}

function preparePanoramaTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.offset.x = 1;
  texture.anisotropy = Math.min(maxAnisotropy, 4);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.userData.keepAlive = true;
  return texture;
}

function prepareFlatTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(maxAnisotropy, 4);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.userData.keepAlive = true;
  return texture;
}

function prepareRoomTexture(room, texture) {
  return room.projection === "flat"
    ? prepareFlatTexture(texture)
    : preparePanoramaTexture(texture);
}

function loadPanoramaTexture(room) {
  const cachedTexture = textureCache.get(room.panorama);
  if (cachedTexture) return Promise.resolve(cachedTexture);

  return new Promise((resolve, reject) => {
    textureLoader.load(
      room.panorama,
      (texture) => {
        const preparedTexture = prepareRoomTexture(room, texture);
        textureCache.set(room.panorama, preparedTexture);
        resolve(preparedTexture);
      },
      undefined,
      reject,
    );
  });
}

function hideInitialLoader() {
  if (initialLoaderHidden) return;
  initialLoaderHidden = true;
  const elapsed = performance.now() - initialLoaderStartedAt;
  const delay = Math.max(0, 1100 - elapsed);
  window.setTimeout(() => {
    initialLoader.classList.add("hidden");
    initialLoader.setAttribute("aria-hidden", "true");
  }, delay);
}

window.setTimeout(hideInitialLoader, 4500);

function usesPortalDots(room) {
  return Boolean(room.usePortalDots || (!room.usePortalArrows && room.exits?.length));
}

function buildRoom(room, preparedTexture = null) {
  disposeGroup(panoramaGroup);
  disposeGroup(flatPhotoGroup);
  activePanorama = null;
  activeTexture = null;
  disposeGroup(portalGroup);
  portals.length = 0;

  const fallbackColor = new THREE.Color(room.fallback).multiplyScalar(0.52);
  scene.background = fallbackColor;
  scene.fog = null;
  const requestId = ++textureRequestId;

  const projectionTarget = room.projection === "flat"
    ? createFlatPhotoMesh(fallbackColor)
    : createPanoramaMesh(fallbackColor);

  if (preparedTexture) {
    activeTexture = preparedTexture;
    applyTextureToProjection(projectionTarget, preparedTexture, room);
    if (screenFade) screenFade.ready = true;
    hideInitialLoader();
    if (room.usePortalArrows || usesPortalDots(room)) addPortals(room);
    renderDirectionArrows(room);
    return;
  }

  textureLoader.load(
    room.panorama,
    (texture) => {
      if (requestId !== textureRequestId) {
        texture.dispose();
        return;
      }
      activeTexture = texture;
      prepareRoomTexture(room, texture);
      textureCache.set(room.panorama, texture);
      applyTextureToProjection(projectionTarget, texture, room);
      if (screenFade) screenFade.ready = true;
      hideInitialLoader();
    },
    undefined,
    () => {
      if (requestId !== textureRequestId) return;
      projectionTarget.material.color.set(room.fallback);
      if (screenFade) screenFade.ready = true;
      hideInitialLoader();
    },
  );

  if (room.usePortalArrows || usesPortalDots(room)) addPortals(room);
  renderDirectionArrows(room);
}

function createPanoramaMesh(fallbackColor) {
  const panorama = new THREE.Mesh(
    new THREE.SphereGeometry(50, 72, 36),
    new THREE.MeshBasicMaterial({
      color: fallbackColor,
      side: THREE.BackSide,
    }),
  );
  panorama.name = "panorama";
  panorama.renderOrder = 1;
  panoramaGroup.add(panorama);
  activePanorama = panorama;
  return panorama;
}

function createFlatPhotoMesh(fallbackColor) {
  const photo = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      color: fallbackColor,
      side: THREE.FrontSide,
    }),
  );
  photo.name = "flat-photo";
  photo.position.set(0, 0, -8);
  photo.renderOrder = 1;
  flatPhotoGroup.add(photo);
  activePanorama = photo;
  return photo;
}

function applyTextureToProjection(target, texture, room) {
  if (room.projection === "flat") {
    const width = texture.image?.naturalWidth || texture.image?.width || 16;
    const height = texture.image?.naturalHeight || texture.image?.height || 9;
    target.userData.photoAspect = width / height;
    resizeFlatPhotoMesh(target);
  }
  target.material.map = texture;
  target.material.color.set(0xffffff);
  target.material.needsUpdate = true;
}

function resizeFlatPhotoMesh(target = activePanorama) {
  if (!target || target.name !== "flat-photo" || !target.userData.photoAspect) return;
  const distance = Math.abs(target.position.z);
  const visibleHeight = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const visibleWidth = visibleHeight * camera.aspect;
  const photoAspect = target.userData.photoAspect;
  const viewportAspect = visibleWidth / visibleHeight;
  const planeWidth = viewportAspect > photoAspect ? visibleWidth : visibleHeight * photoAspect;
  const planeHeight = viewportAspect > photoAspect ? visibleWidth / photoAspect : visibleHeight;
  target.geometry.dispose();
  target.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
}

function addPortals(room) {
  room.exits.forEach((exit, index) => {
    const showDot = usesPortalDots(room);
    const baseDotScale = exit.dotScale ?? room.portalDotScale ?? 1;
    const dotScale = getResponsivePortalDotScale(baseDotScale);
    const yawRad = THREE.MathUtils.degToRad(exit.yaw ?? exit.arrowYaw ?? 0);
    const pitchRad = THREE.MathUtils.degToRad(exit.pitch ?? -5);
    const radius = 22;
    const x = Math.sin(yawRad) * Math.cos(pitchRad) * radius;
    const y = Math.sin(pitchRad) * radius;
    const z = -Math.cos(yawRad) * Math.cos(pitchRad) * radius;
    const portal = new THREE.Group();
    portal.position.set(x, y, z);
    portal.userData = { type: "portal", to: exit.to };

    const hitArea = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 40),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        colorWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    hitArea.position.z = 0.03;
    if (showDot) hitArea.scale.setScalar(dotScale);
    hitArea.userData = {
      type: "portal",
      to: exit.to,
      isPortalHitArea: showDot,
      baseScale: baseDotScale,
    };
    portal.add(hitArea);

    const marker = showDot
      ? createPortalDot(index + 1, dotScale)
      : createPortalArrow(exit);
    marker.userData = {
      type: "portal",
      to: exit.to,
      isPortalDot: showDot,
      baseScale: baseDotScale,
    };
    portal.add(marker);

    portalGroup.add(portal);
    portals.push(hitArea, marker);
  });
}

function getResponsivePortalDotScale(baseScale = 1) {
  return baseScale * (mobilePanelQuery.matches ? mobilePortalDotScale : 1);
}

function updatePortalDotScales() {
  portalGroup.traverse((node) => {
    if (!node.userData?.isPortalDot && !node.userData?.isPortalHitArea) return;
    node.scale.setScalar(getResponsivePortalDotScale(node.userData.baseScale ?? 1));
  });
}

function createPortalArrow(exit = {}) {
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: portalArrowTexture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      rotation: exit.portalRotation ?? 0,
    }),
  );
  sprite.renderOrder = 10;
  sprite.scale.set(7.2, 4.92, 1);
  sprite.position.z = 0.08;
  return sprite;
}

function createPortalDot(_index, size = 1) {
  const group = new THREE.Group();
  group.userData = { type: "portal" };
  group.scale.setScalar(size);

  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.62, 0.92, 64),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.56,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    }),
  );
  pulse.renderOrder = 11;
  group.add(pulse);

  const core = new THREE.Mesh(
    new THREE.CircleGeometry(0.58, 64),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    }),
  );
  core.renderOrder = 12;
  core.position.z = 0.02;
  group.add(core);

  return group;
}

function createPortalNumberLabel(index) {
  const canvasLabel = document.createElement("canvas");
  const context = canvasLabel.getContext("2d");
  canvasLabel.width = 128;
  canvasLabel.height = 128;
  context.fillStyle = "#404040";
  context.font = "700 54px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(String(index), 64, 67);

  const texture = new THREE.CanvasTexture(canvasLabel);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    }),
  );
  sprite.renderOrder = 13;
  sprite.scale.set(1.18, 1.18, 1);
  return sprite;
}

function createPortalLabel(text, color) {
  const canvasLabel = document.createElement("canvas");
  const context = canvasLabel.getContext("2d");
  const width = 360;
  const height = 92;
  canvasLabel.width = width;
  canvasLabel.height = height;
  context.fillStyle = "rgba(10, 13, 13, 0.78)";
  roundRect(context, 0, 0, width, height, 18);
  context.fill();
  context.strokeStyle = `#${color.toString(16).padStart(6, "0")}`;
  context.lineWidth = 4;
  context.stroke();
  context.fillStyle = "#f4f1e9";
  context.font = "700 34px Inter, Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, width / 2, height / 2);
  const texture = new THREE.CanvasTexture(canvasLabel);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.scale.set(3.5, 0.9, 1);
  return sprite;
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function setRoom(roomId, fromPortal = false) {
  if (!rooms[roomId]) return;
  if (roomId === activeRoomId && !fromPortal) return;
  clearTimeout(roomChangeTimer);
  const requestId = ++roomSwitchRequestId;

  if (!fromPortal) {
    roomChangeTimer = window.setTimeout(() => applyRoom(roomId, false), 40);
    return;
  }

  captureCurrentFrame(roomFadeDuration);
  loadPanoramaTexture(rooms[roomId])
    .then((texture) => {
      if (requestId !== roomSwitchRequestId) return;
      applyRoom(roomId, true, texture);
    })
    .catch(() => {
      if (requestId !== roomSwitchRequestId) return;
      applyRoom(roomId, true);
    });
}

function captureCurrentFrame(duration) {
  try {
    updateCameraView();
    renderer.render(scene, camera);
    roomTransitionFrame.src = renderer.domElement.toDataURL("image/jpeg", 0.9);
    roomTransitionOverlay.style.opacity = "1";
    roomTransitionOverlay.classList.add("active");
    screenFade = {
      duration,
      elapsed: 0,
      ready: false,
    };
  } catch {
    screenFade = null;
    roomTransitionOverlay.classList.remove("active");
    roomTransitionOverlay.style.opacity = "0";
    roomTransitionFrame.removeAttribute("src");
  }
}

function applyRoom(roomId, fromPortal = false, preparedTexture = null) {
  activeRoomId = roomId;
  activePlanAreaId = planByRoom[roomId] ?? activePlanAreaId;
  if (floorByRoom[roomId]) activeMapFloor = floorByRoom[roomId];
  const room = rooms[roomId];
  if (!fromPortal) {
    camera.fov = defaultFov;
  }
  camera.updateProjectionMatrix();
  targetYaw = THREE.MathUtils.degToRad(room.startYaw ?? 0);
  targetPitch = THREE.MathUtils.degToRad(room.startPitch ?? -3.4);
  yaw = targetYaw;
  pitch = targetPitch;
  updateCameraView();
  buildRoom(room, preparedTexture);
  renderUi();
}

function renderUi() {
  const room = rooms[activeRoomId];
  const index = roomKeys.indexOf(activeRoomId) + 1;
  roomTitle.textContent = room.title;
  roomStatus.textContent = `${index} / ${roomKeys.length}`;
  sideTitle.textContent = "Планировка";
  sideText.textContent = "В планировку можно внести любые изменения и дополнения";

  roomNav.textContent = /\d+\.\d+/.test(room.title) && !/м²$/.test(room.title)
    ? `${room.title} м²`
    : room.title;
  updateRoomPulseMarker();

  transitionList.innerHTML = "";
  room.exits.forEach((exit) => {
    const button = document.createElement("button");
    button.className = "transition-button";
    button.type = "button";
    button.innerHTML = `${exit.label}<span>→</span>`;
    button.addEventListener("click", () => setRoom(exit.to, true));
    transitionList.append(button);
  });

  drawMap();
}

function renderDirectionArrows(room) {
  directionArrows.innerHTML = "";
  const shouldHideArrows = Boolean(room.usePortalArrows || usesPortalDots(room) || room.hideDirectionArrows);
  directionArrows.classList.toggle("hidden", shouldHideArrows);
  directionArrows.classList.toggle("numbered-dots", Boolean(room.numberedDirectionDots));
  if (shouldHideArrows) return;

  const arrowCount = room.exits.length;
  room.exits.forEach((exit, index) => {
    const button = document.createElement("button");
    button.className = room.numberedDirectionDots
      ? "direction-arrow direction-dot"
      : "direction-arrow";
    button.type = "button";
    button.setAttribute("aria-label", `Перейти: ${exit.label}`);
    if (room.numberedDirectionDots) button.textContent = String(index + 1);
    button.dataset.arrowYaw = String(exit.arrowYaw ?? exit.yaw);
    button.dataset.arrowRotationOffset = String(exit.arrowRotationOffset ?? 0);
    if (exit.arrowScreenRotation !== undefined) {
      button.dataset.arrowScreenRotation = String(exit.arrowScreenRotation);
    }
    const spread = Math.min(312, Math.max(0, (arrowCount - 1) * 78));
    const progress = arrowCount === 1 ? 0 : index / (arrowCount - 1);
    const normalized = progress * 2 - 1;
    const x = arrowCount === 1 ? 0 : -spread / 2 + spread * progress;
    const y = arrowCount === 1 ? 0 : Math.abs(normalized) * -32;
    button.style.setProperty("--arrow-x", `${x}px`);
    button.style.setProperty("--arrow-y", `${y}px`);
    button.addEventListener("click", () => setRoom(exit.to, true));
    directionArrows.append(button);
  });

  updateDirectionArrows();
}

function normalizeDegrees(value) {
  return ((value + 540) % 360) - 180;
}

function updateDirectionArrows() {
  const currentYaw = THREE.MathUtils.radToDeg(yaw);
  directionArrows.querySelectorAll(".direction-arrow").forEach((button) => {
    if (button.dataset.arrowScreenRotation !== undefined) {
      button.style.setProperty("--arrow-rotation", `${button.dataset.arrowScreenRotation}deg`);
      return;
    }
    const arrowYaw = Number(button.dataset.arrowYaw);
    const offset = Number(button.dataset.arrowRotationOffset);
    const relativeYaw = normalizeDegrees(arrowYaw - currentYaw + offset);
    button.style.setProperty("--arrow-rotation", `${relativeYaw}deg`);
  });
}

function updateRoomPulseMarker() {
  const marker = rooms[activeRoomId]?.marker;
  if (!marker) {
    roomPulseMarker.classList.remove("active");
    return;
  }

  const markerYaw = THREE.MathUtils.degToRad(marker.yaw);
  const markerPitch = THREE.MathUtils.degToRad(marker.pitch);
  markerWorldPosition.set(
    Math.sin(markerYaw) * Math.cos(markerPitch) * 40,
    Math.sin(markerPitch) * 40,
    -Math.cos(markerYaw) * Math.cos(markerPitch) * 40,
  );
  markerWorldPosition.project(camera);

  const bounds = canvas.getBoundingClientRect();
  const x = bounds.left + (markerWorldPosition.x * 0.5 + 0.5) * bounds.width;
  const y = bounds.top + (-markerWorldPosition.y * 0.5 + 0.5) * bounds.height;
  const isVisible =
    markerWorldPosition.z < 1 &&
    markerWorldPosition.x > -1.08 &&
    markerWorldPosition.x < 1.08 &&
    markerWorldPosition.y > -1.08 &&
    markerWorldPosition.y < 1.08;

  roomPulseMarker.classList.toggle("active", isVisible);
  if (isVisible) {
    roomPulseMarker.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }
}

function drawMap() {
  miniMap.innerHTML = "";
  const currentRoomPlanId = planByRoom[activeRoomId] ?? floorPlanAreas[0].id;
  const floorTabs = [
    {
      id: "floor1",
      label: "1 этаж",
      width: planWidth,
      height: planHeight,
      areas: floorPlanAreas,
      fallbackAreaId: currentRoomPlanId,
    },
    {
      id: "floor2",
      label: "2 этаж",
      width: secondFloorPlanWidth,
      height: secondFloorPlanHeight,
      areas: secondFloorPlanAreas,
      baseSrc: "./assets/plans/2floor/не выбрано.svg",
    },
  ];

  const tabList = document.createElement("div");
  tabList.className = "floor-tabs";
  tabList.setAttribute("role", "tablist");
  tabList.setAttribute("aria-label", "Этажи");
  miniMap.append(tabList);

  floorTabs.forEach((floor) => {
    const tab = document.createElement("button");
    const isSelected = floor.id === activeMapFloor;
    tab.className = `floor-tab${isSelected ? " active" : ""}`;
    tab.type = "button";
    tab.textContent = floor.label;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(isSelected));
    tab.addEventListener("click", () => {
      activeMapFloor = floor.id;
      drawMap();
    });
    tabList.append(tab);
  });

  const activeFloor = floorTabs.find((floor) => floor.id === activeMapFloor) ?? floorTabs[0];
  renderFloorMap(activeFloor);
}

function renderFloorMap({ id, width, height, areas, fallbackAreaId = null, baseSrc = null }) {
  const activePlanArea =
    areas.find((item) => item.id === activePlanAreaId) ??
    areas.find((item) => item.id === fallbackAreaId) ??
    null;

  const floorMap = document.createElement("div");
  floorMap.className = "floor-map";
  floorMap.dataset.floor = id;
  floorMap.style.aspectRatio = `${width} / ${height}`;
  miniMap.append(floorMap);

  const planImage = document.createElement("img");
  planImage.className = "plan-image";
  planImage.src = activePlanArea?.src ?? baseSrc ?? areas[0].src;
  planImage.alt = "Планировка Варяг";
  floorMap.append(planImage);

  areas.forEach((item) => {
    const node = document.createElement("button");
    const isActive = item.id === activePlanArea?.id;
    node.className = `map-room${isActive ? " active" : ""}${item.room ? "" : " plan-only"}`;
    node.type = "button";
    node.title = item.label;
    if (!item.room) {
      node.disabled = true;
      node.setAttribute("aria-hidden", "true");
      node.tabIndex = -1;
    }
    node.style.left = `${(item.x / width) * 100}%`;
    node.style.top = `${(item.y / height) * 100}%`;
    node.style.width = `${(item.width / width) * 100}%`;
    node.style.height = `${(item.height / height) * 100}%`;
    if (item.clipPath) node.style.setProperty("--room-shape", item.clipPath);
    if (item.room) {
      node.addEventListener("click", () => {
        activePlanAreaId = item.id;
        activeMapFloor = id;
        closeMobilePanel();
        if (item.room !== activeRoomId) {
          setRoom(item.room);
          return;
        }
        drawMap();
      });
    }
    floorMap.append(node);
  });
}

function closeMobilePanel() {
  if (!mobilePanelQuery.matches) return;
  tourShell.classList.add("panel-collapsed");
  updatePanelToggleState();
  requestAnimationFrame(resize);
}

function resize() {
  const { clientWidth, clientHeight } = canvas;
  renderer.setSize(clientWidth, clientHeight, false);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  resizeFlatPhotoMesh();
  updatePortalDotScales();
}

function updatePointer(event) {
  const bounds = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
}

function findPortal(event) {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(portals, false);
  return hits.find((hit) => hit.object.userData?.type === "portal")?.object;
}

function setCursorHover(isHovering) {
  cursorHovering = isHovering;
  cursorFollower.classList.toggle("hovering", isHovering);
}

function updateCursorTarget(event) {
  cursorVisible = true;
  cursorTarget.set(event.clientX, event.clientY);
  cursorFollower.classList.add("active");
}

function hideCursorFollower() {
  cursorVisible = false;
  cursorHovering = false;
  cursorFollower.classList.remove("active", "hovering");
}

canvas.addEventListener("pointerdown", (event) => {
  updateCursorTarget(event);
  if (rooms[activeRoomId]?.projection === "flat") {
    isDragging = false;
    hasDragged = false;
    return;
  }
  isDragging = true;
  hasDragged = false;
  lastPoint = { x: event.clientX, y: event.clientY };
  dragStart = { x: event.clientX, y: event.clientY };
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  updateCursorTarget(event);
  if (isDragging) {
    const dx = event.clientX - lastPoint.x;
    const dy = event.clientY - lastPoint.y;
    const totalDx = Math.abs(event.clientX - dragStart.x);
    const totalDy = Math.abs(event.clientY - dragStart.y);
    hasDragged = hasDragged || totalDx + totalDy > 8;
    targetYaw -= dx * 0.004;
    targetPitch = THREE.MathUtils.clamp(
      targetPitch + dy * 0.003 * verticalDragDirection,
      -0.42,
      0.32,
    );
    lastPoint = { x: event.clientX, y: event.clientY };
    return;
  }
  const portal = findPortal(event);
  setCursorHover(Boolean(portal));
});

canvas.addEventListener("pointerup", (event) => {
  updateCursorTarget(event);
  isDragging = false;
  if (canvas.hasPointerCapture(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }
  if (!hasDragged) {
    const portal = findPortal(event);
    if (portal?.userData.to) {
      playClickSound();
      setRoom(portal.userData.to, true);
    }
  }
});

document.addEventListener("pointermove", (event) => {
  if (event.target.closest(".side-panel")) {
    hideCursorFollower();
    return;
  }

  updateCursorTarget(event);
  const interactive = event.target.closest("button, a");
  if (interactive) setCursorHover(true);
  else if (!event.target.closest("#tourCanvas")) setCursorHover(false);
});

document.addEventListener("pointerleave", () => {
  hideCursorFollower();
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  camera.fov = THREE.MathUtils.clamp(camera.fov + event.deltaY * 0.02, 46, 96);
  camera.updateProjectionMatrix();
  resizeFlatPhotoMesh();
});

function setZoom(delta) {
  camera.fov = THREE.MathUtils.clamp(camera.fov + delta, 46, 96);
  camera.updateProjectionMatrix();
  resizeFlatPhotoMesh();
}

zoomIn.addEventListener("click", () => setZoom(-6));
zoomOut.addEventListener("click", () => setZoom(6));

function updatePanelToggleState() {
  const isCollapsed = tourShell.classList.contains("panel-collapsed");
  const isMobilePanel = mobilePanelQuery.matches;
  panelToggle.classList.toggle("mobile-plan-toggle", isMobilePanel);
  panelToggle.setAttribute("aria-expanded", String(!isCollapsed));

  if (isMobilePanel) {
    panelToggle.textContent = "";
    panelToggle.setAttribute(
      "aria-label",
      isCollapsed ? "Открыть планировку" : "Закрыть планировку",
    );
    return;
  }

  panelToggle.textContent = isCollapsed ? "‹" : "›";
  panelToggle.setAttribute("aria-label", isCollapsed ? "Показать панель" : "Скрыть панель");
}

function syncResponsivePanel() {
  if (mobilePanelQuery.matches) tourShell.classList.add("panel-collapsed");
  else tourShell.classList.remove("panel-collapsed");
  updatePanelToggleState();
  requestAnimationFrame(resize);
}

window.addEventListener("resize", resize);
if (mobilePanelQuery.addEventListener) {
  mobilePanelQuery.addEventListener("change", syncResponsivePanel);
} else {
  mobilePanelQuery.addListener(syncResponsivePanel);
}

panelToggle.addEventListener("click", () => {
  tourShell.classList.toggle("panel-collapsed");
  updatePanelToggleState();
  requestAnimationFrame(resize);
});

syncResponsivePanel();

backgroundMusic.volume = 0.28;
clickSound.volume = 0.5;

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

roomPulseMarker.addEventListener("mouseenter", playClickSound);
roomPulseMarker.addEventListener("click", () => {
  detailViewer.classList.add("active");
  detailViewer.setAttribute("aria-hidden", "false");
});

detailClose.addEventListener("click", () => {
  detailViewer.classList.remove("active");
  detailViewer.setAttribute("aria-hidden", "true");
});

async function playBackgroundMusic() {
  if (hasStartedMusic || !backgroundMusic.paused) return;
  hasStartedMusic = true;
  try {
    await backgroundMusic.play();
    soundToggle.classList.add("is-playing");
    soundToggle.setAttribute("aria-label", "Выключить музыку");
    soundToggle.setAttribute("aria-pressed", "true");
  } catch {
    hasStartedMusic = false;
  }
}

soundToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    await playBackgroundMusic();
    return;
  }

  backgroundMusic.pause();
  hasStartedMusic = false;
  soundToggle.classList.remove("is-playing");
  soundToggle.setAttribute("aria-label", "Включить музыку");
  soundToggle.setAttribute("aria-pressed", "false");
});

document.addEventListener("pointerdown", playBackgroundMusic, { once: true });

document.addEventListener("click", (event) => {
  const clickedInteractive = event.target.closest("button, a");
  if (event.target.closest(".zoom-button")) return;
  if (clickedInteractive) playClickSound();
});

function updateCameraView() {
  const direction = new THREE.Vector3(
    Math.sin(yaw) * Math.cos(pitch),
    Math.sin(pitch),
    -Math.cos(yaw) * Math.cos(pitch),
  );
  camera.lookAt(direction);
}

function easeInOutCubic(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function animate() {
  const delta = clock.getDelta();
  yaw += (targetYaw - yaw) * 0.32;
  pitch += (targetPitch - pitch) * 0.32;
  updateCameraView();

  portalGroup.children.forEach((portal, index) => {
    portal.lookAt(camera.position);
    portal.traverse((child) => {
      if (child.material?.opacity !== undefined && child.geometry?.type === "RingGeometry") {
        const pulse = (Math.sin(clock.elapsedTime * 2.4 + index * 0.65) + 1) / 2;
        child.material.opacity = 0.18 + (1 - pulse) * 0.46;
        const scale = 0.86 + pulse * 0.36;
        child.scale.set(scale, scale, 1);
      }
    });
  });

  if (screenFade?.ready) {
    screenFade.elapsed += delta;
    const fadeProgress = Math.min(screenFade.elapsed / screenFade.duration, 1);
    const easedProgress = easeInOutCubic(fadeProgress);
    roomTransitionOverlay.style.opacity = String(1 - easedProgress);
    if (fadeProgress >= 1) {
      screenFade = null;
      roomTransitionOverlay.classList.remove("active");
      roomTransitionOverlay.style.opacity = "0";
      roomTransitionFrame.removeAttribute("src");
    }
  }

  if (cursorVisible) {
    cursorPosition.lerp(cursorTarget, cursorHovering ? 0.28 : 0.18);
    cursorFollower.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) translate(-50%, -50%)`;
  }

  updateDirectionArrows();
  updateRoomPulseMarker();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

resize();
applyRoom(activeRoomId);
animate();
