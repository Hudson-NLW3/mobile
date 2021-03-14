import { Dimensions, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  
    container: {
        flex: 1
    },

    description: {
        fontFamily: "Nunito_600SemiBold",
        color: "#5c8599",
        lineHeight: 24,
        marginTop: 16,
    },
    
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        fontFamily: 'Nunito_700Bold',        
    },

    calloutText: {
        color: '#0089A5',
        fontSize: 14
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 46,
        paddingLeft: 24,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,        
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3'
    },

    criarOrfanatoBotao: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }
  
});
