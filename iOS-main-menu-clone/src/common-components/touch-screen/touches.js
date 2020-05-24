import Touche from './touch';

class Touches {
    constructor(id, swipeAction) {
        this.id = id;
        this.touchmoveRegister(id)
        this.left = swipeAction.left ? swipeAction.left : this.lostMotionAssembley;
        this.right = swipeAction.right ? swipeAction.right : this.lostMotionAssembley;
        this.up = swipeAction.up ? swipeAction.up : this.lostMotionAssembley;
        this.down = swipeAction.down ? swipeAction.down : this.lostMotionAssembley;
    }

    lostMotionAssembley() {
        // do nothing
    }

    touchMoveUnRegister(elementID){
        // let touchsurface = document.getElementById(elementID);
        //
        // touchsurface.removeEventListener('touchstart')
    }

    handleSwipe(touchObj) {
        if (touchObj.swipeRight) {
            this.left(touchObj);
        } else if (touchObj.swipeLeft) {
            this.right(touchObj);
        }
        if (touchObj) {
            this.up(touchObj);
        } else if (touchObj.swipeDown) {
            this.down(touchObj);
        } else {
            // this.home();
        }
    }

    touchmoveRegister(elementID) {
        let touchsurface = document.getElementById(elementID),
            startX,
            startY,
            dist,
            x_dist,
            threshold = 25, //required min distance traveled to be considered swipe
            allowedTime = 2000, // maximum time allowed to travel that distance
            elapsedTime,
            startTime;

        touchsurface.addEventListener('touchstart', function (e) {
            const touchobj = e.changedTouches[0];
            dist = 0;
            x_dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault()
        }, false);

        touchsurface.addEventListener('touchmove', function (e) {
            e.preventDefault() // prevent scrolling when inside DIV
        }, false);

        touchsurface.addEventListener('touchmove', (e) => {
            let touchobj = e.changedTouches[0];
            dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
            x_dist = touchobj.pageY - startY;

            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
            let isRightSwipe = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
            let isLeftSwipe = (elapsedTime <= allowedTime && (-dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
            let isUpSwipe = (elapsedTime <= allowedTime && (-x_dist) >= threshold && Math.abs(touchobj.pageX - startX) <= 100)
            let isDownSwipe = (elapsedTime <= allowedTime && x_dist >= threshold && Math.abs(touchobj.pageX - startX) <= 100);

            this.handleSwipe(new Touche(isRightSwipe, isLeftSwipe, isUpSwipe, isDownSwipe, dist, x_dist));
            e.preventDefault()
        }, false)
    }
}

export default Touches;