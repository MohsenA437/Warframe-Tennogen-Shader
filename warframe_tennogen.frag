#include '../state.frag'

USE_TEXTURE2D(tDiffuseMap); //name "Diffuse Map"

//USE_TEXTURE2D(tNormal); //name "Normal Map"

USE_TEXTURE2D(tTintMaskMap); //name "Tint Mask"

uniform vec3 uTint1; //Color name Primary default 0.72, 0.72, 0.72
uniform vec3 uTint2; //Color name Secondary default 0.041, 0.04, 0.04
uniform vec3 uTint3; //Color name Tertiary default 0.64, 0.16, 0.01
uniform vec3 uTint4; //Color name Accents default 0.13, 0.14, 0.24

//USE_TEXTURE2D(tMetallicMap); //name "Metallic Map"
//uniform float fMetallic; //name "Metallic Value" Min 0 Max 1

//USE_TEXTURE2D(tRoughnessMap); //name "Roughness Map"
//uniform float fRoughness; //name "Roughness Value" Min 0 Max 1

//USE_TEXTURE2D(tEmissiveMap); //name "Emissive Map"
//uniform vec3 uEmissive; //Color name "Emissive Color" default 0.0, 0.64, 1.0

void CustomAlbedo(inout FragmentState s)
{
    vec4 tintMask = texture2D(tTintMaskMap, s.vertexTexCoord ).rgba;
    vec4 diffuseMap = texture2D(tDiffuseMap, s.vertexTexCoord).rgba;


    vec4 tintColor1 = vec4(uTint1.r,uTint1.g,uTint1.b,1);
    vec4 tintColor2 = vec4(uTint2.r,uTint2.g,uTint2.b,1);
    vec4 tintColor3 = vec4(uTint3.r,uTint3.g,uTint3.b,1);
    vec4 tintColor4 = vec4(uTint4.r,uTint4.g,uTint4.b,1);

    vec4 resultTint = mix(vec4(0.5,0.5,0.5,1), tintColor4, tintMask.r);
    resultTint = mix(resultTint, tintColor2, tintMask.g);
    resultTint = mix(resultTint, tintColor3, tintMask.b);
    resultTint = mix(resultTint, tintColor1, tintMask.a);
    resultTint *= 2.0;
    diffuseMap *= resultTint;


    s.albedo = diffuseMap;
}

#ifdef Albedo
    #undef Albedo
#endif
#define Albedo CustomAlbedo

// void TennogenMetallic(inout FragmentState s)
// {
//     float m = texture2D(tMetallicMap, s.vertexTexCoord).r;

//     s.reflectivity = m;
// }

// #ifdef Reflectivity
//     #undef Reflectivity
// #endif
// #define Reflectivity TennogenMetallic

// void TennogenNormal(inout FragmentState s)
// {
//     vec3 normal = texture2D(tNormal, s.vertexTexCoord).rgb;

//     normal = normalize(normal * 2.0 - 1.0);

//     normal.y *= -1;

//     s.normal = normal;
// }

// #ifdef Surface
//     #undef Surface
// #endif
// #define Surface TennogenNormal