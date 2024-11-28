import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InfoBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid red;
  border-radius: 8px;
`;
const Observer = styled.div`
  width: 100%;
  height: 5rem;
  background-color: yellow;
`;

const Infinite_scroll = () => {
  const observerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [cnt, setCnt] = useState(50);

  const testArr = new Array(cnt).fill("");

  // 무한 스크롤 페이징
  const scroll_action = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setCnt((pre) => pre + 50);
    }
  };

  useEffect(() => {
    if (cnt > 500) return;

    const observer = new IntersectionObserver(scroll_action, { threshold: 1 }); // threshold: 0 ~ 1
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [cnt]);

  return (
    <Page>
      <InfoBox>{cnt}</InfoBox>

      {testArr.map((_, i) => {
        return (
          <div style={{ margin: "1rem 0" }} key={i}>
            {i + 1} __ 테스트
          </div>
        );
      })}

      {testArr.length !== 0 && <Observer ref={observerRef} />}
    </Page>
  );
};

export default Infinite_scroll;
