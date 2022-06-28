type User = {
  id: number;
  name: string;
  age: number;
};

const users: User[] = [
  { id: 1, name: "AA", age: 32 },
  { id: 2, name: "BB", age: 25 },
  { id: 3, name: "CC", age: 32 },
  { id: 4, name: "DD", age: 28 },
  { id: 5, name: "EE", age: 27 },
  { id: 6, name: "FF", age: 32 },
  { id: 7, name: "GG", age: 24 }
];

export function filter<T>(list: T[], func: Function): T[] {
  var newList = [];
  for (let i = 0; i < list.length; i++) {
    if (func(list[i])) newList.push(list[i]);
  }
  return newList;
}

const twenties = filter<User>(users, (user: User) => user.age < 30);

console.log(twenties);

/*
  1. filter 함수는 항상 동일하게 동작하는 함수다.
    for문도 있고 if문도 있지만 한 가지 로직을 가졌다.
    동일한 인자가 들어오면 동일하게 동작한다.
  2. filter 함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다.
    newListㅇ의 값을 바꾸고 있지만, 그 변화에 의존하는 다른 로직이 없다.
  3. newList는 이 함수에서 최초로 만들어졌고 외부의 어떠한 상황이나 상태와도 무관하다.
    newList가 완성될 때까지는 외부에서 어떠한 접근도 할 수 없기 때문에 filter의 결과도
    달라질 수 없다.
    newList가 완성되고 리턴하고 나면 filter는 완전히 종료된다.
  4. filter의 if는 func의 결과에만 의존한다.
    func에서도 값을 변경하지 않으며 boolean 값을 filter의 if문에 전달할 뿐이다.

  함수형 프로그래밍에서는 '항상 동일하게 동작하는 함수'를 만들고 보조 함수를 조합하는 식으로 로직을 완성한다.
  내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다.
  동일한 인자가 들어오면 동일한 값을 리턴하도록 한다.
*/

// 1.2.4 map 함수
export function map<T>(list: Array<T>, iteratee: Function) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}

console.log(
  "twenties id ",
  map<User>(twenties, (user: User) => user.id)
);
console.log(
  "twenties name ",
  map<User>(twenties, (user: User) => user.name)
);

/*
  인자로 받은 배열에서 특정 작업을 거친 뒤 새로운 배열을 리턴하는 map 함수.
  새로운 배열에 포함되는 내용은 iteratee 함수에 위임했다.
  * 조건을 인자로 넣지 않고 함수를 인자로 넣음으로서 함수의 다형성이 높아짐.
  첫 번째 파라미터인 list는 배열로서 filter 함수의 리턴 결과로 바로 사용할 수도 있다.
*/

console.log(
  "함수의 결과를 바로 사용하는 map 함수",
  map(
    filter(users, (user: User) => user.age > 30),
    (user: User) => user.name
  )
);
/*
  filter 함수로 30대 유저 리스트를 만들고 이 값을 바로 활용했다.
  map 함수는 filter 함수의 결과 중 그들의 이름만을 뽑아 새로운 배열을 리턴한다.
*/

// 1.2.6 함수를 값으로 다룬 예제의 실용성
export function bindValue(key: string) {
  return function (object: object): string | number {
    return object[key];
  };
}

console.log(
  "bindValue로 map 함수 iteratee 만들기",
  map(
    filter(users, (user: User) => user.age > 30),
    bindValue("name")
  )
);
/*
  bindValue 함수는 인자로 받는 key 값을 기억하고 있는 클로저를 리턴한다.
  클로저는 map 함수의 iteratee 함수를 대체하여 코드가 간결해지고 가독성이 좋아졌다.

  * 함수를 리턴하는 함수나 아주 작은 단위의 함수들이 매우 실용적으로 사용되는 사례들을 배운다.
*/
