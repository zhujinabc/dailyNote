import { post } from '../../utils/request';
import { rootPath } from '../../config';

export async function search(params) {
  try {
    return await post(`${rootPath}/api/search.json`, params);
  } catch (error) {
    throw error;
  }
}
