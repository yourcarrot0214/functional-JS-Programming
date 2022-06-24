const users = [
  { id: 1, name: "AA", age: 32 },
  { id: 2, name: "BB", age: 25 },
  { id: 3, name: "CC", age: 32 },
  { id: 4, name: "DD", age: 28 },
  { id: 5, name: "EE", age: 27 },
  { id: 6, name: "FF", age: 32 },
  { id: 7, name: "GG", age: 24 }
];

const userAge_under_30 = users.filter((user) => user.age > 19 && user.age < 30);

function filter(list, func) {
  var newList = [];
  for (let i = 0; i < list.length; i++) {
    if (func(list[i])) newList.push(list[i].name);
  }
  return newList;
}

const twenties = filter(users, (user) => user.age < 30);

// console.log(twenties);

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
