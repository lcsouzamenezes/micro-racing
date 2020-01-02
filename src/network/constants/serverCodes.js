export const ERROR_CODES = {
  ROOM_FULL: 'ROOM_FULL',
  ROOM_ALREADY_EXISTS: 'ROOM_ALREADY_EXISTS',
  ALREADY_KICKED: 'ALREADY_KICKED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  RACING_ALREADY_ACTIVE: 'RACING_ALREADY_ACTIVE',

  // VERIFICATION
  PROVIDED_EMPTY_MAP: 'PROVIDED_EMPTY_MAP',
};

export const ACTION_FLAGS = {
  // TYPE
  REQUEST: 0b0,
  RESPONSE: 0b1,

  // RESPONSE_TYPE
  ARRAYBUF_PAYLOAD: 0b000,
  BSON_PAYLOAD: 0b100,
};

export const PLAYER_TYPES = {
  BOT: 1,
  HUMAN: 2,
  ZOMBIE: 3,
};

export const ROOM_MESSAGE_TYPES = {
  PLAYER_MESSAGE: 1,
  ROOM_BOT_MESSAGE: 2,
};

export const ROOM_SERVER_MESSAGES_TYPES = {
  PLAYER_JOIN: 1,
  PLAYER_LEFT: 2,
  PLAYER_KICK: 3,
  PLAYER_CREATED_ROOM: 4,
  PLAYER_RENAME: 5,
};

export const PLAYER_ACTIONS = {
  GET_PLAYER_INFO: 0,
  SET_PLAYER_INFO: 1,

  GET_ROOM_INITIAL_STATE: 2,
  JOIN_ROOM: 3,
  LEAVE_ROOM: 4,
  SEND_KEYMAP: 5,

  // GLOBAL ROOM METHODS
  START_ROOM_RACE: 6,
  STOP_ROOM_RACE: 7,

  // BROADCAST
  PLAYER_JOINED_TO_ROOM: 8,
  PLAYER_LEFT_ROOM: 9,
  UPDATE_PLAYERS_ROOM_STATE: 10,

  // HIGH LATENCY BROADCAST
  UPDATE_PLAYERS_RACE_STATE: 11,
  UPDATE_ROOM_INFO: 12,
  SET_ROOM_INFO: 13,
  ROOM_MAP_CHANGED: 14,

  // LOW LATENCY BROADCAST
  UPDATE_BOARD_OBJECTS: 15,

  // PING CHECK
  PING: 16,

  // SEND DURING CONNECTING
  CONNECTION_SUCCESS: 17,
  CONNECTION_ERROR: 18,

  // OTHER SCREENS
  GET_ROOMS_LIST: 19,
  GET_PREDEFINED_MAPS_LIST: 20,

  // ROOM ACTIONS
  KICK_PLAYER: 21,
  UNBAN_PLAYER: 22,
  YOU_ARE_KICKED: 23,
  BANNED_LIST_UPDATE: 24,
  GET_ROOM_BANNED_PLAYERS: 25,
  LOAD_MAP: 26,

  // CHAT
  GET_CHAT_MESSAGES: 27,
  SEND_CHAT_MESSAGE: 28,
  BROADCAST_CHAT_MESSAGE: 29,

  // FINISH INFO
  GET_PLAYERS_DESCRIPTIONS_LIST: 30,
};

export const CAR_TYPES = {
  RED: 0,
  BLUE: 1,
};

export const CAR_ALIGN = {
  CENTER: 0,
  LEFT_CORNER: 1,
  RIGHT_CORNER: -1,
};

export const OBJECT_TYPES = {
  PRIMITIVE: 0,
  ROAD: 1,
  TERRAIN: 2,
  PLAYER: 3,
  MESH: 4,
};

export const RACE_STATES = {
  BOARD_VIEW: 0,
  WAIT_FOR_SERVER: 1,
  PREPARE_TO_RACE: 2,
  COUNT_TO_START: 3,
  RACE: 4,
  ALL_FINISH: 5,
  PAUSE: 6,
};

export const PLAYER_RACE_STATES = {
  RACE: 1 << 0,
  WRONG_DIRECTION: 1 << 1,
  FINISH: 1 << 2,
  FREEZE: 1 << 3,
  FLASH: 1 << 4,
};
