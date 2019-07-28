import React, {useRef, useEffect} from 'react';

import {DIMENSIONS_SCHEMA} from '@pkg/basic-type-schemas';

import TrackPath from '@game/shared/track/TrackPath';
import {useGameBoard} from '../../game/GameBoard';

import EditorCanvas from '../EditorCanvas';
// import PhysicsCanvas from '../PhysicsCanvas/PhysicsCanvas';

const track = TrackPath.fromRandomPath(
  {
    w: 640,
    h: 480,
  },
);

const GameCanvas = ({dimensions}) => {
  const canvasRef = useRef();
  const game = useGameBoard();

  useEffect(
    () => {
      game
        .setCanvas(
          {
            canvas: canvasRef.current,
            aspectRatio: 1.16,
            dimensions,
            track,
          },
        );
    },
    [],
  );

  return (
    <div>
      <canvas
        tabIndex={-1}
        ref={canvasRef}
        width={dimensions.w}
        height={dimensions.h}
      />

      <EditorCanvas
        dimensions={dimensions}
        track={track}
      />
      {/* <PhysicsCanvas dimensions={dimensions} /> */}
    </div>
  );
};

GameCanvas.displayName = 'GameCanvas';

GameCanvas.propTypes = {
  dimensions: DIMENSIONS_SCHEMA,
};

GameCanvas.defaultProps = {
  dimensions: {
    w: 640,
    h: 550,
  },
};

export default GameCanvas;
