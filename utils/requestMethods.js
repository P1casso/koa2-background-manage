import request from '@/utils/request'

const http = {
    get(url, parsers) {
        const config = {
            method: 'get',
            url: url,
        };
        if (parsers) config.parsers = parsers;
        return request(config);
    },
    post(url, parsers) {
        const config = {
            method: 'post',
            url: url,
        };
        if (parsers) config.parsers = parsers;
        return request(config);
    },
    put(url, parsers) {
        const config = {
            method: 'put',
            url: url,
        };
        if (parsers) config.parsers = parsers;
        return request(config);
    }
}