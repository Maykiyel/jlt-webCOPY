# AppTable In-Depth Guide

`AppTable` is a reusable table shell that renders rows, optional top controls, per-row actions, and footer counts.

## 1. Mental Model

`AppTable` handles UI concerns. The parent page handles business logic.

- Parent owns fetch logic
- Parent owns params (`page`, `perPage`, `search`)
- Parent passes callbacks for interactions
- AppTable renders based on props

---

## 2. Key Props and What They Mean

- `columns`: defines headers and cell rendering
- `data`: current rows to render
- `rowKey`: stable row id function (recommended)
- `actions`: optional row menu actions
- `withEntryControls`: shows page-size selector + search + footer
- `perPage`: selected page size
- `onPerPageChange`: callback when page size changes
- `total`: total records across all pages
- `showingCount`: current count shown in UI
- `searchValue`: controlled search value
- `onSearchChange`: callback while input changes
- `onSearch`: callback on search action
- `onRowClick`: optional row click handler

### Footer behavior

- Text is: `Showing {showingCount} out of {total} entries`
- If `showingCount` is omitted, it falls back to `data.length`
- If `total` is omitted, it falls back to `data.length`

---

## 3. Column Configuration Patterns

Each column supports:

- `key`
- `label`
- `render?: (row, index) => ReactNode`
- `width?`
- Select mode:
  - `type: "select"`
  - `selectOptions`
  - `selectValue`
  - `onSelectChange`

### Pattern A: plain text

```tsx
{ key: "clientName", label: "Client" }
```

### Pattern B: custom render

```tsx
{
  key: "createdAt",
  label: "Created",
  render: (row) => dayjs(row.createdAt).format("DD MMM YYYY"),
}
```

### Pattern C: inline select edit

```tsx
{
  key: "status",
  label: "Status",
  type: "select",
  selectOptions: [
    { value: "DRAFT", label: "Draft" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ],
  selectValue: (row) => row.status,
  onSelectChange: (row, value) => updateStatus(row.id, value),
}
```

Important: if `render` is present, it is used first.

---

## 4. Controlled vs Uncontrolled Search

### Uncontrolled

Do not pass `searchValue`; table keeps internal search state.

### Controlled (recommended for API screens)

Pass `searchValue` and `onSearchChange` from parent.

```tsx
const [search, setSearch] = useState("");

<AppTable
  ...
  searchValue={search}
  onSearchChange={setSearch}
  onSearch={(value) => fetchRows({ search: value, page: 1 })}
/>
```

Why controlled is better:

- Single source of truth
- Easy reset from parent
- Easier URL/query param sync

---

## 5. Server-Side Pagination Contract

For API-driven pages:

- `data`: current page items
- `perPage`: selected page size
- `total`: full matching count from backend
- `showingCount`: typically `data.length`

Example:

- API total is 137
- Current page has 10 items
- Footer should show 10 out of 137

---

## 6. Row Click and Menu Action Behavior

`AppTable` already stops event propagation for:

- Row action menu clicks
- Inline select clicks

This means you can safely combine:

- `onRowClick` to open details
- `actions` menu for row operations

without triggering accidental row navigation.

---

## 7. Recommended Parent State Shape

```tsx
type TableParams = {
  page: number;
  perPage: number;
  search: string;
};

const [params, setParams] = useState<TableParams>({
  page: 1,
  perPage: 10,
  search: "",
});
```

When `perPage` or `search` changes, usually reset `page` to `1`.

---

## 8. Performance Tips

- Always provide stable `rowKey` (id, not index when possible)
- Memoize `columns` and `actions` for heavy tables
- Avoid expensive formatting inline in render loops
- Keep row objects stable if possible

```tsx
const columns = useMemo(() => [...], [deps]);
const actions = useMemo(() => [...], [deps]);
```

---

## 9. Common Bugs and Fixes

1. Missing `rowKey`

- Symptom: row flicker/wrong updates
- Fix: use `row.id`

2. Wrong `total`

- Symptom: footer counts are misleading
- Fix: pass backend total, not `data.length`

3. Select value mismatch

- Symptom: empty select or wrong option selected
- Fix: ensure `selectValue` exactly matches option `value`

4. Double filtering

- Symptom: unexpectedly few rows
- Fix: avoid mixing server and hidden client filters

5. Search request spam

- Symptom: too many API calls while typing
- Fix: debounce or trigger fetch on submit/search action

---

## 10. Full Practical Example

```tsx
const columns = [
  { key: "quotationNo", label: "Quotation #" },
  { key: "client", label: "Client" },
  {
    key: "status",
    label: "Status",
    type: "select",
    selectOptions: ["DRAFT", "APPROVED", "REJECTED"],
    selectValue: (row) => row.status,
    onSelectChange: async (row, value) => {
      await quotationService.updateStatus(row.id, value);
      refetch();
    },
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row) => dayjs(row.createdAt).format("DD MMM YYYY"),
  },
];

const actions = [
  { label: "View", onClick: (row) => navigate(`/quotations/${row.id}`) },
  { label: "Duplicate", onClick: (row) => duplicateQuotation(row.id) },
  { label: "Delete", color: "red", onClick: (row) => confirmDelete(row.id) },
];

<AppTable
  columns={columns}
  data={response.items}
  rowKey={(row) => row.id}
  actions={actions}
  withEntryControls
  perPage={params.perPage}
  onPerPageChange={(value) =>
    setParams((prev) => ({ ...prev, perPage: value, page: 1 }))
  }
  total={response.total}
  showingCount={response.items.length}
  searchPlaceholder="Search quotation # or client"
  searchValue={params.search}
  onSearchChange={(value) =>
    setParams((prev) => ({ ...prev, search: value, page: 1 }))
  }
  onSearch={() => refetch()}
  onRowClick={(row) => navigate(`/quotations/${row.id}`)}
/>;
```

---

## 11. Pre-Ship Checklist

- Stable `rowKey` is set
- `total` uses API total
- `showingCount` matches visible rows
- Search mode (controlled/uncontrolled) is intentional
- Action handlers handle API errors
- Row click and action menu both tested
- Empty/loading/error states handled in parent page
