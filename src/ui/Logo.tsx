import styled from "styled-components";
import { mediaBreakpointUp } from '../styles/Mixins';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  display: none;
  height: 60px;
  width: auto;
  margin: 0 auto;

  ${mediaBreakpointUp('lg')`
    display: block;
    height: 80px;
  `}
`;

const ImgMobile = styled.img`
  height: 30px;
  width: auto;

  ${mediaBreakpointUp('lg')`
    display: none;
  `}
`

function Logo() {
  return (
    <StyledLogo>
      <Img className={'logo'} src="/src/data/img/logo-light.png" alt="The Wild Oasis Logo" />
      <ImgMobile className={'mobile-logo'} src="/src/data/img/logo-simple.png" alt="The Wild Oasis Logo" />
    </StyledLogo>
  );
}

export default Logo;
