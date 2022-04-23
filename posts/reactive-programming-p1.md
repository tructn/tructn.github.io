---
title: 'Reactive programming notes (p1)'
date: '2022-04-23'
tags: ['reactiveprogramming', 'rxjs']
published: true
---

## 🤔 Reactive programming (Rx) ?

### Sơ lược

- Thao tác trên luồng dữ liệu (Data Stream) bất đồng bộ (Asynchronous)
- Luồng dữ liệu thay đổi một cách ngẫu nhiên **không** theo một khoảng thời gian xác định (regular interval).
- Các khái niệm quan trọng trong Rx
  - Observable
  - Observer
  - Operator
  - Subscription
  - Subject
  - Scheduler
- Reactive extension ([ReactiveX.io](https://reactivex.io/)) hỗ trợ C#/Python/Java/Javascript...

### Subject

```javascript
const subject = new Subject<number>();
subject.next(1);
subject.next(8);
subject.next(5);
subject.next(9);
```

### Observer

```javascript
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
})
```

## 🚀 References

- https://en.wikipedia.org/wiki/Reactive_programming
- https://reactivex.io/
- [Intro to Reactive Programming by Jordan Jozwiak of Google - CS50 Tech Talk](https://www.youtube.com/watch?v=KOjC3RhwKU4)
- https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
