#pragma header
vec2 uv = openfl_TextureCoordv.xy;
vec2 fragCoord = openfl_TextureCoordv * openfl_TextureSize;
vec2 iResolution = openfl_TextureSize;
uniform float iTime;

uniform float depth;          

#define iChannel0 bitmap
#define texture flixel_texture2D
#define fragColor gl_FragColor
#define mainImage main

void mainImage()
{
    // coordenadas normalizadas (0 a 1)
    vec2 uv = fragCoord / iResolution.xy;
   
    float dx = distance(uv.x, 0.5);
    float dy = distance(uv.y, 0.5);
   
    float offset = (dx * 0.2) * dy;
   
    float dir = (uv.y <= 0.5) ? 1.0 : -1.0;
   
    // antes: vec2 coords = vec2(uv.x, uv.y + dx*(offset*depth*dir));
    // ahora usamos el uniform 'depth' que viene de Lua
    vec2 coords = vec2(uv.x, uv.y + dx * (offset * depth * dir));
   
    vec2 nuv = coords;
    // vec2 nuv = coords + vec2(iMouse.x/mouse_speed_divisor, 0.);   // comentado como estaba

    fragColor = texture(iChannel0, nuv);
}