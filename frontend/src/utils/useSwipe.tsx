// https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react

import { TouchEvent, useState } from "react";

interface SwipeInput {
  onSwipedRight?: () => void;
  onSwipedLeft?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export default (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState([0, 0]);
  const [touchEnd, setTouchEnd] = useState([0, 0]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd([0, 0]); // otherwise the swipe is fired even with usual touch events
    setTouchStart([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
  };

  const onTouchMove = (e: TouchEvent) =>
    setTouchEnd([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart[0] - touchEnd[0];
    const distanceY = touchStart[1] - touchEnd[1];
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    // We don't want to accidentally detect a right swipe when its a down swipe
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isRightSwipe && input.onSwipedRight) {
        input.onSwipedRight();
      }
      if (isLeftSwipe && input.onSwipedLeft) {
        input.onSwipedLeft();
      }
    } else {
      if (isUpSwipe && input.onSwipedUp) {
        input.onSwipedUp();
      }
      if (isDownSwipe && input.onSwipedDown) {
        input.onSwipedDown();
      }
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
