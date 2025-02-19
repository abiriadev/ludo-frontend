import styled from 'styled-components';
import { useState, useRef } from 'react';
import { FilterOption } from '@/Types/study';
import DropdownItem from './DropdownItem';
import { useOutSideClick } from '@/Hooks/useOutsideClick';
import { Up, Down } from '@/Assets';
import { useFilterOptionsStore } from '@/store/filter';
import { media } from '@/Styles/theme';

export interface DropdownFilterProps {
  filterName: string;
  items: { id: number; name: string }[];
  filterOption: FilterOption;
  checked?: boolean;
}

const DropdownFilter = ({ filterName, items, filterOption }: DropdownFilterProps) => {
  const { setFilterOptions } = useFilterOptionsStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState(filterName);
  const dropDownItemsRef = useRef(null);
  const toggleDropdonwItems = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedItem = (item: { id: number; name: string }, filterOption: FilterOption) => {
    setContent(
      filterOption === 'PROGRESS_METHOD' && item.id !== 0 ? (item.id === 1 ? '온라인' : '오프라인') : item.name,
    );
    setFilterOptions(filterOption, item.id !== 0 ? item.id : 0);
    setIsOpen(!isOpen);
  };

  useOutSideClick(dropDownItemsRef, toggleDropdonwItems);

  return (
    <DropdownFilterWrapper>
      <DropdownSelectWrapper onClick={toggleDropdonwItems} checked={content !== '전체' && content !== filterName}>
        <span className="filter__text">{content}</span>
        {isOpen ? <Up width={24} height={24} /> : <Down />}
      </DropdownSelectWrapper>
      {isOpen && (
        <DropdownItemsWrapper ref={dropDownItemsRef} filterOption={filterOption}>
          {items.map((item) => (
            <DropdownItem
              handleClick={() => handleSelectedItem(item, filterOption)}
              item={item}
              key={item.id}
              filterOption={filterOption}
            />
          ))}
        </DropdownItemsWrapper>
      )}
    </DropdownFilterWrapper>
  );
};

const DropdownFilterWrapper = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .filter__text {
    text-align: center;
    font-size: ${(props) => props.theme.font.small};
    font-weight: 500;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    cursor: pointer;
  }

  ${media.custom(800)} {
    width: 90px;
  }
`;

const DropdownSelectWrapper = styled.div<{ checked?: boolean }>`
  display: flex;
  padding: 2px 12px 0px 16px;
  width: 130px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 24px;
  color: ${(props) => (props.checked ? props.theme.color.orange2 : props.theme.color.black3)};
  border: 1px solid ${(props) => (props.checked ? props.theme.color.orange2 : props.theme.color.black2)};
  background: ${(props) => (props.checked ? props.theme.color.white : props.theme.color.white)};
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.color.orange2};
    border: 1px solid ${(props) => props.theme.color.orange1};
    color: ${(props) => props.theme.color.white};
    svg > path {
      fill: ${(props) => props.theme.color.white};
    }
  }
  svg > path {
    fill: ${({ theme, checked }) => (checked ? theme.color.orange2 : theme.color.black3)};
  }

  ${media.custom(800)} {
    svg {
      display: none;
    }
  }
`;

const DropdownItemsWrapper = styled.div<{ filterOption: FilterOption }>`
  position: absolute;
  width: 100%;
  height: ${({ filterOption }) => (filterOption === 'STACK' ? '240px' : 'auto')};
  display: flex;
  border-radius: 18px;
  border: 1px solid ${(props) => props.theme.color.black1};
  top: 50px;
  font-weight: 700;
  flex-direction: column;
  overflow-y: scroll;
  background: ${(props) => props.theme.color.white};
  & > li:first-child {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }

  & > li:last-child {
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
`;

export default DropdownFilter;
