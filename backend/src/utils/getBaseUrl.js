function getBaseUrl(urlString) {
    try {
        const url = new URL(urlString);
        return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

module.exports = getBaseUrl;