export function filterFormErrors(errors, param) {
  if (!errors || !errors.length) {
    return []
  }
  return errors.filter((error) =>
    param ? error.param === param : error.param == null
  )
}

export function getFirstFormError(errors, param) {
  const filtered = filterFormErrors(errors, param)
  if (filtered.length === 0) {
    return null
  }
  return filtered[0].message
}

export default function FormErrors({ errors, param }) {
  const filtered = filterFormErrors(errors, param)
  if (filtered.length === 0) {
    return null
  }
  return (
    <ul style={{ color: 'darkred' }}>
      {filtered.map((e, i) => (
        <li key={i}>{e.message}</li>
      ))}
    </ul>
  )
}
