import createVectorOptimizedOperations from '../createVectorOptimizedOperations';

// fixme: propably circular dependency
import vec3 from '../vec3';
import vec4 from '../vec4';

import rotate from './operations/rotate';
import orthogonal from './operations/orthogonal';
import fromScalar from './operations/fromScalar';
import angleBetweenPoints from './operations/angleBetweenPoints';
import vectorAngle from './operations/vectorAngle';

export default createVectorOptimizedOperations(
  2,
  {
    rotate,
    orthogonal,
    fromScalar,
    angleBetweenPoints,
    vectorAngle,

    toVec3(vec, z = 0.0) { return vec3(vec[0], vec[1], z); },
    toVec4(vec, z = 0.0, w = 1.0) { return vec4(vec[0], vec[1], z, w); },
  },
);
