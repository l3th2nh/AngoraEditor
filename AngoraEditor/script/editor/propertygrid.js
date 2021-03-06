/**
 * @author RedSheep <redsheep@foxmail.com>
 * @copyright
 * @license
 */
/**
 * AngoraEditor.PropertyGridManager constructor
 *
 * Instantiate <code>AngoraEditor.PropertyGridManager</code> object.
 * @class AngoraEditor.PropertyGridManager
 * @classdesc
 * @constructor
 */
AngoraEditor.PropertyGridManager = function (editor) {
	/**
	 * @property {AngoraEditor} - reference of editor
	 */
	this.editor = editor;
	/**
	 * @property {Array} - property of node
	 */
	this.data = [];
	/**
	 * @property {number} - selected row of property grid
	 */
	this.selectedrow = null;
	/**
	 * @property {jquery object}
	 */
	this.grid = $('#attributes');
	/**
	 * @property {Object} - attribute row index
	 */
	this.propertyIndex = {};

	this.setup();
	
	this.editingObject=null;

}
AngoraEditor.PropertyGridManager.prototype = {
	/**
	 * setup
	 * @method setup
	 * @param
	 */
	setup : function () {
		var editor=this.editor;
		this.grid.propertygrid({
			data : '',
			showGroup : true,
			onBeginEdit: function(index,row){
				if(editor.node.selected!=null)
					editor.ui.propertyGrid.editingObject=editor.node.selected.id;
				else
					editor.ui.propertyGrid.editingObject=null;
			},
			onEndEdit : function (index, field, changes) {
				var name = field['name'];
				var value = field['value'];
				if(editor.ui.propertyGrid.editingObject!=null){
					var editingObject=editor.node.get(editor.ui.propertyGrid.editingObject);
					if(editingObject==null){
						editor.scene.setConfig(name,field['group'],value);
					}else{
						if(field['group']=='custom'){
							editingObject.custom[name]=value;
							return;
						}
						switch (name) {
						case 'id':
							editor.ui.nodeTree.updateNode(editingObject.id, value);
							editor.attr.setAttr(editingObject, 'id', value);
							break;
						default:
							editor.attr.setAttr(editingObject,name,value);
							break;
						}
					}
					editingObject=null;
				}else{
					editor.scene.config[field['group']][name]=value;
					if(field['group']=='world')
						editor.ui.gamePane.updateWorld(name,value);
					editor.scene.isConfigChanged=true;
				}
			},
			onDblClickRow:function(index, field){
				if(editor.ui.propertyGrid.editingObject!=null){
					var editingObject=editor.node.get(editor.ui.propertyGrid.editingObject);
					var name = field['name'];
					var value = field['value'];
					switch (name) {
					case 'image':
					case 'assetatlas':
					case 'font':
					case 'audio':
						editor.ui.showResourceEditor(function () {
							if(editor.res.selected==null)return;
							var id = editor.res.selected['id'];
							editor.attr.setAttr(editingObject, name, id);
						});
						break;
					case 'tilemap':
						editor.ui.showResourceEditor(function () {
							if(editor.res.selected==null)return;
							var id = editor.res.selected['id'];
							editor.attr.setAttr(editingObject, name, id);
							var tileset=[];
							for(imgid in editor.res.get(id).tileset)
								tileset.push(imgid);
							editor.attr.setAttr(editingObject, 'tileset', tileset);
						});
						break;
					case 'animations':
						editor.ui.showAnimationEditor(function(){});
						break;
					case 'tracks':
						editor.ui.showAudioEditor(function () {});
						break;
					default:
						break;
					}
				}			
			}
		});
	},
	/**
	 * setup property grid from json data
	 * @method
	 * @param
	 */
	loadData : function (data) {
		this.reset();
		var count=0;
		this.propertyIndex={};
		for( i in data){
			if(i=='events'||i=='input'){
				continue;
			}else if(i=='body'||i=='tileset'){
				this.add(i, data[i].toString());
				this.propertyIndex[i]=count;
				count++;
			}else if(typeof data[i]==='object'){
				for(j in data[i]){
					this.add(j, data[i][j], i);
					this.propertyIndex[j]=count;
					count++;
				}
			}else{
				this.add(i, data[i]);
				this.propertyIndex[i]=count;
				count++;
			}
		}
		this.refresh();
	},
	/**
	 * refresh the property grid
	 * @method refresh
	 * @param 
	 */
	refresh : function () {
		this.grid.propertygrid('loadData', this.data);
	},
	/**
	 * add a new property into the property grid
	 * @method add
	 * @param {string} key
	 * @param {string} value
	 * @param {string} grp	 
	 */
	add : function (key, value, grp, append) {
		switch(key){
			case 'id'	:	group='basic';type='text';break;
			case 'type'	:	group='basic';type='none';break;
			case 'visible':	group='basic';type={"type":"checkbox","options":{"on":true,"off":false}};break;
			case 'image':	group='general';type='none';break;
			case 'frame':	group='general';type='numberbox';break;
			case 'assetatlas':group='general';type='none';break;
			case 'animations':group='general';type='none';break;
			case 'atlasWidth':group='general';type='numberbox';break;
			case 'atlasHeight':group='general';type='numberbox';break;
			case 'ref'	:	group='general';type='none';break;
			case 'x'	:	group='general';type='numberbox';break;
			case 'y'	:	group='general';type='numberbox';break;
			case 'width':	group='general';type='numberbox';break;
			case 'height':	group='general';type='numberbox';break;
			case 'rotation': group='general';type='numberbox';break;
			case 'alpha': group='general';type='numberbox';break;
			case 'scaleX':	group='general';type={"type":"numberbox","options":{"precision":1}};break;
			case 'scaleY':	group='general';type={"type":"numberbox","options":{"precision":1}};break;
			case 'anchorX':	group='general';type={"type":"numberbox","options":{"precision":1}};break;
			case 'anchorY':	group='general';type={"type":"numberbox","options":{"precision":1}};break;
			case 'physics':	group='physics';type={"type":"checkbox","options":{"on":true,"off":false}};break;
			case 'dynamic':	group='physics';type={"type":"checkbox","options":{"on":true,"off":false}};break;
			case 'enable':	group='physics';type={"type":"checkbox","options":{"on":true,"off":false}};break;
			case 'collideWorldBounds':	group='world';type={"type":"checkbox","options":{"on":true,"off":false}};break;
			case 'fixedRotation':group='physics';type={"type":"checkbox","options":{"on":true,"off":false}};break;
			case 'mass'	:	group='physics';type='numberbox';break;
			case 'body':	group='physics';type='none';break;
			case 'text'	:	group='general';type='text';break;
			case 'font' :	group='general';type='none';break;
			case 'fontSize':group='font';type='numberbox';break;
			case 'fontFamily':group='font';type='text';break;
			case 'fontColor':group='font';type='text';break;
			case 'textAlign':group='font';type='none';break;
			case 'audio':	group='audio';type='none';break;
			case 'tracks':	group='audio';type='none';break;
			case 'delay':	group='general';type='numberbox';break;
			case 'maxParticles':	group='emitter';type='numberbox';break;
			case 'frequency':	group='emitter';type='numberbox';break;
			case 'angle':	group='emitter';type='numberbox';break;
			case 'lifespan':	group='particle';type='numberbox';break;
			case 'gravity':	group='particle';type='numberbox';break;
			case 'minspeedX':	group='particle';type='numberbox';break;
			case 'maxspeedX':	group='particle';type='numberbox';break;
			case 'minspeedY':	group='particle';type='numberbox';break;
			case 'maxspeedY':	group='particle';type='numberbox';break;
			case 'tileW': group='tilemap';type='numberbox';break;
			case 'tileH': group='tilemap';type='numberbox';break;
			case 'tilesetW': group='tilemap';type='numberbox';break;
			case 'tilesetH': group='tilemap';type='numberbox';break;
			case 'tilemap': group='tilemap';type='none';break;
			case 'clsname': group='class';type='none';break;
			case 'basecls': group='class';type='none';break;
			case 'gravityX':	group='physics';type='numberbox';break;
			case 'gravityY':	group='physics';type='numberbox';break;
			default		:	group='custom';type='none';break;
		}
		if(typeof grp!='undefined')group=grp;
		if(grp=='tracks' || grp=='animations')type='none';
		if(grp==='custom')type='text';
		if(append)
			this.grid.propertygrid('appendRow',{name:key,value:value,group:group,editor:type});
		else
			this.data.push({name:key,value:value,group:group,editor:type});
	},
	/**
	 * update attribute property row
	 * @method updateRow
	 * @param {string} attr
	 * @param {string} value
	 */
	updateRow : function (attr, value, delay) {
		if(delay) return;
		var index=-1;//this.grid.propertygrid('getRowIndex',attr);//this.propertyIndex[attr];
		var rows = $('#attributes').propertygrid('getRows');
		for( i in rows){
			if(rows[i].name==attr){
				index=i;break;
			}
		}
		//rows[index]['value'] = value;
		this.grid.propertygrid('updateRow', {
			index : index,
			row : {value:value}
		});
	},
	/**
	 * reset property row
	 * @method remove
	 * @param {string} id
	 */
	remove : function (id) {
		//var row = this.grid.propertygrid('getSelected');
		//var index = this.grid.propertygrid('getRowIndex', row);
		var index = this.propertyIndex[id];
		this.grid.propertygrid('deleteRow', index);
	},
	/**
	 * set property value
	 * @method set
	 * @param {string} attr
	 * @param {string} value
	 */
	set : function (attr,value) {
		this.data[attr] = value;
		editor.scene.curSceneNodes.nodes[nodeID][attr] = value;
	},
	/**
	 * reset the property grid
	 * @method reset
	 * @param
	 */
	reset : function () {
		this.data=[];
		this.grid.propertygrid('loadData', []);
	}
}

AngoraEditor.PropertyGridManager.prototype.constructor = AngoraEditor.PropertyGridManager;
