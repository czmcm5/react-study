import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Home = () => {
  const Navigate = useNavigate();

  const go_infiniteScroll = () => Navigate("/infinite-scroll");
  const go_ref_test = () => Navigate("/custom-ref");
  const go_useMemo_test = () => Navigate("/custom-useMemo");

  return (
    <Menu>
      <ul>
        <li onClick={go_infiniteScroll}>무한 스크롤</li>
        <li onClick={go_ref_test}>커스텀 ref</li>
        <li onClick={go_useMemo_test}>커스텀 useMemo</li>
      </ul>
    </Menu>
  );
};

export default Home;
