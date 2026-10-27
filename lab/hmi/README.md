# HMI lab

Working files for the HMI case (not part of the site build).

- `hmi.html` — the cluster rebuilt in code from the Figma layers (Clash Display). `HMI.setMode('nav'|'phone'|'media'|'settings')`, `HMI.setState({sp, pw, boot})`.
- Stage scenes for video renders: `hmi.html#boot`, `#drive`, `#build`, `#wheel`.
- Render: `node render.js 'hmi.html#drive' frames 30` then ffmpeg the jpgs.
