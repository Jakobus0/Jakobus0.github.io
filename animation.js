

class _Animation {
    constructor(imgList, x, y) {
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.imgList = imgList;
        this.isOver = false;
    }

    display() {
        image(this.imgList[parseInt(this.currentFrame)], this.x, this.y);
        if (this.currentFrame == this.imgList.length - 1) {
            this.isOver = true;
        }
        this.currentFrame += 0.25;
    }
}