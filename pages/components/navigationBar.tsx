import Styled, { StyledComponent } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navigationbar() {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faGratipay} color="black" fontSize="25px" />
      <FontAwesomeIcon icon={faCalendarCheck} color="black" fontSize="25px" />
      <FontAwesomeIcon icon={faBars} color="black" fontSize="25px" />
    </Wrapper>
  );
}

const Wrapper = Styled.nav`
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 14px;
    padding-right:12px;
    padding-top:12px;
    cursor:pointer;
`;
