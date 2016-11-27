import Rx from 'rxjs/Rx'

const keydowns$ = Rx.Observable.fromEvent(window, 'keydown').share()
const keyups$ = Rx.Observable.fromEvent(window, 'keyup').share()
const keypresses$ = Rx.Observable.fromEvent(window, 'keypress').share()

// Creates stream that ticks every 200ms while key is down
const keyInputStream = (key, interval) => {
  interval = interval || 100
  const downs$ = keydowns$.filter(evt => evt.key === key)
  const ups$ = keyups$.filter(evt => evt.key === key)

  return downs$.throttle(_ => ups$).mergeMap(_ =>
    Rx.Observable.interval(interval).takeUntil(ups$).startWith(1)
  ).map(_ => key)
}

export { keyInputStream }
