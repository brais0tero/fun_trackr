export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const proxiedResponse = await fetch(targetUrl);
    const data = await proxiedResponse.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching target URL:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch target URL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
