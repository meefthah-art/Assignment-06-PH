// server-side proxy: avoids the CORS error the browser was getting
// when calling the external api directly from the deployed site
const UPSTREAM = "https://api.abcz.workers.dev/api/fitlog";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json",
};

export async function GET() {
  try {
    // cache the upstream response for a bit so we don't hammer the api and hit its rate limit
    const res = await fetch(UPSTREAM, { headers: HEADERS, next: { revalidate: 60 } });
    if (!res.ok) return Response.json({ error: `upstream returned ${res.status}` }, { status: 502 });
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "failed to fetch workouts", detail: String(err) }, { status: 502 });
  }
}
