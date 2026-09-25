const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json",
};

export async function GET(_req, { params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, { headers: HEADERS, next: { revalidate: 60 } });
    if (!res.ok) return Response.json({ error: `upstream returned ${res.status}` }, { status: 502 });
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "failed to fetch workout", detail: String(err) }, { status: 502 });
  }
}
