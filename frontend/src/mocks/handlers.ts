import { rest } from 'msw';
import { ENDPOINTS } from '../constants/endpoints';
import { DATA } from './mockData';

export const handlers = [
  rest.get(ENDPOINTS.getLinkPreview, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DATA.imgLinkPreview));
  }),
];
