export const fontOnest = (weight: number) => `
    \nfont-family: var(--font-onest);
    font-optical-sizing: auto;
    font-weight: ${weight};
    font-style: normal;\n
`

export const fontNotoSans = (weight: number) => `
    \nfont-family: var(--font-noto);
    font-optical-sizing: auto;
    font-weight: ${weight};
    font-style: normal;\n
`

export const fonts = {
    fontOnest,
    fontNotoSans
}