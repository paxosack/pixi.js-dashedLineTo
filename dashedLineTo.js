import * as PIXI from 'pixi.js-legacy';

export default function dashedLineTo() {
}
PIXI.Graphics.prototype.dashedLineTo = function(toX, toY, dash = 8, gap = 10) 
{
    let from = {
        x:this.currentPath.points[this.currentPath.points.length-2],
        y:this.currentPath.points[this.currentPath.points.length-1]
    }

    let to = {
        x:Math.abs(toX),
        y:Math.abs(toY),
    }

    let len = Math.sqrt(Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y)); 
    let dx = to.x - from.x;
    let dy = to.y - from.y;
    var normal = {x:dx/len, y:dy/len};
    var progressOnLine = 0;
    var dashLeft = this.dashLeft?this.dashLeft:0;
    var gapLeft = this.gapLeft?this.gapLeft:0;
    while(progressOnLine < len){
        if (gapLeft > 0) {
            progressOnLine += gapLeft
            gapLeft = 0
            if (progressOnLine > len) {
                this.moveTo(to.x, to.y);
                dashLeft = 0;
                gapLeft = progressOnLine - len;
                break;
            } else {
                this.moveTo(from.x + (progressOnLine*normal.x), from.y + (progressOnLine*normal.y));
            }
        }
        if(dashLeft > 0) {
            progressOnLine += dashLeft
            dashLeft = 0;
        } else {
            progressOnLine += dash
        }
        if (progressOnLine > len) {
            this.lineTo(to.x, to.y);
            dashLeft = progressOnLine - len;
            gapLeft = 0;
            break;
        } else {
            this.lineTo(from.x + (progressOnLine*normal.x), from.y + (progressOnLine*normal.y));
        }
        progressOnLine += gap
        if (progressOnLine > len) {
            this.moveTo(to.x, to.y);
            dashLeft = 0;
            gapLeft = progressOnLine - len;
            break;
        } else {
            this.moveTo(from.x + (progressOnLine*normal.x), from.y + (progressOnLine*normal.y));
        }
    }

    this.dashLeft = dashLeft;
    this.gapLeft = gapLeft;
    return this;
};

PIXI.Graphics.prototype.resetDashes = function(dash = 0, gap = 0) 
{
    this.dashLeft = dash
    this.gapLeft = gapLeft
    return this;
}
