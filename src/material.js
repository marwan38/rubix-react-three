import {ShaderMaterial, DoubleSide} from 'three';
class Material extends ShaderMaterial {
    constructor(props) {
        super({
            vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
          fragmentShader: `
                uniform vec3 color;
                varying vec2 vUv;

                vec2 stroke(vec2 p, float w) {
                    return step(vec2(w), p) * step(vec2(w), 1.0 - p);
                }

                void main() {
                    float c = 1.0;
                    vec2 s = stroke(vUv, 0.05);
                    c *= s.x * s.y;
                    gl_FragColor = vec4(color * c, 1.0);
                }
              `,
          uniforms: {
            color: {type: 'vec3', value: props.color || [0, 0, 0]}
          },
          side: DoubleSide
        })
    }
}



export default Material;
