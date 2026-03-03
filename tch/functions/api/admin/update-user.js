export async function onRequestPost(context) {
    const { request, env } = context;
    const data = await request.json();

    try {
        await env.DB.prepare(`
            UPDATE users 
            SET plan_name = ?, expiry_date = ?, last_payment_date = ?, next_billing_amount = ?
            WHERE username = ?
        `).bind(
            data.plan_name,
            data.expiry_date,
            data.last_payment_date,
            data.next_billing_amount,
            data.username
        ).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}