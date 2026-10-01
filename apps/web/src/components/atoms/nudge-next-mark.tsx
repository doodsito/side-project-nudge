export function NudgeNextMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="13" className="nx-mark-tile" />
      <g transform="translate(1.6 7) scale(.095)">
        <path d="M35 448 134 52h121L156 448Z" className="nx-fill-lilac" />
        <path d="m134 52 243 396h121L255 52Z" className="nx-fill-white" />
        <path d="m377 448 99-396h121l-99 396Z" className="nx-fill-lime" />
        <g className="nx-mark-ribs" strokeWidth="10">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${45 + i * 25} 448 ${144 + i * 25} 52 ${387 + i * 25} 448 ${486 + i * 25} 52`}
            />
          ))}
        </g>
        <path d="m134 52 99 162-29 115L105 167Z" className="nx-fill-shadow" />
        <path d="m377 448 121 0-95-155Z" className="nx-fill-shadow" />
        <path d="m476 52 16-34h121l-16 34Z" className="nx-fill-white" />
        <path d="m492 18 5-10h121l-5 10Z" className="nx-fill-lime" />
      </g>
    </svg>
  );
}

export function NudgeFold({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 540" className={className} fill="none" aria-hidden="true">
      <g className="nx-fold-back">
        <path d="M35 448 134 52h121L156 448Z" className="nx-fill-lilac" />
        <path d="m134 52 243 396h121L255 52Z" className="nx-fill-white" />
        <path d="m377 448 99-396h121l-99 396Z" className="nx-fill-lime" />
      </g>
      <g className="nx-fold-lines" stroke="currentColor" strokeWidth="1.1" opacity=".55">
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={`M${45 + i * 10} 448 ${144 + i * 10} 52 ${387 + i * 10} 448 ${486 + i * 10} 52`}
          />
        ))}
      </g>
      <path d="m134 52 99 162-29 115L105 167Z" className="nx-fill-shadow" />
      <path d="m377 448 121 0-95-155Z" className="nx-fill-shadow" />
      <g className="nx-fold-tip">
        <path d="m476 52 16-34h121l-16 34Z" className="nx-fill-white" />
        <path d="m492 18 5-10h121l-5 10Z" className="nx-fill-lime" />
      </g>
    </svg>
  );
}
