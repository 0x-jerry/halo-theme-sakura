export default () => {
  const breakpointsTailwind = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  const bps = useBreakpoints(breakpointsTailwind);

  const screen = computed(() => {
    return {
      mobile: bps.isSmallerOrEqual('sm'),
      laptop: bps.isInBetween('sm', 'lg'),
      pc: bps.isGreaterOrEqual('lg')
    }
  })

  return screen
};
