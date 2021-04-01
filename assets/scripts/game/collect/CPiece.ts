// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CPiece extends cc.Component {
    // @property(cc.Node)
    // nodeBg:cc.Node = null;

    @property(cc.Sprite)
    nodeBg: cc.Sprite = null  // 拼图位置

    private _totalcol:number = 0;//总列数
    private _totalrow:number = 0;//总行数
    private _colIndex:number = 0;//所属列序号
    private _rowIndex:number = 0;//所属行序号
    private _bgWidth:number = 0;//背景宽度
    private _bgHeight:number = 0;//背景高度
    private _touchEndCallback:any = null;//触摸结束
    private _touchMoveCallback:any = null;//触摸移动
    private _touchStartCallback:any = null;//触摸开始
    private _moveFrom:number = 0;//0-mgr 1-bg
    picSprite: any;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // 移动的逻辑
        // 获取touchstart
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            event.stopPropagation()
            if(this._touchStartCallback != null && this._moveFrom == 0){
                
                // this.node.rotation=-0
                this._touchStartCallback(this.node);
            }
        });
        // touchmove移动的时候
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event:cc.Touch) => {
            this.node.parent = cc.director.getScene();
            this.node.rotation=-0
            this.node.x = event.getLocation().x;
            this.node.y = event.getLocation().y;
            if(this.node.scale < 1){
                this.node.scale = 1;
            }
            
        });
        // 结束的时候
        this.node.on(cc.Node.EventType.TOUCH_END, event => {
            if(this._touchEndCallback != null){
                // this.node.rotation=-0
                this._touchEndCallback(this.node, event.getLocation());
            }
        });
    }

    setBgMaskSpriteFrame(spf:cc.SpriteFrame){
        this.node.getComponent(cc.Mask).spriteFrame = spf;
    }

    setBgSpriteFrame(){

    }

    setMoveFrom(from:number){
        this._moveFrom = from;
    }

    setTouchStartCallback(callback:any){
        this._touchStartCallback = callback;
    }

    setTouchMoveCallback(callback:any){
        this._touchMoveCallback = callback;
    }

    setTouchEndCallback(callback:any){
        this._touchEndCallback = callback;
    }
    initPic(cfg) {
        let rect = cc.rect(cfg.x, cfg.y, cfg.w, cfg.h);
        // let sprite = this.node.getComponent(cc.Sprite).spriteFrame
        // console.log('123',sprite);
        console.log('cfg.texture',cfg.texture);
        console.log('rect',rect);
        
        
        // sprite = new cc.SpriteFrame(cfg.texture, rect);
        // console.log('123121212',this.node);
        
        this.nodeBg.spriteFrame = new cc.SpriteFrame(cfg.texture, rect);
        this.node.rotation = 90
        
    }
    // update (dt) {}
    // reloadBg(width:number, height:number,totalcol:number, totalrow:number, col:number, row:number){
    //     this._totalcol = totalcol;
    //     this._totalrow = totalrow;
    //     this._colIndex = col;
    //     this._rowIndex = row;
    //     this._bgWidth = width;
    //     this._bgHeight = height;

    //     let cellWidth = this._bgWidth / this._totalcol;
    //     let cellHeigth = this._bgHeight / this._totalrow;
    //     let startWidth = (cellHeigth >> 1);
    //     let startHeight = (cellHeigth >> 1);
    //     let x = -startWidth - cellWidth * this._rowIndex;
    //     let y = startHeight + cellHeigth * this._colIndex;
    //     this.nodeBg.x = x;
    //     this.nodeBg.y = y;
    // }
}
