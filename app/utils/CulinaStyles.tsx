import { StyleSheet } from "react-native";

const generateSpacings = (prefix: string, property: string, count: number = 50) => {
    const spaces: { [key: string]: any } = {};
    for (let i = 1; i <= count; i++) {
      spaces[`${prefix}${i}`] = { [property]: i * 4 };
    }
    return spaces;
};
  
export const spacings = StyleSheet.create({
    ...generateSpacings('m', 'margin'),
    ...generateSpacings('mt', 'marginTop'),
    ...generateSpacings('mb', 'marginBottom'),
    ...generateSpacings('ml', 'marginLeft'),
    ...generateSpacings('mr', 'marginRight'),
    ...generateSpacings('mv', 'marginVertical'),
    ...generateSpacings('mh', 'marginHorizontal'),
    ...generateSpacings('p', 'padding'),
    ...generateSpacings('pt', 'paddingTop'),
    ...generateSpacings('pb', 'paddingBottom'),
    ...generateSpacings('pv', 'paddingVertical'),
    ...generateSpacings('ph', 'paddingHorizontal'),
});

export const shadow = StyleSheet.create({
    boxShadow: { 
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    boxShadowTop: {
        boxShadow: '0 -2 4 0 rgba(0, 0, 0, 0.2)',
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)', 
        textShadowOffset: { width: 0, height: 2 }, 
        textShadowRadius: 4,
    },
    textBlur: {opacity: 0.75}
});