import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookie = cookies();
  const userId = cookie.get("userId");
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests are allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  if (userId) {
    cookie.delete("userId");
    return new Response(JSON.stringify({ cookieCleared: true }), {
      status: 200,
    });
  }
  if (!userId) {
    return new Response(
      JSON.stringify({ cookieCleared: false, message: "No cookie found" }),
      {
        status: 200,
      }
    );
  } else {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
