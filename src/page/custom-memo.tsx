import React, { ComponentType, useRef, useState } from "react";
import { shallowEquals } from "./custom-useMemo";

function Mymemo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  const MemoComponent = (props: P) => {
    const preProps = useRef<P | null>(null);
    // const preComponent = useRef<ComponentType<P>>는 왜 안됬던걸까?
    // useRef<ComponentType<P>> : 컴포넌트 자체(즉, ComponentType<P>)를 저장하려는 의도
    // useRef<JSX.Element> : 컴포넌트가 반환하는 JSX 요소를 저장하려는 의도
    // preComponent는 "컴포넌트 함수 자체"를 저장하는 것으로, 렌더링 추적 불가
    const preRender = useRef<JSX.Element | null>(null);

    // props 변화 감지
    if (!preProps.current || !_equals(preProps.current, props)) {
      preProps.current = props;
      preRender.current = <Component {...props} />;
      // <Component ... /> 형태로 저장을 못할 때가 있다. 그럴땐
      // preRender.current = React.createElement(Component, props);
    }
    // props 변화 없음
    return preRender.current;
  };
  return MemoComponent;
}

// 커스텀 memo
const TestComponent = Mymemo(({ value, ...props }: { value: number }) => {
  console.log("커스텀 memo 랜더링");
  return (
    <div data-testid="test-component" {...props}>
      <h5 style={{ marginBottom: 0 }}>커스텀 memo</h5>
      value: {JSON.stringify(value)}
    </div>
  );
});

// 정답
const AnswerComponent = React.memo(({ value, ...props }: { value: number }) => {
  console.log("React.memo 랜더링");
  return (
    <div data-testid="test-component" {...props}>
      <h5 style={{ marginBottom: 0 }}>React.memo</h5>
      value: {JSON.stringify(value)}
    </div>
  );
});

const Custom_memo = () => {
  const [value, setValue] = useState(1);
  const [, rerender] = useState({});

  return (
    <div>
      <TestComponent value={value} />
      <AnswerComponent value={value} />

      <button onClick={() => rerender({})}>rerender</button>
      <button onClick={() => setValue((pre) => pre + 1)}>value +1</button>
    </div>
  );
};

export default Custom_memo;
