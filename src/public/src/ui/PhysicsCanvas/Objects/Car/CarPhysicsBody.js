import {clamp, lerp, toRadians, vec2} from '@pkg/gl-math';

const GRAVITY = 9.81;

const FRONT_TRAIN = 0;

const makeWheel = (x, y, steering = false) => ({
  pos: vec2(x, y),
  steering,
});

const vec2rot = (angle, vec) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return vec2(vec.x * sin + vec.y * cos, vec.x * cos - vec.y * sin);
};

/**
 * @see http://www.asawicki.info/Mirror/Car%20Physics%20for%20Games/Car%20Physics%20for%20Games.html
 * @see https://codea.io/talk/discussion/6648/port-of-marco-monsters-2d-car-physics-now-with-video
 * @see https://github.com/nadako/cars/blob/gh-pages/Car.hx
 *
 * @see https://github.com/spacejack/carphysics2d/blob/master/marco/Cardemo.c
 *
 * @description
 * - Sideslip angle (BETA) is angle between velocity and car angle
 *
 */
export default class CarPhysicsBody {
  constructor(
    {
      mass = 1500,

      velocity = vec2(0, 0),

      // rotations
      angle = toRadians(45),
      steerAngle = toRadians(45), // relative to root angle
      maxSteerAngle = toRadians(30),

      // left top corner
      pos = vec2(0, 0),
      size = vec2(0, 0),
      massCenter = vec2(0.5, 0.5),

      // size of wheel relative to size
      wheelSize = vec2(0.2, 0.25),

      // distance between axle and mass center
      // normalized to size and mass center
      axles = {
        front: -1.2,
        rear: 1.2,
      },
    } = {},
  ) {
    this.braking = false;
    this.mass = mass;
    this.inertia = mass;
    this.angularVelocity = 0;
    this.velocity = velocity;
    this.acceleration = 0;

    this.angle = angle;
    this.steerAngle = steerAngle;
    this.maxSteerAngle = maxSteerAngle;

    this.massCenter = vec2(0.5, 0.5 + lerp());
    this.size = size;
    this.pos = pos;

    // controls
    this.throttle = 80;
    this.brake = 0;

    // wheelBase is distance betwen axles
    this.axles = axles;
    this.wheelSize = wheelSize;
    this.wheelBase = axles.rear - axles.front;

    // todo: maybe adding support for more than 4 wheels will be good?
    this.wheels = [
      makeWheel(0, massCenter.y + axles.front, true), // top left
      makeWheel(1, massCenter.y + axles.front, true), // top right

      makeWheel(0, massCenter.y + axles.rear), // bottom left
      makeWheel(1, massCenter.y + axles.rear), // bottom right
    ];

    // precomputed
    this.weight = mass * GRAVITY;
    this.axleWeights = {
      front: -axles.front / this.wheelBase * this.weight,
      rear: axles.rear / this.wheelBase * this.weight,
    };

    this.corneringStiffness = {
      front: -5.0,
      rear: -5.2,
    };

    this.maxGrip = 2.0;
    this.resistance = 30.0;
    this.drag = 2.0;
  }

  turn(delta) {
    this.steerAngle = clamp(
      -this.maxSteerAngle,
      this.maxSteerAngle,
      this.steerAngle + delta,
    );
  }

  update(delta) {
    delta = 0.01;

    const {
      angle,
      angularVelocity, velocity,
      axles, maxGrip,
      corneringStiffness, axleWeights,
      throttle, brake, drag, resistance,
      mass, inertia, steerAngle,
    } = this;

    const worldVelocity = vec2rot(angle, velocity);
    const slipAngles = {
      front: 0.0,
      rear: 0.0,
    };

    if (worldVelocity.x !== 0) {
      const absVLong = Math.abs(worldVelocity.x);
      slipAngles.front = (
        Math.atan2(worldVelocity.y + angularVelocity * -axles.front, absVLong)
          - (steerAngle * Math.sign(worldVelocity.x))
      );

      slipAngles.rear = Math.atan2(worldVelocity.y - angularVelocity * axles.rear, absVLong);
    }

    const frontCoef = 0.5 * FRONT_TRAIN;
    const rearCoef = 1.0 - frontCoef;

    const fLateral = {
      front: vec2(
        0,
        Math.max(
          -maxGrip,
          Math.min(maxGrip, corneringStiffness.front * slipAngles.front),
        ) * axleWeights.front,
      ),
      rear: vec2(
        0,
        Math.max(
          -maxGrip,
          Math.min(maxGrip, corneringStiffness.rear * slipAngles.rear),
        ) * axleWeights.rear,
      ),
    };

    const fTraction = vec2(
      100 * (throttle * (rearCoef + frontCoef * Math.cos(steerAngle)) - brake * Math.sign(worldVelocity.x)), // eslint-disable-line max-len
      100 * (throttle * frontCoef * Math.sin(steerAngle)),
    );

    const fResistance = vec2(
      -(resistance * worldVelocity.x + drag * worldVelocity.x * Math.abs(worldVelocity.x)),
      -(resistance * worldVelocity.y + drag * worldVelocity.y * Math.abs(worldVelocity.y)),
    );

    const fCornering = vec2.add(
      fLateral.rear,
      vec2.mul(
        Math.cos(steerAngle),
        fLateral.front,
      ),
    );

    const fTotal = vec2.add(
      fTraction,
      fCornering,
      fResistance,
    );

    const localAcceleration = vec2.div(mass, fTotal);
    const acceleration = vec2rot(angle, localAcceleration);

    this.velocity = vec2.add(
      vec2.mul(delta, acceleration),
      this.velocity,
    );

    this.pos = vec2.add(
      vec2.mul(delta, this.velocity),
      this.pos,
    );

    const torque = -fLateral.rear.y * axles.rear + fLateral.front.y * -axles.front;
    const angularAcceleration = torque / inertia;

    // debugger;
    this.angularVelocity += delta * angularAcceleration;
    this.angle += delta * this.angularVelocity;
  }
}
