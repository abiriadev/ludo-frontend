import styled from 'styled-components';
import Button from '../Button';
import { useModalStore } from '@/store/modal';

export interface ModalProps {
  children: React.ReactNode;
  alignTitle?: 'flex-start' | 'center';
  title?: string;
  handleApprove: () => void;
  handleCancel?: () => void;
  data?: object;
  approveBtnText: string;
  cancelBtnText?: string;
  isBtnWidthEqual?: boolean;
}

const Modal = ({
  children,
  alignTitle = 'flex-start',
  title,
  handleApprove,
  handleCancel,
  approveBtnText,
  cancelBtnText,
  isBtnWidthEqual = true,
}: ModalProps) => {
  const { closeModal } = useModalStore();
  return (
    <ModalBackDropWrapper>
      <ModalWrapper>
        <ModalInfoWrapper alignTitle={alignTitle}>
          <div className="title">{title}</div>
          <ModalContentWrapper>{children}</ModalContentWrapper>
        </ModalInfoWrapper>
        <ModalBtnsWrapper onClick={closeModal} isBtnWidthEqual={isBtnWidthEqual} cancelBtnText={cancelBtnText}>
          {cancelBtnText && (
            <Button className="cancel__btn" onClick={handleCancel ? handleCancel : closeModal}>
              {cancelBtnText}
            </Button>
          )}
          <Button className="approve__btn" scheme="primary" onClick={() => handleApprove()}>
            {approveBtnText}
          </Button>
        </ModalBtnsWrapper>
      </ModalWrapper>
    </ModalBackDropWrapper>
  );
};
const ModalBackDropWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.color.black1};
`;

const ModalInfoWrapper = styled.div<{ alignTitle: 'flex-start' | 'center' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  .title {
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 5px 0px;
    justify-content: ${(props) => props.alignTitle};
    align-items: center;
    align-self: stretch;
    color: ${({ theme }) => theme.color.black5};
    text-align: center;
    font-family: 'Pretendard700';
    font-size: ${({ theme }) => theme.font.large};
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }
`;

const ModalContentWrapper = styled.div`
  display: flex;
  width: 520px;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.color.black4};
  font-family: 'Pretendard500';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  white-space: pre-line;

  .approve__image {
    width: 100%;
    height: 160px;
    align-self: stretch;
    background: ${({ theme }) => theme.color.gray1};
  }
`;

const ModalBtnsWrapper = styled.div<{ isBtnWidthEqual: boolean; cancelBtnText: string }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.cancelBtnText ? (props.isBtnWidthEqual ? `1fr 1fr` : `158fr 338fr`) : '1fr'};
  align-items: flex-start;
  grid-gap: 24px;
  align-self: stretch;

  button {
    display: flex;
    padding: 0 16px;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    text-align: center;
    font-family: 'Pretendard600';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
  }

  .cancel__btn {
    color: ${({ theme }) => theme.color.black3};
    background: ${({ theme }) => theme.color.white};
  }
`;

export default Modal;
