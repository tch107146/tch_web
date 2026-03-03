export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // 1. 解析表單傳來的資料 (username, password)
        const body = await request.formData();
        const username = body.get('username');
        const password = body.get('password');

        // 2. 到 D1 資料庫查詢是否有匹配的用戶
        // 這裡的 env.DB 必須對應您 wrangler.toml 裡的 binding 名稱
        const user = await env.DB.prepare(
            "SELECT * FROM users WHERE username = ? AND password = ?"
        ).bind(username, password).first();

        // 3. 判斷查詢結果
        if (user) {
            // 登入成功：跳轉到會員控制台 dashboard.html
            // 使用 302 重定向
            return Response.redirect(new URL('/dashboard.html', request.url), 302);
        } else {
            // 登入失敗：回傳錯誤訊息
            return new Response("登入失敗：帳號或密碼錯誤", { 
                status: 401,
                headers: { "Content-Type": "text/plain; charset=utf-8" }
            });
        }
    } catch (err) {
        // 4. 錯誤處理（例如資料庫連線失敗）
        return new Response("伺服器錯誤: " + err.message, { status: 500 });
    }
}