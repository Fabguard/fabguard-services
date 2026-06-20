import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Service } from "@/types/types";
import { toast } from "@/hooks/use-toast";

interface Props {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;

const ServiceRecommender = ({ services, onAddToCart }: Props) => {
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<Service[]>([]);
  const [reason, setReason] = useState("");

  const recommend = async () => {
    if (!problem.trim() || loading) return;
    setLoading(true);
    setRecommended([]);
    setReason("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "recommend", problem: problem.trim() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const ids: number[] = Array.isArray(data.ids) ? data.ids : [];
      const matches = ids
        .map((id) => services.find((s) => Number(s.id) === Number(id)))
        .filter((s): s is Service => Boolean(s));
      setRecommended(matches);
      setReason(typeof data.reason === "string" ? data.reason : "");
      if (matches.length === 0) {
        toast({ title: "No close match found", description: "Try rephrasing or contact us directly." });
      }
    } catch (e) {
      toast({ title: "Recommendation failed", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl border border-border bg-card shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold">Not sure what you need? Describe your problem</h3>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); recommend(); }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <Input
          value={problem}
          onChange={(e) => setProblem(e.target.value.slice(0, 300))}
          placeholder="e.g. My kitchen sink is leaking and the geyser stopped heating"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !problem.trim()} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Recommend"}
        </Button>
      </form>

      {reason && <p className="mt-4 text-sm text-muted-foreground">{reason}</p>}

      {recommended.length > 0 && (
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {recommended.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
              <div>
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.category} · ₹{s.price}</div>
              </div>
              <Button size="sm" onClick={() => onAddToCart(s)}>Add</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceRecommender;
