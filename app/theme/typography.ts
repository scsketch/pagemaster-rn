export const fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  inter: 'Inter-Regular',
  playfair: 'PlayfairDisplay-Regular',
} as const;

export const typography = {
  title: {
    fontFamily: fonts.playfair,
    fontSize: 32,
    letterSpacing: 0.5,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
  subheading: {
    fontFamily: fonts.medium,
    fontSize: 20,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  error: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
} as const;
