import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Styled from "styled-components";

export default function Navigationbar() {
  return (
    <Wrapper>
      <Link href={"alarm"} passHref>
        <FontAwesomeIcon icon={faGratipay} color="black" fontSize="25px" />
      </Link>
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
