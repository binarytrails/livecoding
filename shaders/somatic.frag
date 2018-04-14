// @author Vsevolod Ivanov

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec2 rand(vec2 v) // deterministic/pseudo random
{
    return fract(sin(vec2(dot(v, vec2(151.9803, 78.233)),
                          dot(v, vec2(645.3453, 54.785)))) * 43758.5453);
}

void main (void)
{
    vec2 px = gl_FragCoord.xy / u_resolution.xy;
    vec2 m = u_mouse / u_resolution;

    vec3 color = vec3(abs(sin(u_time))* 0.1);
    float d_min = 0.6;
    px *= 1000000000.;

    for (int x=-1; x<1; x++)
    {
        for (int y=-1; y<1; y++)
        {
            vec2 p = rand(vec2(x,y) + floor(px));
            p = 0.5 + abs(sin(u_time*p))* 0.6;
            d_min = min(d_min, length(vec2(x,y) + p - fract(px)));
        }
    }
    color += d_min;
    color /= step(0.01, d_min);
    color -= step(0.4, abs(sin(d_min * 50.))* 0.2);

    gl_FragColor = vec4(color, 1.0);
}
