import {
  IN_UV_POS_ATTRIB,
  IN_VERTEX_POS_ATTRIB,
} from '../constants/predefinedShaderParams';

import createMeshDescriptor from './createMeshDescriptor';
import bindBufferAttrib from '../buffer/bindBufferAttrib';

/**
 * Attaches parameters from mesh descriptors passed
 * when mesh renders,
 *
 * @example
 *  mesh({uniforms: {}})
 *
 * @param {MeshDescriptor} descriptor
 * @param {Material} material
 */
const attachShaderParameters = (
  {
    uniforms,
    textures,
  },
  material,
) => {
  if (uniforms)
    material.setUniforms(uniforms);

  if (textures)
    material.setTextures(textures);
};

/**
 * Creates function that renders mesh based on config
 *
 * @param {WebGLRenderingContext} gl
 * @param {meshDescriptor} meshDescriptor
 *
 * @param {Object} dynamicDescriptor
 *
 * @returns {Function}
 */
const createMeshRenderer = (gl, meshDescriptor) => {
  const {
    buffers: {
      vbo,
      ibo,
      uv,
    },
    material,
    renderMode,
  } = meshDescriptor;

  // cached buffer attrib locations
  const {loc: vertexBufferLoc} = material.info.attributes[IN_VERTEX_POS_ATTRIB];
  const {loc: uvBufferLoc} = material.info.attributes[IN_UV_POS_ATTRIB] || {};

  // mesh render method
  return (dynamicDescriptor) => {
    // attach shader
    material.attach();

    // VBO bind
    bindBufferAttrib(gl, vbo, vertexBufferLoc);

    // texture UV
    if (uv)
      bindBufferAttrib(gl, uv, uvBufferLoc);

    // IBO bind
    if (ibo)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo.handle);

    // each mesh can accept parameters
    // from dynamic render function call and default
    // parameters from config
    attachShaderParameters(meshDescriptor, material);
    dynamicDescriptor && attachShaderParameters(dynamicDescriptor, material);

    // Render
    if (ibo) {
      // Using indices buffer
      const {
        type: componentsType,
        count: verticesCount,
      } = ibo.components;

      gl.drawElements(renderMode, verticesCount, componentsType, 0);
    } else {
      // Using only vertex buffer
      const {count: verticesCount} = vbo.components;

      gl.drawArrays(renderMode, 0, verticesCount);
    }

    // disable VBO
    gl.disableVertexAttribArray(vertexBufferLoc);
  };
};

/**
 * Creates renderable mesh instance
 *
 * @param {WebGLRenderingContext} gl
 * @param {FGLContext} fglContext
 *
 * @returns {Function}
 */
const createMesh = gl => description => createMeshRenderer(
  gl,
  createMeshDescriptor(gl)(description),
);

export default createMesh;
