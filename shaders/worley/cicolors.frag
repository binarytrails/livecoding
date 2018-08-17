// @author Vsevolod Ivanov

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec2 rand(vec2 v)
{
    vec2 dot_p = vec2(
        dot(v, vec2(151.9803, 78.233)),
        dot(v, vec2(645.3453, 54.785))
    );
    return fract(sin(dot_p) * 43758.5453);
}

void main (void)
{
    vec2 px = gl_FragCoord.xy / u_resolution.xy;
    vec2 m = u_mouse / u_resolution;

    vec3 color = vec3(
        abs(sin(u_time)* 0.2),
        abs(cos(u_time) * 0.5),
        abs(sin(u_time) * 0.5)
    );
    float d_min = 0.5;
    px *= 10.5;

    // worley noise
    for (int x = -1; x <= 1; x++)
    {
        for (int y = -1; y <= 1; y++)
        {
            vec2 p = rand(vec2(x,y) + floor(px));
            p = 0.5 + abs(cos(u_time*p))* 0.5;
            d_min = min(
                d_min,
                length(
                    vec2(x,y) + p - fract(px)
                )
            );
        }
    }
    color -= d_min;
    color /= step(0.5, d_min);
    color += step(0.4, abs(sin(d_min * 50.))* 0.2);

    gl_FragColor = vec4(color, 1.0);
}
