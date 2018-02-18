//***Constants

/*
 * Flags for debugging
 */
const DRAW_HITBOXES = false;
const ENABLE_CHEATS = false;
const SPAWN_ENEMIES = true;

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
  * Constants for Ultralisk class.
 */
const ULT_VIEW_DISTANCE = 1000;
const ULT_ATTACK_DISTANCE = 350;
const ULT_MOVE_SPEED = 100;
const ULT_ATTACKS_PER_SECOND = 1.5;
const ULT_PAUSE_AFTER_ATTACK = 300; //milliseconds
const ULT_FRAME_DIM = 128;
const ULT_SCALE = 2;
const ULT_ANGLES = 16;
const ULT_SHEET_WIDTH = 17;
const ULT_FIRST_FRAME_ANGLE = 90;
const ULT_FRAME_INCREMENT = 2;
const ULT_MAX_HP = 4;
const ULT_HITCIRCLE_X = 71;
const ULT_HITCIRCLE_Y = 59;
const ULT_HITCIRCLE_R = 33;

/**
  * Constants for Mutalisk class.
 */
const MUT_VIEW_DISTANCE = 1000;
const MUT_ATTACK_DISTANCE = 350;
const MUT_MOVE_SPEED = 200;
const MUT_ATTACKS_PER_SECOND = 2.25;
const MUT_PAUSE_AFTER_ATTACK = 300; //milliseconds
const MUT_FRAME_DIM = 128;
const MUT_SCALE = 2;
const MUT_ANGLES = 16;
const MUT_SHEET_WIDTH = 17;
const MUT_FIRST_FRAME_ANGLE = 90;
const MUT_FRAME_INCREMENT = 2;
const MUT_MAX_HP = 6;
const MUT_HITCIRCLE_X = 69;
const MUT_HITCIRCLE_Y = 54;
const MUT_HITCIRCLE_R = 29;


/**
  * Constants for Lurker class.
 */
const LUR_VIEW_DISTANCE = 1000;
const LUR_ATTACK_DISTANCE = 350;
const LUR_MOVE_SPEED = 100;
const LUR_ATTACKS_PER_SECOND = 1.5;
const LUR_PAUSE_AFTER_ATTACK = 300; //milliseconds
const LUR_FRAME_DIM = 128;
const LUR_SCALE = 2;
const LUR_ANGLES = 16;
const LUR_SHEET_WIDTH = 17;
const LUR_FIRST_FRAME_ANGLE = 90;
const LUR_FRAME_INCREMENT = 2;
const LUR_MAX_HP = 4;
const LUR_HITCIRCLE_X = 67;
const LUR_HITCIRCLE_Y = 63;
const LUR_HITCIRCLE_R = 29;

/**
  * Constants for Guardian class.
 */
const GUA_VIEW_DISTANCE = 1000;
const GUA_ATTACK_DISTANCE = 350;
const GUA_MOVE_SPEED = 100;
const GUA_ATTACKS_PER_SECOND = 1.5;
const GUA_PAUSE_AFTER_ATTACK = 300; //milliseconds
const GUA_FRAME_DIM = 96;
const GUA_SCALE = 2;
const GUA_ANGLES = 16;
const GUA_SHEET_WIDTH = 17;
const GUA_FIRST_FRAME_ANGLE = 90;
const GUA_FRAME_INCREMENT = 2;
const GUA_MAX_HP = 4;
const GUA_HITCIRCLE_X = 53;
const GUA_HITCIRCLE_Y = 48;
const GUA_HITCIRCLE_R = 35;

/**
  * Constants for Defiler class.
  * NOTE: HITBOXES ARE INACCURATE
 */
const DEF_VIEW_DISTANCE = 1000;
const DEF_ATTACK_DISTANCE = 350;
const DEF_MOVE_SPEED = 100;
const DEF_ATTACKS_PER_SECOND = 1.5;
const DEF_PAUSE_AFTER_ATTACK = 300; //milliseconds
const DEF_FRAME_DIM = 128;
const DEF_SCALE = 2;
const DEF_ANGLES = 16;
const DEF_SHEET_WIDTH = 17;
const DEF_FIRST_FRAME_ANGLE = 90;
const DEF_FRAME_INCREMENT = 2;
const DEF_MAX_HP = 4;
const DEF_HITBOX_X = 48;
const DEF_HITBOX_Y = 45;
const DEF_HITBOX_W = 31;
const DEF_HITBOX_H = 40;

/**
  * Constants for Queen class.
  * NOTE: HITBOXES ARE INACCURATE
 */
const QUE_VIEW_DISTANCE = 1000;
const QUE_ATTACK_DISTANCE = 350;
const QUE_MOVE_SPEED = 100;
const QUE_ATTACKS_PER_SECOND = 1.5;
const QUE_PAUSE_AFTER_ATTACK = 300; //milliseconds
const QUE_FRAME_DIM = 128;
const QUE_SCALE = 2;
const QUE_ANGLES = 16;
const QUE_SHEET_WIDTH = 17;
const QUE_FIRST_FRAME_ANGLE = 90;
const QUE_FRAME_INCREMENT = 2;
const QUE_MAX_HP = 4;
const QUE_HITBOX_X = 48;
const QUE_HITBOX_Y = 45;
const QUE_HITBOX_W = 31;
const QUE_HITBOX_H = 40;

/**
  * Constants for Broodling class.
  * NOTE: HITBOXES ARE INACCURATE
 */
const BRO_VIEW_DISTANCE = 1000;
const BRO_ATTACK_DISTANCE = 350;
const BRO_MOVE_SPEED = 100;
const BRO_ATTACKS_PER_SECOND = 1.5;
const BRO_PAUSE_AFTER_ATTACK = 300; //milliseconds
const BRO_FRAME_DIM = 128;
const BRO_SCALE = 2;
const BRO_ANGLES = 16;
const BRO_SHEET_WIDTH = 17;
const BRO_FIRST_FRAME_ANGLE = 90;
const BRO_FRAME_INCREMENT = 2;
const BRO_MAX_HP = 4;
const BRO_HITBOX_X = 48;
const BRO_HITBOX_Y = 45;
const BRO_HITBOX_W = 31;
const BRO_HITBOX_H = 40;

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

/**
  * Constants for Scourge class.
  * NOTE: HITBOXES ARE INACCURATE
 */
const SCO_VIEW_DISTANCE = 1000;
const SCO_ATTACK_DISTANCE = 350;
const SCO_MOVE_SPEED = 100;
const SCO_ATTACKS_PER_SECOND = 1.5;
const SCO_PAUSE_AFTER_ATTACK = 300; //milliseconds
const SCO_FRAME_DIM = 128;
const SCO_SCALE = 2;
const SCO_ANGLES = 16;
const SCO_SHEET_WIDTH = 17;
const SCO_FIRST_FRAME_ANGLE = 90;
const SCO_FRAME_INCREMENT = 2;
const SCO_MAX_HP = 4;
const SCO_HITBOX_X = 48;
const SCO_HITBOX_Y = 45;
const SCO_HITBOX_W = 31;
const SCO_HITBOX_H = 40;

/**
  * Constants for Infested Marine class.
  * NOTE: HITBOXES ARE INACCURATE
 */
const INF_VIEW_DISTANCE = 1000;
const INF_ATTACK_DISTANCE = 350;
const INF_MOVE_SPEED = 100;
const INF_ATTACKS_PER_SECOND = 1.5;
const INF_PAUSE_AFTER_ATTACK = 300; //milliseconds
const INF_FRAME_DIM = 128;
const INF_SCALE = 2;
const INF_ANGLES = 16;
const INF_SHEET_WIDTH = 17;
const INF_FIRST_FRAME_ANGLE = 90;
const INF_FRAME_INCREMENT = 2;
const INF_MAX_HP = 4;
const INF_HITBOX_X = 48;
const INF_HITBOX_Y = 45;
const INF_HITBOX_W = 31;
const INF_HITBOX_H = 40;


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
const BUFFER = MAR_FRAME_DIM * 2;

//tier 1
const ZERGLINGS = 2;
const HYDRALISKS = 4;
//tier 2
const ULTRALISKS = 0;
const MUTALISKS = 0;
//tier 2.5 (special)
const TERRANS = 0;
const SCOURGES = 0;
//tier 3
const GUARDIANS = 0;
const LURKERS = 0;
//total tiered enemies
const TOTAL_ENEMIES = ZERGLINGS + HYDRALISKS + ULTRALISKS + MUTALISKS + TERRANS + SCOURGES + GUARDIANS + LURKERS;	//number of enemies to kill before boss spawns
