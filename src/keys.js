import Rx from 'rxjs/Rx'

const keydowns$ = Rx.Observable.fromEvent(document, 'keydown').share()
const keyups$ = Rx.Observable.fromEvent(document, 'keyup').share()
const keypresses$ = Rx.Observable.fromEvent(document, 'keypress').share()

keydowns$.subscribe(e => console.log(e.keyCode))
const emitPeriodicallyOnKeydown = (keyCode, interval, intervalStartDelay = 0) => {
  const downs$ = keydowns$.filter(evt => evt.keyCode === keyCode)
  const ups$ = keyups$.filter(evt => evt.keyCode === keyCode)

  return downs$.throttle(_ => ups$).mergeMap(_ =>
    Rx.Observable.interval(interval).delay(intervalStartDelay).takeUntil(ups$).startWith(1)
  ).map(_ => keyCode)
}

const emitOnceOnKeydown = (keyCode) => {
  const downs$ = keydowns$.filter(evt => evt.keyCode === keyCode)
  const ups$ = keyups$.filter(evt => evt.keyCode === keyCode)

  return downs$.throttle(_ => ups$)
}

const KeyCodes = {
  ENTER: 13,
  SPACE: 32,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
}
export { emitPeriodicallyOnKeydown, emitOnceOnKeydown, KeyCodes }
