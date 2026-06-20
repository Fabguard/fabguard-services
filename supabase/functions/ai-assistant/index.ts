// FabGuard AI Assistant — chat + smart service recommender via Lovable AI Gateway.
import { createClient } from "npm:@supabase/supabase-js@2";
import { convertToModelMessages, streamText, generateText, type UIMessage } from "npm:ai";
import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are FabGuard's friendly home-services assistant for India.
FabGuard offers plumbing, electrical, carpentry, laundry, cleaning, and AC services with cash-on-delivery, same-day visits, and verified experts (4.9★).
Contact: support@fabguard.co.in · +91 7262927177 · Pan India.

Rules:
- Be concise, warm, and helpful. Use simple English with light Hindi phrases if the user uses Hindi.
- Quoted prices are visit charges; final charges are confirmed after inspection.
- Guide users to add services to cart and check out. Mention COD is available.
- If asked something outside home services, politely redirect.
- Never invent services that aren't in the catalog provided in the conversation.`;

async function loadServices() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(url, key);
  const { data } = await supabase.from("services").select("id,name,category,price,description").limit(100);
  return data ?? [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const mode: "chat" | "recommend" = body.mode === "recommend" ? "recommend" : "chat";
    const gateway = createLovableAiGatewayProvider(apiKey);
    const model = gateway("google/gemini-3-flash-preview");
    const services = await loadServices();
    const catalog = services.map((s: any) => `#${s.id} [${s.category}] ${s.name} — ₹${s.price}`).join("\n");

    if (mode === "recommend") {
      const problem = String(body.problem ?? "").slice(0, 500);
      if (!problem) {
        return new Response(JSON.stringify({ error: "problem is required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { text } = await generateText({
        model,
        system: `You match a user's home-service problem to FabGuard services. Reply STRICTLY as compact JSON:
{"ids":[<service id numbers>],"reason":"<one sentence why>"}
Pick 1-3 best service ids from this catalog. Never include ids that aren't listed.

Catalog:
${catalog}`,
        prompt: `User problem: ${problem}`,
      });
      // Best-effort JSON extraction
      const match = text.match(/\{[\s\S]*\}/);
      let parsed: { ids: number[]; reason: string } = { ids: [], reason: "" };
      if (match) {
        try { parsed = JSON.parse(match[0]); } catch { /* noop */ }
      }
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = (body.messages ?? []) as UIMessage[];
    const result = streamText({
      model,
      system: `${SYSTEM_PROMPT}\n\nCurrent service catalog:\n${catalog}`,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (err) {
    console.error("ai-assistant error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("429") ? 429 : message.includes("402") ? 402 : 500;
    return new Response(JSON.stringify({ error: message }), {
      status, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
