<script lang="ts">
  import type { Oklch } from 'culori'

  export let colors: Oklch[]

  const width = 100
  const height = 15
  const py = 2

  const cellWidth = width / colors.length

  // const padding = Math.round(width / 30)
  // $: colorCount = palette.colors.length

  // $: lightnessData = [...new Array(colorCount)].map((_, i) => {
  //   return palette.lightnessInterpolator.getPointAt(i / (colorCount -1))[1]!
  // })

  // $: x = scaleLinear([0, colorCount - 1], [padding, width - padding])
  // $: y = scaleLinear(extent(lightnessData) as number[], [height - padding, padding])
  // $: d = line((_, i) => x(i), y).curve(curveCardinal)

  // $: startX = valueFunction.start * (width - padding * 2) + padding
  // $: endX = valueFunction.end * (width - padding * 2) + padding

  const getX = (i: number) => cellWidth / 2 + cellWidth * i
</script>

<svg viewBox="0 0 {width} {height}">
  <g stroke="black" stroke-width="0.03">
    {#each colors as color, i}
      {@const cx = getX(i)}

      <circle {cx} cy={(1 - (color.h ?? 1) / 360) * (height - py) + py / 2} r={0.3} fill="pink" />
      <circle {cx} cy={(1 - color.l) * (height - py) + py / 2} r={0.5} fill="white" />
      <circle {cx} cy={(1 - color.c) * (height - py) + py / 2} r={0.5} fill="yellow" />
    {/each}
  </g>
</svg>

<style lang="postcss">
  svg {
    background-color: #0001;
    width: 100%;
  }
</style>
