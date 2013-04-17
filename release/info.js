/**
 Info Game State
 Display information about the heroine
 */

// consts
var AVATAR_SPRITE_W = 80;
var AVATAR_SPRITE_H = 100;
var AVATAR_DRAW_X = 40;
var AVATAR_DRAW_Y = 20;
var TYPE_ARMOR = 0;
var TYPE_WEAPON = 1;


// class info
var info = new Object();

// image setup
info.avatar_img = new Image();
info.avatar_img_loaded = false;
info.button_img = new Image();
info.button_img_loaded = false;

info.weapons = new Array();
info.armors = new Array();

/*** Initialize **********************/
function info_init() {

  info.avatar_img.src = "images/heroine.png";
  info.avatar_img.onload = function() {info_avatar_onload();};
  info.button_img.src = "images/info_button.png";
  info.button_img.onload = function() {info_button_onload();};
  
  info.weapons[0] = {"name":"Bare Fists",  "atk_min":1,  "atk_max":4};
  info.weapons[1] = {"name":"Wood Stick",  "atk_min":2,  "atk_max":6};
  info.weapons[2] = {"name":"Iron Knife",  "atk_min":3,  "atk_max":8};
  info.weapons[3] = {"name":"Bronze Mace", "atk_min":4,  "atk_max":10};
  info.weapons[4] = {"name":"Steel Sword", "atk_min":5,  "atk_max":12};
  info.weapons[5] = {"name":"War Hammer",  "atk_min":6,  "atk_max":14};
  info.weapons[6] = {"name":"Battle Axe",  "atk_min":7,  "atk_max":16};
  info.weapons[7] = {"name":"Great Sword", "atk_min":8,  "atk_max":18};
  
  info.armors[0] = {"name":"No Armor", "def":0};
  info.armors[1] = {"name":"Serf Rags", "def":2};
  info.armors[2] = {"name":"Travel Cloak", "def":4};
  info.armors[3] = {"name":"Hide Cuirass", "def":6};
  info.armors[4] = {"name":"Studded Leather", "def":8};
  info.armors[5] = {"name":"Chain Maille", "def":10};
  info.armors[6] = {"name":"Plate Armor", "def":12};
  info.armors[7] = {"name":"Wyvern Scale", "def":14};
    
}

/*** Image loading Helpers **********************/
function info_avatar_onload() {info.avatar_img_loaded = true;}
function info_button_onload() {info.button_img_loaded = true;}


/*** Logic Functions **********************/
function info_logic() {

  // check closing info screen
  if (pressing.action && !input_lock.action) {
    gamestate = STATE_EXPLORE;
	input_lock.action = true;	
	redraw = true;
  }

  // check closing info screen (mouse)
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_info)) {
    gamestate = STATE_EXPLORE;
	input_lock.mouse = true;
	redraw = true;  
  }
}

/*** Render Functions **********************/
function info_render() {

  tileset_background();
  mazemap_render(avatar.x, avatar.y, avatar.facing);
 
  bitfont_render("INFO", 80, 2, JUSTIFY_CENTER);
  bitfont_render("Spells:", 158, 50, JUSTIFY_RIGHT);

  info_render_equipment();
  info_render_button();
  info_render_itemlist();
  info_render_hpmp();
  action_render();

}

function info_render_equipment() {
  if (!info.avatar_img_loaded) return;
  
  // always draw the base 
  info_render_equiplayer(0, TYPE_ARMOR);

  // render worn equipment  
  info_render_equiplayer(avatar.armor, TYPE_ARMOR);
  info_render_equiplayer(avatar.weapon, TYPE_WEAPON);
  
}

function info_render_equiplayer(itemtier, itemtype) {

  ctx.drawImage(
    info.avatar_img,
    itemtier * AVATAR_SPRITE_W,
    itemtype * AVATAR_SPRITE_H,
    AVATAR_SPRITE_W,
    AVATAR_SPRITE_H,	
    AVATAR_DRAW_X * SCALE,
    AVATAR_DRAW_Y * SCALE,
    AVATAR_SPRITE_W * SCALE,
    AVATAR_SPRITE_H * SCALE
  );
}

function info_render_itemlist() {
  bitfont_render(info.weapons[avatar.weapon].name, 2, 15, JUSTIFY_LEFT);
  bitfont_render(info.armors[avatar.armor].name, 2, 25, JUSTIFY_LEFT);
  bitfont_render("Gold: " + avatar.gold, 2, 35, JUSTIFY_LEFT);
}

function info_render_hpmp() { 
  bitfont_render("HP: " + avatar.hp + "/" + avatar.max_hp, 2, 100, JUSTIFY_LEFT);
  bitfont_render("MP: " + avatar.mp + "/" + avatar.max_mp, 2, 110, JUSTIFY_LEFT); 
}

function info_render_button() {

  if (!info.button_img_loaded) return;
  
  var button_x;
  
  // show button up on explore, down on info, and hidden any other state
  if (gamestate == STATE_EXPLORE) button_x = 0;
  else if (gamestate == STATE_INFO) button_x = BUTTON_SIZE;
  else return;
  
  ctx.drawImage(
    info.button_img,
    button_x,
    0,
    BUTTON_SIZE,
    BUTTON_SIZE,	
    (BUTTON_POS_INFO.x + BUTTON_OFFSET) * SCALE,
    (BUTTON_POS_INFO.y + BUTTON_OFFSET) * SCALE,
    BUTTON_SIZE * SCALE,
    BUTTON_SIZE * SCALE
  );
}

