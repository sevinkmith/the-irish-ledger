import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono-figure text-sm text-slate">404</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
        The page you&apos;re looking for doesn&apos;t exist, or may have
        moved. Try one of our calculators instead.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/calculators" variant="secondary">
          Browse calculators
        </Button>
        <Button href="/" variant="ghost">
          Go home
        </Button>
      </div>
    </Container>
  );
}
