import * as R from 'ramda';
import {OBJECT_TYPES} from '@game/network/constants/serverCodes';

export const createOffscreenRefs = ({players, objects}) => ({
  objects,
  players: R.reduce(
    (acc, player) => {
      if (player) {
        acc[player.id] = {
          player,
        };
      }

      return acc;
    },
    {},
    players,
  ),
});

export const createMapRefs = () => ({
  players: {},
  objects: [],
});

/**
 * Stores information about map objects
 *
 * @see
 *  Used on server!
 *
 * @export
 * @class RoomMapRefsStore
 */
export default class RoomMapRefsStore {
  constructor(refs) {
    this.refs = refs || createMapRefs();
  }

  get players() {
    return this.refs.players;
  }

  appendObjects({players, objects}) {
    this.appendRefsStore(
      {
        refs: createOffscreenRefs(
          {
            players,
            objects,
          },
        ),
      },
    );
  }

  appendRefsStore(refsStore) {
    this.refs = {
      objects: (
        R.is(Array, this.refs.objects)
          ? [
            ...this.refs.objects,
            ...refsStore.refs.objects,
          ]
          : {
            ...this.refs.objects,
            ...refsStore.refs.objects,
          }
      ),

      players: {
        ...this.refs.players,
        ...refsStore.refs.players,
      },
    };

    return this;
  }

  removePlayerCar(player) {
    const {refs} = this;
    const carNode = refs.players[player.id];

    delete refs.players[player.id];
    delete refs.objects[carNode.id];
  }

  static fromInitialRoomState(initialRoomState) {
    const store = new RoomMapRefsStore({});

    return store.loadInitialRoomState(initialRoomState);
  }

  loadInitialRoomState({players, objects}) {
    this.roadElement = R.filter(
      ({type}) => type === OBJECT_TYPES.ROAD,
      objects,
    );

    this.refs = createOffscreenRefs(
      {
        players,
        objects,
      },
    );

    return this;
  }

  release() {
    this.refs = createMapRefs();
  }
}
