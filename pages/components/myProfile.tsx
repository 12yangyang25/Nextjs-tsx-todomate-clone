import styled from "styled-components";

export default function MyProfile() {
  let nickName: string = `DDIONG`;

  return <Wrapper>{nickName}</Wrapper>;
}

const Wrapper = styled.div`
  font-weight: 600;
  font-size: 30px;
  margin: 10px;
`;
