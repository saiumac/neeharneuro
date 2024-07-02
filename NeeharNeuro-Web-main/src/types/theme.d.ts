import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    b20: React.CSSProperties;
    b16: React.CSSProperties;
    b18: React.CSSProperties;
    b14: React.CSSProperties;
    b12: React.CSSProperties;
    sb30: React.CSSProperties;
    sb24: React.CSSProperties;
    sb18: React.CSSProperties;
    sb20: React.CSSProperties;
    sb16: React.CSSProperties;
    sb14: React.CSSProperties;
    sb12: React.CSSProperties;
    m24: React.CSSProperties;
    m18: React.CSSProperties;
    m16: React.CSSProperties;
    m14: React.CSSProperties;
    m13: React.CSSProperties;
    m12: React.CSSProperties;
    m10: React.CSSProperties;
    r50: React.CSSProperties;
    r32: React.CSSProperties;
    r24: React.CSSProperties;
    r20: React.CSSProperties;
    r18: React.CSSProperties;
    r16: React.CSSProperties;
    r14: React.CSSProperties;
    r12: React.CSSProperties;
    r10: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    b20: React.CSSProperties;
    b18: React.CSSProperties;
    b16: React.CSSProperties;
    b14: React.CSSProperties;
    b12: React.CSSProperties;
    sb30: React.CSSProperties;
    sb24: React.CSSProperties;
    sb18: React.CSSProperties;
    sb20: React.CSSProperties;
    sb16: React.CSSProperties;
    sb14: React.CSSProperties;
    sb12: React.CSSProperties;
    m24: React.CSSProperties;
    m18: React.CSSProperties;
    m16: React.CSSProperties;
    m14: React.CSSProperties;
    m13: React.CSSProperties;
    m12: React.CSSProperties;
    m10: React.CSSProperties;
    r50: React.CSSProperties;
    r32: React.CSSProperties;
    r24: React.CSSProperties;
    r20: React.CSSProperties;
    r18: React.CSSProperties;
    r16: React.CSSProperties;
    r14: React.CSSProperties;
    r12: React.CSSProperties;
    r10: React.CSSProperties;
  }
}

// Update the Typography's variant
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    b20: true;
    b18: true;
    b16: true;
    b14: true;
    b12: true;
    sb30: true;
    sb24: true;
    sb18: true;
    sb20: true;
    sb16: true;
    sb14: true;
    sb12: true;
    m24: true;
    m18: true;
    m16: true;
    m14: true;
    m13: true;
    m12: true;
    m10: true;
    r50: true;
    r32: true;
    r24: true;
    r20: true;
    r18: true;
    r16: true;
    r14: true;
    r12: true;
    r10: true;
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    s: true;
    m: true;
    l: true;
    xxl: true;
  }
}