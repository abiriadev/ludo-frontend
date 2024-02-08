import { HttpResponse, http } from 'msw';
import { popularRecruitmentsMockData, recruitmentsMockData, recruitmentDetailMockData } from '../data/mockData';
import { RecruitmentDetailRawDataType } from '@/Types/study';
import { getfilterOptions } from '../utils/getQueryParams';
import { getFilteredRecruitmentsMockData } from '../utils/getData';

// import { RecruitmentDetailType } from '@/Apis/study';

const baseURL = import.meta.env.VITE_API_URL;

const getPopularRecruitments = http.get(`${baseURL}`, () => {
  return new HttpResponse(JSON.stringify({ data: popularRecruitmentsMockData, message: 'Success' }), {
    status: 200,
    statusText: 'OK',
  });
});

const getRecruitments = http.get(`${baseURL}/recruitments`, ({ request }) => {
  const url = new URL(request.url);
  const filterOptions = getfilterOptions(url.searchParams);

  const filteredRecruitmentsMockData = getFilteredRecruitmentsMockData(filterOptions);

  return new HttpResponse(JSON.stringify({ data: filteredRecruitmentsMockData, message: 'Success' }), {
    status: 200,
    statusText: 'OK',
  });
});

const getRecruitmentDetail = http.get(`${baseURL}/recruitments/:recruitmentId`, async ({ params }) => {
  const recruitmentId: number = Number(params?.recruitmentId);

  return new HttpResponse(
    JSON.stringify({
      data: {
        ...recruitmentDetailMockData.filter(
          (recruitmentDetail: RecruitmentDetailRawDataType) => recruitmentDetail.id === recruitmentId,
        )[0],
      },
      message: 'Success',
    }),
    {
      status: 200,
      statusText: 'OK',
    },
  );
});

export default [getPopularRecruitments, getRecruitments, getRecruitmentDetail];
