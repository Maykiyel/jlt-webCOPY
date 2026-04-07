# Quotations Acceptance Gates

Apply this checklist whenever files under src/features/quotations are touched.

## Scope Detection

1. Trigger these gates if any file in src/features/quotations is changed.
2. Trigger these gates if shared billing utilities used by quotations are changed.
3. Trigger these gates if tests under tests/quotations are changed.

## Derivation Consistency

1. Preview and PDF outputs must use the same billing derivation source.
2. Empty charge rows must be filtered out for document outputs.
3. Empty billing sections must not render output tables.
4. Billing validation must align with rendering and submission expectations.
5. At least one meaningful charge is required before continuing from billing.

## Structural Expectations

1. Compose page/container owns orchestration.
2. Step views remain in compose components.
3. Shared billing derivations live in utilities, not duplicated inline.

## Evidence Requirements

1. Cite the single utility source used for billing derivations.
2. Confirm preview path and PDF path call equivalent derivation logic.
3. Confirm empty rows and empty billing sections are excluded in output rendering.
4. Confirm billing validation blocks empty/meaningless submissions.

## Validation

1. Run targeted tests first (for example tests/quotations/\* where relevant).
2. Run pnpm test when billing logic or rendering behavior changes.
3. Include a short risk note if snapshot/visual parity cannot be fully verified locally.

## Fail Conditions

1. Duplicate billing derivation logic appears in multiple quotations modules.
2. Preview and PDF produce inconsistent billing table rows.
3. Empty charge rows or empty billing sections are visible in outputs.
4. Billing step allows continuation without meaningful charges.
