//***Constants

/*
 * Flags for debugging
 */
const DRAW_HITBOXES = false;
const ENABLE_CHEATS = false;
const GOD_MODE = false;
const SPAWN_ENEMIES = true;

// The following 2 constants determine the behavior of marine.scrambled
const SCRAMBLE_MOVEMENT = true;
const SCRAMBLE_AIM = true;

/*
 * Difficulty differential constants
 */
const DIFFICULTY_PACKS_SUBTRACT = 1;
const DIFFICULTY_MOVE_SPEED = 50;
const DIFFICULTY_ATTACKS_PER_SECOND = .5;
const DIFFICULTY_BUL_SPEED = 50;
const DIFFICULTY_ZER_HP = 1;
const DIFFICULTY_HYD_HP = 2;
const DIFFICULTY_ULT_HP = 3;
const DIFFICULTY_MUT_HP = 2;
const DIFFICULTY_SCO_HP = 1;
const DIFFICULTY_INF_HP = 1;
const DIFFICULTY_GUA_HP = 3;
const DIFFICULTY_LUR_HP = 2;
const DIFFICULTY_DEF_HP = 10;
const DIFFICULTY_QUE_HP = 10;
const DIFFICULTY_BRO_HP = 2;
const DIFFICULTY_DEV_HP = 10;


/**
  * Constants for Menu 
 */
const CAN_W = 800;
const CAN_H = 600;
const START_SCREEN = "start";
const BUTTON_WIDTH = 85;
const BUTTON_HEIGHT = 53;
const BUTTON_SCALE = 2.5;
const EASY_BUTTON_X = 50;
const EASY_BUTTON_Y = 400;
const EASY_WIDTH = 288;
const EASY_HEIGHT = 67;
const EASY_SCALE = 0.35;
const MEDIUM_BUTTON_X = 300;
const MEDIUM_BUTTON_Y = 400;
const MEDIUM_WIDTH = 433;
const MEDIUM_HEIGHT = 68;
const MEDIUM_SCALE = 0.35;
const HARD_BUTTON_X = 550;
const HARD_BUTTON_Y = 400;
const HARD_WIDTH = 289;
const HARD_HEIGHT = 58;
const HARD_SCALE = 0.35;
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
const MAR_MOVE_SPEED = 200;
const MAR_SHOTS_PER_SECOND = 3;
const MAR_STARTING_ANGLE = 0;
const MAR_FRAME_DIM = 64;
const MAR_MAX_HP = 10;
const MAR_HITBOX_X = 23;
const MAR_HITBOX_Y = 20;
const MAR_HITBOX_W = 16;
const MAR_HITBOX_H = 25;
const INVINCIBLE = 2; //second
const STARTING_HEALTH_PACKS = 3;
const MAX_HEALTH_PACKS = 6;

/**
  * Constants for Bullet class.
 */
const BUL_MOVE_SPEED = 200;
const BUL_HITCIRCLE_X = 16;
const BUL_HITCIRCLE_Y = 15;
const BUL_HITCIRCLE_R = 7;
const BUL_FRAME_DIM = 32;

/*
 * Constants for the HudElements.
 */
const HUD_HEALTH_BACKDROP_WIDTH = 240;
const HUD_HEALTH_BACKDROP_HEIGHT = 333;
const HUD_HEALTH_BACKDROP_CENTER_X = 109;
const HUD_HEALTH_BACKDROP_CENTER_Y = 191;
const HUD_HEALTH_DISPLAY_WIDTH = 64;
const HUD_HEALTH_DISPLAY_HEIGHT = 64;
const HUD_HEALTH_BACKDROP_SCALE = 0.35;
const HUD_HEALTH_DISPLAY_SCALE = 1;
const HUD_PACKS_BACKDROP_WIDTH = 168;
const HUD_PACKS_BACKDROP_HEIGHT = 91;
const HUD_PACKS_BACKDROP_CENTER_X = 98;
const HUD_PACKS_BACKDROP_CENTER_Y = 73;
const HUD_PACKS_DISPLAY_WIDTH = 192;
const HUD_PACKS_DISPLAY_HEIGHT = 32;
const HUD_PACKS_BACKDROP_SCALE = 1.6;
const HUD_PACKS_DISPLAY_SCALE = 1;

/**
  * Constants for Zergling class.
 */
const ZER_VIEW_DISTANCE = 400;
const ZER_ATTACK_DISTANCE = 150;
const ZER_MOVE_SPEED = 230;
const ZER_ATTACKS_PER_SECOND = 2;
const ZER_PAUSE_AFTER_ATTACK = 300; //milliseconds
const ZER_FRAME_DIM = 128;
const ZER_SCALE = 2;
const ZER_ANGLES = 16;
const ZER_SHEET_WIDTH = 17;
const ZER_FIRST_FRAME_ANGLE = 90;
const ZER_FRAME_INCREMENT = 2;
const ZER_MAX_HP = 2;
//const ZER_HITBOX_X = 49;
const ZER_HITBOX_X = 64;
//const ZER_HITBOX_Y = 59;
const ZER_HITBOX_Y = 64;
const ZER_HITBOX_W = 25;
const ZER_HITBOX_H = 25;

/**
  * Constants for Hydralisk class.
 */
const HYD_VIEW_DISTANCE = 1000;
const HYD_ATTACK_DISTANCE = 400;
const HYD_MOVE_SPEED = 175;
const HYD_ATTACKS_PER_SECOND = 1;
const HYD_PAUSE_AFTER_ATTACK = 300; //milliseconds
const HYD_FRAME_DIM = 128;
const HYD_SCALE = 2;
const HYD_ANGLES = 16;
const HYD_SHEET_WIDTH = 17;
const HYD_FIRST_FRAME_ANGLE = 90;
const HYD_FRAME_INCREMENT = 2;
const HYD_MAX_HP = 5;
const HYD_HITBOX_X = 48;
const HYD_HITBOX_Y = 45;
const HYD_HITBOX_W = 31;
const HYD_HITBOX_H = 40;

/**
  * Constants for Ultralisk class.
 */
const ULT_VIEW_DISTANCE = 1000;
const ULT_ATTACK_DISTANCE = 150;
const ULT_MOVE_SPEED = 125;
const ULT_ATTACKS_PER_SECOND = 1;
const ULT_PAUSE_AFTER_ATTACK = 300; //milliseconds
const ULT_FRAME_DIM = 128;
const ULT_SCALE = 2;
const ULT_ANGLES = 16;
const ULT_SHEET_WIDTH = 17;
const ULT_FIRST_FRAME_ANGLE = 90;
const ULT_FRAME_INCREMENT = 2;
const ULT_MAX_HP = 10;
const ULT_HITCIRCLE_X = 71;
const ULT_HITCIRCLE_Y = 59;
const ULT_HITCIRCLE_R = 33;

/**
  * Constants for Mutalisk class.
 */
const MUT_VIEW_DISTANCE = 1000;
const MUT_ATTACK_DISTANCE = 400;
const MUT_MOVE_SPEED = 300;
const MUT_ATTACKS_PER_SECOND = .5;
const MUT_PAUSE_AFTER_ATTACK = 300; //milliseconds
const MUT_FRAME_DIM = 128;
const MUT_SCALE = 2;
const MUT_ANGLES = 16;
const MUT_SHEET_WIDTH = 17;
const MUT_FIRST_FRAME_ANGLE = 90;
const MUT_FRAME_INCREMENT = 2;
const MUT_MAX_HP = 8;
const MUT_HITCIRCLE_X = 69;
const MUT_HITCIRCLE_Y = 54;
const MUT_HITCIRCLE_R = 29;

/**
  * Constants for Scourge class.
 */
const SCO_VIEW_DISTANCE = 1000;
const SCO_ATTACK_DISTANCE = 350;
const SCO_MOVE_SPEED = 100;
const SCO_ATTACKS_PER_SECOND = 1.5;
const SCO_PAUSE_AFTER_ATTACK = 300; //milliseconds
const SCO_FRAME_DIM = 48;
const SCO_SCALE = 2;
const SCO_ANGLES = 16;
const SCO_SHEET_WIDTH = 17;
const SCO_FIRST_FRAME_ANGLE = 90;
const SCO_FRAME_INCREMENT = 2;
const SCO_MAX_HP = 1;
const SCO_HITCIRCLE_X = 24;
const SCO_HITCIRCLE_Y = 24;
const SCO_HITCIRCLE_R = 15;

/**
  * Constants for Infested Marine class.
 */
const INF_VIEW_DISTANCE = 1000;
const INF_ATTACK_DISTANCE = 350;
const INF_MOVE_SPEED = 100;
const INF_ATTACKS_PER_SECOND = 1.5;
const INF_PAUSE_AFTER_ATTACK = 300; //milliseconds
const INF_FRAME_DIM = 64;
const INF_SCALE = 2;
const INF_ANGLES = 16;
const INF_SHEET_WIDTH = 17;
const INF_FIRST_FRAME_ANGLE = 90;
const INF_FRAME_INCREMENT = 2;
const INF_MAX_HP = 1;
const INF_HITBOX_X = 23;
const INF_HITBOX_Y = 20;
const INF_HITBOX_W = 16;
const INF_HITBOX_H = 25;

/**
  * Constants for Guardian class.
 */
const GUA_VIEW_DISTANCE = 1000;
const GUA_ATTACK_DISTANCE = 500;
const GUA_MOVE_SPEED = 125;
const GUA_ATTACKS_PER_SECOND = 3;
const GUA_PAUSE_AFTER_ATTACK = 300; //milliseconds
const GUA_FRAME_DIM = 96;
const GUA_SCALE = 2;
const GUA_ANGLES = 16;
const GUA_SHEET_WIDTH = 17;
const GUA_FIRST_FRAME_ANGLE = 90;
const GUA_FRAME_INCREMENT = 2;
const GUA_MAX_HP = 15;
const GUA_HITCIRCLE_X = 53;
const GUA_HITCIRCLE_Y = 48;
const GUA_HITCIRCLE_R = 35;

/**
  * Constants for Lurker class.
 */
const LUR_VIEW_DISTANCE = 1000;
const LUR_ATTACK_DISTANCE = 250;
const LUR_MOVE_SPEED = 125;
const LUR_ATTACKS_PER_SECOND = 1;
const LUR_PAUSE_AFTER_ATTACK = 300; //milliseconds
const LUR_FRAME_DIM = 128;
const LUR_SCALE = 2;
const LUR_ANGLES = 16;
const LUR_SHEET_WIDTH = 17;
const LUR_FIRST_FRAME_ANGLE = 90;
const LUR_FRAME_INCREMENT = 2;
const LUR_MAX_HP = 10;
const LUR_HITCIRCLE_X = 67;
const LUR_HITCIRCLE_Y = 63;
const LUR_HITCIRCLE_R = 29;

/**
  * Constants for Defiler class.
 */
const DEF_VIEW_DISTANCE = 1000;
const DEF_ATTACK_DISTANCE = 350;
const DEF_MOVE_SPEED = 100;
const DEF_ATTACKS_PER_SECOND = 1;
const DEF_PAUSE_AFTER_ATTACK = 300; //milliseconds
const DEF_FRAME_DIM = 80;
const DEF_SCALE = 2;
const DEF_ANGLES = 16;
const DEF_SHEET_WIDTH = 17;
const DEF_FIRST_FRAME_ANGLE = 90;
const DEF_FRAME_INCREMENT = 2;
const DEF_MAX_HP = 30;
const DEF_HITBOX_X = 16;
const DEF_HITBOX_Y = 16;
const DEF_HITBOX_W = 48;
const DEF_HITBOX_H = 48;
const DEF_ATTACK_TIME_CHANGE = 5;//In seconds

/**
  * Constants for Queen class.
 */
const QUE_VIEW_DISTANCE = 1000;
const QUE_ATTACK_DISTANCE = 350;
const QUE_MOVE_SPEED = 100;
const QUE_ATTACKS_PER_SECOND = 1;
const QUE_PAUSE_AFTER_ATTACK = 300; //milliseconds
const QUE_FRAME_DIM = 128;
const QUE_SCALE = 2;
const QUE_ANGLES = 16;
const QUE_SHEET_WIDTH = 17;
const QUE_FIRST_FRAME_ANGLE = 90;
const QUE_FRAME_INCREMENT = 2;
const QUE_MAX_HP = 4;
const QUE_HITCIRCLE_X = 64;
const QUE_HITCIRCLE_Y = 64;
const QUE_HITCIRCLE_R = 30;
const MAX_BROODLINGS = 6

/**
  * Constants for Broodling class.
 */
const BRO_VIEW_DISTANCE = 1000;
const BRO_ATTACK_DISTANCE = 100;
const BRO_MOVE_SPEED = 210;
const BRO_ATTACKS_PER_SECOND = 1.5;
const BRO_PAUSE_AFTER_ATTACK = 300; //milliseconds
const BRO_FRAME_DIM = 48;
const BRO_SCALE = 2;
const BRO_ANGLES = 16;
const BRO_SHEET_WIDTH = 17;
const BRO_FIRST_FRAME_ANGLE = 90;
const BRO_FRAME_INCREMENT = 2;
const BRO_MAX_HP = 2;
const BRO_HITBOX_X = 11;
const BRO_HITBOX_Y = 11;
const BRO_HITBOX_W = 26;
const BRO_HITBOX_H = 26;

/**
  * Constants for Devourer class.
 */
const DEV_VIEW_DISTANCE = 1000;
const DEV_ATTACK_DISTANCE = 350;
const DEV_MOVE_SPEED = 200;
const DEV_ATTACKS_PER_SECOND = 4;
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



/**
  * Common constants.
 */
const STANDING_ACTION = "standing";
const WALKING_ACTION = "walking";
const ATTACK_ACTION = "attacking";
const SHOOTING_ACTION = "shooting";
const AIMING_ACTION = "aiming";
const FLYING_ACTION = "flying";
const DYING_ACTION = "dying";
const NO_ACTION = "";

const SCALE = 1.25;
const BUFFER = MAR_FRAME_DIM * 2;


// DEBUG ENEMY SET
//tier 1
const ZERGLINGS = 0;	
const HYDRALISKS = 0;
//tier 2
const ULTRALISKS = 0;
const MUTALISKS = 0;
//tier 2.5 (special)
const TERRANS = 0;
const SCOURGES = 0;
//tier 3
const GUARDIANS = 0;
const LURKERS = 0;

/*
// DEFAULT ENEMY SET
//tier 1
const ZERGLINGS = 3;
const HYDRALISKS = 2;
//tier 2
const ULTRALISKS = 1;
const MUTALISKS = 2;
//tier 2.5 (special)
const TERRANS = 1;
const SCOURGES = 1;
//tier 3
const GUARDIANS = 2;
const LURKERS = 1;
*/
//total tiered enemies
const TOTAL_ENEMIES = ZERGLINGS + HYDRALISKS + ULTRALISKS + MUTALISKS + TERRANS + SCOURGES + GUARDIANS + LURKERS;	//number of enemies to kill before boss spawns
