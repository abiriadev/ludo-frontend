import styled from 'styled-components';
import { Hamburger } from '@/Assets';
import GnbMenu from './GnbMenu';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '@/Constants/Router_Path';
import { media } from '@/Styles/theme';

export interface GnbMenuType {
  name: string;
  page: string;
}

const gnbMenus: GnbMenuType[] = [
  { name: '메인 페이지', page: ROUTER_PATH.main },
  { name: '스터디 모집 공고 모아보기', page: ROUTER_PATH.recruitments },
  { name: '마이페이지', page: ROUTER_PATH.mypage },
];

const Gnb = () => {
  const navigate = useNavigate();
  return (
    <GnbWrapper>
      <GnbBtnWrapper>
        <button>
          <Hamburger />
        </button>
      </GnbBtnWrapper>
      <GnbMenuListWrapper>
        {gnbMenus.map((gnbMenu: GnbMenuType) => (
          <GnbMenu name={gnbMenu.name} key={gnbMenu.name} onClick={() => navigate(gnbMenu.page)} />
        ))}
      </GnbMenuListWrapper>
    </GnbWrapper>
  );
};

const GnbWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 1224px;
  padding: 8px 0;
  background: ${(props) => props.theme.color.white};
  gap: 12px;

  ${media.custom(800)} {
    display: none;
  }
`;

const GnbBtnWrapper = styled.div`
  display: flex-;
  align-items: center;
  gap: 12px;
`;

const GnbMenuListWrapper = styled.div`
  display: flex;
`;
export default Gnb;
