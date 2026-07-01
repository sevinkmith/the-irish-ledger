export function CalculatorDisclaimer({ className }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-slate ${className ?? ""}`}>
      This calculator is provided for informational purposes only and should
      not be considered financial or tax advice. Figures are estimates based
      on published Revenue and Central Bank of Ireland rules for the 2026 tax
      year and may not reflect your personal circumstances. Always confirm
      your position with Revenue.ie or a qualified professional before making
      a financial decision.
    </p>
  );
}
