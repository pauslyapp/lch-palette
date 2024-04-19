<div class="about">
  <details>
    <summary>What is this?</summary>

    <p>
      This is a tool for creating and managing color gradient palettes. You can create new palettes,
      edit existing ones, and export them in multiple formats. Learn more in our <a
        href="https://www.pausly.app/blog/gradient-palettes-with-oklch">release blog post</a
      >.
    </p>
  </details>
  <details>
    <summary>How do I save or share palettes?</summary>

    <p>
      Whenever you make a change to a palette, the changes are saved in the URL. So you can bookmark
      the page when you have a palette you like, or share the URL with others.
    </p>
  </details>
  <details>
    <summary>Should I specify more than one color in a single palette?</summary>

    <p>
      Generally, it's better to specify fewer colors, so in most cases <em>one</em> color is perfect.
      The tool will generate all colors in the palette for you and make sure that different palettes
      fit well together.
    </p>
    <p>
      But sometimes, lighter colors need more saturation / chroma (yellow is such a color) and
      sometimes you want darker colors to be of a slightly different hue. In these cases feel free
      to define more colors.
    </p>
    <p>
      Another reason why you might want to specify more colors, is because you have a corporate
      identity that specifies two shades of a color already.
    </p>
  </details>
  <details>
    <summary>What does the RGB button do?</summary>

    <p>
      By default, colors are displayed in the P3 color space and oklch. On screens that support that
      color space the colors are a bit more vibrant (a MacBook or Pixel phone for example). You can
      toggle RGB mode and you will see how the gradient looks on a screen that does _not_ support
      these colors.
    </p>
    <p>Often the changes are very subtle or non existant.</p>
    <p>
      If you don't have a screen that supports the P3 color space, the button doesn't do anything.
    </p>
  </details>
</div>

<style lang="postcss">
  .about {
    width: 30rem;
    max-width: 100%;
    margin-inline: auto;
  }
  details {
    margin-block: 1rem;
  }
  summary {
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
  }
  p {
    margin-block: 1em;
  }
</style>
