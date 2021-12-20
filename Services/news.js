import http from '@util/requestMethod';
import {GETNEWSBYTYPENUM,} from '@/Services/admin.js';

const header = {}

export async function getNewsByTypeNum(params) {
    return http.get(`$(GETNEWSBYTYPENUM)/${params.newsType}/${params.newsNum}`,null,header);
}