import React, { useState } from "react";

const refs = new Set();
const refs2 = new Set();

/** 결론: 메모리 할당 차이 */
export function MyuseRef<T>(initialValue: T): { current: T } {
  // useState로 리렌더링할 때마다 값을 유지
  // ref 의 참조값은 쭉 같게 유지.
  // 컴포넌트가 리렌더링되어도 반환되는 객체의 참조값은 같고, current 값만 업뎃
  // 어쨋든 참조형은 가변형이니까 {current: ref}의 주솟값은 그대로 일거고? 참조값이 변하지않는다는거다 어쩌고
  const [ref] = useState({ current: initialValue });
  return ref;
}
function MyuseRef2<T>(initialValue: T): { current: T } {
  // 리렌더링할 때마다 새로운 객체를 생성 후 반환
  const ref = { current: initialValue };
  return ref;
}
function MyuseRef3<T>(initialValue: T): { current: T } {
  // useState로 리렌더링할 때마다 값을 유지하지만 initialValue 한정
  // return 될 때마다 새로운 { current: ref } 객체를 반환
  // ref 값은 동일하지만 { current: ref } 의 참조값은 달라짐
  const [ref] = useState(initialValue);
  return { current: ref };
}

const Custom_ref = () => {
  const [, rerender] = useState({});
  // useRef로 변경해서 테스트하면 통과됩니다. useMyRef를 useRef와 똑같이 동작하도록 구현해보세요.
  const ref = MyuseRef<HTMLDivElement | null>(null);
  const ref2 = React.useRef<HTMLDivElement | null>(null);

  refs.add(ref);
  refs2.add(ref2);

  const click_custom = () => {
    rerender({});
    console.log("커스텀 :", refs);
  };
  const click_answer = () => {
    rerender({});
    console.log("정답 :", refs2);
  };

  return (
    <>
      <div ref={ref}>
        <button onClick={click_custom}>커스텀1</button>
      </div>
      <div ref={ref}>
        <button onClick={click_custom}>커스텀2</button>
      </div>

      <div ref={ref2}>
        <button onClick={click_answer}>정답1</button>
      </div>
      <div ref={ref2}>
        <button onClick={click_answer}>정답2</button>
      </div>
    </>
  );
};

export default Custom_ref;
