module.exports = (config, options) => {
    config.resolve.extensions = [...new Set([...(config.resolve.extensions || []), '.json'])];
    return config;
}