import { DependencyList, useCallback, useState } from "react";
import { useCustomMemo } from "./custom-useMemo";

// 커스텀 useCallback
function useCustomCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  // useMemo가 의존성 배열에 따라 기존의 것, 새로 생성된 것을 던져줌.
  // useCallback(fn, _deps) 와 useMemo(()=>fn,_deps)는 같다
  // 그러면 useCallback 왜쓰지..?
  // 구분하는 이유: 가독성과 의도 명시
  return useCustomMemo(() => factory, _deps);
}

function TestComponent() {
  const [count, setCount] = useState(0);
  const [deps, setDeps] = useState([42]);

  // myUseCallback 사용
  const memoizedCallback = useCustomCallback(() => {
    console.log("Callback executed");
    return `Count: ${count}`;
  }, [deps]);

  // 정답
  const memoizedCallback_answer = useCallback(() => {
    console.log("콜백 실행");
    return `Count: ${count}`;
  }, [deps]);

  // 콜백을 콘솔에 출력 (렌더링 때마다)
  console.log("실제 Count:", count);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setDeps([42])}>Update Deps</button>
      <div>{memoizedCallback()}</div>
    </div>
  );
}
export default TestComponent;
