export async function onRequestGet(context) {
    const { env } = context;

    try {
        // 必須使用 env.DB，對應 wrangler.toml 裡的 binding
        const users = await env.DB.prepare("SELECT * FROM users").all();
        
        return new Response(JSON.stringify(users.results), {
            headers: { 
                "Content-Type": "application/json; charset=utf-8",
                "Cache-Control": "no-cache" 
            }
        });
    } catch (err) {
        // 這會把詳細錯誤印在 Wrangler 的終端機視窗中
        console.error("D1 Error:", err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}