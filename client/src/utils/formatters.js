export const formatLabel = (value) => {
    if (value === 'all') return 'All Suggestions'
    return value
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

export const formatDate = (isoString) => {
    if (!isoString) return '—'

    return new Date(isoString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}