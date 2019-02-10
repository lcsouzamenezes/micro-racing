import {unrollSquareMatrix2DOperation} from './mat/compiler';
import createMatrix from './mat/createMatrix';

import {unrollIdentity} from './mat/creators/identity';
import {unrollTranslation} from './mat/creators/translation';
import {unrollScaling} from './mat/creators/scaling';

import {addUnrollExecutor} from './mat/operations/add';
import {multiplyUnrollExecutor} from './mat/operations/mul';

/**
 * Creates object of unrolled square matrix operations
 *
 * @param {Object} config
 * @param {Object} additionalOperations
 */
const createMatrixOptimizedOperations = ({w, vector}, {operations, creators} = {}) => {
  const unroll = unrollSquareMatrix2DOperation(w);
  const create = m => createMatrix(w, w, m);

  return Object.assign(
    create,
    {
      ...operations,

      mul: unroll(multiplyUnrollExecutor),
      add: unroll(addUnrollExecutor('+')),
      sub: unroll(addUnrollExecutor('-')),

      from: {
        translation: unrollTranslation(w, vector),
        scaling: unrollScaling(w, vector),
        identity: unrollIdentity(w),

        ...creators,
      },
    },
  );
};

export default createMatrixOptimizedOperations;
