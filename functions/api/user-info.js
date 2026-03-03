export async function onRequestGet(context) {
    const { env } = context;

    try {
        // 這裡必須對應 wrangler.toml 裡的 binding = "tch_db"
        // 如果你寫成 env.DB 或 env.tch-db 都會噴 500 錯誤
        const user = await env.DB.prepare(
            "SELECT username, plan_name, expiry_date, balance FROM users WHERE username = ?"
        ).bind('user_jack88').first();

        if (!user) {
            return new Response(JSON.stringify({ error: "找不到用戶" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json; charset=utf-8" }
        });
    } catch (err) {
        // 這是為了讓你能在終端機看到具體的報錯原因
        console.error("API Error:", err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}