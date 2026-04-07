# Validation Command Matrix

Use this matrix to choose required validation gates based on change scope.

## Baseline Command

1. Always run: pnpm lint

## Command Selection by Scope

1. Documentation-only skill/instructions changes: lint optional, no tests required.
2. Local UI text/style changes with no behavior changes: pnpm lint required.
3. Component logic or feature behavior changes: pnpm lint and targeted tests required.
4. Shared utilities, stores, schemas, or cross-feature code changes: pnpm lint and pnpm test required.
5. Routing, app composition, build pipeline, or broad refactor changes: pnpm lint, pnpm test, and pnpm build required.

## Quotations-Specific

1. If billing derivation or quotations output logic changes: run targeted quotations tests first, then pnpm test.
2. If preview/PDF path changed: include explicit parity verification notes.

## Evidence Logging

1. Record each command executed.
2. Record pass/fail result.
3. Record why any required command was skipped.
4. Record whether failures are touched-code regressions or pre-existing issues.

## Suggested Sequence

1. pnpm lint
2. targeted tests if applicable
3. pnpm test for broader behavior changes
4. pnpm build for integration-sensitive or broad changes

## Failure Handling

1. If touched-code failure occurs, fix and re-run required gates.
2. If unrelated failure occurs, report it clearly and continue only if safe.
