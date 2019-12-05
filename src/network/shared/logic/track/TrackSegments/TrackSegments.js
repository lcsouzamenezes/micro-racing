import {getPathCornersBox} from '@pkg/gl-math';

import transformSegmentizePath from './utils/transformSegmentizePath';

export default class TrackSegments {
  constructor(
    {
      segmentWidth,
      interpolatedPath,

      // optionals:
      transform = null,
      box = null,
    },
  ) {
    const {path, innerPath, outerPath, segments} = transformSegmentizePath(
      {
        segmentizeParams: {
          width: segmentWidth,
        },
        transform,
        path: interpolatedPath,
      },
    );

    this.box = box || getPathCornersBox(path);
    this.segments = segments;
    this.path = path;
    this.innerPath = innerPath;
    this.outerPath = outerPath;
  }
}
