export default class RoomConfig {
  constructor(
    {
      laps = 4,
      countdown = 0,
      playersLimit = 4,
      playerIdleTime = 12000,
      spawnBotsBeforeStart = true,
    } = {},
  ) {
    this.laps = laps;
    this.countdown = countdown;
    this.playersLimit = playersLimit;
    this.spawnBotsBeforeStart = spawnBotsBeforeStart;
    this.playerIdleTime = playerIdleTime;
  }

  toBSON() {
    return {
      laps: this.laps,
    };
  }
}
