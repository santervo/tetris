import Rx from 'rxjs/Rx'

const keydowns$ = Rx.Observable.fromEvent(window, 'keydown').share()
const keyups$ = Rx.Observable.fromEvent(window, 'keyup').share()
const keypresses$ = Rx.Observable.fromEvent(window, 'keypress').share()

const emitPeriodicallyOnKeydown = (key, interval, intervalStartDelay = 0) => {
  const downs$ = keydowns$.filter(evt => evt.key === key)
  const ups$ = keyups$.filter(evt => evt.key === key)

  return downs$.throttle(_ => ups$).mergeMap(_ =>
    Rx.Observable.interval(interval).delay(intervalStartDelay).takeUntil(ups$).startWith(1)
  ).map(_ => key)
}

const emitOnceOnKeydown = (key) => {
  const downs$ = keydowns$.filter(evt => evt.key === key)
  const ups$ = keyups$.filter(evt => evt.key === key)

  return downs$.throttle(_ => ups$)
}

export { emitPeriodicallyOnKeydown, emitOnceOnKeydown }
