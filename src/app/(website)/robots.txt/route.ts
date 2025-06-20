export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

`;
    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
