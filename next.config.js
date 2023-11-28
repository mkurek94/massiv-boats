/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./app/i18n.tsx');

module.exports = withNextIntl({
    images: { domains: ["res.cloudinary.com"] }
});