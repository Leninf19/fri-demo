export default function StarRating({ stars, size = 12 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i <= stars ? '#d97706' : '#E8E4DF'}>
          <path d="M6 1l1.236 2.505 2.764.401-2 1.95.472 2.753L6 7.37 3.528 8.609 4 5.856 2 3.906l2.764-.401z" />
        </svg>
      ))}
    </span>
  )
}
