interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export default function Divider({ orientation = 'horizontal', className, size = 1 }: DividerProps) {
  const horizontalClasses = `w-full ${
    size === 1
      ? 'border-t-[1px]'
      : size === 2
        ? 'border-t-[2px]'
        : size === 3
          ? 'border-t-[3px]'
          : size === 4
            ? 'border-t-[4px]'
            : size === 5
              ? 'border-t-[5px]'
              : size === 6
                ? 'border-t-[6px]'
                : size === 7
                  ? 'border-t-[7px]'
                  : size === 8
                    ? 'border-t-[8px]'
                    : size === 9
                      ? 'border-t-[9px]'
                      : size === 10
                        ? 'border-t-[10px]'
                        : 'border-t-[1px]'
  }`
  const verticalClasses = `h-full ${
    size === 1
      ? 'border-l-[1px]'
      : size === 2
        ? 'border-l-[2px]'
        : size === 3
          ? 'border-l-[3px]'
          : size === 4
            ? 'border-l-[4px]'
            : size === 5
              ? 'border-l-[5px]'
              : size === 6
                ? 'border-l-[6px]'
                : size === 7
                  ? 'border-l-[7px]'
                  : size === 8
                    ? 'border-l-[8px]'
                    : size === 9
                      ? 'border-l-[9px]'
                      : size === 10
                        ? 'border-l-[10px]'
                        : 'border-l-[1px]'
  }`

  const classes = `${orientation === 'horizontal' ? horizontalClasses : verticalClasses} ${className}`
  return <div className={classes} />
}
