//***Constants

/*
 * Flags for debugging
 */
const DRAW_HITBOXES = true;
const ENABLE_CHEATS = true;

/**
  * Common constants.
 */
const STANDING_ACTION = "standing";
const WALKING_ACTION = "walking";
const ATTACK_ACTION = "attacking";
const SHOOTING_ACTION = "shooting";
const AIMING_ACTION = "aiming";
const FLYING_ACTION = "flying";
const NO_ACTION = "";

const SCALE = 1.5;
const TOTAL_ENEMIES = 6;	//number of enemies to kill before devourer spawns
const HYD_PROPORTION = 1.0 / 3.0;
const ZER_PROPORTION = 2.0 / 3.0;
const HYDRALISKS = TOTAL_ENEMIES * HYD_PROPORTION;
const ZERGLINGS = TOTAL_ENEMIES * ZER_PROPORTION;

/**
  * Constants for Menu 
 */
const CAN_W = 800;
const CAN_H = 600;
const START_SCREEN = "start";
const PAUSED_SCREEN = "paused";
const DEAD_SCREEN = "dead";
const WIN_SCREEN = "won";

/*
 * Constants for wall collision.
 */
const WALL_W_HITBOX_X = 0;
const WALL_W_HITBOX_Y = 0;
const WALL_W_HITBOX_W = 227;
const WALL_W_HITBOX_H = 1600;
const WALL_N_HITBOX_X = 0;
const WALL_N_HITBOX_Y = 0;
const WALL_N_HITBOX_W = 1600;
const WALL_N_HITBOX_H = 195;
const WALL_E_HITBOX_X = 1370;
const WALL_E_HITBOX_Y = 0;
const WALL_E_HITBOX_W = 230;
const WALL_E_HITBOX_H = 1600;
const WALL_S_HITBOX_X = 0;
const WALL_S_HITBOX_Y = 1410;
const WALL_S_HITBOX_W = 1600;
const WALL_S_HITBOX_H = 190;

/**
  * Constants for Marine class
 */
const MAR_MOVE_SPEED = 175;
const MAR_SHOTS_PER_SECOND = 3;
const MAR_STARTING_ANGLE = 0;
const MAR_FRAME_DIM = 64;
const MAR_MAX_HP = 10;
const MAR_HITBOX_X = 23;
const MAR_HITBOX_Y = 20;
const MAR_HITBOX_W = 16;
const MAR_HITBOX_H = 25;

/**
  * Constants for Bullet class.
 */
const BUL_MOVE_SPEED = 250;
const BUL_HITCIRCLE_X = 16;
const BUL_HITCIRCLE_Y = 15;
const BUL_HITCIRCLE_R = 7;

/*
 * Constants for the HudElement class.
 */
const HUD_HEALTH_BACKDROP_WIDTH = 240;
const HUD_HEALTH_BACKDROP_HEIGHT = 333;
const HUD_HEALTH_BACKDROP_CENTER_X = 109;
const HUD_HEALTH_BACKDROP_CENTER_Y = 191;
const HUD_HEALTH_DISPLAY_WIDTH = 64;
const HUD_HEALTH_DISPLAY_HEIGHT = 64;

/**
  * Constants for Hydralisk class.
 */
const HYD_VIEW_DISTANCE = 1000;
const HYD_ATTACK_DISTANCE = 350;
const HYD_MOVE_SPEED = 100;
const HYD_ATTACKS_PER_SECOND = 1.5;
const HYD_PAUSE_AFTER_ATTACK = 300; //milliseconds
const HYD_FRAME_DIM = 128;
const HYD_SCALE = 2;
const HYD_ANGLES = 16;
const HYD_SHEET_WIDTH = 17;
const HYD_FIRST_FRAME_ANGLE = 90;
const HYD_FRAME_INCREMENT = 2;
const HYD_MAX_HP = 4;
const HYD_HITBOX_X = 48;
const HYD_HITBOX_Y = 45;
const HYD_HITBOX_W = 31;
const HYD_HITBOX_H = 40;

/**
  * Constants for Zergling class.
 */
const ZER_VIEW_DISTANCE = 500;
const ZER_ATTACK_DISTANCE = 100;
const ZER_MOVE_SPEED = 190;
const ZER_ATTACKS_PER_SECOND = 1.25;
const ZER_PAUSE_AFTER_ATTACK = 300; //milliseconds
const ZER_FRAME_DIM = 128;
const ZER_SCALE = 2;
const ZER_ANGLES = 16;
const ZER_SHEET_WIDTH = 17;
const ZER_FIRST_FRAME_ANGLE = 90;
const ZER_FRAME_INCREMENT = 2;
const ZER_MAX_HP = 2;
const ZER_HITBOX_X = 49;
const ZER_HITBOX_Y = 59;
const ZER_HITBOX_W = 25;
const ZER_HITBOX_H = 24;

/**
  * Constants for Devourer class.
 */
const DEV_VIEW_DISTANCE = 1000;
const DEV_ATTACK_DISTANCE = 350;
const DEV_MOVE_SPEED = 100;
const DEV_ATTACKS_PER_SECOND = 3;
const DEV_PAUSE_AFTER_ATTACK = 400; //milliseconds
const DEV_FRAME_DIM = 96;
const DEV_SCALE = 1;
const DEV_ANGLES = 16;
const DEV_SHEET_WIDTH = 17;
const DEV_FIRST_FRAME_ANGLE = 90;
const DEV_FRAME_INCREMENT = 2;
const DEV_MAX_HP = 30;
const DEV_HITCIRCLE_X = 47;
const DEV_HITCIRCLE_Y = 43;
const DEV_HITCIRCLE_R = 29;

