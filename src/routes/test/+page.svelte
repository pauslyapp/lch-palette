<script lang="ts">
  const collections: { hue: string; saturation?: string; chroma?: string }[][] = [
    [{ hue: '204.06', saturation: '92.12%' }],
    [
      { hue: '89.6', saturation: '100%' },
      { hue: '275.7deg', saturation: '62.69%' },
    ],
    [
      { hue: '243.87', chroma: '0.15' },
      { hue: '135.77', chroma: '0.26' },
      { hue: '309.01', chroma: '0.2' },
    ],
  ]

  const colors = {
    blue: [
      'oklch(97% 0.0146 243.87)',
      'oklch(93.4829% 0.0315 243.87)',
      'oklch(87.1779% 0.0607 243.87)',
      'oklch(80.0796% 0.0907 243.87)',
      'oklch(72.7231% 0.1171 243.87)',
      'oklch(65.3025% 0.1373 243.87)',
      'oklch(58% 0.15 243.87)',
      'oklch(50.8231% 0.1548 243.87)',
      'oklch(43.6439% 0.1518 243.87)',
      'oklch(36.4047% 0.141 243.87)',
      'oklch(28.9888% 0.1223 243.87)',
      'oklch(21% 0.0949 243.87)',
    ],
    green: [
      'oklch(97% 0.0188 135.77)',
      'oklch(93.4829% 0.0407 135.77)',
      'oklch(87.1779% 0.0784 135.77)',
      'oklch(80.0796% 0.1212 135.77)',
      'oklch(72.7231% 0.1667 135.77)',
      'oklch(65.3025% 0.2137 135.77)',
      'oklch(58% 0.26 135.77)',
      'oklch(50.8231% 0.241 135.77)',
      'oklch(43.6439% 0.2161 135.77)',
      'oklch(36.4047% 0.1883 135.77)',
      'oklch(28.9888% 0.158 135.77)',
      'oklch(21% 0.1226 135.77)',
    ],
    purple: [
      'oklch(97% 0.0188 309.01)',
      'oklch(93.4829% 0.0407 309.01)',
      'oklch(87.1779% 0.0784 309.01)',
      'oklch(80.0796% 0.1175 309.01)',
      'oklch(72.7231% 0.1526 309.01)',
      'oklch(65.3025% 0.1808 309.01)',
      'oklch(58% 0.2 309.01)',
      'oklch(50.8231% 0.2038 309.01)',
      'oklch(43.6439% 0.1979 309.01)',
      'oklch(36.4047% 0.1826 309.01)',
      'oklch(28.9888% 0.158 309.01)',
      'oklch(21% 0.1226 309.01)',
    ],
  }

  export const colors2 = {
    neongreen: [
      'oklch(97% 0.0354 135.7762)',
      'oklch(93.4917% 0.112 135.7762)',
      'oklch(89.1055% 0.2639 135.7762)',
      'oklch(82.9997% 0.2809 135.7762)',
      'oklch(76.5941% 0.2522 135.7762)',
      'oklch(70.0055% 0.2092 135.7762)',
      'oklch(63.2514% 0.1829 135.7762)',
      'oklch(56.3122% 0.1961 135.7762)',
      'oklch(49.1285% 0.1999 135.7762)',
      'oklch(41.5478% 0.193 135.7762)',
      'oklch(32.9422% 0.172 135.7762)',
      'oklch(20% 0.1176 135.7762)',
    ],
  }

  const colors3 = {
    yellow: [
      'oklch(99.1296% 0.0211 100.9749)',
      'oklch(96.4196% 0.0776 100.3351)',
      'oklch(92.4708% 0.1434 99.6627)',
      'oklch(86.5155% 0.2584 99.5186)',
      'oklch(79.8176% 0.3421 99.4428)',
      'oklch(72.7347% 0.3857 99.4421)',
      'oklch(65.3979% 0.3921 99.4763)',
      'oklch(57.8642% 0.3938 99.5206)',
      'oklch(50.2018% 0.4054 99.5457)',
      'oklch(42.2132% 0.3538 99.5407)',
      'oklch(32.9404% 0.2561 99.5429)',
      'oklch(20% 0.1296 99.5457)',
    ],
  }
</script>

{#each collections as collection}
  <div class="collection">
    {#each collection as { hue, saturation, chroma }}
      <div class="swatches">
        {#each Array.from({ length: 12 }) as _, i}
          {@const lightness = 2 + ((12 - i) / 12) * (saturation ? 96 : 96)}
          <div
            class="swatch"
            style:background-color={saturation
              ? `hsl(${hue} ${saturation} ${lightness}%)`
              : `oklch(${lightness}% ${chroma} ${hue})`}
          >
            {lightness}%
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/each}

{#each [colors, colors2, colors3] as collection}
  <div class="collection">
    {#each Object.values(collection) as c}
      <div class="swatches">
        {#each c as color}
          <div class="swatch" style:background-color={color}>
            <!-- {color}% -->
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/each}

<style lang="postcss">
  .collection {
    width: 48rem;
    margin-inline: auto;
    margin-block: 5rem;
  }
  .swatches {
    display: flex;
    margin-block: 1rem;
    padding: 1px;
  }
  .swatch {
    height: 4rem;

    border-radius: 0rem;
    flex: 1;
    border: 1px solid #0003;
    display: grid;
    place-content: center;
    font-size: 0.85rem;
    font-weight: 500;

    &:not(:first-child) {
      border-left: none;
    }

    &:first-child {
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }
    &:last-child {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
</style>
