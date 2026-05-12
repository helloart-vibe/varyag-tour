import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const livingRoomPanorama = "./assets/1komnata.png";
const room70Panorama = "./assets/room-7-0.png";
const kitchenLivingPanorama = "./assets/kitchen-living-9-7.png";
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
    title: "Комната 5.6",
    panelTitle: "Комната",
    short: "Комната",
    description:
      "Стартовая панорама тура с обзором главных направлений. Отсюда можно перейти в гостиную, кухню и кабинет.",
    panorama: kitchenLivingPanorama,
    fallback: 0x27454f,
    accent: 0x36c5a3,
    position: [50, 46],
    startYaw: 90,
    startPitch: -3.4,
    marker: { yaw: 166, pitch: 6 },
    showInNav: true,
    exits: [
      { to: "office", label: "Комната 7.0", arrowYaw: 210, pitch: -3 },
      {
        to: "living",
        label: "Кухня-гостиная 9.7",
        arrowYaw: -40,
        pitch: -6,
      },
    ],
  },
  living: {
    title: "Кухня-гостиная 9.7",
    panelTitle: "Кухня-гостиная",
    short: "Кухня-гостиная",
    description:
      "Панорама зоны отдыха. В реальном туре у этой комнаты будет свой снимок 360, а точки перехода останутся тем же механизмом.",
    panorama: livingRoomPanorama,
    fallback: 0x4d3c35,
    accent: 0xf2c14e,
    position: [22, 24],
    startYaw: -90,
    startPitch: -3.4,
    showInNav: true,
    exits: [{ to: "lobby", label: "Комната 5.6", arrowYaw: 70, pitch: -5 }],
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
  office: {
    title: "Комната 7.0",
    panelTitle: "Комната",
    short: "Комната 7.0",
    description:
      "Панорамная точка кабинета. Hotspots можно расставлять вручную по yaw/pitch для каждого снимка.",
    panorama: room70Panorama,
    fallback: 0x293a34,
    accent: 0x8dd7cf,
    position: [26, 72],
    startYaw: 0,
    startPitch: -3.4,
    exits: [{ to: "lobby", label: "Лобби", arrowYaw: -35, pitch: -5 }],
  },
  bedroom: {
    title: "Санузел 2.6",
    panelTitle: "Санузел",
    short: "Санузел",
    description:
      "Приватная панорама. Добавление комнаты теперь сводится к новой записи с URL снимка и списком переходов.",
    panorama: livingRoomPanorama,
    fallback: 0x414760,
    accent: 0xc6a6ff,
    position: [18, 52],
    startYaw: 0,
    startPitch: -3.4,
    exits: [{ to: "living", label: "Гостиная", arrowYaw: 148, pitch: -6 }],
  },
};

const canvas = document.querySelector("#tourCanvas");
const roomTransitionOverlay = document.querySelector("#roomTransitionOverlay");
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
const defaultFov = 88;
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

let activeRoomId = "lobby";
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
let initialLoaderHidden = false;
const initialLoaderStartedAt = performance.now();
let cursorVisible = false;
let cursorHovering = false;
let roomChangeTimer = null;
const cursorPosition = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
const cursorTarget = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
const markerWorldPosition = new THREE.Vector3();

scene.add(camera);
camera.position.set(0, 0, 0);

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

function loadPanoramaTexture(room) {
  const cachedTexture = textureCache.get(room.panorama);
  if (cachedTexture) return Promise.resolve(cachedTexture);

  return new Promise((resolve, reject) => {
    textureLoader.load(
      room.panorama,
      (texture) => {
        const preparedTexture = preparePanoramaTexture(texture);
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

function buildRoom(room, preparedTexture = null) {
  disposeGroup(panoramaGroup);
  activePanorama = null;
  activeTexture = null;
  disposeGroup(portalGroup);
  portals.length = 0;

  const fallbackColor = new THREE.Color(room.fallback).multiplyScalar(0.52);
  scene.background = fallbackColor;
  scene.fog = null;
  const requestId = ++textureRequestId;

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

  if (preparedTexture) {
    activeTexture = preparedTexture;
    panorama.material.map = preparedTexture;
    panorama.material.color.set(0xffffff);
    panorama.material.needsUpdate = true;
    if (screenFade) screenFade.ready = true;
    hideInitialLoader();
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
      preparePanoramaTexture(texture);
      textureCache.set(room.panorama, texture);
      panorama.material.map = texture;
      panorama.material.color.set(0xffffff);
      panorama.material.needsUpdate = true;
      if (screenFade) screenFade.ready = true;
      hideInitialLoader();
    },
    undefined,
    () => {
      if (requestId !== textureRequestId) return;
      panorama.material.color.set(room.fallback);
      if (screenFade) screenFade.ready = true;
      hideInitialLoader();
    },
  );

  renderDirectionArrows(room);
}

function addPortals(room) {
  room.exits.forEach((exit) => {
    const yawRad = THREE.MathUtils.degToRad(exit.yaw);
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
    hitArea.userData = { type: "portal", to: exit.to };
    portal.add(hitArea);

    const arrow = createPortalArrow();
    arrow.userData = { type: "portal", to: exit.to };
    portal.add(arrow);

    portalGroup.add(portal);
    portals.push(hitArea, arrow);
  });
}

function createPortalArrow() {
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: portalArrowTexture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    }),
  );
  sprite.renderOrder = 10;
  sprite.scale.set(6.5, 4.44, 1);
  sprite.position.z = 0.08;
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
    roomTransitionOverlay.style.backgroundImage = `url("${renderer.domElement.toDataURL("image/jpeg", 0.9)}")`;
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
    roomTransitionOverlay.style.backgroundImage = "";
  }
}

function applyRoom(roomId, fromPortal = false, preparedTexture = null) {
  activeRoomId = roomId;
  const room = rooms[roomId];
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
  sideTitle.textContent = "Планировки";
  sideText.textContent = "В планировку можно внести любые изменения и дополнения";

  roomNav.textContent = `${room.title} м²`;
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

  room.exits.forEach((exit) => {
    const button = document.createElement("button");
    button.className = "direction-arrow";
    button.type = "button";
    button.setAttribute("aria-label", `Перейти: ${exit.label}`);
    button.dataset.arrowYaw = String(exit.arrowYaw ?? exit.yaw);
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
    const arrowYaw = Number(button.dataset.arrowYaw);
    const relativeYaw = normalizeDegrees(arrowYaw - currentYaw);
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
  const planImage = document.createElement("img");
  planImage.className = "plan-image";
  planImage.src = "./assets/varayg.svg";
  planImage.alt = "Планировка Варяг";
  miniMap.append(planImage);

  const planNodes = [
    { room: "lobby", x: 44, y: 40 },
    { room: "living", x: 170, y: 39 },
    { room: "office", x: 44, y: 128 },
    { room: "kitchen", x: 137, y: 135 },
    { room: "bedroom", x: 196, y: 136 },
  ];

  planNodes.forEach((item) => {
    const node = document.createElement("button");
    node.className = `map-node${item.room === activeRoomId ? " active" : ""}`;
    node.type = "button";
    node.title = rooms[item.room].title;
    node.style.left = `${item.x}px`;
    node.style.top = `${item.y}px`;
    node.addEventListener("click", () => setRoom(item.room));
    miniMap.append(node);
  });
}

function resize() {
  const { clientWidth, clientHeight } = canvas;
  renderer.setSize(clientWidth, clientHeight, false);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
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

canvas.addEventListener("pointerdown", (event) => {
  updateCursorTarget(event);
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
  canvas.releasePointerCapture(event.pointerId);
  if (!hasDragged) {
    const portal = findPortal(event);
    if (portal?.userData.to) {
      playClickSound();
      setRoom(portal.userData.to, true);
    }
  }
});

document.addEventListener("pointermove", (event) => {
  updateCursorTarget(event);
  const interactive = event.target.closest("button, a");
  if (interactive) setCursorHover(true);
  else if (!event.target.closest("#tourCanvas")) setCursorHover(false);
});

document.addEventListener("pointerleave", () => {
  cursorVisible = false;
  cursorFollower.classList.remove("active");
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  camera.fov = THREE.MathUtils.clamp(camera.fov + event.deltaY * 0.02, 46, 96);
  camera.updateProjectionMatrix();
});

function setZoom(delta) {
  camera.fov = THREE.MathUtils.clamp(camera.fov + delta, 46, 96);
  camera.updateProjectionMatrix();
}

zoomIn.addEventListener("click", () => setZoom(-6));
zoomOut.addEventListener("click", () => setZoom(6));

window.addEventListener("resize", resize);

panelToggle.addEventListener("click", () => {
  const isCollapsed = tourShell.classList.toggle("panel-collapsed");
  panelToggle.setAttribute("aria-expanded", String(!isCollapsed));
  panelToggle.setAttribute("aria-label", isCollapsed ? "Показать панель" : "Скрыть панель");
  panelToggle.textContent = isCollapsed ? "‹" : "›";
  requestAnimationFrame(resize);
});

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
    portal.children.forEach((child) => {
      if (child.material?.opacity !== undefined && child.geometry?.type === "RingGeometry") {
        child.material.opacity = 0.56 + Math.sin(clock.elapsedTime * 3 + index) * 0.1;
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
      roomTransitionOverlay.style.backgroundImage = "";
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
