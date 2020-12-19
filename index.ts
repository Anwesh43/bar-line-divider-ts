const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 2 
const lines : number = 5 
const scGap : number = 0.02 
const strokeFactor : number = 90 
const sizeFactor : number = 4.9 
const delay : number = 20 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#673AB7",
    "#4CAF50",
    "#F44336",
    "#795548",
    "#9C27B0"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.divideScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawBarLineDivider(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const gap : number = (2 * size) / lines 
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.translate(-size / 2 + (size) * j, -size)
            DrawingUtil.drawLine(context, 0, -2 * size * sc2, 0, -2 * size * sc1)
            context.restore()
        }
        for (var j = 0; j < lines; j++) {
            const sc1j : number = ScaleUtil.divideScale(sc1, j, lines)
            const sc2j : number = ScaleUtil.divideScale(sc2, j, parts)
            context.save()
            context.translate(-size / 2, -size - gap * j)
            DrawingUtil.drawLine(context, size * sc2j, 0, size * sc1j, 0)
            context.restore()
        }
        context.restore()
    }

    static drawBLDNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        DrawingUtil.drawBarLineDivider(context, scale)
    }
}