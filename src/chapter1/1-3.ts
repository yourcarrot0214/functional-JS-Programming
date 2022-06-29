import { users, filter, map, bindValue, User } from "./1-2";

// 하나의 값을 찾아 리턴하는 함수들
export function findById<T>(list: Array<T>, id: string): T {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i];
  }
}

export function findByName<T>(list: Array<T>, name: string): T {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i];
  }
}

export function findByAge<T>(list: Array<T>, age: number): T {
  for (let i = 0; i < list.length; i++) {
    if (list[i].age === age) return list[i];
  }
}

/*
  for, if문 등의 로직을 함수 내부로 숨겨졌지만 아직 개선할 부분이 많다.
  3가지 함수 모두 중복적인 부분이 많은데, 인자 하나를 더 받아서 중복을 제거해보자.
*/
export function findBy<T>(
  key: string,
  list: Array<T>,
  value: string | number
): T {
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === value) return list[i];
  }
}
// console.log("findBy Id", findBy("id", users, 3));
// console.log("findBy Name", findBy("name", users, "GG"));
// console.log("findBy Age", findBy("age", users, 27));

/*
  findBy 함수는 key로 value를 얻을 수 있는 객체들을 가진 모든 배열에 적용할 수 있는 함수다.
  key, value 대신 함수를 인자로 받는 함수로 로직을 변경하면 더 많은 상황에 대응할 수 있다.
    - key가 아닌 메서드를 통해 값을 얻어야 할 때
    - 두 가지 이상의 조건이 필요할 때
    - ===이 아닌 다른 조건으로 찾고자 할 때
*/
export function find<T>(list: Array<T>, predicate: Function): T {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return list[i];
  }
}
// console.log("find Id", find(users, (user) => user.id === 2))
// console.log("find Name", find(users, (user) => user.name === "FF"))
// console.log("find Age", find(users, (user) => user.age === 28))
// 만약 유저의 이름을 메서드로 얻어야 한다면, user.getName() === "FF"와 같은 형식으로 활용할 수 있다.

/*
  함수를 인자로 사용하는 기법은 더 높은 다형성과 안정성을 보장한다.
  객체지향 프로그래밍이 약속된 이름의 메서드를 대신 실행해 주는 형식으로 외부 객체에 위임한다면,
  함수형 프로그래밍은 보조 함수를 통해 완전히 위임하는 방식을 취한다.
*/

// console.log(
//   "30대 유저 중에서 이름이 FF인 유저를 찾는 함수",
//   find(
//     filter(users, (user) => user.age >= 30),
//     (user) => user.name === "FF"
//   )
// )
// console.log(
//   "20대 유저 중에서 이름이 BB인 유저를 찾는 함수",
//   find(
//     filter(users, (user) => user.age < 30),
//     (user) => user.name === "BB"
//   )
// )

/*
  find의 두 번째 인자인 predicate함수를 클로저로 만들어 개선해 보자.
*/
export function bindMatch1(key: string, value: string | number): Function {
  return function (object: User): boolean {
    return object[key] === value;
  };
}

// console.log(
//   "bindMatch1 함수를 활용한 find 함수",
//   find(
//     filter(users, (user) => user.age >= 30),
//     bindMatch1("name", "FF")
//   )
// )
// console.log(
//   "bindMatch1 함수를 활용한 filter 함수",
//   filter(users, bindMatch1("age", 32))
// );

/*
  bindMatch1은 하나의 key에 대한 value만 비교할 수 있다.
  여러개의 key에 해당하는 value들을 비교하는 함수를 만들어보자.
*/
export function object(key, value) {
  let obj = {};
  obj[key] = value;
  return obj;
}

export function match(object, object2) {
  for (let key in object2) {
    if (object[key] !== object2[key]) return false;
  }
  return true;
}

export function bindMatch(object2, value) {
  if (arguments.length === 2) object2 = object(object2, value);
  return function (object) {
    return match(object, object2);
  };
}

// console.log(
//   match(find(users, bindMatch("id", 3)), find(users, bindMatch("name", "CC")))
// );

/*
  1.3.4 고차함수
  함수를 인자로 받거나 함수를 리턴하는 함수
  Underscore.js 라이브러리에서 제공하는 함수를 기반으로 인자 수를 조정하여 다양한 로직을 만들어보자.
*/

var _;

export function usMap(list, iteratee) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push(iteratee(list[i], i, list));
  }
  return newList;
}

export function usFilter(list, predicate) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i], i, list)) newList.push(list[i]);
  }
  return newList;
}

export function usFind(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i], i, list)) return list[i];
  }
}

export function usFindIndex(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i], i, list)) return i;
  }
  return -1;
}

export function usIdentity(value) {
  return value;
}

// console.log(
//   "usIdentity 함수를 활용해 thruty한 값들을 리턴하는 usFilter 함수",
//   usFilter([0, 1, "a", false, true], usIdentity)
// );

// list의 값 중 하나라도 thruty한 값이 있으면 true를 리턴한다.
export function usSome(list) {
  return !!usFind(list, usIdentity);
}

// list의 모든 값이 thruty한 값이어야 true를 리턴한다.
export function usEvery(list) {
  return usFilter(list, usIdentity).length === list.length;
}

/*
  usEvery는 usFilter 함수를 사용하는데, 이 함수는 배열의 끝까지 루프를 돈다.
  중간에 falsy한 값을 만나면 루프를 중단할 수 있도록 로직을 개선해 보자.
*/
export function not(value) {
  return !value;
}

export function beq(a) {
  return function (b) {
    return a === b;
  };
}

export function every(list) {
  return beq(-1)(usFindIndex(list, not));
}

console.log("every", every([0, false]), every([1, true]));

/*
  every 내부 로직 중 filter를 usFindIndex로 변경하고,
  usFindIndex의 두 번째 인자로 함수 not을 사용함으로써 로직이 개선되었다.
  전처럼 list의 끝까지 루프를 돌지 않고 falsy한 값을 만나면 바로 중단된다.

  이제 함수가 가능하면 한 가지 일만 하도록 더 세분화해서 쪼개보도록 하자.
*/

export function positive(list) {
  return usFind(list, usIdentity);
}

export function negativeIndex(list) {
  return usFindIndex(list, not);
}

export function newSome(list) {
  return not(not(positive(list)));
}

export function newEvery(list) {
  return beq(-1)(negativeIndex(list));
}

/*
  1.3.7 함수 합성
  함수를 쪼갤수록 함수 합성은 쉬워진다.
*/

// code 1-37 compose
export function compose() {
  let args = arguments;
  let start = args.length - 1;
  return function () {
    let i = start;
    let result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}
// compose 함수는 가장 마지막 argument의 실행 결과를 왼쪽 argument로 전달한다.
export const composeSome = compose(not, not, positive);
export const composeEvery = compose(beq(-1), negativeIndex);

// console.log("composeSome", composeSome([0, 1, false]));
// console.log("composeEvery", composeEvery([1, 2, true]));

/*
  정리
  값 대신 함수로, for와 if 대신 고차 함수와 보조 함수로, 연산자 대신 함수로, 함수 합성 등 앞서 설명한
  함수적 기법들을 상숑하면 코드도 간결해지고 함수명을 통해 로직을 더 명확히 전달할 수 있어 읽기 좋은 코드가 된다.

  인자와 변수의 선언이 적어지고 함수 내부가 보이지 않도록 한다면 새로운 상황도 생기지 않는다.
  예측하지 못하는 상황이 발생하는 일이 적어진다.
  상태를 공유하지 않는 작은 단위의 함수들은 테스트하기도 쉽고 테스트 케이스를 작성하기도 쉽다.

  작게 쪼개다 보면 정말 쓸모 없어 보이는 함수가 많이 나오기도 하는데 그래도 더 작은 단위로 쪼개보도록 하자.
  재사용성이 높고 재미있는 코드들도 많이 나올 것이다.
*/
