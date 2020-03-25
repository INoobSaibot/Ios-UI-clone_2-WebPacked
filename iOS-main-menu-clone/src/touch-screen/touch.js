class Touch {
    constructor(right, left, up, down, rightSwipeDistance, upSwipeDistance) {
        this.swipeRight = right;
        this.swipeLeft = left;
        this.swipeUp = up;
        this.swipeDown = down;
        this.rightSwipeDistance = rightSwipeDistance;
        this.upSwipeDistance = upSwipeDistance;

        const rightToLeftDist = Math.abs(rightSwipeDistance);
        const topToBotttomDistance = Math.abs(upSwipeDistance)

        if (rightToLeftDist < topToBotttomDistance) {
            this.swipeRight = this.swipeLeft = false;
        } else {
            this.swipeDown = this.swipeUp = false;
        }
    }

}

export default Touch;