import { useFonts } from 'expo-font';

const CulinaImgs = {
    logo: require('./mainlogo.png'),
    logoText: require('./logotext.png'),
    authBackground: require('./imgs/auth-bg.png'),
    circle: require('./imgs/eclipse.png'),
    layoutOne: require('./imgs/layout__1.png'),
    layoutTwo: require('./imgs/layout__2.png'),
    stickerOne: require('./imgs/cook.png'),
    stickerTwo: require('./imgs/stir-fry.png'),
    checked: require('./imgs/checked.png'),
    comingSoon: require('./imgs/coming-soon.png'),
    achievementThumbnails: {
        bread: require('./imgs/achievementThumbnails/bread.png'),
        crystal: require('./imgs/achievementThumbnails/crystal.png'),
        map: require('./imgs/achievementThumbnails/map.png'),
        one: require('./imgs/achievementThumbnails/one.png'),
        weekend: require('./imgs/achievementThumbnails/weekend.png'),
        muscle: require('./imgs/achievementThumbnails/muscle.png')
    },
    hello: require('./imgs/Animation-hello.json'),
    altAvatar: require('./imgs/alt-avatar.png'),
};

export default CulinaImgs;

export const CulinaFonts = () => {
    return useFonts({
        'InriaSans-Regular': require('./fonts/Inria-Sans/InriaSans-Regular.ttf'),
        'InriaSans-Bold': require('./fonts/Inria-Sans/InriaSans-Bold.ttf'),
        'Kurale-Regular': require('./fonts/Kurale-Regular.ttf'),
    });
};
