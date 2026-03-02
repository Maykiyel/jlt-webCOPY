/**
 * Converts a Mantine color token (e.g. "jltOrange.5") to its
 * corresponding CSS variable (e.g. "var(--mantine-color-jltOrange-5)").
 *
 * Use this when you need a Mantine color in a plain style prop,
 * since style props don't go through Mantine's color resolver.
 */
export function colorToCssVar(color: string): string {
  const [name, shade] = color.split(".");
  return shade
    ? `var(--mantine-color-${name}-${shade})`
    : `var(--mantine-color-${name})`;
}
