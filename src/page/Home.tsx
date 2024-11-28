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

  return (
    <Menu>
      <ul>
        <li onClick={go_infiniteScroll}>무한 스크롤</li>
      </ul>
    </Menu>
  );
};

export default Home;
