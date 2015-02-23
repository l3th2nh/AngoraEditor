var mainmenu_res={}
var mainmenu_scn={"image0":{"id":"image0","type":"image","visible":"true","x":"0","y":"0","width":"320","height":"480","image":"bg","scaleX":0.8695652173913043,"scaleY":0.8333333333333334,"rotation":0,"physics":false,"dynamic":true,"body":"default","mass":10,"fixedRotation":true},"sprite0":{"id":"sprite0","type":"sprite","visible":"true","x":67,"y":112,"width":178,"height":48,"image":"title","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":false,"dynamic":true,"body":"default","mass":10,"fixedRotation":true},"sprite2":{"id":"sprite2","type":"sprite","visible":"true","x":106,"y":236,"width":104,"height":58,"image":"play","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":false,"dynamic":true,"body":"default","mass":10,"fixedRotation":true,"events":{"onInputDown":"sprite2_onInputDown"}},"sprite4":{"id":"sprite4","type":"sprite","visible":"true","x":106,"y":307,"width":104,"height":58,"image":"scores","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":false,"dynamic":true,"body":"default","mass":10,"fixedRotation":true},"animate5":{"id":"animate5","type":"animate","visible":"true","x":235,"y":85,"width":34,"height":24,"image":"bird_fly","animations":{"fly":{"frameRate":60,"loop":true,"sequence":[0,1,2]}},"scaleX":1,"scaleY":1,"rotation":0,"physics":false,"dynamic":true,"body":"default","mass":10,"fixedRotation":true}}
var mainmenu_config={"backgroundColor":"#000000","world":{"x":0,"y":0,"width":"320","height":"480","collideWorldBounds":false},"camera":{"x":0,"y":0,"width":"320","height":"480"},"physics":{"enable":false,"type":"ARCADE","gravityX":0,"gravityY":0},"input":{"onDown":"","onHold":"","onTap":"","onUp":""}}
var mainmenu=function(game){this.game=game;this.sceneName="mainmenu";this.sceneRes=mainmenu_res;this.sceneNode=mainmenu_scn;this.worldConfig=mainmenu_config;this.isLoadComplete=false;this.isCreateFinished=false;this.objects={};this.physicType="ARCADE";};mainmenu.prototype={preload:function(){this.customLoad();},create:function(){var worldConfig=this.worldConfig;if(parseBoolean(worldConfig.physics.enable)){this.physicType=worldConfig.physics.type;if(this.worldConfig.physics.type="ARCADE"){this.game.physics.startSystem(Phaser.Physics.ARCADE);this.game.physics.arcade.gravity.x=parseInt(worldConfig.physics.gravityX);this.game.physics.arcade.gravity.y=parseInt(worldConfig.physics.gravityY);}else if(worldConfig.physics.type="P2JS"){this.game.physics.startSystem(Phaser.Physics.P2JS);this.game.physics.p2.gravity.x=parseInt(worldConfig.physics.gravityX);this.game.physics.p2.gravity.y=parseInt(worldConfig.physics.gravityY);}}
for(ev in worldConfig.input){if(worldConfig.input[ev]!="")
this.game.input[ev].add(this[worldConfig.input[ev]],this);}
this.stage.backgroundColor=worldConfig.backgroundColor;this.world.setBounds(parseInt(worldConfig.world.x),parseInt(worldConfig.world.y),parseInt(worldConfig.world.width),parseInt(worldConfig.world.height));this.camera.bounds=new Phaser.Rectangle(parseInt(worldConfig.camera.x),parseInt(worldConfig.camera.y),parseInt(worldConfig.camera.width),parseInt(worldConfig.camera.height));this.load.onLoadComplete.addOnce(this.loadComplete,this);for(i in this.sceneRes){LoadRes(this,this.sceneRes[i]);}
this.load.start();},loadComplete:function(){for(i in this.sceneNode){this.objects[this.sceneNode[i].id]=createObject(this,this.sceneNode[i]);if(typeof this.sceneNode[i].group!='undefined'){this.objects[this.sceneNode[i].group].add(this.objects[this.sceneNode[i].id]);}}
this.isLoadComplete=true;this.customCreate();this.isCreateFinished=true;},update:function(){if(this.isCreateFinished){this.customUpdate();}
else{this.customPreUpdate();}},customLoad:function(){},customCreate:function(){},customPreUpdate:function(){},customUpdate:function(){},shutdown:function(){for(obj in this.objects){game.world.remove(this.objects[obj]);}}};mainmenu.prototype.customUpdate=function(){}
mainmenu.prototype.customCreate=function(){this.objects['animate5'].play('fly',8,true);}
mainmenu.prototype.sprite2_onInputDown=function(){game.state.start('gameplay');}