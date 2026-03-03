export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const data = await request.json();
        
        // 執行 SQL 插入指令
        await env.DB.prepare(
            "INSERT INTO users (username, password, plan_name, expiry_date) VALUES (?, ?, ?, ?)"
        ).bind(
            data.username, 
            data.password, 
            data.plan_name || '未設定', 
            data.expiry_date || null
        ).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}