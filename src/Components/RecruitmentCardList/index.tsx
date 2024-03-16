import styled from 'styled-components';
import RecruitmentCard from '../RecruitmentCard';
import NotFound from '../NotFound';
import { Recruitment } from '@/Types/study';
import { useMemo, useRef } from 'react';
import { useIntersectionObservable } from '@/Hooks/userIntersectionObservable';
import { useRecruitments } from '@/Hooks/recruitments/useRecruitments';
import { INFINITE_RECRUITMENTS_COUMT_PER_PAGE } from '@/Constants/common';
import { useFilterOptionsStore } from '@/store/filter';
import { getProgressMethod } from '@/Mocks/utils/getQueryParams';
import SkeletonRecruitmentCardList from '../Skeleton/SkeletonRecruitmentCardList';

const RecruitmentCardList = () => {
  const { categoryId, stackId, positionId, progressMethodId } = useFilterOptionsStore();
  const progressMethod = getProgressMethod(progressMethodId);

  const observeRef = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, fetchNextPage, isLoading } = useRecruitments({
    filterOptions: { categoryId, stackId, positionId, progressMethod },
    count: INFINITE_RECRUITMENTS_COUMT_PER_PAGE,
  });

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) fetchNextPage();
  };
  useIntersectionObservable(observeRef, onIntersect, hasNextPage);

  const recruitmentsPages = useMemo(() => (data ? data.pages.flatMap(({ data }) => data.data) : []), [data]);
  console.log(isLoading);

  return (
    <RecruitmentCardsWrapper>
      {isLoading ? (
        <SkeletonRecruitmentCardList count={21} />
      ) : recruitmentsPages.length ? (
        recruitmentsPages.map((recruitmentsPage) =>
          recruitmentsPage?.recruitments.map((recruitment: Recruitment) => (
            <RecruitmentCard key={recruitment.id} {...recruitment} />
          )),
        )
      ) : (
        <NotFound />
      )}

      <Target ref={observeRef} />
    </RecruitmentCardsWrapper>
  );
};

const RecruitmentCardsWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  gap: 21px;
`;

const Target = styled.div`
  height: 1px;
`;
export default RecruitmentCardList;
