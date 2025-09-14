precision mediump float;
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

float swirl(vec2 uv, float t){
    float r = length(uv-0.5);
    float angle = atan(uv.y-0.5, uv.x-0.5);
    angle += sin(r*10.0 - t*2.0)*0.3;
    return angle;
}

void main(){
    vec2 uv = vUv - 0.5;
    float r = length(uv);
    float angle = swirl(vUv, uTime);
    vec2 newUv = vec2(cos(angle), sin(angle))*r + 0.5;

    float glow = smoothstep(0.6, 0.1, r) + 0.5*sin(uTime*4.0 + r*12.0);
    vec3 col = mix(vec3(0.01), uColor, glow);

    // Rim neon
    float rim = smoothstep(0.4, 0.35, r);
    col += vec3(0.5,0.2,1.0)*rim*0.2;

    gl_FragColor = vec4(col,1.0);
}
