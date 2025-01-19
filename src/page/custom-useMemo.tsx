import {
  DependencyList,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { MyuseRef } from "./custom-ref";

// 커스텀 useMemo
function useCustomMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 이전 의존성을 기억. 초기 설정: null
  // useRef 대신 커스텀 Ref 사용
  const preDeps = MyuseRef<DependencyList | null>(null);
  const preFacotry = MyuseRef<T | null>(null);

  // 이전 의존성이 없는 상태 || 이전 의존성과 현재 의존성이 다른 경우
  // = 의존성이 변한 경우
  if (!preDeps.current || !_equals(preDeps.current, _deps)) {
    // 새로 저장
    preDeps.current = _deps;
    preFacotry.current = factory();
  }
  // 변하지 않을 경우, 기존에 저장된 함수 return
  return preFacotry.current!; // null이 아님을 명시
}

const TestComponent = forwardRef(
  ({ initialDeps }: { initialDeps: unknown[] }, ref) => {
    const [deps, setDeps] = useState(initialDeps);
    const [, setRenderCnt] = useState(0);

    // useMemo 대신 커스텀 훅 사용
    useCustomMemo(() => {
      console.log("custom-useMemo 호출");
    }, [deps]);

    // 정답
    useMemo(() => {
      console.log("React.useMemo 호출");
    }, [deps]);

    useImperativeHandle(ref, () => ({
      updateDeps: (newDeps: unknown[]) => setDeps(newDeps),
    }));

    return (
      <div>
        <div>deps: {deps.join(", ")}</div>

        <button onClick={() => setRenderCnt((prev) => prev + 1)}>
          강제 렌더
        </button>
      </div>
    );
  }
);

const Custom_useMemo = () => {
  const testRef = useRef<{ updateDeps: (newDeps: unknown[]) => void }>(null);

  const change_deps = (numlist: number[]) => {
    if (testRef.current && testRef) {
      testRef.current?.updateDeps(numlist);
    }
  };

  return (
    <div>
      <TestComponent ref={testRef} initialDeps={[42]} />
      <button onClick={() => change_deps([42])}>의존성 변경[42]</button>
      <button onClick={() => change_deps([43])}>의존성 변경[43]</button>
      <button onClick={() => change_deps([42, 43])}>의존성 변경[42,43]</button>
    </div>
  );
};

export default Custom_useMemo;

// 얕은 비교 구현
function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    return objA.every((v, idx) => v === objB[idx]);
  }

  if (
    typeof objA === "object" &&
    typeof objB === "object" &&
    objA !== null &&
    objB !== null
  ) {
    const a = Object.entries(objA);
    const b = Object.entries(objB);

    if (a.length !== b.length) return false;

    return a.every(([key, value]) => objB[key as keyof typeof objB] === value);
  }
  return false;
}
