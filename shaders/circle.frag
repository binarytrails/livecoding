// @author Vsevolod Ivanov

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main (void)
{
    vec2 u_res = u_resolution;
    vec2 px = gl_FragCoord.xy / u_resolution.xy;
    vec2 m_px = u_mouse / u_resolution;
    vec3 color = vec3(0.);

    //vec2 center = vec2(u_res.x/2., u_res.y/2.); 
    //float radius = length(gl_FragCoord.xy-center);
    //if (radius > 100.)
    //    color = vec3(1.);

    float radius = length(px.xy-vec2(0.5));
    if (radius > 0.25)
        color = vec3(1.);

    gl_FragColor = vec4(color, 1.0);
}
