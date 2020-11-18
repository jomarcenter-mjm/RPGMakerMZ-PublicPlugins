/*:
 * @target MZ
 * @plugindesc Title logo allows you to replaced the text title to a title logo without sacrificing size and redesign your title screen image.
 * @author jomarcenter-mjm|MJMCWAI
 * 
 * @help 
 * This plugin let's you customized the title screen to allowed the use of Image based logo.
 * No more modifying the title logo
 * 
 * Designed with new feature of MZ in mind.
 * it is recomended to use this version of the TitleLogo as MZ have a different methods
 * on how images is drawned.
 * 
 * Please insert the logo at the 'img/system' folder
 * Its is recomeded to disable draw title screen at the database
 * 
 * Differences between the MZ vs MV logo
 * > Major changes to code structure.
 * > New Image scaleing features.
 * > Logo Drawing changes.
 * 
 * --Copyright Information
 * if using this script please include "Jomarcenter-MJM" or "MJM Creatve Works and Ideas" in the credits
 * This can be used Commercially regardless of Game's Content (this includes R-18 content)
 *
 * Created by Jomarcenter-MJM Under MJM Creative Works and Ideas
 * 2020 MJM Creative Works and Ideas
 * Release on October of 2020
 * 
 * @param LogoDirectory
 * @text Logo image
 * @desc Logo images.
 * @type file
 * @dir img/system
 * 
 * @param XPosition
 * @text X Position
 * @desc X position of the title Logo.
 * @type number
 * @default 1
 * 
 * @param YPosition
 * @text Y Position
 * @desc Description
 * @type number
 * @default 1
 * 
 * @param ImageScaling
 * @text image scaleing
 * @desc Change the image scaleing.
 * @type number
 * @max 100
 * @min 1
 * @default 100
 * 
 * @param CenterOffset
 * @text Offset from Center
 * @desc Start from the center of the screen.
 * @type boolean
 * @default true
 * @on yes
 * @off no
 * 
 * 
 * @url https://mjmcreativeworks.wordpress.com/
 */

var MJMJS = MJMJS || {};
MJMJS.TitleLogo = {};
MJMJS.TitleLogo.parameters = PluginManager.parameters('MJMJS_TitleLogo');
MJMJS.TitleLogo.logoImageDir = String(MJMJS.TitleLogo.parameters['LogoDirectory']);
MJMJS.TitleLogo.logoXpos = Number(MJMJS.TitleLogo.parameters['XPosition']);
MJMJS.TitleLogo.logoYpos = Number(MJMJS.TitleLogo.parameters['YPosition']);
MJMJS.TitleLogo.imageScale = Number(MJMJS.TitleLogo.parameters['ImageScaling']);
MJMJS.TitleLogo.centerOffset = JSON.parse(MJMJS.TitleLogo.parameters['CenterOffset']);
//override scene_Title
console.log(MJMJS.TitleLogo.logoImageDir);
var _MJMJStitlelogoSceneTitleoverride = Scene_Title.prototype.create;
(function(_){

    //Start creation process
    Scene_Title.prototype.create = function()
    {
    _MJMJStitlelogoSceneTitleoverride.call(this);
    this.createLogo();
    }

    Scene_Title.prototype.drawGameLogo = function() {
        if (MJMJS.TitleLogo.centerOffset) {
            var x = Graphics.width / 2;
            var y = Graphics.height / 4;
        }
        else
        {
            var x = MJMJS.TitleLogo.logoXpos;
            var y = MJMJS.TitleLogo.logoYpos;
        }
        this._gameLogo.anchor.x = 0.5;
        this._gameLogo.anchor.y = 0.5;
        this._gameLogo.x = x;
        this._gameLogo.y = y;
        this._gameLogo.scale.x = MJMJS.TitleLogo.imageScale / 100;
        this._gameLogo.scale.y = MJMJS.TitleLogo.imageScale / 100;

        this.addChildAt(this._gameLogo, 3);
    };

    Scene_Title.prototype.createLogo = function()
    {
        this._gameLogo = new Sprite(ImageManager.loadSystem(MJMJS.TitleLogo.logoImageDir));
        this.drawGameLogo();
    }
})(MJMJS.TitleLogo);

//END OF FILE - Created under 2020 MJM Creative Works and Ideas