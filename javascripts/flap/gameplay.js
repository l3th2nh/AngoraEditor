var gameplay_res={}
var gameplay_scn={"image0":{"id":"image0","type":"image","visible":"true","x":"0","y":"0","width":"320","height":"480","image":"bg","scaleX":0.8695652173913043,"scaleY":0.8333333333333334,"rotation":0,"physics":"false","dynamic":"false","body":"default","mass":10,"fixedRotation":true},"bird":{"id":"bird","type":"animate","visible":"true","x":32,"y":173,"width":34,"height":24,"image":"bird_fly","animations":{"fly":{"frameRate":60,"loop":true,"sequence":[0,1,2]}},"scaleX":1,"scaleY":1,"rotation":0,"physics":"true","dynamic":"true","body":"default","mass":10,"fixedRotation":true},"pipe1":{"id":"pipe1","type":"sprite","visible":"true","x":135,"y":-169,"width":52,"height":320,"image":"pipe_down","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":"true","dynamic":"false","body":"default","mass":10,"fixedRotation":true},"pipe2":{"id":"pipe2","type":"sprite","visible":"true","x":176,"y":248,"width":52,"height":320,"image":"pipe_up","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":"true","dynamic":"false","body":"default","mass":10,"fixedRotation":true},"pipe3":{"id":"pipe3","type":"sprite","visible":"true","x":329,"y":-179,"width":52,"height":320,"image":"pipe_down","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":"true","dynamic":"false","body":"default","mass":10,"fixedRotation":true},"pipe4":{"id":"pipe4","type":"sprite","visible":"true","x":338,"y":234,"width":52,"height":320,"image":"pipe_up","frame":0,"scaleX":1,"scaleY":1,"rotation":0,"physics":"true","dynamic":"false","body":"default","mass":10,"fixedRotation":true},"ground":{"id":"ground","type":"tilesprite","visible":"true","x":0,"y":382,"width":"320","height":"100","image":"ground","scaleX":0.8695652173913043,"scaleY":0.8130081300813008,"rotation":0,"physics":"true","dynamic":"false","body":"default","mass":10,"fixedRotation":true},"score":{"id":"score","type":"text","visible":"true","x":240,"y":1,"text":"score","fontFamily":"Arial","fontSize":"32","fontColor":"#ffffff","textAlign":"center"}}
var gameplay_config={"backgroundColor":"#000000","world":{"x":0,"y":0,"width":"320","height":"480","collideWorldBounds":false},"camera":{"x":0,"y":0,"width":"320","height":"480"},"physics":{"enable":"true","type":"ARCADE","gravityX":0,"gravityY":0},"input":{"onDown":"","onHold":"","onTap":"","onUp":""}}
var gameplay=function(game){this.game=game;this.sceneName="gameplay";this.sceneRes=gameplay_res;this.sceneNode=gameplay_scn;this.worldConfig=gameplay_config;this.isLoadComplete=false;this.isCreateFinished=false;this.objects={};this.physicType="ARCADE";};gameplay.prototype={preload:function(){this.customLoad();},create:function(){var worldConfig=this.worldConfig;if(parseBoolean(worldConfig.physics.enable)){this.physicType=worldConfig.physics.type;if(this.worldConfig.physics.type="ARCADE"){this.game.physics.startSystem(Phaser.Physics.ARCADE);this.game.physics.arcade.gravity.x=parseInt(worldConfig.physics.gravityX);this.game.physics.arcade.gravity.y=parseInt(worldConfig.physics.gravityY);}else if(worldConfig.physics.type="P2JS"){this.game.physics.startSystem(Phaser.Physics.P2JS);this.game.physics.p2.gravity.x=parseInt(worldConfig.physics.gravityX);this.game.physics.p2.gravity.y=parseInt(worldConfig.physics.gravityY);}}
for(ev in worldConfig.input){if(worldConfig.input[ev]!="")
this.game.input[ev].add(this[worldConfig.input[ev]],this);}
this.stage.backgroundColor=worldConfig.backgroundColor;this.world.setBounds(parseInt(worldConfig.world.x),parseInt(worldConfig.world.y),parseInt(worldConfig.world.width),parseInt(worldConfig.world.height));this.camera.bounds=new Phaser.Rectangle(parseInt(worldConfig.camera.x),parseInt(worldConfig.camera.y),parseInt(worldConfig.camera.width),parseInt(worldConfig.camera.height));this.load.onLoadComplete.addOnce(this.loadComplete,this);for(i in this.sceneRes){LoadRes(this,this.sceneRes[i]);}
this.load.start();},loadComplete:function(){for(i in this.sceneNode){this.objects[this.sceneNode[i].id]=createObject(this,this.sceneNode[i]);if(typeof this.sceneNode[i].group!='undefined'){this.objects[this.sceneNode[i].group].add(this.objects[this.sceneNode[i].id]);}}
this.isLoadComplete=true;this.customCreate();this.isCreateFinished=true;},update:function(){if(this.isCreateFinished){this.customUpdate();}
else{this.customPreUpdate();}},customLoad:function(){},customCreate:function(){},customPreUpdate:function(){},customUpdate:function(){},shutdown:function(){for(obj in this.objects){game.world.remove(this.objects[obj]);}}};var score;gameplay.prototype.customUpdate=function(){score+=0.1;this.objects['score'].setText(parseInt(score).toString());this.objects['ground'].tilePosition.x--;if(this.input.mousePointer.isDown)
this.objects['bird'].body.velocity.y=-150;else
this.objects['bird'].body.velocity.y=150;this.objects['bird'].body.velocity.x=0;if(this.objects['pipe1'].x<-60){this.objects['pipe1'].x=320+Math.random()*160;this.objects['pipe1'].y=-Math.random()*100-160;}
if(this.objects['pipe2'].x<-60){this.objects['pipe2'].x=320+Math.random()*160;this.objects['pipe2'].y=Math.random()*100+240;}
if(this.objects['pipe3'].x<-60){this.objects['pipe3'].x=320+Math.random()*160;this.objects['pipe3'].y=-Math.random()*100-160;}
if(this.objects['pipe4'].x<-60){this.objects['pipe4'].x=320+Math.random()*160;this.objects['pipe4'].y=Math.random()*100+240;}
this.game.physics.arcade.collide(this.objects['bird'],this.objects['pipe1'],null,null,this);this.game.physics.arcade.collide(this.objects['bird'],this.objects['pipe2'],null,null,this);this.game.physics.arcade.collide(this.objects['bird'],this.objects['pipe3'],null,null,this);this.game.physics.arcade.collide(this.objects['bird'],this.objects['pipe4'],null,null,this);this.game.physics.arcade.collide(this.objects['bird'],this.objects['ground'],null,null,this);if(this.objects['bird'].position.x<-16){score=0;game.state.start('gameover');}}
gameplay.prototype.customCreate=function(){this.objects['bird'].play('fly',8,true);this.objects['pipe1'].body.velocity.x=-100;this.objects['pipe2'].body.velocity.x=-100;this.objects['pipe3'].body.velocity.x=-100;this.objects['pipe4'].body.velocity.x=-100;}